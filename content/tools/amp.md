---
title: "Amp Code"
description: "Sourcegraph's multi-model coding agent — architecture and practitioner reception."
weight: 3
tags: [amp-code, multi-model, agent-architecture, tool-comparison]
date: 2026-02-06
---

Amp Code is a coding agent built by the team behind Sourcegraph's code intelligence platform. Available as a CLI, VS Code extension, and JetBrains plugin, it is the most explicit implementation of multi-model routing in a production coding tool. Rather than letting users pick a single model, Amp routes tasks automatically based on type -- sending planning, implementation, review, and search to whichever model is best suited for each.

## The Multi-Model Architecture

Amp's core design principle is that no single model is best at everything. Different cognitive tasks -- planning, code generation, search, review, visual analysis -- have different performance profiles across models. Amp makes this explicit by maintaining a routing table across three providers (Anthropic, OpenAI, Google):

- **Main coding agent**: Claude Opus 4.5 for implementation
- **Extended reasoning** ("Deep mode"): GPT-5.2 Codex, which reads and navigates the codebase for 5-15 minutes before making changes
- **Second opinion** ("Oracle"): GPT-5.2 with medium reasoning effort, serving as a dedicated planning check
- **Code review and search**: Gemini models, leveraging fast large-context processing
- **Cross-repo search** ("Librarian"): Claude Sonnet 4.5 for searching public GitHub repositories for usage patterns

This routing has evolved significantly over time. The main agent model progressed through multiple generations, and the Oracle model moved through several OpenAI versions. This evolution illustrates both the advantage (always upgrade to the best available) and the risk (your system depends on providers you do not control) of multi-model routing.

For a deeper treatment of the multi-model concept, see [The Multi-Model Agent Landscape](/deep-dives/multi-model-agents.html).

## Key Features Beyond Routing

**Parallel sub-agents.** Amp can spawn multiple independent agents on subtasks simultaneously, similar to Claude Code's swarm feature but available earlier and with multi-model flexibility.

**AGENTS.md support.** Like Claude Code's CLAUDE.md, Amp reads project-level instruction files for persistent context. See the [AGENTS.md Guide](/references/agents-md-guide.html).

**No autocomplete.** Amp dropped inline autocomplete entirely in January 2026 to focus exclusively on agentic workflows. This was a deliberate product decision reflecting the belief that autocomplete and agentic modes require different design tradeoffs.

**Cross-repository search.** The Librarian feature uses code intelligence from Sourcegraph's platform to search public repositories for usage patterns and documentation -- a capability that leverages Sourcegraph's existing infrastructure.

## Pricing: Pay-As-You-Go

Because Amp routes to multiple providers with different cost structures, it uses pay-as-you-go pricing with no markup for individual users rather than a flat subscription. Most tasks cost cents to a few dollars, but costs scale with usage. Power users report monthly spend exceeding $1,000.

Cost unpredictability is the most frequently cited weakness among Amp users. Without a flat cap, heavy usage during complex refactors or multi-agent sessions can produce surprising bills. The flip side is no rate limits or throttling -- you never hit a usage ceiling.

## Community Reception

Practitioner reception reflects the tradeoffs of the multi-model approach:

**Strengths users highlight:**
- The ability to use the best model for each task type, rather than compromising on one
- No rate limits or throttling, even during heavy use
- Strong code search capabilities via the Sourcegraph backend
- The Oracle "second opinion" feature catches planning mistakes other tools miss

**Weaknesses users highlight:**
- Cost unpredictability, especially during intensive sessions
- Complexity of debugging when output quality drops (which model in the chain caused the issue?)
- Dependence on external model providers who may change performance or pricing
- The "no moat" concern: if the value is orchestrating others' models, what prevents those providers from building their own orchestration?

## The Strategic Question

Amp represents a bet that orchestration -- knowing which model to use when, how to transfer context, how to parallelize effectively -- is the defensible skill in AI coding tools. Claude Code bets on having the best single model. Cursor bets on the best IDE experience. Each reflects a different theory about where lasting value accrues.

For practitioners, the relevant question is less about which tool wins and more about understanding the multi-model concept. Even if you use a single-model tool, you can apply multi-model thinking by switching modes (standard vs extended thinking) or models manually based on task type.

For the broader decision framework, see the [Practitioner's Tool Comparison](/references/tool-landscape.html).
