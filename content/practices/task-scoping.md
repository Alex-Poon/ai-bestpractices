---
title: "Task Scoping"
description: "The dominant skill in agent-assisted development — breaking work into right-sized chunks that agents can execute reliably."
weight: 1
tags: [task-scoping, fundamentals, workflow]
date: 2026-02-12
---

Task scoping is the dominant skill in AI-assisted development. It determines whether your interaction with an agent produces usable output in minutes or wasted effort measured in hours. Every practitioner who has moved past the honeymoon phase identifies decomposition -- not prompting, not model selection -- as the discipline that matters most.

The core insight is deceptively simple: AI agents execute well-bounded tasks reliably and open-ended tasks poorly. Your job is to turn open-ended work into a series of bounded tasks. This is fundamentally the same skill as delegating to a junior developer, with one critical difference: the agent never learns from the previous session.

## What Task Scoping Is

Task scoping is the act of converting a goal (what you want to achieve) into a series of discrete work units (what you ask the agent to do). Each unit has clear inputs, defined outputs, and verifiable success criteria. The human retains ownership of architectural decisions, system design, and integration -- the agent handles implementation within those boundaries.

As HN commenter **jackfranklyn** put it, the approach is to treat AI like onboarding a contractor: "very specific, bounded tasks with clear acceptance criteria." The signal to stop delegating and switch back to manual coding is when explaining the context takes longer than writing the code yourself.

Task scoping is not the same as prompting. A prompt is how you communicate a task. Scoping is the prior step: deciding what the task should be. A perfect prompt for a badly scoped task still produces bad results. A mediocre prompt for a well-scoped task often succeeds because the boundaries constrain the agent toward the right answer.

## Why It Matters

### Agents fail predictably on open-ended work

When given broad tasks like "implement the user authentication system," agents produce plausible output that misses requirements and embeds architectural decisions you never authorized. By the time you discover this through review, you have invested significant time in code you will discard. HN commenter **SenHeng** described a vivid example: building a simple expenses app where the AI kept pushing toward a full double-entry bookkeeping system -- the model gravitates toward common patterns regardless of what you actually asked for.

### Verification scales with task size

The fastest feedback loop in AI-assisted development is: delegate a small task, verify the output, move on. If verification takes under two minutes, you can course-correct before compounding errors. If verification takes thirty minutes because the task was too broad, you have lost the speed advantage that made delegation worthwhile.

### Context windows impose hard limits

As **joshuaisaact** framed it, agents are "stateless functions with a limited heap" -- their reasoning degrades as context fills. A well-scoped task fits comfortably within the context window. A poorly scoped task forces the agent to hold too much state, leading to the "going in circles" failure mode where the agent loses coherence and attempts endless variations without converging.

### Parallelism requires decomposition

You cannot run multiple agents on a monolithic task. You can run multiple agents on independent, well-scoped tasks. **esperent** demonstrated this by splitting test-writing into 26 subagents that completed months of drudge work in 20 minutes. The key was clear, non-overlapping boundaries between tasks.

## How to Scope Tasks Effectively

### The Tree Model

The clearest framework for human-agent task division is a tree. The human owns the trunk and main branches: overall architecture, system design, module boundaries, key interfaces, and data models. The agent owns the leaves: individual function implementations, boilerplate, test cases, repetitive transformations, and documentation.

The interface between human and agent work happens at the branch level. You define the branch (module structure, interface contract), and the agent fills in the leaves. The agent never needs to understand the full tree.

This maps directly to how delegation works between senior and junior engineers, with one critical difference: the agent does not learn across sessions unless you build a [harness](../harness-engineering.html).

### The Four Properties of a Well-Scoped Task

Every task you delegate should have these properties:

1. **Clear success criteria.** You can describe what "done" looks like before the agent starts. If you cannot articulate success criteria, the task is not ready for delegation.

2. **No architectural decisions required.** The agent implements within a structure you have already defined. If the task requires choosing where code should live, what patterns to use, or how components should communicate, that is a trunk/branch decision that belongs to you.

3. **Bounded blast radius.** If the output is wrong, discarding it costs little. You have not invested significant review time, and no downstream work depends on the result yet.

4. **Verifiable output.** You can check correctness through tests, visual inspection, or short review -- ideally in under two minutes.

### Separate Planning from Execution

Use the agent in conversation mode to explore the problem space, discuss approaches, and iterate on a plan. Then switch to execution mode for implementation. As **chickensong** noted, front-loading design and planning is when opportunities for parallelism appear -- tests, simple features, and documentation can all be delegated independently once the plan is solid.

Several practitioners use a formal plan mode toggle: plan first, get approval, then build. This prevents the failure mode where the agent starts implementing before the approach is settled and builds momentum toward a wrong solution.

### Write the Spec, Delegate the Implementation

Write a precise description of what you want: function signature, expected behavior, edge cases, error handling. Give this spec to the agent as a self-contained task. This forces you to think through the design (a human activity) while offloading the mechanical typing.

As **conception** observed, the pattern is like onboarding a junior developer: "put in an hour of work, get five hours out." Most people skip the setup hour and then wonder why the output is poor.

### Use T-Shirt Sizing

**AffableSpatula** includes task-sizing heuristics directly in CLAUDE.md so the agent can self-assess appropriate granularity:

- **Small (S)**: Single function or file change. Minutes to complete. Examples: add a validation rule, write a utility function, fix a typo.
- **Medium (M)**: Multiple related changes across a few files. Under an hour. Examples: implement an API endpoint with tests, refactor a module's error handling.
- **Large (L)**: Multi-file changes requiring coordination. A few hours. Examples: add a new feature with UI, API, and tests. Should probably be broken into M-sized subtasks.
- **Extra Large (XL)**: Architectural changes spanning the system. Should always be decomposed before delegation.

### When Agents Change the Scope Itself

A provocative counterpoint to careful scoping comes from practitioners who argue that agents have shifted what constitutes a reasonable task. The "coding agents replaced frameworks" thesis holds that agents enable purpose-built solutions for each problem rather than conforming to framework conventions, effectively expanding what counts as a single delegatable task.

**peteforde** described six months using agents for embedded circuit design and CAD work, abandoning external libraries entirely in favor of agent-generated purpose-built wrappers. In this model, what was previously a multi-step task (choose library, learn API, integrate) collapses into a single prompt.

The HN discussion pushed back hard. **rglover** warned that developers leaning heavily on agent-generated code face a reckoning when limitations surface. **avidiax** called framework-free agent output "bespoke square wheels without a maintenance plan." **HarHarVeryFunny** noted that LLMs actually perform better generating code within familiar frameworks because of training data distribution.

The practical resolution: agents can expand task scope for throwaway or prototype work where long-term maintenance is not a concern. For production codebases, the four properties of a well-scoped task still apply -- but the boundary of what an agent can handle in a single task is growing as models improve. The discipline is recognizing which category your current task falls into.

### Batch Related Leaf Tasks

If you have five similar transformations across different files -- updating an API call pattern, adding error handling to a set of functions -- batch them into one agent task with clear examples. Agents handle repetitive work well when given a pattern to follow. The key is that the tasks must truly be independent and follow the same pattern.

### The Contractor Heuristic

Ask yourself: if you explained this task to a competent developer who has never seen this codebase, could they complete it with only the information you are providing? If not, either narrow the scope or provide more context. The agent knows even less than that hypothetical contractor.

**predkambrij** noted this is an art, not a science: learning to balance the time spent writing prompts against the time saved by AI execution. Too little context and the agent flounders. Too much context and you might as well write the code yourself.

## Anti-Patterns

### "Draw the Owl"

Giving the agent an entire feature as a single task. The agent will produce something plausible that misses requirements and makes architectural decisions you would never have made.

**Fix:** Break the feature into leaf-level tasks. Define the architecture yourself. Have the agent implement individual components one at a time with verification between each step.

### Micro-Management

Dictating individual lines of code: "Write a for loop that iterates over this array and filters items where status equals active." You could type this faster than you can prompt it.

**Fix:** Batch related micro-tasks into a meaningful unit. Instead of one for loop, delegate the entire data transformation function, including edge cases and error handling.

### Vague Goals

"Make this code better" or "Optimize the performance." The agent has no way to know what "better" means in your context. It will make changes that look like improvements in isolation but may violate constraints it does not know about.

**Fix:** Be specific. "Extract the validation logic from this 200-line function into separate functions, one per validation rule, maintaining the same execution order."

### Architecture by Accumulation

Letting the agent make a series of small structural decisions that add up to an architecture nobody designed. Each individual decision seems reasonable. The aggregate result is incoherent. **SenHeng** called this "scope creep into the average" -- the agent gravitates toward the most common patterns from its training data regardless of your actual needs.

**Fix:** Make all structural decisions yourself before involving the agent. If a task requires deciding where code should live or how components communicate, that is a trunk task, not a leaf task.

### Fighting the Agent's Preferences

**nonethewiser** described spending time fighting Claude's preference for ReactRouter over TanStack Router, eventually concluding it was "pointless to specify otherwise" when the agent's default choice worked correctly. Sometimes the pragmatic move is to accept the agent's standard approach rather than burning context fighting it -- but only when the choice genuinely does not matter.

### Ignoring the Going-in-Circles Signal

When the agent starts repeating variations of the same failed approach, the task is either too broad or the context is polluted. **jackfranklyn** identifies this as the key warning sign that a task has outgrown what the model can hold in context effectively.

**Fix:** Stop the session. Start fresh with a narrower task or provide additional constraints that eliminate the failed approaches.

## Scoping at Scale: Parallel Agents

Nicholas Carlini's project building a C compiler with 16 parallel Claude instances provides empirical evidence for how scoping interacts with parallelism. The core lesson: parallelism requires task structure.

When hundreds of independent failing tests existed, each agent could pick a different one -- the tasks were naturally decomposed. But when a single monolithic failure appeared (compiling the Linux kernel), all 16 agents independently discovered the same bug and overwrote each other's fixes.

The solution was oracle-based testing: using a known-good compiler (GCC) to binary-search for the specific compilation unit causing the failure, converting one opaque problem into many scoped, independent tasks.

**esperent** applied similar principles to test writing, splitting work across 26 subagents with clear non-overlapping boundaries. The execution took 20 minutes; verification took days. This ratio -- fast generation, slow verification -- is the characteristic signature of well-scoped parallel work.

The technique of manufacturing task boundaries where none naturally exist is generalizable: any domain with a reference implementation or decomposable success criteria can support parallel agent work.

## Evidence

**jackfranklyn** (HN, thread 46323802): Treats AI like onboarding a contractor with bounded tasks and clear acceptance criteria. The signal to switch back to manual coding: when explaining context exceeds the time to just write it yourself.

**AffableSpatula** (HN, thread 46744735): Task sizing is crucial. Includes heuristics and T-shirt sizing methodology in CLAUDE.md so the agent can self-assess granularity.

**serial_dev** (HN, thread 46746274): In professional settings with coding standards and real users, handling one agent at a time is plenty if tasks are properly scoped.

**conception** (HN, thread 46549865): Compares the setup investment to onboarding a junior developer. Teach patterns, show documentation, document mistakes. Most people skip this step.

**joshuaisaact** (HN, thread 46752037): Frames agents as stateless functions with a limited heap that degrades in quality as it fills. Clean task boundaries keep the heap manageable.

**predkambrij** (HN, thread 46319727): Finding the right effort level for prompt-writing is an art. The balance between providing enough context and over-specifying shifts with experience.

**SenHeng** (HN, thread 46797366): Models gravitate toward common patterns regardless of what you asked for. Built a simple expenses app; AI kept inserting double-entry bookkeeping.

**peteforde** (HN, thread 46923543): Six months using agents for embedded circuit design, abandoning external libraries for agent-generated purpose-built wrappers. Agents expand what constitutes a single delegatable task.

**rglover** (HN, thread 46923543): Developers leaning on AI-generated code face a reckoning when limitations surface. Real building experience reveals problems agents miss.

**HarHarVeryFunny** (HN, thread 46923543): LLMs perform better generating code within familiar frameworks because of training data distribution -- a pragmatic reason to keep frameworks even with agents.
