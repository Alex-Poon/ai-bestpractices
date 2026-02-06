---
title: "The Adoption Curve: Where Are You?"
description: "From skeptic to power user — understanding the stages of AI coding adoption."
weight: 2
tags: [adoption-strategy, getting-started]
date: 2026-02-06
---

Developers who successfully adopt AI coding agents tend to follow the same progression. Not because someone prescribed it, but because each stage builds the calibration and infrastructure the next stage requires. Skipping stages leads to frustration, wasted money, and the conclusion that agents do not work --- when the real problem was missing foundations.

This framework synthesizes Mitchell Hashimoto's adoption journey with findings from practitioner experience, Anthropic's research on skill formation, and community cost data. Most developers who abandon AI-assisted development stall between Stages 1 and 2. Most who succeed credit the investments they made in Stages 2 and 5.

## Stage 1: Drop the Chatbot

The first shift is recognizing that a chatbot is not the right tool for coding work. Copy-pasting code into ChatGPT and hoping the response compiles is not AI-assisted development. It is guessing with extra steps.

The minimum viable tool is an **agent** --- software that can read your files, execute commands, observe output, and iterate in an autonomous loop. The distinction is fundamental. A chatbot gives you one shot and requires you to manually shuttle context back and forth. An agent runs tests, sees failures, adjusts, and tries again. Claude Code, Cursor, Copilot Workspace, and Amp all qualify. A plain chat conversation does not.

Karpathy highlighted agent tenacity as a defining quality: agents never tire or get demoralized, continuing to work through problems where a human developer would have given up. That persistence is only possible because agents operate in a loop with real feedback, not in a single-turn conversation.

**What to do tomorrow:** Install an agent tool and use it for a task you would normally do manually. Do not evaluate the result yet --- just observe how the agent works compared to a chatbot.

## Stage 2: Reproduce Your Own Work

This is where calibration happens. The practice is deliberate and initially uncomfortable: complete a task yourself, then attempt the same task through the agent. Do this across a variety of tasks in your codebase.

The goal is not to prove the agent can replace you. The goal is to build a mental model of what the agent handles well and where it falls apart. Three critical practices emerge from this phase:

**Break work into clear, bounded tasks.** Vague instructions fail reliably. Instead of "implement the authentication system," try "write the token validation function given this interface." This is the [task scoping](/patterns/task-scoping/) skill, and it is the single most important capability in agent-assisted development.

**Separate planning from execution.** Have the agent propose a plan first. Review it. Then proceed to implementation. When planning and execution mix, the agent builds momentum toward the wrong solution before you can course-correct.

**Give the agent verification tools.** Agents perform dramatically better when they can run tests or check compiler output. An agent operating without feedback is guessing.

The most valuable outcome of this stage is knowing **when not to use agents.** Not every task benefits from delegation. The reproduction phase gives you the judgment to tell the difference.

Anthropic's controlled study on AI assistance and learning found that engagement style matters enormously. Developers who asked the AI explanatory questions and probed its reasoning retained significantly better understanding than those who simply delegated wholesale. The study measured a meaningful comprehension gap, with debugging skills most affected. The lesson for Stage 2: do not passively accept output. Engage with it critically. Ask why. This builds both your calibration and your skills simultaneously.

> **Where people get stuck:** Stage 2 requires doing work twice, which feels slow. It is, temporarily. Practitioners who push through report that the calibration pays for itself within a week. Those who skip it spend months oscillating between over-delegation and under-delegation, never building reliable intuition.

## Stage 3: End-of-Day Agents

Timing is a lever most people overlook. During the last 30 minutes of your workday, launch agents on tasks that benefit from extended runtime: research tasks, parallel exploration of alternative approaches, or issue triage.

Results are waiting when you start work the next morning. This is the lowest-risk way to get real productivity gains because the cost of a bad result is near zero --- you just discard it and start fresh.

**What to do tomorrow:** Before you close your laptop, identify one research or exploration task and hand it to an agent. Review the output first thing the next morning.

## Stage 4: Outsource the Slam Dunks

By this point, you have calibrated. You know which tasks agents handle reliably. Now you start delegating those high-confidence tasks while doing your own deep work in parallel.

The critical insight is about attention management: **turn off agent notifications.** Notifications create an interruption-driven workflow where the agent dictates your context-switching. Instead, check agent results on your own schedule at natural stopping points. You control when you shift focus, not the tool.

Be aware of costs at this stage. One practitioner tracked spending over $600 in six weeks of heavy Cursor usage, with 85% of the budget going to a single model because it consistently produced the best output. Costs compound quickly at 200+ daily requests. Caching strategies and flat-rate plans (like Claude Code Max) can help, but the key discipline is matching model quality to task difficulty rather than defaulting to the most expensive option for every request.

> **Where people get stuck:** Practitioners at Stage 4 sometimes regress by delegating outside their calibrated confidence zone. The agent fails, they lose trust, and they stop delegating entirely. The fix is disciplined: only delegate tasks you are confident about, and expand the boundary gradually.

## Stage 5: Engineer the Harness

This is the stage that separates occasional users from practitioners who get compounding returns. **[Harness engineering](/patterns/harness-engineering/)** is the practice of building persistent infrastructure that makes agents more effective across every future session.

The harness has two parts:

### Documentation Files

Project-specific files (AGENTS.md, CLAUDE.md) that agents read at the start of every session. They contain:

- **Corrections for known mistakes.** When the agent makes a specific error, document the mistake and the correct approach. This prevents the same error in every future session.
- **Project conventions.** Coding style, architectural rules, naming patterns --- anything the agent would not infer from the code alone.
- **Hard constraints.** Things the agent must never do. Boundaries it must respect.

Vercel's evaluation data makes the case quantitatively: passive context embedded in AGENTS.md outperformed active retrieval tools by a wide margin. Agents failed to invoke lookup tools in over half of test cases. Documentation that is always present eliminates the failure mode of the agent not knowing it needs help.

### Purpose-Built Tools

Scripts and utilities designed for agent consumption, not human use:

- Filtered test runners that surface only relevant failures
- Output formatters that structure results for reliable agent parsing
- Context assemblers that gather related files into a single input

The compounding effect is the core point. Each mistake documented, each tool built, each convention captured makes every future session more effective. This is the highest-leverage investment in AI-assisted development, and the [AGENTS.md Guide](/references/agents-md-guide/) provides practical starting templates.

**What to do tomorrow:** Create an AGENTS.md file in your project root. Add three entries: one coding convention, one mistake you have corrected before, and one "never do this" rule. Start small and grow it from observed errors.

> **Where people get stuck:** Two failure modes dominate. First, over-documenting speculatively --- writing a massive harness before you have real data on what the agent gets wrong. Start with observed mistakes only. Second, harness rot --- letting entries accumulate without pruning. Review weekly and remove anything outdated.

## Stage 6: Always Have an Agent Running

The final stage is continuous background agent work throughout the day. You habitually identify delegable tasks and maintain a running queue of work to hand off at any moment.

This requires everything prior: the calibration from Stage 2, the timing intuition from Stage 3, the attention discipline from Stage 4, and the harness from Stage 5. Without those foundations, continuous delegation produces continuous waste.

The question that becomes habitual: **"What can I delegate right now?"**

Not every practitioner reaches this stage, and not every codebase supports it. But for those who do, the workflow fundamentally changes. You operate as a technical lead who defines, delegates, and reviews rather than implementing everything directly. Deep human work and parallel agent work become concurrent streams.

**What to do tomorrow:** At the start of your next work session, before you begin coding, spend two minutes listing tasks that could be delegated. Pick one and hand it off before you start your own work.

## A Caution on Skill Development

Wherever you are in this progression, keep one finding in mind: Anthropic's research showed that developers who delegate to AI without engaging critically develop weaker debugging and comprehension skills over time. Karpathy noted the same tension from personal experience, observing that code writing fluency degrades with heavy AI use even as review abilities persist.

The antidote is deliberate engagement. Ask the agent to explain its approach. Review diffs line by line rather than skimming. Periodically implement tasks manually to keep your skills sharp. The goal is to become a better technical lead, not a passive consumer of generated code.

For junior developers especially, Stages 1 through 3 should include significant manual practice alongside agent work. The AI is a powerful accelerant, but it cannot substitute for the foundational understanding that comes from struggling through problems yourself.

## Progression Is Not Linear

Most practitioners move back and forth between stages depending on the project, the task, and how well their harness fits the current context. A new codebase resets you to Stage 2 until you build calibration. A well-harnessed project might support Stage 6 immediately.

The stages are a framework for knowing what to practice, not a ladder you climb once. The underlying skill --- knowing what to delegate, how to scope it, and how to build infrastructure that compounds --- is what persists across projects and tools.
