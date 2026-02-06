---
title: "Parallel Agent Coordination"
description: "Patterns for orchestrating multiple AI agents on a single project."
weight: 2
tags: [parallel-agents, coordination, agent-workflows, swarms]
date: 2026-02-06
---

A single agent is often too slow for large projects. Running multiple agents in parallel is the obvious solution, but naive parallelism introduces failure modes that can waste more time and money than sequential work. This page covers when parallel agents help, when they hurt, and the coordination infrastructure that makes the difference.

The strongest empirical evidence comes from Nicholas Carlini's compiler project, where 16 parallel Claude instances produced 100,000 lines of working Rust compiler code over two weeks. The full case study is covered in [What 100 Parallel Agents Taught Us](/deep-dives/parallel-compiler-lessons/). This page focuses on the reusable coordination patterns.

## When Parallelism Helps

Parallel agents provide near-linear speedup when the work decomposes into many independent subtasks.

**Many failing test cases.** Each agent picks a different failing test. The tasks are naturally independent -- fixing one test rarely affects another. This was the primary mode of the Carlini compiler project, and the reason 16 agents could achieve roughly 16x throughput on test-fixing phases.

**Orthogonal features.** Different agents work on non-overlapping features or modules. A frontend agent and a backend agent working on different endpoints rarely produce conflicting changes.

**Specialist roles.** Agents with different responsibilities -- core development, code quality review, performance optimization, documentation -- work on orthogonal concerns. Their changes are unlikely to conflict because they address different dimensions of the same codebase.

The ideal case: N independent tasks, N agents, near-Nx throughput.

## When Parallelism Fails

Parallelism provides zero advantage on monolithic tasks, and can actively make things worse.

**Single bottleneck bugs.** When a large program fails due to one root cause, all agents independently discover the same bug, produce the same fix, and overwrite each other. N agents produce 1x throughput at Nx cost.

**Highly coupled code.** When every change touches the same files, merge conflicts dominate. Agents spend more time resolving conflicts than making progress.

**Sequential dependencies.** When task B requires the output of task A, only one agent can make progress at a time regardless of how many are available.

The failure case: 1 monolithic task, N agents, 1x throughput, Nx cost. Before adding agents, verify that independent subtasks actually exist.

## Coordination Strategies

### Plan/Execute (Centralized)

A lead agent (or human) creates the plan and task list. Worker agents each claim and execute individual tasks. The lead reviews completed work and assigns new tasks.

This works well when: the task decomposition is clear upfront, tasks have natural boundaries, and you want centralized quality control. It struggles when: the decomposition is wrong and needs revision mid-project, or when tasks turn out to be more interdependent than expected.

### Fan-Out/Fan-In (Decentralized)

All agents operate independently, selecting their own tasks from a shared work queue. No single agent coordinates. Git serves as the shared state layer. Agents synchronize by pulling and pushing to the repository frequently.

This is the pattern Carlini used at scale. It works well when: tasks are numerous and naturally independent, the verification infrastructure (CI/CD, test suites) is robust enough to catch conflicts automatically, and you can tolerate some duplicate work as the cost of eliminating coordination overhead.

### Role Specialization

Rather than running N identical generalist agents, deploy specialists with orthogonal responsibilities:

- **Core developers** (multiple): Fix failing tests, implement features, extend functionality
- **Deduplicator** (one): Scans for duplicate code and consolidates it
- **Performance optimizer** (one): Profiles bottlenecks and targets them
- **Code quality critic** (one): Reviews for correctness patterns and style consistency
- **Documentation maintainer** (one): Keeps README files and progress logs current

Specialists work on different dimensions of the codebase. Their changes are orthogonal by design, which reduces merge conflicts without explicit coordination.

## Required Infrastructure

Parallel agents without coordination infrastructure produce parallel chaos. The following components are not optional.

### Isolated Execution Environments

Each agent needs its own workspace -- a separate Docker container, worktree, or branch. Isolation prevents agents from interfering with each other's intermediate state. The only shared surface should be git (or equivalent version control).

### Task Claiming and Lock Files

Agents need a mechanism to prevent duplicate work. In the Carlini project, agents wrote lock files to a `current_tasks/` directory in the repository. Before starting a task, each agent checked for existing claims and skipped already-claimed work.

Without locking, agents independently select the "most obvious" task and produce redundant work. The overhead of a locking system is minimal compared to the waste of duplicate effort.

### Git Synchronization Loop

Each agent follows a tight synchronization cycle:

1. Pull the latest changes from upstream
2. Merge upstream changes into the local branch
3. Do the work
4. Push completed work
5. Release the lock file

Frequent synchronization keeps agents' local views of the codebase current and reduces the window for conflicting changes.

### CI/CD Enforcement

A hard rule: new commits cannot break existing passing tests. This prevents the failure mode where one agent's fix breaks another agent's previously-working code. The CI gate is non-negotiable -- if your change breaks something, it does not merge. This constraint is what maintains coherence across independently-produced changes.

### Fresh Sessions with Repository-Based Memory

Each iteration should start a fresh agent session with no conversation memory. Context comes entirely from the repository: code, tests, build output, README files, progress logs, lock files, and git history. This eliminates context window limits as a constraint on project duration -- the project can run for weeks because no single session needs to hold the full history.

The pattern looks like:

```
while true; do
  agent --prompt "$(cat AGENT_PROMPT.md)"
done
```

The prompt references repository state, not prior conversation.

## Converting Monolithic Tasks to Parallel Work

When a task appears monolithic, look for ways to manufacture task boundaries. The Carlini project used oracle-based testing: a known-good compiler (GCC) served as a reference implementation. By splitting compilation units between the project compiler and the oracle, the team could binary-search to identify which specific unit caused a failure. Each failing unit became a scoped, independent task suitable for a single agent.

This technique generalizes to any domain where a reference implementation exists. The key insight is that parallelism requires task boundaries, and task boundaries can often be manufactured even when they are not obvious.

## Anti-Patterns

**N agents on a single-threaded problem.** Running multiple agents on a task with no natural decomposition. Verify that independent subtasks exist before adding agents.

**Sharing conversation context between agents.** Passing conversation history between agents creates coupling, synchronization problems, and context pressure. Use the repository as the shared state layer. Context comes from code and documentation, not from other agents' conversations.

**Full test suites every iteration.** Agents have no internal sense of time-cost tradeoff and will spend hours running tests instead of making progress. Provide a fast option that runs a random sample. Reserve full test suites for pre-commit validation.

**No verification infrastructure.** Parallel agents without CI/CD enforcement will produce parallel streams of confidently wrong code. The verification infrastructure is what converts raw compute into usable output.

## Scale Evidence

The Carlini compiler project provides the strongest empirical validation:

- 16 parallel Claude instances coordinated via git
- Approximately 2,000 sessions over two weeks
- 100,000 lines of working Rust compiler code
- Total cost approximately $20,000
- The compiler successfully compiled the Linux kernel, QEMU, FFmpeg, and Doom

The coordination infrastructure -- Docker isolation, git synchronization, task locking, oracle-based testing, CI/CD enforcement -- was the critical enabler. The same model was available to everyone. The harness is what made the difference.

## Sources

- [What 100 Parallel Agents Taught Us](/deep-dives/parallel-compiler-lessons/) -- Full case study of the Carlini compiler project
- [Parallel Agent Coordination Pattern](/patterns/parallel-agent-coordination/) -- The reusable pattern card
- [Task Scoping](/patterns/task-scoping/) -- How scoping interacts with parallelism
