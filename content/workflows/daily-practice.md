---
title: "Daily Practice"
description: "A practical daily checklist for AI-assisted development."
weight: 1
tags: [workflow, checklist, daily-practice, productivity]
date: 2026-02-06
---

Using AI coding tools effectively is not about writing better prompts on any given day. It is about building habits that compound over weeks and months. This page distills the daily routines that experienced practitioners follow, drawn from [Karpathy's coding notes](/sources/2026-01-26-karpathy-claude-coding-notes/), [Addy Osmani's LLM workflow](/sources/2026-01-04-llm-coding-workflow-2026/), and patterns observed across the broader practitioner community.

## Morning Setup

**Review your harness files.** Open your AGENTS.md or CLAUDE.md and scan for anything outdated. If you corrected the agent yesterday but did not document it, add the entry now. Remove rules that no longer apply. A stale harness teaches the agent outdated habits. See the [AGENTS.md Guide](/workflows/agents-md-guide/) for maintenance discipline.

**Identify 2-3 tasks for delegation.** Good delegation targets have clear scope and verifiable output. If you cannot describe what "done" looks like in two sentences, the task is not ready. Osmani's workflow emphasizes planning before coding -- spending even fifteen minutes on specification prevents wasted cycles downstream.

**Check overnight results.** If you launched research or exploration agents at end of day, review the output now while context is fresh. Overnight tasks should be informational -- investigation, documentation review, issue triage -- not code destined for production without human review.

## During Work

### Plan First, Delegate Implementation

The design is your job. The typing is the agent's job. Karpathy observed that AI-assisted coding creates a natural split between architects and implementers -- even when the same person fills both roles. Write the spec or plan yourself. Let the agent handle implementation within the constraints you define. If you find the agent making structural decisions, stop and reclaim the planning step.

Osmani describes this as iterative chunking: break work into small pieces, process one feature at a time, and maintain context between steps. Monolithic requests produce impressive-looking output that is subtly wrong in ways you discover too late.

### The Two-Minute Verification Rule

After each delegated task, ask: can I verify this output in under two minutes? If not, the task was scoped too broadly. Break it down further before proceeding. This threshold exists because beyond two minutes, most developers start skimming rather than reading -- and skimmed review is how drift accumulates undetected.

Review diffs incrementally. Do not let multiple agent changes accumulate without verification. Each change should be reviewed and confirmed before you move to the next task. See [Verification](/skills/verification/) for techniques that make review efficient.

### Document Mistakes Immediately

When the agent makes a mistake, add an entry to your AGENTS.md before moving on. This takes thirty seconds and prevents hours of future re-correction. The best entries follow the pattern: "When doing X, always Y, because Z." The "because" clause helps the agent generalize rather than memorize.

If you find yourself explaining the same constraint for the third time across sessions, it belongs in the harness file. You are burning time on repetition instead of building persistent infrastructure.

### Control Your Attention

Karpathy noted that agent tenacity -- the ability to work through problems without tiring -- is a genuine advantage. But it becomes a disadvantage if the agent's output stream controls your attention. Disable notifications. Check results on your schedule, not the agent's. The agent works for you, not the other way around.

If you are context-switching every time the agent produces output, you are losing more productivity to interruption than you are gaining from delegation.

## When to Use AI vs. Code Manually

Not every task benefits from delegation. The decision depends on task characteristics, not on whether AI could technically do it.

**Delegate when:**
- The task is well-defined with clear acceptance criteria
- The output is mechanically verifiable (tests pass, linter is clean, output matches spec)
- The task involves boilerplate, repetition, or straightforward implementation of a known pattern
- You need to explore multiple approaches quickly

**Code manually when:**
- The task requires architectural judgment or design decisions
- You are learning a new domain and need to build understanding
- The task involves subtle constraints the agent is unlikely to infer
- The verification cost would exceed the implementation cost
- The code touches security-critical paths where subtle errors have outsized consequences

Karpathy raised an important nuance: skill atrophy is real. Code writing fluency degrades with heavy AI use, even as review abilities persist. Some practitioners deliberately code certain tasks manually to maintain their skills, treating it as investment in their own capabilities rather than lost productivity.

## End of Day

**Launch overnight tasks.** Good candidates are informational: investigating a bug, summarizing documentation, exploring library options, triaging open issues. These should produce research output you review tomorrow, not code that gets merged unreviewed.

**Queue tomorrow's delegation targets.** Identify tasks that are clearly well-scoped and likely to succeed. Having these ready means tomorrow starts productively instead of with a scoping exercise.

**Update your harness file.** End-of-day is the second-best time to document patterns and mistakes (immediately is best, but a daily sweep catches what you missed during the day).

## Weekly Review

**Refine your AGENTS.md.** Remove outdated entries. Consolidate entries that address the same issue. The harness should be concise and scannable, not a sprawling document. If it exceeds roughly 200 lines, consider splitting it into directory-level files.

**Assess your delegation frontier.** What types of tasks consistently succeed? Which consistently fail? Build a model of the agent's reliability boundary. Expand delegation into areas of consistent success. Pull back from areas of consistent failure.

**Build tools for repeated failures.** If you have seen the same agent failure three or more times, documentation alone may not fix it. A purpose-built tool (filtered test runner, output formatter, context assembler) may be warranted. See [Harness Engineering](/patterns/harness-engineering/) for design principles.

**Check costs.** Are you getting value proportional to spend? If you are on a usage-based plan, review the past week's spending. Osmani's workflow emphasizes multi-model pragmatism -- sometimes switching to a cheaper model for routine tasks delivers better cost-efficiency than using the most capable model for everything.

## Signs of Healthy Practice

- You spend more time reading and verifying than writing prompts. The bottleneck has shifted from generation to verification.
- Your AGENTS.md grows steadily -- not explosively (too many mistakes) and not stagnating (not documenting).
- Agent mistakes are new mistakes, not repeated ones. The harness is working.
- You have a backlog of tasks ready for delegation. You are not scrambling to find work for the agent.
- You control your attention. The agent does not interrupt you.

## Signs of Unhealthy Practice

- You hand the agent giant tasks with vague goals. The output looks impressive but is subtly wrong.
- You re-explain the same constraints every session. The harness file is not being maintained.
- You approve diffs without reading them. Accumulated drift compounds into serious problems.
- The agent drives your attention. Your workflow is reactive instead of deliberate.
- You do not know your monthly AI spend.

## Sources

- [Karpathy's Claude Coding Notes](/sources/2026-01-26-karpathy-claude-coding-notes/) -- Observations on skill atrophy, agent tenacity, and the builder/coder split
- [My LLM Coding Workflow Going into 2026](/sources/2026-01-04-llm-coding-workflow-2026/) -- Osmani's structured approach to planning, chunking, and multi-model usage
- [Daily Workflow Checklist](/references/daily-workflow-checklist/) -- The condensed checklist version of this guide
