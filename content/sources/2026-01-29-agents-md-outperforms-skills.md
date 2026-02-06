---
title: "AGENTS.md Outperforms Skills in Our Agent Evals"
source_url: "https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals"
hn_url: "https://news.ycombinator.com/item?id=46809708"
date: 2026-01-29
hn_points: 520
hn_comment_count: 70
tags: [agents-md, harness-engineering, prompt-engineering, evals, vercel, next-js]
tier: 1
weight: 3
---

## Summary

Vercel's engineering team published an evaluation comparing two approaches to providing AI coding agents with documentation: AGENTS.md files (passive context embedded in the system prompt) versus skills (active retrieval tools the agent can invoke on demand). The evaluation targeted Next.js 16 APIs that were absent from model training data, including new patterns like `'use cache'`, `connection()`, `forbidden()`, and async `cookies()`.

The results were striking. A compressed 8KB documentation index embedded in AGENTS.md achieved a 100% pass rate on the evaluation tasks, while skills maxed out at 79% even with explicit instructions telling the agent to use them. Without explicit instructions, skills performed no better than the 53% baseline. The root cause was that in 56% of eval cases, the skill was never invoked at all — the agent simply failed to recognize when it needed documentation help.

The key finding is that passive context (always-available documentation) eliminates the decision point that trips up active retrieval. There is no sequencing issue, no need for the agent to decide whether to look something up. The documentation is simply present in every turn. Vercel also found that aggressive compression of documentation into an index format worked as well as providing full content, and that small wording changes in instructions produced dramatic behavioral shifts — revealing the fragility of active retrieval approaches.

The team recommends generating an AGENTS.md documentation index using their codemod tool (`npx @next/codemod@canary agents-md`) and building evals targeting APIs outside training data to measure the real impact of documentation strategies.

## Key Insights

- **Passive context beats active retrieval**: Always-available documentation in AGENTS.md achieved 100% versus 79% max for skills-based retrieval
- **Agents fail to invoke skills**: In 56% of eval cases, the skill was never invoked — agents do not reliably recognize when they need help
- **Instruction fragility**: Small wording changes in skill instructions produced dramatic behavioral shifts, making active retrieval unreliable
- **Compression works**: An 8KB compressed documentation index performed as well as full documentation content
- **Eval methodology matters**: Testing against APIs outside training data reveals actual documentation impact versus memorized knowledge

## Notable Quotes

> "In 56% of eval cases, the skill was never invoked." — Vercel blog

> "Don't wait for skill improvements; results matter now." — Vercel blog

## HN Discussion Highlights

The discussion generated 520 points and 70 comments. Key themes:

**Debate over whether this is genuinely new**
- **thorum**: Argued that AGENTS.md is actually a simplified instance of the same concept as skills — telling the AI where to find instructions is itself a skill, just better designed
- **jgbuddy**: Pointed out that directly including context in a system prompt will obviously put it in context 100% of the time, questioning the novelty of the finding
- **EnPissant**: Found the distinction confusing since skills also provide short descriptions up front, wondering what specifically makes the AGENTS.md approach different

**Practical improvements and extensions**
- **chr15m**: Suggested going further than AGENTS.md by creating a .context folder with symlinked relevant documentation from dependencies
- **verdverm**: Shared experience that mirrors these findings — using AGENTS.md as a table of contents and putting compressed docs everywhere works best
- **meatcar**: Proposed distributing documentation alongside libraries as a dev dependency, version-locked and accessible locally

**Concerns about methodology and fragility**
- **motoboi**: Argued models are text generators forced to produce tool-triggering text, so skill invocation failure reflects the mismatch between generation and tool use
- **jryan49**: Questioned whether tests were run once or multiple times, noting LLM inconsistency makes single-run evaluations unreliable
- **rao-v**: Predicted that smaller, cheaper models optimized for routing queries to the right context will soon make this debate moot
