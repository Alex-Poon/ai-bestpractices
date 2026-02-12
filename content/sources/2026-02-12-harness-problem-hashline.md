---
title: "I Improved 15 LLMs at Coding in One Afternoon. Only the Harness Changed."
source_url: "https://blog.can.ac/2026/02/12/the-harness-problem/"
hn_url: ""
date: 2026-02-12
hn_points: 0
hn_comment_count: 0
tags: [harness-engineering, edit-formats, benchmarks, code-quality, tool-calling, model-agnostic]
tier: 1
weight: 1
---

## Summary

Can Boluk argues that the biggest bottleneck in LLM-assisted coding is not the model itself but the harness — the layer that translates a model's intent into actual file edits. Most current edit mechanisms force models to reproduce existing code verbatim in order to specify what they want to change, and this reproduction step is where things break down. Patch-based formats (used by OpenAI's Codex ecosystem) suffer catastrophic failure rates on non-Codex models, with some models failing nearly half their edit attempts. String replacement approaches (used by Claude Code and Gemini CLI) require exact character-for-character matching including whitespace, leading to frequent "string not found" errors. Cursor addressed this by training a dedicated 70B parameter model just to merge edits — an enormous investment that sidesteps rather than solves the underlying problem.

Boluk's proposed solution is hashline, a tagging system where every line of code shown to the model gets annotated with a short 2-3 character content hash. Instead of reproducing lines of code, the model references these stable identifiers (e.g., "replace line 22:f1 with..."). If the underlying file changes between reads, the hash no longer matches, which prevents silent corruption. This approach separates the task of understanding what to change from the mechanical task of reproducing existing text.

The benchmarks are striking. Across 16 models tested on 180 React codebase mutation tasks (operator swaps, boolean flips, off-by-one errors), hashline dramatically improved performance for most models. Grok Code Fast 1 jumped from 6.7% to 68.3% — a tenfold improvement. MiniMax doubled its success rate. Grok 4 cut its output token usage by 61% while maintaining accuracy. Even strong performers like Gemini 3 Flash gained 5-14 percentage points.

The article contextualizes these findings within the broader ecosystem. JetBrains' Diff-XYZ benchmark found no single edit format dominates across all models. Aider's benchmarks showed format alone could swing GPT-4 Turbo from 26% to 59%. Yet vendors have no incentive to optimize harnesses for competitor models — only open-source approaches benefit the full ecosystem. Boluk frames this as the highest-leverage innovation opportunity in LLM coding, arguing that an 8% harness improvement delivers value equivalent to a major model upgrade at zero training cost.

## Key Insights

- **The harness is the bottleneck, not the model.** Most coding failures stem from the edit format layer — how models express changes — rather than from task comprehension. Fixing the interface yields gains across all models simultaneously.
- **Hashline decouples understanding from reproduction.** By giving each line a short content hash, models reference what to change by tag rather than reproducing code verbatim, eliminating the most common class of edit failures.
- **No single edit format wins everywhere.** Patch, string replacement, and hashline each have different failure profiles across models. Benchmarks from JetBrains, Aider, and this article all confirm format choice dramatically affects measured model quality.
- **Vendor lock-in distorts the landscape.** Each vendor optimizes harnesses for their own models. Anthropic and Google have actively restricted third-party harness access, meaning open-source is the only path to format improvements that benefit all models.
- **Harness gains rival model upgrades.** An 8% improvement from a better edit format delivers comparable value to expensive model training runs, making harness engineering the most cost-effective lever for improving AI coding tools.

## Notable Quotes

> "You're blaming the pilot for the landing gear." — Can Boluk, on attributing edit failures to model quality

> "The harness is the bridge. Burning bridges just means fewer people bother to cross." — Can Boluk

## HN Discussion Highlights

No HN discussion at time of capture.
