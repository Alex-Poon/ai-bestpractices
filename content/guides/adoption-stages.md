---
title: "The Six Stages of AI Adoption"
description: "A practitioner-validated framework for progressing from chatbot to always-running agents."
date: 2026-02-05
tags: [adoption-strategy, agent-workflows, harness-engineering, task-scoping]
sources:
  - https://mitchellh.com/writing/my-ai-adoption-journey
  - https://news.ycombinator.com/item?id=46903558
weight: 2
---

Developers who successfully adopt AI coding agents tend to follow the same progression. Not because someone prescribed it, but because each stage builds the calibration and infrastructure required by the next. Skipping stages leads to frustration, wasted effort, and the conclusion that agents do not work --- when the real problem was missing foundations.

This framework synthesizes practitioner experience into six stages. Most developers who abandon AI-assisted development get stuck between Stages 1 and 2. Most developers who succeed credit the investments made in Stages 2 and 5.

## Stage 1: Drop the Chatbot

The first shift is recognizing that a chatbot is not the right tool for coding work. Copy-pasting code into ChatGPT or Gemini and hoping the response works is not AI-assisted development. It is guessing with extra steps.

The minimum viable tool is an **agent** --- software that can read your files, execute commands, observe output, and iterate in an autonomous loop. The difference is fundamental: a chatbot gives you one shot and requires you to manually evaluate and re-prompt. An agent runs tests, sees failures, adjusts, and tries again without you shuttling context back and forth.

If you are currently using a chatbot for coding tasks, switching to an agent (Claude Code, Cursor, Copilot Workspace, Amp) is the single highest-impact change you can make.

**What to do differently tomorrow:** Install an agent tool and use it for a task you would normally do manually. Do not evaluate the result yet --- just observe how the agent works compared to a chatbot.

## Stage 2: Reproduce Your Own Work

This stage is where calibration happens. The practice is deliberate and initially painful: complete a task yourself, then attempt the same task through the agent. Do this for a variety of tasks across your codebase.

The goal is not to prove the agent can do your job. The goal is to build a mental model of what the agent handles well and what it does not. Three critical practices emerge from this phase:

**Break work into clear, bounded tasks.** Vague or sweeping instructions fail reliably. Instead of "implement the authentication system," try "write the token validation function given this interface." This is the [Task Scoping](/patterns/task-scoping.html) skill, and it is the single most important capability in agent-assisted development.

**Separate planning from execution.** Have the agent propose a plan first. Review it. Then proceed to implementation. When planning and execution mix, the agent builds momentum toward the wrong solution before you can course-correct.

**Give the agent verification tools.** Agents perform dramatically better when they can run tests, check compiler output, or otherwise confirm their own work. An agent operating without feedback is guessing --- just like a chatbot.

The most valuable outcome of this stage is knowing **when not to use agents.** Not every task benefits from delegation. The reproduction phase gives you the judgment to tell the difference, which prevents the most common source of wasted time.

> **Where people get stuck:** Stage 2 requires doing work twice, which feels like it slows you down. It does, temporarily. Practitioners who push through report that the calibration pays for itself within a week. Those who skip this stage spend months oscillating between over-delegation and under-delegation, never building reliable intuition.

## Stage 3: End-of-Day Agents

Timing is a lever most people overlook. The practice is simple: during the last 30 minutes of your workday, launch agents on tasks that benefit from extended runtime.

Good candidates include:

- **Research tasks** --- exploring a codebase, reading documentation, investigating a technical question
- **Parallel exploration** --- having the agent try alternative approaches to a problem you have been thinking about
- **Issue triage** --- processing, categorizing, and drafting responses to accumulated issues

Results are waiting when you start work the next morning, providing immediate momentum. This is the lowest-risk way to start getting real productivity gains from agents because the cost of a bad result is near zero --- you just discard it.

**What to do differently tomorrow:** Before you close your laptop, identify one research or exploration task and hand it to an agent. Review the output first thing the next morning.

## Stage 4: Outsource the Slam Dunks

By this point, you have calibrated. You know which tasks agents handle reliably. Now you start delegating those high-confidence tasks while doing your own deep work in parallel.

The critical insight at this stage is about attention management: **disable agent notifications.** Notifications create an interruption-driven workflow where the agent dictates your context-switching. Instead, check agent results on your own schedule, at natural stopping points in your own work. You control when you shift focus, not the agent.

This preserves the deep work benefits of delegation. Without this discipline, running an agent becomes another tab you compulsively check, and the net productivity gain evaporates.

**What to do differently tomorrow:** The next time you delegate a task, mute notifications and set a timer for when you will check the result.

> **Where people get stuck:** Practitioners at Stage 4 sometimes regress by delegating tasks outside their calibrated confidence zone. The agent fails, they lose trust, and they stop delegating entirely. The fix is disciplined: only delegate tasks you are confident about, and expand the envelope gradually as your harness improves.

## Stage 5: Engineer the Harness

This is the stage that separates occasional users from practitioners who get compounding returns. **Harness engineering** is the practice of building persistent infrastructure that makes agents more effective across every future session.

The harness has two parts:

### Documentation Files

Project-specific files (AGENTS.md, CLAUDE.md) that agents read at the start of every session. They contain:

- **Corrections for known mistakes.** When the agent makes a specific error, document the mistake and the correct approach. This entry prevents the same error in every future session.
- **Project conventions.** Coding style, architectural rules, naming patterns --- anything the agent would not infer from the code alone.
- **Hard constraints.** Things the agent must never do. Boundaries it must respect. Non-obvious requirements.

### Purpose-Built Tools

Scripts and utilities designed for agent consumption, not human use:

- Filtered test runners that show only relevant failures
- Output formatters that structure results for reliable agent parsing
- Context assemblers that gather related files into a single input

The [Harness Engineering pattern](/patterns/harness-engineering.html) covers both mechanisms in detail.

The compounding effect is the core point. Each mistake documented, each tool built, each convention captured makes every future session more effective. After 50 sessions, a well-maintained harness dramatically reduces the error rate on common tasks. This is the highest-leverage investment in agent-assisted development.

**What to do differently tomorrow:** Create an AGENTS.md (or CLAUDE.md) file in your project root. Add three entries: one coding convention, one common mistake you have corrected before, and one "never do this" rule. Start small and add entries as you observe real mistakes.

> **Where people get stuck:** Two failure modes dominate. First, over-documenting speculatively --- writing a massive harness file before you have real data on what the agent gets wrong. Start with observed mistakes only. Second, harness rot --- letting entries accumulate without pruning outdated rules. Review weekly and remove anything that no longer applies.

## Stage 6: Always Have an Agent Running

The final stage is maintaining continuous background agent work throughout the day. The developer habitually identifies delegable tasks and maintains a mental queue of work that can be handed off at any moment.

This requires the culmination of everything prior: the calibration from Stage 2 to identify suitable tasks, the timing intuition from Stage 3, the attention discipline from Stage 4, and the harness from Stage 5 to ensure consistent quality. Without those foundations, continuous delegation produces continuous waste.

The question that becomes habitual: **"What can I delegate right now?"**

Not every practitioner reaches this stage, and not every codebase supports it. But for those who do, the workflow fundamentally changes. Deep human work and parallel agent work become concurrent streams, with the developer operating as a technical lead who defines, delegates, and reviews rather than implementing everything directly.

**What to do differently tomorrow:** At the start of your next work session, before you begin coding, spend two minutes listing tasks that could be delegated. Pick one and hand it off before you start your own work.

## Progression Is Not Linear

Most practitioners report moving back and forth between stages depending on the project, the task, and how well their harness fits the current work. A new codebase resets you to Stage 2 until you build calibration and a harness for that specific context. A well-harnessed project might support Stage 6 workflows immediately.

The stages are a framework for knowing what to practice, not a ladder you climb once and stay on top of. The underlying skill --- knowing what to delegate, how to scope it, and how to build infrastructure that compounds --- is what persists across projects and tools.
