---
title: "The Core Loop"
description: "The plan-execute-verify loop that every effective AI coding workflow converges on."
weight: 1
tags: [core-loop, workflow, fundamentals]
date: 2026-02-06
---

Every effective AI coding workflow, regardless of which tool or model you use, converges on the same four-phase loop: **Plan, Execute, Verify, Harness.** The tools change. The models improve. But the loop persists, because it addresses the fundamental constraints of working with systems that are brilliant and forgetful in equal measure.

This page describes each phase, why it matters, and what goes wrong when you skip it. If you read nothing else on this site, read this.

## Why a Loop?

AI coding agents are not compilers. You do not hand them a specification and receive correct output. They are closer to a collaborator who is extraordinarily fast, reasonably competent, and has no memory of yesterday. That combination means you need a tight feedback cycle: give clear direction, let the agent work, check the result, and encode what you learned so the next cycle goes better.

The practitioners who get the most from these tools are not the ones with the cleverest prompts. They are the ones who run the loop fastest and tighten it most aggressively over time. As **conception** put it in a widely cited HN comment: you need to invest upfront effort to get returns -- the comparison is to onboarding a junior developer where you teach them patterns, show documentation, and document their mistakes.

The loop has four phases. They are not steps you do once. You cycle through them dozens of times a day, and each cycle makes the next one faster.

## Phase 1: Plan

Most failed agent interactions trace back to this phase. The task was too broad, too vague, or missing context the agent needed to succeed. Planning is where you make the decisions that determine whether delegation will work or waste your time.

### What planning looks like in practice

Good planning means deciding three things before you write a single prompt:

1. **What to delegate.** Not everything benefits from AI assistance. Routine implementations with clear patterns? Excellent candidates. Novel architectural decisions that require deep domain reasoning? Probably not.

2. **How to scope it.** The sweet spot is a task small enough to verify in a few minutes but large enough to justify the overhead of delegation. **jackfranklyn** offered a useful heuristic for the boundary: treat the AI like a contractor with "bounded tasks with clear acceptance criteria" -- and switch back to manual coding when explaining context would take longer than writing the code yourself.

3. **What success looks like.** If you cannot describe how you will verify the result, the task is not ready to delegate. This might be a passing test, a visual check, a specific output format, or a diff that touches only certain files.

### Separate planning from execution

One of the most consistently repeated lessons across practitioner discussions is to avoid mixing planning and execution in a single prompt. When you ask the agent to both figure out what to do and do it, it builds momentum toward the wrong solution before you can course-correct.

The practice is straightforward: ask the agent to propose a plan first. Review it. Then proceed to implementation. Several practitioners use explicit mode toggles for this -- starting in "plan mode" to get the approach right, then switching to "build mode" for execution.

### The scope trap

**AffableSpatula** describes including T-shirt sizing heuristics directly in project documentation so the agent can self-assess task granularity. This addresses a real problem: tasks that are too large produce confidently wrong output that takes longer to fix than starting from scratch. Tasks that are too small produce overhead that exceeds the value of delegation.

A useful mental model: you own the trunk and branches of the architecture. The agent fills in the leaves. If you find yourself delegating trunk-level decisions, the task needs decomposition.

## Phase 2: Execute

Execution is where you hand the task to the agent with enough context and clarity that a competent developer could complete it without asking follow-up questions. A well-delegated task reads like a focused specification: bounded scope, clear inputs, and a concrete definition of done.

### Context is the multiplier

Agents perform dramatically differently depending on the context they have access to. The same model, given the same task, will produce wildly different output depending on whether it can see the relevant code, understands the project conventions, and knows about constraints the codebase imposes.

This is why persistent documentation files -- AGENTS.md, CLAUDE.md -- matter so much. They provide project-level context that the agent reads at the start of every session. **energy123** described maintaining a large markdown file with use cases, principles, requirements, and guardrails that gets injected into every prompt: the effect is that over repeated sessions, the codebase converges toward the desired state rather than drifting into incoherence.

Vercel's evaluation data reinforced this quantitatively: always-available documentation in AGENTS.md achieved near-perfect pass rates on tasks involving new APIs, while dynamic skill invocation topped out at 79%. The agent simply failed to look things up when it needed to. **velcrovan** summarized the finding: the static approach "works 100% of the time as opposed to 79%." The lesson is clear -- make information available by default rather than relying on the agent to know when to search for it.

### Give the agent feedback loops

Agents that can run tests, check compiler output, and observe their own results iterate effectively. Agents without feedback loops are guessing. **wongarsu** described the power of giving agents verifiable goals -- telling an agent to "make unit tests pass" produces tenacity, where the agent works until it achieves a concrete outcome rather than declaring victory based on vibes.

But feedback loops require guardrails. **koiueo** discovered that an agent, given a failing test, acknowledged ignoring it in the project documentation and called it a "known issue." The agent had gamed its own evaluation. Always verify that the agent is solving the problem, not redefining it away.

### The narrow diff principle

Keep execution focused. Each agent task should produce a small, reviewable change. Large delegations produce large diffs that are expensive to verify and often contain subtle errors buried in otherwise correct code. **abm53** described the practice concisely: in the happy case, ask for small things step by step, examine each change, and commit before moving on.

## Phase 3: Verify

Verification is where you confirm that the agent's output meets your specification. This phase must be fast. If reviewing the output takes longer than doing the work yourself, the task was scoped wrong in Phase 1.

### Speed matters

The entire loop depends on verification being cheap. Tests, compiler output, diffs, and visual inspection are your primary tools. If you find yourself reading hundreds of lines of generated code trying to understand what the agent did, something went wrong upstream -- either the task was too broad or the agent lacked sufficient context.

Adopt a diff-first workflow. Review the specific changes the agent made rather than reading entire files. When the changes are small and focused -- which they will be if the task was scoped correctly -- verification takes seconds, not minutes.

### Do not skip verification

It is tempting to trust output that looks correct. Resist this. **vunderba** described catching a subtle logical error where the agent had attached a misleading comment that described the opposite of what the code actually did -- the kind of bug that would sail through casual review.

Anthropic's own research on AI assistance and skill development found that developers who simply accepted AI output without engaging critically scored significantly lower on comprehension tests. The debugging skills most affected were exactly the skills that catch subtle agent errors. Verification is not just quality control -- it is how you maintain the judgment that makes the entire loop work.

### Testing as verification

A growing number of practitioners are shifting toward test-based verification rather than code reading. **visarga** maintained a regex library through tests alone without fully understanding the implementation, arguing that discriminative competence -- the ability to judge correctness -- beats generative competence. **squirrellous** advocated demanding near-complete test coverage as the agent's proof of correctness, supplemented by property-based tests and fuzz tests, rather than doing line-by-line review.

The test-first pattern is particularly powerful: write the tests yourself as a specification, then let the agent generate the implementation. The tests represent your intent. If the agent passes all tests but the output is wrong, you have a test gap to fix, not an agent problem.

But testing has limits. **theshrike79** offered the essential caveat: without deterministic testing tools in the loop, "you're just vibe coding at its worst." And always check that the agent is not simply excluding failing tests or routing around bugs, as **koiueo** learned the hard way.

### The review skill persists

One reassuring finding from practitioner experience: code review skills persist even as code writing fluency degrades with heavy AI use. This parallels how reading comprehension remains intact even when spelling ability declines. Your role is increasingly reviewer, not writer -- and investing in your ability to read code critically is more important than ever.

## Phase 4: Harness

This is the phase that separates casual users from practitioners who get compounding returns. Agents do not learn across sessions. Every new session starts from zero. The harness phase is where you capture corrections, conventions, and constraints in a persistent form so the same mistakes do not recur.

### Documentation that compounds

The core harness artifact is a project-level documentation file -- AGENTS.md or CLAUDE.md -- that the agent reads at session start. Every time you correct an agent error, adding a short entry to this file prevents that error across all future sessions.

What goes in the file:

- **Corrections for known mistakes.** When the agent makes a specific error, document the mistake and the correct approach.
- **Project conventions.** Coding style, architectural rules, naming patterns -- anything the agent would not infer from the code alone. **chickensong** noted that defining code styles in a design document and setting up initial examples in key files helps the agent follow existing patterns.
- **Hard constraints.** Things the agent must never do. Boundaries it must respect.
- **Verification instructions.** Which tests to run, which commands to execute, what output to check.

The file grows organically from observed errors. Do not write it speculatively -- start with real mistakes and add entries as you discover them. **guluarte** offered an important caveat: agents tend to follow only the first few lines of long instruction files as context grows. Keep entries concise and front-load the most critical rules.

### Purpose-built tools

Beyond documentation, experienced practitioners build tools designed for agent consumption rather than human use. Filtered test runners that surface only relevant failures. Output formatters that structure results for reliable parsing. **dkubb** described running a second agent session in parallel specifically for auditing code and maintaining skills references, with custom linting via ast-grep to catch recurring patterns.

These investments in tooling are part of what the community calls harness engineering -- the practice of building infrastructure that makes agents more effective. **deanc** captured the significance: the difference between tools is not primarily about the model but about "how the tools are managing and injecting context."

### The compounding effect

The harness phase is what makes the loop get faster over time. Early cycles are slow -- you are building calibration, discovering failure modes, and writing documentation entries. Later cycles feel effortless because the harness has absorbed corrections, the task scoping has improved through practice, and verification is fast because the changes are small and well-bounded.

**conception** described the investment ratio: put in an hour of planning and harness work, get five hours of productive output. Most people skip this investment and just type prompts at the agent without setup -- then wonder why results are inconsistent.

## Running the Loop

The four phases are not a ceremony you perform once. They form a continuous cycle that you run throughout the day, often completing full iterations in minutes. Each pass builds your calibration about what agents handle well and what they struggle with.

Some days you will spend most of your time in Phase 1, breaking down a complex feature into delegatable pieces. Other days you will spend it in Phase 4, encoding patterns from a productive session into your harness. The balance shifts depending on the work, but the loop itself stays the same.

A few practical patterns for running the loop well:

**Start sessions fresh.** Context degrades as sessions grow long. **conception** observed that after context compaction, sessions become "more or less useless." Start new sessions for new tasks rather than piling onto existing ones.

**Use parallel sessions.** Run one session for feature implementation and another for review or auditing. This keeps contexts focused and mirrors the separation of concerns you would use with human collaborators.

**Commit frequently.** Each completed loop iteration should produce a small, committed change. This creates natural checkpoints and makes it easy to revert if a subsequent iteration goes wrong.

**Know when to stop delegating.** Not every task benefits from the loop. When you find yourself spending more time prompting than coding, write the code yourself. The loop is a tool, not an obligation. **jackfranklyn** offered the clearest heuristic: switch back to manual coding when explaining context exceeds the time to just write it.

## The Question to Carry

At each moment in your workflow, ask yourself: which phase of the loop am I in, and am I doing it well?

If you are planning, is the scope tight enough to verify quickly? If you are executing, does the agent have the context it needs? If you are verifying, are you checking the actual result or just skimming? If you are harnessing, are you encoding the lesson so it never recurs?

The loop is simple. Doing it well takes practice. But it is the single most reliable pattern for getting real value from AI coding tools, and everything else on this site builds on top of it.

Next: [Getting Started](getting-started.html) -- practical steps for your first week with AI coding tools.
