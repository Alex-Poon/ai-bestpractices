---
title: "Changelog"
description: "What's new in the AI Best Practices Knowledge Base — a running log of source captures, content updates, and structural changes."
weight: 100
layout: single
---

A running record of updates to this knowledge base, from initial launch to the latest source captures.

---

## February 12, 2026

**6 new sources captured, 8 content pages updated (494 → 516 pages)**

New source captures from the past week's HN discussions:

- **[Claude Code is being dumbed down?](/sources/2026-02-11-claude-code-dumbed-down.html)** (979 pts, 626 comments) — Community backlash over Claude Code v2.1.20 transparency reductions. Anthropic's bcherny responds. Extends the ongoing degradation debate.
- **[GLM-5: Agentic Engineering](/sources/2026-02-11-glm5-agentic-engineering.html)** (407 pts, 483 comments) — First major Chinese model targeting agentic coding. 744B MoE, MIT license, trained on Huawei chips. Introduces SLIME reinforcement learning framework.
- **[Coding agents have replaced every framework I used](/sources/2026-02-07-coding-agents-replaced-frameworks.html)** (372 pts, 594 comments) — Practitioner argument that agent-first workflows make traditional frameworks unnecessary. Huge debate in comments.
- **[Beyond agentic coding](/sources/2026-02-08-beyond-agentic-coding.html)** (266 pts, 90 comments) — Haskell perspective on limitations of current agentic patterns and what comes next. Raises mental model desynchronization problem.
- **[The Harness Problem / hashline](/sources/2026-02-12-harness-problem-hashline.html)** — Can Boluk demonstrates that changing only the edit format (not the model) dramatically improves coding performance across 16 LLMs. Grok Code Fast 1: 6.7% → 68.3%. Key validation of harness engineering thesis.
- **[Stripe Minions](/sources/2026-02-10-stripe-minions-agentic-coding.html)** — Stripe's autonomous coding agent system produces 1000+ PRs/week using a Goose fork with 400+ MCP tools and isolated devboxes.

Content page updates:

- **practices/harness-engineering** — Major expansion: new section on edit format as harness component (hashline data), enterprise-scale tool harnesses (Stripe)
- **practices/multi-agent** — Enterprise autonomous agent pattern, mental model desynchronization
- **practices/task-scoping** — How agents change task scope itself
- **debates/is-it-getting-worse** — Claude Code v2.1.20 transparency controversy added
- **debates/engineering-vs-programming** — Framework replacement thesis
- **tools/claude-code** — Transparency controversy section
- **tools/models** — GLM-5 entry
- **landscape/model-releases-2026** — GLM-5 timeline entry

---

## February 7, 2026

**Claude Code ecosystem deep dive (494 pages)**

Deep dive into the Claude Code ecosystem: hooks system, memory and auto-memory, Ralph Wiggum plugin, custom agents via `.claude/agents/`, and plugin architecture. Updated tools/claude-code with comprehensive coverage of the developer experience layer built on top of the core agent loop.

---

## February 6, 2026

**Major restructure: tools deep dive + models rewrite (351 → 494 pages)**

- Restructured site from topic-driven to claim-driven architecture
- Added 13 individual tool pages (Claude Code, Cursor, Amp, Copilot, Cline, Codex, Windsurf, Kiro, Aider, Gemini CLI, MCP ecosystem, models, comparison)
- Rewrote models page: experience-first organization with o-series coverage
- Granular model deep dive with variant-level profiles and reasoning configurations
- Added temporal context to model comparisons (which Claude version each HN report tested against)
- Homepage redesign with inline browse-more cards
- Fixed horizontal scroll wrapper for comparison tables

Research conducted with 13-agent team for parallel tool/model investigation.

---

## February 6, 2026

**Complete rebuild: new architecture, dark-first design (32 HN sources → 351 pages)**

Rebuilt the entire site from scratch with a new content architecture:

- 7 content sections: guide, practices, debates, tools, landscape, evidence, voices
- 32 HN source captures forming the evidence base
- Dark-first design with section-colored accents (blue, green, amber, rose, teal, purple)
- Client-side search via FlexSearch-style search-index.json
- Custom shortcodes: callout, debate-sides, voice-card, provenance
- Section-specific layouts: debates (Side A/B), voices (cards), guide (progress bar)
- Hugo with uglyURLs, relativeURLs, publishDir=docs

---

## February 5, 2026

**Initial launch**

- Initialized knowledge base repository
- First batch of source captures: AI adoption journey, Amp Code analysis
- Carlini parallel agents C compiler project (evidence piece)
- Migrated to Hugo static site structure
