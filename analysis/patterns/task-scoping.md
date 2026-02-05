---
title: "Pattern: Task Scoping for AI Agents"
tags: [pattern, task-scoping, core-skill]
---

# Pattern: Task Scoping for AI Agents

## Problem

Agent produces unusable output. Either the task is so trivial that delegation is pointless (writing a for loop, renaming a variable), or so broad that the output is confidently wrong and must be discarded entirely. In both cases, the time spent prompting and reviewing exceeds the time it would have taken to do the work manually.

This is the single most common reason practitioners abandon agent-assisted development during the adoption valley.

## Solution

Find the sweet spot where a task is **small enough to verify** but **large enough to be worth delegating.** The key constraint is verification time: if you cannot confirm the agent's output is correct within approximately two minutes, the task is too broad.

A well-scoped task has these properties:

1. **Clear success criteria** — You can describe what "done" looks like before the agent starts.
2. **No architectural decisions required** — The agent implements within a structure you have already defined.
3. **Bounded blast radius** — If the output is wrong, the cost of discarding it is low.
4. **Verifiable output** — You can check correctness through tests, visual inspection, or a short manual review.

## Mental Model: The Tree Structure

allenu's metaphor from the HN discussion provides the clearest framework:

```
Human owns:
  Trunk        = Overall architecture, system design, technology choices
  Main branches = Module boundaries, key interfaces, data models

Agent owns:
  Leaves       = Individual function implementations, boilerplate,
                 test cases, repetitive transformations, documentation
```

The human never delegates trunk decisions to the agent. The agent never needs to understand the full tree. The interface between human and agent work happens at the branch level: the human defines the branch (module structure, interface contract), and the agent fills in the leaves (implementation details).

This maps directly to how effective delegation works between humans, too. A senior engineer defines the interface and reviews the implementation. A junior engineer fills in the details. The agent plays the junior engineer role, with one critical difference: the agent does not learn across sessions unless you build a harness (see [Harness Engineering](harness-engineering.md)).

## Anti-Patterns

### "Draw the Owl"
Giving the agent an entire feature as a single task: "Implement the user authentication system." The agent will produce something plausible that misses half your actual requirements and makes architectural decisions you would never have made. By the time you realize this, you have invested significant review time in code you will discard.

**Fix:** Break the feature into leaf-level tasks. Define the authentication flow yourself. Have the agent implement individual components (the token validation function, the middleware, the database migration) one at a time.

### Micro-Management
Going to the other extreme: "Write a for loop that iterates over this array and filters items where status equals active." You could type this faster than you can prompt it. The overhead of context-switching to the agent, reviewing the output, and integrating it exceeds the implementation time.

**Fix:** Batch related micro-tasks into a meaningful unit. Instead of one for loop, delegate the entire data transformation function, including edge cases and error handling.

### Vague Goals
"Make this code better" or "Optimize the performance" or "Clean this up." The agent has no way to know what "better" means in your context. It will make changes that look like improvements in isolation but may violate constraints it does not know about.

**Fix:** Be specific about what better means. "Extract the validation logic from this 200-line function into separate functions, one per validation rule, maintaining the same execution order." Now the agent has a concrete target.

### Architecture by Accumulation
Letting the agent make a series of small structural decisions that add up to an architecture nobody designed. Each individual decision seems reasonable. The aggregate result is incoherent. This is a variant of the drift problem applied specifically to scoping.

**Fix:** Make all structural decisions yourself before involving the agent. If a task requires deciding where code should live, what patterns to use, or how components should communicate, that is a trunk/branch task, not a leaf task.

## Key Indicators You Have Scoped Well

- **Verification is fast.** You can confirm the output is correct in under two minutes through tests, inspection, or a quick manual check.
- **The agent did not need to ask questions.** If the agent would need clarifying context to do the task correctly, the scope is wrong. Either narrow it or provide the missing context explicitly.
- **No architectural decisions were embedded in the output.** The agent filled in details within a structure you defined, rather than defining the structure itself.
- **Clear success criteria existed before you started.** You knew what "done" looked like before the agent produced anything.
- **Failure is cheap.** If the output is wrong, you can discard it and try again (or do it manually) without significant lost time.

## Techniques

### Separate Planning from Execution
Use the agent in chat/conversation mode to explore the problem space, discuss approaches, and iterate on a plan. Then switch to agent/execution mode for implementation. The planning phase is where you make trunk and branch decisions. The execution phase is where the agent fills in leaves.

This separation prevents the failure mode where the agent starts implementing before the approach is settled and builds momentum toward a wrong solution.

### Write the Spec, Delegate the Implementation
Write a precise description of what you want: function signature, expected behavior, edge cases, error handling. Give this spec to the agent as a self-contained task. This forces you to think through the design (a human activity) while offloading the typing (a mechanical activity).

### Prototype to Inform, Then Delegate to Build
Use the agent to quickly prototype a small piece of a larger system. Review the prototype to inform your architectural decisions. Then throw the prototype away and delegate the real implementation with clear specifications based on what you learned.

This avoids the trap of letting a prototype become the architecture by accumulation.

### Batch Related Leaf Tasks
If you have five similar transformations to make across different files (e.g., updating an API call pattern, adding error handling to a set of functions), batch them into one agent task with clear examples. The agent handles repetitive work well when given a pattern to follow.

### Use the "Explain Back" Test
Before delegating, ask yourself: "If I explained this task to a competent developer who has never seen this codebase, could they complete it with only the information I am providing?" If not, you need to either narrow the scope or provide more context. The agent knows even less than that hypothetical developer.

## Sources

- **mjr00** (HN): Described the failure mode of over-broad tasks and the importance of incremental delegation.
- **sho_hn** (HN): Emphasized that decomposition skill is more important than prompting skill.
- **allenu** (HN): Originated the tree metaphor (trunk/branches/leaves) for human-agent task division.
- **apercu** (HN): Noted that inability to articulate success criteria signals a task is not ready for delegation.
- **EastLondonCoder** (HN): Connected scoping discipline to the broader practice of harness tightening.
- **Hashimoto, Stage 2**: Describes the transition from chatbot usage to scoped task delegation as the key skill inflection point.

## Parallelism and Scoping: Lessons from 16 Agents

Nicholas Carlini's parallel compiler project (16 Claude instances building a C compiler in Rust) provides direct empirical evidence for how task scoping interacts with parallelism. The core lesson: **parallelism requires task structure. If you cannot decompose the problem, more agents do not help.**

### When Parallelism Is Trivial

When many independent tasks exist, parallelism is straightforward. In the compiler project, when the test suite had hundreds of failing tests, each agent could pick a different failing test and work on it independently. The tasks were naturally decomposed --- each test represented a self-contained problem with clear success criteria. This is the ideal case: the work is already scoped at the leaf level, and agents simply claim leaves from the tree.

### When Parallelism Fails

When the task is monolithic, parallelism provides zero advantage. Carlini encountered this when attempting to compile the Linux kernel: all 16 agents would hit the same bug, independently produce the same fix, and then overwrite each other when attempting to commit. More agents did not mean faster progress --- it meant more wasted compute on duplicate work.

This is a direct consequence of poor scoping. A single undifferentiated task ("make the compiler work on the Linux kernel") has no natural decomposition points. Every agent sees the same problem, applies the same reasoning, and arrives at the same (or conflicting) solution.

### Oracle-Based Testing: Creating Task Boundaries Where None Exist

The project's solution to monolithic tasks is worth studying as a scoping technique: **oracle-based testing**. When compiling a large program produced a single opaque failure, the project used GCC (a known-good compiler) as an oracle:

1. Compile the program with GCC to produce a known-correct binary.
2. Randomly split compilation units between the project compiler and GCC.
3. Binary-search to identify which specific compilation unit causes the failure.
4. The failing compilation unit becomes a scoped, self-contained task an agent can work on.

This technique **manufactures task boundaries** where none naturally exist. It converts a monolithic problem ("the compiled program crashes") into a leaf-level task ("this specific function in this specific file is compiled incorrectly"). The technique is generalizable: whenever you face an opaque failure, use a known-good reference implementation to bisect the problem space.

### Agent Role Specialization as a Scoping Strategy

Rather than deploying N identical generic agents, the project used role specialization to create orthogonal task scopes:

- **Core developers** worked on fixing failing tests and adding features.
- **A deduplicator agent** identified and consolidated duplicate code across the codebase.
- **A performance optimizer** focused exclusively on improving compilation speed.
- **A code quality critic** reviewed code for style, correctness patterns, and potential issues.
- **A documentation maintainer** kept README files and progress logs current.

Each specialist works on a different dimension of the problem. Their scopes are orthogonal by design --- the deduplicator's changes rarely conflict with the optimizer's changes. This is task scoping applied at the agent level: instead of scoping individual tasks, you scope entire agent roles so that their work products do not overlap.

### Key Insight

The relationship between parallelism and scoping is fundamental: parallel agents amplify whatever task structure exists. If the work is well-decomposed into independent leaves, N agents provide up to Nx speedup. If the work is a single monolithic task, N agents provide 1x speedup at Nx cost.

Before adding more agents, ask: "Can I define N independent tasks with clear success criteria?" If not, invest in creating task structure (oracle testing, role specialization, feature decomposition) before investing in parallelism.

### Source

- **Carlini, Nicholas.** "Building a C compiler with Claude as my coding agent." Anthropic Engineering Blog. https://www.anthropic.com/engineering/building-c-compiler
