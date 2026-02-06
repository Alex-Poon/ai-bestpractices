---
title: "Task Scoping for AI Agents"
description: "How to decompose work into tasks AI can actually complete well."
weight: 1
tags: [task-scoping, core-skill, agent-workflows]
date: 2026-02-06
---

Task scoping is the single most important skill in AI-assisted development. It determines whether the time you spend prompting, waiting, and reviewing produces usable output or wasted effort. Every practitioner who has moved past the initial novelty phase identifies decomposition as the core discipline.

## The Size Sweet Spot

There is a narrow band where AI delegation works well. Too small, and the overhead of context-switching to an agent exceeds the time you would spend just doing the work. Too large, and the agent produces confidently wrong output that takes longer to fix than to rewrite.

The sweet spot is defined by one constraint: **verification time**. If you cannot confirm the agent's output is correct within roughly two minutes -- through tests, visual inspection, or a quick manual review -- the task is too broad. If the task would take you less time to do manually than to describe to the agent, it is too narrow.

A well-scoped task has four properties:

1. **Clear success criteria.** You can describe what "done" looks like before the agent starts.
2. **No architectural decisions required.** The agent implements within a structure you have already defined.
3. **Bounded blast radius.** If the output is wrong, discarding it costs little.
4. **Verifiable output.** You can check correctness through tests or short review.

## The Tree Metaphor

The clearest framework for thinking about human-agent task division comes from the HN discussion on [Mitchell Hashimoto's adoption journey](/sources/2026-01-04-llm-coding-workflow-2026/). A commenter (allenu) described the division as a tree:

The **human owns the trunk and main branches** -- overall architecture, system design, module boundaries, key interfaces, and data models. The **agent owns the leaves** -- individual function implementations, boilerplate, test cases, repetitive transformations, and documentation.

The interface between human and agent work happens at the branch level. You define the branch (module structure, interface contract), and the agent fills in the leaves (implementation details). The agent never needs to understand the full tree. This maps directly to how effective delegation works between senior and junior engineers, with one critical difference: the agent does not learn across sessions unless you build a [harness](/skills/harness-engineering/).

## Practical Decomposition Techniques

### Separate Planning from Execution

Use the agent in conversation mode to explore the problem space, discuss approaches, and iterate on a plan. Then switch to execution mode for implementation. The planning phase is where you make trunk and branch decisions. The execution phase is where the agent fills in leaves.

This separation prevents the failure mode where the agent starts implementing before the approach is settled and builds momentum toward a wrong solution. [Addy Osmani's workflow](/sources/2026-01-04-llm-coding-workflow-2026/) describes this as completing a specification phase before any code is written.

### Write the Spec, Delegate the Implementation

Write a precise description of what you want: function signature, expected behavior, edge cases, error handling. Give this spec to the agent as a self-contained task. This forces you to think through the design (a human activity) while offloading the mechanical typing.

### Batch Related Leaf Tasks

If you have five similar transformations to make across different files -- updating an API call pattern, adding error handling to a set of functions -- batch them into one agent task with clear examples. Agents handle repetitive work well when given a pattern to follow.

### Use the "Explain Back" Test

Before delegating, ask yourself: if you explained this task to a competent developer who has never seen this codebase, could they complete it with only the information you are providing? If not, either narrow the scope or provide more context. The agent knows even less than that hypothetical developer.

## Anti-Patterns

### "Draw the Owl"

Giving the agent an entire feature as a single task: "Implement the user authentication system." The agent will produce something plausible that misses half your actual requirements and makes architectural decisions you would never have made. By the time you realize this, you have invested significant review time in code you will discard.

**Fix:** Break the feature into leaf-level tasks. Define the authentication flow yourself. Have the agent implement individual components (the token validation function, the middleware, the database migration) one at a time.

### Micro-Management

The opposite extreme: "Write a for loop that iterates over this array and filters items where status equals active." You could type this faster than you can prompt it.

**Fix:** Batch related micro-tasks into a meaningful unit. Instead of one for loop, delegate the entire data transformation function, including edge cases and error handling.

### Vague Goals

"Make this code better" or "Optimize the performance." The agent has no way to know what "better" means in your context. It will make changes that look like improvements in isolation but may violate constraints it does not know about.

**Fix:** Be specific. "Extract the validation logic from this 200-line function into separate functions, one per validation rule, maintaining the same execution order." Now the agent has a concrete target.

### Architecture by Accumulation

Letting the agent make a series of small structural decisions that add up to an architecture nobody designed. Each individual decision seems reasonable. The aggregate result is incoherent.

**Fix:** Make all structural decisions yourself before involving the agent. If a task requires deciding where code should live, what patterns to use, or how components should communicate, that is a trunk/branch task, not a leaf task.

## Scoping at Scale: Lessons from 16 Parallel Agents

Nicholas Carlini's project building a C compiler with 16 parallel Claude instances provides empirical evidence for how scoping interacts with parallelism. The core lesson: **parallelism requires task structure.** When hundreds of independent failing tests existed, each agent could pick a different one -- the tasks were naturally decomposed. But when a single monolithic failure appeared (compiling the Linux kernel), all 16 agents independently discovered the same bug and overwrote each other's fixes.

The solution was **oracle-based testing**: using a known-good compiler (GCC) to binary-search for the specific compilation unit causing the failure, converting one opaque problem into many scoped, independent tasks. This technique of manufacturing task boundaries where none naturally exist is generalizable to any domain with a reference implementation.

The project also demonstrated **role specialization as a scoping strategy** -- rather than N identical generalist agents, deploying specialists (core developers, a deduplicator, a performance optimizer, a code quality critic, a documentation maintainer) whose work products are orthogonal by design. See [Parallel Agent Coordination](/patterns/parallel-agent-coordination/) for the full pattern.

## Key Indicators You Have Scoped Well

- Verification is fast -- under two minutes.
- The agent did not need to ask clarifying questions.
- No architectural decisions were embedded in the output.
- You knew what "done" looked like before the agent started.
- If the output is wrong, you can discard it cheaply.

## Sources

- [Mitchell Hashimoto's AI adoption journey](/sources/2026-01-04-llm-coding-workflow-2026/) -- Describes the transition from chatbot usage to scoped task delegation as the key skill inflection point
- [Addy Osmani's LLM coding workflow](/sources/2026-01-04-llm-coding-workflow-2026/) -- Practical specification-first workflow
- [Building a C compiler with Claude](/sources/2026-01-24-claude-code-swarms/) -- Empirical evidence on scoping and parallelism from Carlini's 16-agent project
- [AI Coding Toolkit](/sources/2026-01-22-ai-coding-toolkit/) -- Phase-gated Specify/Plan/Execute workflow
- **allenu** (HN) -- Tree metaphor for human-agent task division
- **sho_hn** (HN) -- Decomposition skill matters more than prompting skill
- **apercu** (HN) -- Inability to articulate success criteria signals a task is not ready for delegation
