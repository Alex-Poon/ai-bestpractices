---
title: "Checklist: Daily Agent-Assisted Development Workflow"
tags: [checklist, workflow, practical]
---

# Checklist: Daily Agent-Assisted Development Workflow

A practical checklist for developers using AI coding agents as part of their daily workflow. Derived from practitioner patterns observed across Mitchell Hashimoto's adoption journey and the Hacker News discussion community.

---

## Before Starting

- [ ] **Review AGENTS.md / CLAUDE.md** -- Is anything outdated? Any patterns to add from yesterday's work? Remove entries that no longer apply. Add entries for mistakes you remember correcting but did not document in the moment.
- [ ] **Identify 2-3 tasks suitable for agent delegation** -- These should have clear scope, verifiable output, and no architectural decisions embedded in them. If you cannot describe what "done" looks like in two sentences, the task is not ready.
- [ ] **Check if any overnight agent results are ready for review** -- If you launched exploration or research tasks at end of day yesterday, review the output now while the context is fresh.

---

## During Work

- [ ] **For each agent task: Write the spec/plan yourself, delegate implementation.** The design is your job. The typing is the agent's job. If you find yourself letting the agent make structural decisions, stop and reclaim the planning step.
- [ ] **Scope check: Can you verify the output in under 2 minutes?** If not, break the task down further before delegating. Two minutes is the threshold. Beyond that, you are likely approving output you have not fully understood.
- [ ] **Review diffs incrementally.** Do not let changes accumulate without verification. Each agent-produced change should be reviewed and verified before moving to the next task. Batching review is how drift accumulates undetected.
- [ ] **When an agent makes a mistake: document it in AGENTS.md before moving on.** This takes thirty seconds and prevents hours of future re-correction. The discipline is in doing it immediately, not later. "Later" means "never."
- [ ] **Control your attention.** Disable agent notifications. Check agent results on YOUR schedule, not the agent's. The agent works for you, not the other way around. If you are context-switching every time the agent produces output, you are losing more productivity to interruption than you are gaining from delegation.

---

## End of Day

- [ ] **Launch 1-2 agents for overnight research, exploration, or issue triage.** These should be tasks where the output is informational, not code that will be merged without review. Good candidates: investigating a bug, summarizing documentation, exploring library options, triaging open issues.
- [ ] **Queue up "slam dunk" tasks for tomorrow's delegation.** Identify tasks that are clearly well-scoped and likely to succeed. Having these ready means tomorrow starts productively instead of with a scoping exercise.
- [ ] **Update AGENTS.md with any new patterns, mistakes, or conventions discovered today.** End-of-day is the second-best time to document (immediately is best, but a daily sweep catches what you missed).

---

## Weekly

- [ ] **Review and refine AGENTS.md.** Remove outdated entries. Consolidate entries that address the same underlying issue. Reorganize if the file has grown unwieldy. The harness should be concise and scannable, not a sprawling document.
- [ ] **Assess: What types of tasks consistently succeed? Which consistently fail?** Build a mental (or written) model of the agent's reliability frontier. Expand delegation into areas of consistent success. Pull back from areas of consistent failure.
- [ ] **Consider building a new tool/script if you have seen the same agent failure 3+ times.** Repeated failures in the same category signal a structural problem that documentation alone cannot fix. A purpose-built tool (filtered test runner, output formatter, context assembler) may be warranted.
- [ ] **Check costs.** Are you getting value proportional to spend? If you are on a usage-based plan, review the past week's spending. If you are on a flat rate, assess whether you are using the tool enough to justify the subscription. Nobody should be paying for AI tools they are not actively using.

---

## Signs You Are Doing It Right

- **You spend more time reading and verifying than writing prompts.** The bottleneck has shifted from generation to verification. This is the correct state.
- **Your AGENTS.md is growing steadily.** Not explosively (that suggests too many mistakes) and not stagnating (that suggests you are not documenting). Steady growth means you are capturing institutional knowledge.
- **Agent mistakes are NEW mistakes, not repeated ones.** The harness is working. Old failure modes are documented and prevented. Errors that occur are genuinely novel.
- **You have a backlog of tasks ready for delegation.** You are not scrambling to find things for the agent to do. You have a pipeline of well-scoped tasks identified in advance.
- **You control your attention.** The agent does not interrupt you. You check results when you are ready. Your focus time is protected.

---

## Signs You Are Doing It Wrong

- **You are "drawing the owl."** Giant tasks with vague goals handed to the agent as a single prompt. The output is impressive-looking but subtly wrong in ways you discover too late.
- **You are re-explaining the same constraints every session.** If you have told the agent the same thing three times across different sessions, it should be in AGENTS.md. You are burning time on repetition instead of building persistent infrastructure.
- **You are not verifying output before moving on.** Approving agent diffs without reading them, running tests, or checking behavior. This builds accumulated drift that compounds into serious problems.
- **The agent is driving your attention.** Notifications are on. You context-switch every time the agent produces output. Your workflow is reactive instead of deliberate.
- **You do not know what your monthly AI spend is.** You are making investment decisions (time, money, workflow changes) without data. Track your costs.
