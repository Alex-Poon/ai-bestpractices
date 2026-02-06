---
title: "The Core Loop: Plan, Delegate, Verify, Harness"
description: "The fundamental workflow for effective AI-assisted development."
weight: 1
tags: [core-concepts, getting-started, agent-workflows]
date: 2026-02-06
---

Effective AI-assisted development is not about typing prompts and hoping for the best. It follows a repeating four-phase loop: **Plan, Delegate, Verify, Harness.** Every technique on this site maps back to one of these phases. If you internalize this loop and practice each phase deliberately, you will get better results from AI agents than the vast majority of developers who use them casually.

The loop is simple to describe but takes real practice to execute well. Each phase has its own skills, its own failure modes, and its own payoff curve.

{{< callout type="info" >}}
**The single most important takeaway:** Your job shifts from writing code to specifying, reviewing, and encoding constraints. The developers who get the most from AI agents are those who were already strong at code review, task decomposition, and specification writing. If those skills feel underdeveloped, working with agents is an excellent forcing function to build them.
{{< /callout >}}

## Plan

Most failed agent interactions trace back to poor planning. The task was too broad, too vague, or missing context the agent needed. Planning is the phase where you make the decisions that determine whether delegation will succeed or waste your time.

Good planning means deciding what to delegate, how to scope it, and what success looks like before you write a single prompt. You own the architecture, the interfaces, and the constraints. The agent owns the implementation of well-bounded pieces within those decisions. Addy Osmani describes this as completing a "waterfall in 15 minutes" --- using AI to flesh out requirements, edge cases, and a task breakdown before any code gets written.

The most important planning skill is [task scoping](/patterns/task-scoping/). The sweet spot is a task small enough to verify in a few minutes but large enough to justify the delegation overhead. Too broad and the agent produces confidently wrong output you have to throw away. Too narrow and you spend more time prompting than you would writing the code yourself. One useful mental model: you own the trunk and branches of the architecture, and the agent fills in the leaves.

Separate planning from execution. Ask the agent to propose a plan first, review it, then proceed to implementation. When planning and execution mix, the agent builds momentum toward the wrong solution before you can course-correct. The Agentic AI Handbook calls this the Plan-Then-Execute pattern: plan, execute under control, then replan at gates with human review.

**Practice this tomorrow:** Before your next agent session, spend two minutes writing down the task boundary, the inputs, the expected output, and how you will verify the result. If you cannot articulate those in a few sentences, the task is not ready to delegate.

## Delegate

Delegation is where you hand the task to an agent with enough context and clarity that a competent developer could complete it without asking follow-up questions. A well-delegated task reads like a focused spec: bounded scope, clear inputs, and a concrete definition of done.

Context is what makes or breaks delegation. Agents perform dramatically better when they have access to the relevant code, documentation, constraints, and project conventions. Persistent documentation files --- AGENTS.md, CLAUDE.md --- serve as project-level context that the agent reads at the start of every session. Vercel's evaluation found that passive context embedded in AGENTS.md achieved a perfect pass rate on tasks involving new APIs, while active retrieval tools maxed out at 79%. The agent simply failed to look things up in over half the test cases. The lesson: make the information available by default rather than relying on the agent to know when to search for it.

Give the agent verification tools. Agents that can run tests, check compiler output, and observe their own results iterate effectively. Agents without feedback loops are guessing, just like chatbots. David Bau argues that automated testing is non-negotiable once you move beyond small delegated tasks --- without it, you become the manual tester in the loop, and your time becomes the bottleneck.

Do not confuse delegation with abdication. Delegating a well-scoped implementation task is productive. Asking the agent to "build the authentication system" without specifying interfaces, constraints, or boundaries is setting it up to fail.

**Practice this tomorrow:** The next time you delegate a task, include three things explicitly: the relevant code files, the specific constraint the agent must respect, and the test or check it should run to confirm success.

## Verify

Verification is where you confirm that the agent's output meets your specification. This phase must be fast. If reviewing the output takes longer than doing the work yourself would have, the task was scoped wrong. Tests, compiler output, diffs, and visual inspection are your primary verification tools.

Karpathy observed that code review skills persist even as code writing fluency degrades with heavy AI use --- much like how reading comprehension remains intact even when spelling ability declines. This matters because your role increasingly becomes the reviewer rather than the writer. Investing in your ability to read code critically is more important than ever.

Verification is not optional, even when the agent's output looks correct at first glance. Anthropic's controlled study on AI assistance and skill development found that developers who simply accepted AI output without engaging critically scored significantly lower on comprehension. The study also found that debugging skills were the most affected --- exactly the skills that catch subtle agent errors. Practitioners who ask follow-up questions and probe the reasoning behind generated code retain much better understanding.

Adopt a diff-first workflow. Review the specific changes the agent made rather than reading entire files. IDEs remain valuable precisely because visual diff review lets you catch problems that reading raw output would miss. When the changes are small and focused --- which they should be if the task was scoped correctly --- verification takes seconds, not minutes.

**Practice this tomorrow:** After your next agent output, review only the diff. If the diff is too large to scan in under two minutes, the task was too broad. Split it and re-delegate.

## Harness

Agents do not learn across sessions. Every new session starts from zero. The harness phase is where you capture corrections, conventions, and constraints in a persistent form so the same mistakes do not recur. This is the phase that compounds, and it is what separates occasional users from practitioners who get accelerating returns over time.

The harness has two components. First, documentation files that agents read at session start: AGENTS.md or CLAUDE.md files containing project conventions, known mistakes and their corrections, and hard constraints the agent must respect. Every time you correct an agent error, adding a short entry to this file prevents that error across all future sessions. Vercel's evaluation data reinforces why this works: passive context that is always available outperforms tools the agent has to decide to invoke.

Second, purpose-built tools designed for agent consumption rather than human use. Filtered test runners that show only relevant failures, output formatters that structure results for reliable parsing, context assemblers that pull related files together. These are part of what the community calls [harness engineering](/patterns/harness-engineering/) --- the practice of building infrastructure that makes agents more effective.

The compounding effect is the central point. A well-maintained harness after dozens of sessions dramatically reduces error rates on common tasks. Each entry represents a mistake that will never happen again. This is the highest-leverage investment in AI-assisted development, and it is the investment most developers skip. The [AGENTS.md Guide](/references/agents-md-guide/) provides practical templates for getting started.

**Practice this tomorrow:** Create an AGENTS.md or CLAUDE.md file in your project root with three entries: one coding convention, one mistake you have corrected before, and one "never do this" rule. Start small and add entries as you observe real errors.

## The Loop in Practice

The four phases are not a one-time sequence. They form a continuous loop that you run dozens of times per day as you work with agents. Each pass builds your calibration about what agents handle well and what they do not. The first few cycles are slow. That is normal and expected --- the [adoption stages](/start-here/adoption-stages/) framework maps out how this progression typically unfolds.

The payoff comes from the harness phase. Early loops feel like overhead. Later loops feel effortless because the harness has absorbed the corrections and the verification is fast because the task scoping has improved. Practitioners who push through the initial friction consistently report that the investment pays for itself within a week of deliberate practice.

The question to carry with you: at each moment in your workflow, which phase of the loop are you in, and are you doing it well?
