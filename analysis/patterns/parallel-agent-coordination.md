---
title: "Pattern: Parallel Agent Coordination"
tags: [pattern, parallel-agents, coordination, git-sync, task-locking]
---

# Pattern: Parallel Agent Coordination

## Problem

A single agent is too slow for large projects. Building a 100,000-line codebase one session at a time could take months. The obvious solution --- running multiple agents in parallel --- introduces new failure modes: agents overwrite each other's work, duplicate effort on the same problem, create merge conflicts, and produce inconsistent code because they have no shared context.

Naively adding agents does not scale. Without coordination infrastructure, more agents can mean less progress.

## Solution

Use **git-based decentralized coordination with task locking** to enable parallel agent work. Each agent operates independently with its own context, and git serves as the shared state layer. No agent communicates with any other agent directly. All coordination happens through the repository.

## Mechanism

### Isolated Execution Environments

Each agent runs in its own isolated Docker container. All containers share the same upstream git repository. Isolation prevents agents from interfering with each other's file systems, processes, or intermediate state. The only shared surface is git.

### Task Claiming via Lock Files

Agents claim work by writing lock files to a `current_tasks/` directory in the repository. Before starting on a task (e.g., fixing a specific failing test), the agent writes a lock file indicating it has claimed that task. Other agents check this directory before selecting work and skip already-claimed tasks.

This is optimistic concurrency control: agents assume they can claim a task, and git's merge mechanics resolve conflicts if two agents claim the same task simultaneously.

### Git Synchronization

The merge workflow prevents duplicate work and maintains repository coherence:

1. **Pull** the latest changes from upstream.
2. **Merge** upstream changes into the local branch.
3. **Push** the agent's completed work.
4. **Release** the lock file for the completed task.

Each agent follows this cycle on every iteration. Frequent synchronization keeps agents' local views of the codebase reasonably current and reduces the window for conflicting changes.

### Fresh Sessions with Git-Based Memory

Each loop iteration starts a **fresh session** with no conversation memory. The agent does not remember what it did in the previous iteration. Instead, context comes entirely from:

- The current state of the repository (code, tests, build output)
- README and progress files maintained in the repository
- Lock files indicating what other agents are working on
- Git history showing recent changes

This is the infinite loop pattern:

```bash
while true; do
  claude -p "$(cat AGENT_PROMPT.md)"
done
```

The agent prompt references the repository state, not any prior conversation. This design eliminates context window limits as a constraint on project duration --- the project can run for weeks because no single session needs to hold the full history.

### CI/CD Enforcement

New commits cannot break existing passing tests. This hard constraint prevents the common failure mode where one agent's fix breaks another agent's previously-working code. The CI gate is non-negotiable: if your change breaks something, it does not merge.

## When Parallelism Helps

Parallelism provides near-linear speedup when the work decomposes into **many independent subtasks**:

- **Many failing test cases.** Each agent picks a different failing test. The tasks are naturally independent --- fixing one test rarely affects another.
- **Orthogonal features.** Different agents work on different, non-overlapping features or modules.
- **Specialist roles.** Agents with different responsibilities (core development, deduplication, performance optimization, code quality review, documentation) work on orthogonal concerns that rarely produce conflicting changes.

The ideal case: N independent tasks, N agents, near-Nx throughput.

## When Parallelism Fails

Parallelism provides **zero advantage** on monolithic tasks:

- **Single bottleneck bugs.** When compiling a large program fails due to one root cause, all agents independently discover the same bug, produce the same fix, and overwrite each other. N agents produce 1x throughput at Nx cost.
- **Highly coupled code.** When every change touches the same files, merge conflicts dominate. Agents spend more time resolving conflicts than making progress.
- **Sequential dependencies.** When task B requires the output of task A, only one agent can make progress at a time regardless of how many are available.

The failure case: 1 monolithic task, N agents, 1x throughput, Nx cost.

## Workaround for Monolithic Tasks: Oracle-Based Testing

When a task appears monolithic (e.g., "the compiled program crashes"), use a **known-good implementation as an oracle** to manufacture task boundaries:

1. Compile the target program with a known-good tool (e.g., GCC) to produce a reference binary.
2. Randomly split compilation units between the project compiler and the oracle.
3. Binary-search to identify which specific compilation unit causes the failure.
4. The failing unit becomes a scoped, independent task suitable for a single agent.

This technique converts one opaque failure into many small, independent, verifiable tasks --- exactly the structure parallel agents need. It is generalizable to any domain where a reference implementation exists.

## Role Specialization

Rather than running N identical generalist agents, deploy **specialists** with orthogonal responsibilities:

- **Core developers** (multiple): Fix failing tests, implement new features, extend functionality.
- **Deduplicator** (one): Scans the codebase for duplicate or near-duplicate code and consolidates it.
- **Performance optimizer** (one): Profiles compilation speed and targets bottlenecks.
- **Code quality critic** (one): Reviews code for correctness patterns, style consistency, and potential bugs.
- **Documentation maintainer** (one): Keeps README files, progress logs, and inline documentation current.

Specialists work on different dimensions of the same codebase. Their changes are orthogonal by design --- the optimizer's changes rarely conflict with the deduplicator's changes. This reduces merge conflicts and duplicate work without explicit coordination.

## Anti-Patterns

### N Agents on a Single-Threaded Problem

Running multiple agents on a task that has no natural decomposition. All agents converge on the same bottleneck, produce identical or conflicting fixes, and waste compute. Before adding agents, verify that independent subtasks exist.

### Sharing Conversation Context Between Agents

Attempting to pass conversation history or shared memory between agents. This creates coupling, synchronization problems, and context window pressure. Use git as the shared state layer. Context comes from the repository, not from other agents' conversations.

### No Task Locking

Running parallel agents without a mechanism to prevent duplicate work. Without lock files or equivalent claiming mechanisms, agents independently select the same "most obvious" task and produce redundant work. The overhead of a locking system is minimal compared to the waste of duplicate effort.

### Full Test Suites Every Iteration

Allowing agents to run the complete test suite on every iteration. Agents have no internal sense of time-cost tradeoff and will happily spend hours running tests instead of making progress. Provide a `--fast` option that runs a random 1-10% sample of tests. Agents use the fast option during development and run the full suite only before committing.

## Scale Evidence

The Carlini parallel compiler project provides the strongest empirical validation of this pattern:

- **16 parallel Claude instances** coordinated via git
- **Approximately 2,000 sessions** over two weeks
- **100,000 lines** of working Rust compiler code produced
- **Total cost: approximately $20,000**
- **The compiler successfully compiled** the Linux kernel, QEMU, FFmpeg, and Doom

The coordination infrastructure --- Docker isolation, git synchronization, task locking, oracle-based testing, CI/CD enforcement --- was the critical enabler. The same model (Claude) was available to everyone. The parallel coordination harness is what converted 16 independent agents into a functioning development team.

## Sources

- **Carlini, Nicholas.** "Building a C compiler with Claude as my coding agent." Anthropic Engineering Blog. https://www.anthropic.com/engineering/building-c-compiler
