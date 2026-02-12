---
title: "Amp Code"
description: "Sourcegraph's multi-model coding agent — architecture, model routing, and practitioner reception."
weight: 3
tags: [amp-code, multi-model, agent-architecture, tool-comparison, model-routing]
date: 2026-02-06
---

Amp Code is a coding agent built by the team behind Sourcegraph's code intelligence platform. Available as a CLI, VS Code extension, and JetBrains plugin, it is the most explicit implementation of multi-model routing in a production coding tool. Rather than letting users pick a single model, Amp routes tasks automatically based on type -- sending planning, implementation, review, and search to whichever model is best suited for each.

## The Multi-Model Architecture

Amp's core design principle is that no single model is best at everything. Different cognitive tasks -- planning, code generation, search, review -- have different performance profiles across models. Amp makes this explicit by maintaining named agent roles across three providers (Anthropic, OpenAI, Google):

| Role | Model | Purpose |
|---|---|---|
| **Smart** (primary agent) | Claude Opus 4.6 | Main coding agent; state-of-the-art model for implementation |
| **Rush** (fast agent) | Claude Haiku 4.5 | Faster and cheaper; for small, well-defined tasks |
| **Deep** (reasoning) | GPT-5.2 Codex | Deep reasoning with extended thinking |
| **Oracle** (planning) | GPT-5.2 | Complex reasoning and planning on code |
| **Librarian** (research) | Claude Sonnet 4.5 | Large-scale retrieval and research on external code |
| **Search** (codebase) | Gemini 3 Flash | Fast, accurate codebase retrieval |

Users choose their primary mode (Smart, Rush, or Deep), but within a thread, Amp dispatches to specialized subagents -- Search, Librarian, Oracle -- as needed. The routing is not purely automatic; it blends user selection with task-aware dispatching.

### Why Multi-Provider Matters

Amp draws from all three major providers simultaneously, choosing the best model for each specific subtask rather than committing to a single vendor. This is a fundamentally different bet from Claude Code (best single model), Cursor (best IDE experience), or Codex (best orchestration platform). Amp bets that the defensible skill is knowing which model to use when.

## Model Selection in Practice: Three Switches in Three Months

Amp has demonstrated a willingness to rapidly switch primary models based on internal evaluations. This timeline illustrates how dynamic model selection has become:

| Date | Primary Agent Model | Trigger |
|---|---|---|
| Early 2025 | Claude Sonnet 4.5 | Initial default |
| November 18, 2025 | Gemini 3 Pro | 17-point improvement on internal benchmarks |
| November 27, 2025 | Claude Opus 4.5 | Higher evals, dramatically lower failure rate |
| Current (February 2026) | Claude Opus 4.6 | Incremental upgrade |

Three primary model switches in three months. This rapid switching demonstrates that Amp treats model selection as a dynamic, ongoing process rather than a fixed architectural decision -- and it offers a cautionary tale about the gap between benchmarks and production behavior.

## The "Off-the-Rails" Metric

Amp's most distinctive contribution to the model evaluation conversation is the "off-the-rails cost" metric -- the percentage of spend wasted on problematic outputs. This captures something benchmarks miss: how badly a model fails when it fails.

From Amp's November 2025 evaluation comparing their three primary model candidates:

| Metric | Sonnet 4.5 | Gemini 3 Pro | Opus 4.5 |
|---|---|---|---|
| Internal Evals | 37.1% | 53.7% | 57.3% |
| Avg. Thread Cost | $2.75 | $2.04 | $2.05 |
| Off-the-Rails Cost | 8.4% | 17.8% | 2.4% |
| Speed (p50) | 2.4 min | 4.3 min | 3.5 min |

The off-the-rails numbers tell the real story. Gemini 3 Pro scored well on benchmarks (53.7% on internal evals, a 17-point jump over Sonnet), but wasted 17.8% of spend on bad outputs -- nearly 1 in 5 dollars went to problematic results. Opus 4.5 wasted only 2.4%, or 1 in 40 dollars.

This is why Amp switched back to Claude after just nine days with Gemini 3 Pro as primary agent. Despite strong benchmark scores, Gemini produced what Amp's team described as "frustrating behaviors" in production. Known issues included infinite thinking loops, thinking-like prose leaking into visible outputs, control character corruption, reluctance to execute bash commands, and making unrequested git commits.

### What This Means for Practitioners

The off-the-rails metric reveals that **reliability matters more than peak capability**. A model's worst-case behavior matters as much as its best-case performance. It also shows that **total cost does not equal token cost** -- a more expensive model that completes tasks reliably can be cheaper overall than a cheap model that wastes tokens on retries and dead ends. Opus 4.5's average thread cost ($2.05) nearly matched Gemini 3 Pro ($2.04) despite significantly higher per-token pricing, because it made fewer mistakes.

## Search Subagent: A Case Study in Specialization

When Amp switched their Search subagent from Claude Haiku 4.5 to Gemini 3 Flash, they saw dramatic improvements: 3x faster overall search completion, 8 parallel tool calls per iteration (versus roughly 2.5 for Haiku), and 3 turns to complete a search versus 9 turns for Haiku. Gemini 3 Flash's advantage came from superior parallel tool calling and the ability to conclude searches early when good results were found.

This illustrates the multi-model thesis in microcosm: using a smaller, specialized model for a specific subtask produced better results than using a larger, more capable model that was not optimized for that particular function.

## Key Features Beyond Routing

**Parallel sub-agents.** Amp can spawn multiple independent agents on subtasks simultaneously, similar to Claude Code's agent teams feature but available earlier and with multi-model flexibility.

**AGENTS.md support.** Like Claude Code's CLAUDE.md, Amp reads project-level instruction files for persistent context. See [Harness Engineering](/practices/harness-engineering.html).

**No autocomplete.** Amp dropped inline autocomplete entirely in January 2026 to focus exclusively on agentic workflows. This was a deliberate product decision reflecting the belief that autocomplete and agentic modes require different design tradeoffs.

**Cross-repository search.** The Librarian feature uses code intelligence from Sourcegraph's platform to search public repositories for usage patterns and documentation -- a capability that leverages Sourcegraph's existing infrastructure.

## Pricing: Ad-Supported Free Tier + Pay-As-You-Go

Amp's pricing model is distinctive in the space:

**Free tier**: Ad-supported, providing roughly $10/day in credits (approximately $300/month). Credits replenish hourly. Text-only ads can be disabled by paying. Smart mode uses Opus 4.6 with GPT-5 and Gemini-3 subagents; Rush mode uses Haiku 4.5.

**Paid features**: CLI execute mode (`amp -x`), programmatic API invocations, and Amp SDK usage require a paid plan.

**Per-thread economics** (from Amp's published data): a typical coding thread costs roughly $2.05 with Opus 4.5, $2.04 with Gemini 3 Pro, or $2.75 with Sonnet 4.5. Because Amp routes to multiple providers with different cost structures, costs scale with usage and can be unpredictable during intensive sessions.

## Community Reception

Practitioner reception reflects the tradeoffs of the multi-model approach:

**Strengths users highlight:**
- The ability to use the best model for each task type, rather than compromising on one
- No rate limits or throttling, even during heavy use
- Strong code search capabilities via the Sourcegraph backend
- The Oracle planning check catches mistakes that single-model tools miss
- Deep mode (GPT-5.2 Codex with extended thinking) for genuinely hard reasoning tasks

**Weaknesses users highlight:**
- Cost unpredictability, especially during intensive sessions -- power users report monthly spend exceeding $1,000
- Complexity of debugging when output quality drops (which model in the chain caused the issue?)
- Dependence on external model providers who may change performance or pricing
- The "no moat" concern: if the value is orchestrating others' models, what prevents those providers from building their own orchestration?

## Lessons from Amp's Model Evaluation

Amp's published evaluation data offers several insights applicable beyond their specific tool:

1. **Multi-model beats single-model for diverse tasks.** Using different models for primary coding, search, reasoning, and research outperforms relying on one model for everything.

2. **Evaluate in production context.** Amp learned that early-access benchmark performance does not always predict production behavior. After getting burned by Gemini 3 Pro's gap between benchmarks and reality, they adopted a more cautious evaluation pipeline.

3. **Smaller models for specialized tasks.** Using Gemini 3 Flash for search (3x faster than Haiku 4.5) and Haiku for rush tasks shows that matching model size to task complexity yields better results than always using the biggest model.

4. **Model loyalty is counterproductive.** The willingness to move between providers based on evaluation data, rather than committing to a single vendor, is central to Amp's approach and increasingly common among sophisticated users.

## The Strategic Question

Amp represents a bet that orchestration -- knowing which model to use when, how to transfer context, how to parallelize effectively -- is the defensible skill in AI coding tools. Claude Code bets on having the best single model. Cursor bets on the best IDE experience. Codex bets on multi-agent orchestration and automation. Each reflects a different theory about where lasting value accrues.

For practitioners, the relevant question is less about which tool wins and more about understanding the multi-model concept. Even if you use a single-model tool, you can apply multi-model thinking by switching modes (standard vs extended thinking) or models manually based on task type.

For the broader decision framework, see the [Practitioner's Tool Comparison](/tools/).
