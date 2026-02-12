---
title: "Changelog"
description: "What's new in the AI Best Practices Knowledge Base — a running log of source captures, content updates, and structural changes."
weight: 100
layout: single
updates:
  - date: 2026-02-12
    headline: "6 new sources, 8 pages updated"
    details:
      - "The Harness Problem — hashline benchmarks across 16 models (huge for harness-engineering)"
      - "Claude Code dumbed down (979 pts) — the transparency controversy"
      - "GLM-5, Stripe Minions, and more from the past week"
      - "Major harness-engineering page expansion, debates and tools refreshed"
  - date: 2026-02-07
    headline: "Claude Code ecosystem deep dive"
    details:
      - "Hooks, memory, Ralph Wiggum, custom agents, plugins"
      - "tools/claude-code now covers the full developer experience layer"
  - date: 2026-02-06
    headline: "Major restructure: 13 tool pages, models rewrite"
    details:
      - "13 individual tool deep-dive pages (from Claude Code to Kiro)"
      - "351 to 494 pages — claim-driven architecture overhaul"
---

A running record of how this knowledge base evolves. Each entry captures what was added, what changed, and why it matters.

---

## February 12, 2026

**Big batch: 6 new sources and a harness engineering revelation**

This week's HN frontpage was packed with AI coding debate. We captured the highlights and wove them into the existing content.

The standout find is Can Boluk's "The Harness Problem" — a hands-on demonstration that changing only the *edit format* (not the model) dramatically improved coding performance across 16 LLMs. Grok Code Fast 1 went from 6.7% to 68.3% with the same model. This is the strongest validation yet of the harness-engineering thesis that anchors our practices section, and it got a major integration into that page.

Meanwhile, the community had a meltdown over Claude Code v2.1.20 reducing transparency (979 pts, 626 comments). We added that to the degradation debate and the Claude Code tool page. GLM-5 dropped as the first major Chinese model specifically targeting agentic coding — MIT licensed, trained on Huawei chips, 744B parameters. That went into models and the landscape timeline.

**New sources:**

- **[Claude Code is being dumbed down?](/sources/2026-02-11-claude-code-dumbed-down.html)** (979 pts, 626 comments) — Community backlash over Claude Code v2.1.20 transparency reductions. Anthropic's bcherny responds.
- **[GLM-5: Agentic Engineering](/sources/2026-02-11-glm5-agentic-engineering.html)** (407 pts, 483 comments) — First major Chinese model targeting agentic coding. MIT license, Huawei chips, SLIME RL framework.
- **[Coding agents have replaced every framework I used](/sources/2026-02-07-coding-agents-replaced-frameworks.html)** (372 pts, 594 comments) — Agent-first workflows making frameworks unnecessary. Massive debate.
- **[Beyond agentic coding](/sources/2026-02-08-beyond-agentic-coding.html)** (266 pts, 90 comments) — What comes after agentic coding? Mental model desynchronization problem.
- **[The Harness Problem / hashline](/sources/2026-02-12-harness-problem-hashline.html)** — Edit format benchmarks across 16 models. The harness matters more than the model.
- **[Stripe Minions](/sources/2026-02-10-stripe-minions-agentic-coding.html)** — 1000+ PRs/week from autonomous agents at Stripe. 400+ MCP tools, isolated devboxes.

**Pages updated:**

- **practices/harness-engineering** — Major expansion with hashline data and enterprise harness patterns (Stripe)
- **practices/multi-agent** — Enterprise autonomous agents, mental model desynchronization
- **practices/task-scoping** — How agents reshape what counts as a reasonable task
- **debates/is-it-getting-worse** — Claude Code v2.1.20 controversy
- **debates/engineering-vs-programming** — Framework replacement thesis
- **tools/claude-code** — New transparency controversy section
- **tools/models** — GLM-5 entry
- **landscape/model-releases-2026** — GLM-5 on the timeline

---

## February 7, 2026

**Claude Code gets the deep-dive treatment**

We went deep on the Claude Code ecosystem — not just the core agent loop, but everything built on top of it. The hooks system that lets you run shell commands on tool events. Auto-memory that persists context across sessions. Ralph Wiggum (yes, really) as a plugin example. Custom agents via `.claude/agents/`. The full plugin architecture.

The tools/claude-code page went from a surface-level overview to the most comprehensive Claude Code reference we know of outside Anthropic's own docs.

---

## February 6, 2026

**The big restructure: 13 tool pages and a models overhaul**

This was the day the site went from "pretty good collection" to "comprehensive reference." We added 13 individual tool deep-dive pages covering every major AI coding tool: Claude Code, Cursor, Amp, Copilot, Cline, Codex, Windsurf, Kiro, Aider, Gemini CLI, MCP ecosystem, plus a models comparison and a head-to-head comparison matrix.

The models page got completely rewritten with an experience-first organization, variant-level profiles, reasoning configurations, and temporal context showing which Claude version each HN report was testing against. Research was conducted with a 13-agent team running parallel investigations.

Site went from 351 to 494 pages. Homepage got a redesign with inline browse-more cards.

---

## February 6, 2026 (earlier)

**Complete rebuild from scratch**

The original structure wasn't working. We tore it down and rebuilt with a new content architecture designed around how practitioners actually think about AI coding:

- 7 content sections: guide, practices, debates, tools, landscape, evidence, voices
- 32 HN source captures as the evidence base
- Dark-first design with section-colored accents
- Client-side search (no external dependencies)
- Custom shortcodes for debates (Side A/B), voice cards, callouts, and provenance tracking
- Hugo with uglyURLs and relativeURLs for maximum portability

---

## February 5, 2026

**Day one**

Initialized the knowledge base. First batch of source captures: the AI adoption journey article, Amp Code analysis, and Carlini's parallel-agents C compiler project. Migrated to Hugo static site structure.

Everything starts somewhere.
