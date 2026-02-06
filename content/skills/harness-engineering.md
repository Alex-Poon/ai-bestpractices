---
title: "Harness Engineering"
description: "Configure your AI tools for maximum effectiveness with AGENTS.md, custom instructions, and project context."
weight: 2
tags: [harness-engineering, core-skill, agents-md, claude-code]
date: 2026-02-06
---

Harness engineering is the practice of building persistent infrastructure that constrains and guides AI agents across sessions. It is the highest-leverage investment in AI-assisted development because it compounds: every mistake you document is a mistake that never recurs.

## Why the Harness Matters More Than the Prompt

A well-harnessed mediocre prompt outperforms a perfect prompt with no harness. This is counterintuitive because prompt engineering gets most of the public attention. But practitioners who have been using agents for months consistently report that their investment in configuration files and custom tools delivers more value than any improvement in prompting technique.

The reason is simple: prompts are ephemeral, but the harness is persistent. Each session starts fresh -- the agent has no memory of corrections you made yesterday. The harness is the only thing that carries forward.

Vercel's evaluation of AGENTS.md files provides the strongest quantitative evidence. Their team tested documentation strategies against Next.js 16 APIs that were absent from model training data. An 8KB compressed documentation index embedded in AGENTS.md achieved a 100% pass rate, while active retrieval tools (skills) maxed out at 79%. The root cause: in 56% of cases, the agent simply failed to invoke the retrieval tool when it needed help. Passive context eliminates that decision point entirely. See the [full source](/sources/2026-01-29-agents-md-outperforms-skills/).

## Mechanism 1: Documentation Files (AGENTS.md / CLAUDE.md)

These are markdown files placed in the root of your project (or in relevant subdirectories) that the agent reads at the start of every session. They serve as a persistent memory layer.

### What to Include

**Project conventions** -- Coding style rules that differ from defaults, naming conventions, file organization patterns, import ordering. Anything the agent would get wrong by following general best practices rather than your specific practices.

**Architectural constraints** -- "Module X should never import from module Y." "All database access goes through the repository layer." "Use date-fns, not moment.js." These constraints prevent the agent from making plausible but wrong design choices.

**Known mistakes and corrections** -- "When generating tests for the auth module, always mock the token service." "The config object uses snake_case keys even though the rest of the codebase uses camelCase." These entries come directly from real mistakes observed during sessions and represent the highest-value content in the harness.

**Testing requirements** -- How to run tests, what specific commands and environment variables are needed, what constitutes a passing test, common test setup patterns.

**"Never do X" rules** -- Hard-won corrections from past failures. Framework-specific gotchas. Deprecated patterns the agent might still suggest.

### The Maintenance Discipline

The documentation file is a living document. The cycle is:

1. Agent makes a mistake during a session.
2. You correct the mistake.
3. Before moving on, you add an entry to the documentation file.
4. The mistake does not recur in future sessions.

Step 3 is the critical discipline. It takes thirty seconds and prevents hours of future re-correction. The most common failure mode is skipping this step because you are focused on the immediate task.

### Compression Works

Vercel's evaluation showed that aggressively compressed documentation performed as well as full content. You do not need verbose explanations in your AGENTS.md -- concise, structured rules are what agents parse best. Use bullet points, headers, and explicit "do this / not that" formatting rather than narrative paragraphs.

## Mechanism 2: Purpose-Built Tools

Some constraints are better enforced through tooling than documentation. Purpose-built tools are scripts and utilities designed specifically for agent consumption, not for human use.

**Filtered test runners** -- A wrapper that runs only tests relevant to modified files and formats output for agent parsing. Prevents the agent from being overwhelmed by unrelated test output.

**Output formatters** -- Scripts that restructure build output, linter results, or API responses into concise structured formats. Agents process JSON and consistent formats more reliably than verbose human-oriented text.

**Pre-commit validators** -- Scripts that check agent output against project constraints before it reaches human review. Catches common agent errors automatically.

**Context assemblers** -- Scripts that gather relevant context (related files, interface definitions, recent changes) and present it in a single well-organized input.

### Design Principles for Agent Tools

- **Structured output over prose.** Agents parse JSON, YAML, and consistent formats more reliably than free text.
- **Minimal output.** Include only what the agent needs. Verbose output increases distraction and drift.
- **Clear error messages.** When something fails, tell the agent exactly what went wrong and what to do about it.
- **Deterministic behavior.** Same input, same output. Non-deterministic tools confuse agents.

## Anthropomorphic Test Design

Nicholas Carlini's [parallel compiler project](/patterns/parallel-agent-coordination/) introduced a concept worth naming: designing test infrastructure for the agent's cognition, not for human developers. Techniques from the project:

- **Limited output verbosity** to prevent context window pollution
- **Pre-computed aggregate statistics** presented to the agent rather than requiring the agent to calculate them
- **ERROR-prefixed single-line formatting** optimized for mechanical parsing
- **A `--fast` flag** that ran only 1-10% of tests randomly sampled, because agents have no internal sense of time-cost tradeoff and will otherwise spend hours running tests

This last point is critical and broadly applicable: agents do not manage their own time. The harness must impose time budgets.

## Why This Compounds

**Linear effort, exponential return.** Session 1: you document 3 mistakes. Session 10: 30 documented mistakes. Session 50: the agent's effective error rate is dramatically lower for common tasks.

**Knowledge preservation.** When you leave the project, the harness stays. A new developer inheriting the codebase gets the benefit of your accumulated agent-interaction knowledge. This is institutional memory that persists across people, not just across sessions.

**Quality floor, not ceiling.** The harness establishes a minimum quality level. It makes the worst-case output better, which matters more for productivity than making the best-case output better.

## Anti-Patterns

### Relying on Prompt Memory

Assuming the agent will remember corrections from earlier in the session or from previous sessions. Agents have limited context windows, and sessions are stateless. If a correction matters, externalize it.

### "The Agent Will Learn"

Hoping that repeating a correction enough times will train the agent. Current agents do not learn from in-session corrections in any persistent way. The only persistent memory is what you write down in the harness.

### Over-Documenting Too Early

Writing a massive AGENTS.md file before you have real data on what the agent gets wrong. Start small. Add entries only when you observe actual mistakes. The harness should be empirical, not speculative.

### Harness Rot

Letting the documentation accumulate outdated entries. Rules that reference old libraries or resolved issues add noise and can mislead the agent. Review the harness periodically and remove entries that no longer apply.

## The Klaus Example

The [Klaus project](/sources/2026-01-25-klaus-agentic-harness/) demonstrates harness engineering taken to its logical extreme: a full delegation system built entirely on Claude Code's native features. It uses a keyword-based scoring algorithm to route tasks to different agent tiers (from single-agent for simple edits to six-agent teams for complex architecture). The key insight is that sophisticated orchestration can be achieved through harness design alone, without external APIs or services.

## Sources

- [AGENTS.md Outperforms Skills (Vercel)](/sources/2026-01-29-agents-md-outperforms-skills/) -- Quantitative evidence that passive context beats active retrieval, 100% vs 79%
- [Building a C compiler with Claude](/patterns/parallel-agent-coordination/) -- Anthropomorphic test design and harness engineering at scale
- [Klaus agentic harness](/sources/2026-01-25-klaus-agentic-harness/) -- Native Claude Code harness with tiered task routing
- [AI Coding Toolkit](/sources/2026-01-22-ai-coding-toolkit/) -- Phase-gated workflow with built-in verification
- **EastLondonCoder** (HN) -- Coined "continuously tightening the harness" as the iterative documentation discipline
- **fix4fun** (HN) -- Building custom tools specifically for agent consumption as a key productivity multiplier
