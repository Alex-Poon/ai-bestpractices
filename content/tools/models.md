---
title: "Model Deep Dive"
description: "Variant-level analysis of every major coding model — pricing, benchmarks, reasoning configs, and 605 practitioner reports from HN."
weight: 2
tags: [models, model-selection, comparison, costs, reasoning]
date: 2026-02-06
---

The [model selection](/practices/model-selection.html) practice page covers the principles: start cheap, escalate on failure, use multiple models, ignore benchmarks in favor of your own workload. This page is the complement -- a granular look at every model variant, what it costs, how it performs in real-world usage, and exactly how to configure reasoning levels across providers and tools.

The data here comes from three sources: Amp Code's published model evaluation data (including their distinctive "off-the-rails" metric), official provider documentation, and 605 model variant mentions extracted from over 6,000 Hacker News comments across 20+ discussion threads.

## Practitioner Mention Heatmap

Before diving into individual models, here is what practitioners actually talk about. The top 20 most-discussed model variants across HN, with sentiment:

| Model Variant | Mentions | Positive | Negative | Neutral |
|---|---|---|---|---|
| Opus 4.5 | 158 | 43 | 32 | 83 |
| GPT-5 (family) | 72 | 10 | 21 | 41 |
| GPT-5.2 | 39 | 7 | 15 | 17 |
| Gemini 3 | 39 | 8 | 10 | 21 |
| Opus 4.6 | 38 | 9 | 4 | 25 |
| Sonnet 4 / 4.5 | 64 | 15 | 15 | 34 |
| Gemini 3 Pro | 13 | 1 | 3 | 9 |
| GPT-OSS | 10 | 2 | 0 | 8 |
| GPT-5.2 Codex | 9 | 1 | 2 | 6 |
| GPT-5.1 | 9 | 1 | 4 | 4 |
| Kimi K2 / K2.5 | 14 | 1 | 2 | 11 |
| Gemini 2.5 | 8 | 2 | 1 | 5 |
| Haiku 4.5 | 5 | 0 | 1 | 4 |
| GPT-5.3 Codex | 5 | 1 | 0 | 4 |
| Qwen 3 | 5 | 1 | 0 | 4 |

Opus 4.5 dominates with 4x more mentions than any other single variant. The GPT-5 family is the second most discussed but skews notably negative (21 negative vs 10 positive). Opus 4.6 has the best positive-to-negative ratio among frequently mentioned models.

---

## Claude Variants (Anthropic)

### Claude Opus 4.6

| Spec | Detail |
|------|--------|
| **Release** | February 5, 2026 |
| **Model ID** | `claude-opus-4-6` |
| **Context** | 1M tokens (beta) / 200K standard |
| **Max output** | 128K tokens |
| **Pricing** | $5/M input, $25/M output |
| **1M pricing** | $10/M input, $37.50/M output |
| **Cache discount** | 90% on cached input |

The current Anthropic frontier. The headline feature is the 1M token context window -- the first Opus-class model to support it. In needle-in-haystack testing (MRCR v2), Opus 4.6 retrieves information at 93% accuracy at 256K tokens and 76% at 1M. For comparison, Sonnet 4.5 scores only 10.8% at 256K -- making Opus 4.6 roughly 4-9x more reliable at deep context retrieval.

**Benchmarks vs Opus 4.5:**

| Benchmark | Opus 4.5 | Opus 4.6 | Delta |
|-----------|---------|---------|-------|
| SWE-bench Verified | 80.9% | 80.8% | -0.1% |
| Terminal Bench | 59.8% | 65.4% | +5.6% |
| OSWorld (computer use) | 66.3% | 72.7% | +6.4% |
| MRCR v2 8-needle @256K | N/A | 93% | New |
| MRCR v2 8-needle @1M | N/A | 76% | New |

**New capabilities:** Adaptive thinking (model decides when to reason deeply vs respond quickly), effort parameter with exclusive `max` level, agent teams for multi-instance parallel work, interleaved thinking between tool calls, and improved self-correction during code review.

**Practitioner reception (38 HN mentions, 9 positive, 4 negative):** Mixed but leaning positive. One practitioner sent 900 poems in Portuguese and received "an impeccable analysis." Another described one-shotting a Gameboy emulator. The negative reports focus on writing quality regression -- one user called it "nerfed" for prose tasks. The practical advice from practitioners: use 4.6 for coding and agentic work, keep 4.5 available for writing-heavy tasks.

**1M context availability:** API and Claude Code pay-as-you-go users only at launch. Not available for Pro, Max, Teams, or Enterprise subscription users initially. Enable with `[1m]` suffix: `/model opus[1m]`.

**Tool access:** Default model on Claude Code Max and Teams plans. [Claude Code](/tools/claude-code.html) automatically falls back to Sonnet when Opus usage threshold is hit on Pro plans.

### Claude Opus 4.5

| Spec | Detail |
|------|--------|
| **Release** | November 24, 2025 |
| **Model ID** | `claude-opus-4-5-20251101` |
| **Context** | 200K tokens |
| **Max output** | 64K tokens |
| **Pricing** | $5/M input, $25/M output (67% cut from Opus 4.1's $15/$75) |

The model that changed practitioner sentiment. First model to exceed 80% on SWE-bench Verified (80.9%). Best across 7 of 8 programming languages on SWE-bench Multilingual. The 67% price reduction from Opus 4.1 was arguably more disruptive than the capability gains -- it made frontier-class coding available at mainstream pricing.

**Key features:** Effort parameter (low/medium/high) for trading thoroughness for speed. At medium effort, matches Sonnet 4.5's SWE-bench score using 76% fewer output tokens. Tool Search discovers tools on-demand, reducing context overhead by 85%. Auto-compaction at 95% context window effectively removes the context limit.

**Amp's evaluation data (Opus 4.5 as Smart mode):**

| Metric | Opus 4.5 | vs Sonnet 4.5 | vs Gemini 3 Pro |
|--------|---------|--------------|----------------|
| Internal Evals | 57.3% | +20.2% | +3.6% |
| Avg Thread Cost | $2.05 | -$0.70 cheaper | +$0.01 |
| Off-the-Rails Cost | 2.4% | 3.5x less waste | 7.4x less waste |
| Speed (p50) | 3.5 min | +1.1 min slower | 0.8 min faster |

**Practitioner reception (158 HN mentions -- by far the most discussed model):** The most polarizing model in recent memory. Champions describe it as "an inflection point" and "a visible step change." One practitioner reported 259 PRs and 497 commits in 30 days. Another built twelve iOS apps in two weeks. Critics report it "ate through my Copilot quota," produces "baffling architecture decisions," and "is not much different than any previous models." The split appears to correlate with domain: React/Rust/C# developers skew positive, while those working with legacy codebases, data science, or novel domains report more frustration.

### Claude Sonnet 4.5

| Spec | Detail |
|------|--------|
| **Release** | September 29, 2025 |
| **Model ID** | `claude-sonnet-4-5-20250929` |
| **Context** | 200K tokens (1M available via API) |
| **Max output** | 64K tokens |
| **Pricing** | $3/M input, $15/M output |

Anthropic's most popular model by volume. The workhorse for daily coding where speed matters more than peak capability. SWE-bench Verified: 77.2%. Handles 90% of coding tasks without difficulty, per Claude Code documentation.

**The counterintuitive cost finding:** Despite being cheaper per token, Amp found Sonnet actually costs more per completed thread ($2.75) than Opus ($2.05). It uses more tokens, makes more mistakes, and requires more human intervention. The cheapest model per token is not always the cheapest model per completed task.

**Where it fits:** Default execution model in `opusplan` mode (Opus plans, Sonnet executes). Claude Code falls back to Sonnet when Opus quota is hit on Pro plans. First non-frontier model with strong extended thinking capabilities. Best suited for implementation tasks within an already-defined architecture.

**Extended thinking:** Supports manual extended thinking with `budget_tokens`. Interleaved thinking available with beta header `interleaved-thinking-2025-05-14`.

### Claude Haiku 4.5

| Spec | Detail |
|------|--------|
| **Release** | October 15, 2025 |
| **Model ID** | `claude-haiku-4-5-20251001` |
| **Context** | 200K tokens |
| **Max output** | 64K tokens |
| **Pricing** | $1/M input, $5/M output |

The speed tier. Fastest model in the Claude family, optimized for lowest initial latency. SWE-bench Verified: 73.3% -- within 5 points of best-in-class at 1/3 the cost. First "small" model to support extended thinking.

**Where practitioners use it:** Subagent tasks (summarization, validation, entity extraction), codebase exploration in Claude Code (powers the Explore subagent), background token operations in Claude Code, and as the junior developer in multi-agent teams. Amp uses it for Rush mode (small, well-defined tasks) and Titling (thread title generation).

**Rush mode performance (Amp data):** Token-by-token, 67% cheaper and 50% faster than Smart mode. A small task: 37 seconds at $0.12 (44% faster, 77% cheaper than Smart). But on a complex refactor: 2x longer than Smart and only 19% cheaper -- it spends more tokens fixing its own mistakes.

**vs Gemini Flash:** Haiku excels at agent orchestration and tool use. Gemini Flash offers broader capabilities and larger context (1M). For live coding, Haiku's total cost-to-solution tends to be lower due to fewer retries and stalls.

---

## GPT Variants (OpenAI)

### GPT-5.3 Codex

| Spec | Detail |
|------|--------|
| **Release** | February 5, 2026 |
| **Context** | 400K tokens |
| **Pricing** | ~$1.75/M input, ~$14/M output (API pricing TBD) |
| **Reasoning levels** | low, medium, high, xhigh |
| **Speed** | ~233 tokens/sec at high reasoning |

The first unified model combining the Codex and GPT-5 training stacks. 25% faster than GPT-5.2-Codex while using fewer tokens for equivalent tasks. Can be steered interactively while working without losing context.

**Benchmarks:**

| Benchmark | GPT-5.2-Codex | GPT-5.3-Codex | Delta |
|-----------|--------------|--------------|-------|
| SWE-Bench Pro | 56.4% | 56.8% | +0.4% |
| Terminal-Bench 2.0 | 64.0% | 77.3% | +13.3% |
| OSWorld-Verified | -- | 64.7% | New |
| Cybersecurity CTF | 79-80% | 77.6% | ~same |

The Terminal-Bench jump from 64% to 77.3% is the standout number -- a massive gain in real-world terminal/CLI task completion. First model rated "High capability" in cybersecurity under OpenAI's Preparedness Framework.

**Key improvements over 5.2-Codex:** Fixed lint loops (models getting stuck in lint-fix cycles), better bug explanations, fixed flaky-test premature completion, improved codebase coherence, deep diffs for reasoning transparency.

**Practitioner reception (5 HN mentions, early):** One practitioner noted both GPT-5.3-Codex and Opus 4.6 "one shot a Gameboy emulator." Another observed the Terminal-Bench lead lasted only 35 minutes before Opus 4.6 launched.

### GPT-5.2 Codex

| Spec | Detail |
|------|--------|
| **Release** | January 14, 2026 |
| **Context** | 400K tokens |
| **Pricing** | $1.75/M input, $14/M output |
| **Cached input** | 90% discount |
| **Reasoning levels** | low, medium, high, xhigh |

The model that made Codex CLI competitive again. Context compaction automatically compresses older context into semantically faithful summaries, enabling coherent work across millions of tokens. Optimized for long-horizon tasks like refactors and migrations.

**Role in Amp:** Serves as both Deep mode (autonomous coding with extended thinking, works silently for 5-15 minutes) and Oracle (read-only planning/debugging advisor at medium reasoning). Amp chose medium reasoning for Oracle -- balancing analytical depth against speed and cost. GPT-5.2's different training lineage makes it complementary to Claude as a second-opinion model.

**Practitioner reception (9 HN mentions):** "Reliably good" in Codex CLI, earning "the default position" for one practitioner. Another found GPT-5.2 High and Opus 4.5 to be complementary: "they find different things." The negative signal: reports of progressive quality degradation over time, and some developers shifting to Claude or Gemini in response.

### GPT-5.2 (Base)

| Spec | Detail |
|------|--------|
| **Release** | December 11, 2025 |
| **Pricing** | $1.75/M input, $14/M output |
| **Cached input** | 90% discount ($0.175/M) |
| **Speed** | 92 tokens/sec at xhigh reasoning |

Three-tier architecture: Instant (fast, 200-800ms responses), Thinking (professional work, configurable reasoning), and Pro (mission-critical, ~10x cost of Thinking). AIME 2025: 100% without tools. GDPval: 70.9% wins/ties vs top industry professionals across 44 occupations.

**Practitioner reception (39 HN mentions, 7 positive, 15 negative):** The most negatively-received GPT variant. Practitioners describe a gap between strong benchmarks and user experience. One called it "everything I hate about 5 and 5.1, but worse." Reports of hallucination and progressive quality decline. However, those who use it at high reasoning for specific tasks -- particularly code review and debugging -- report strong results. The consensus: GPT-5.2 is strong at analysis but weaker than Opus at autonomous coding.

### GPT-5.1

| Spec | Detail |
|------|--------|
| **Release** | November 12, 2025 |
| **Pricing** | $1.25/M input, $10/M output |
| **Cached input** | 90% discount |

Warmer personality than 5.0, with adaptive reasoning and customizable personalities (8 options). Pricing unchanged from GPT-5.

**GPT-5.1-Codex-Max (November 19, 2025):** The agentic specialist. SWE-Bench Verified: 77.9% (with xhigh reasoning). Observed working autonomously on tasks for 24+ hours. Supports low, medium, high, and xhigh reasoning levels. Terminal-Bench 2.0: 58.1%.

**Practitioner reception (9 HN mentions, skewing negative):** GPT-5.1 was caught hallucinating its own product roadmap. Some developers reported quality degradation across the 5.x line.

### GPT-5.0

| Spec | Detail |
|------|--------|
| **Release** | August 7, 2025 |
| **Context** | 400K tokens |
| **Pricing** | $1.25/M input, $10/M output |
| **Variants** | gpt-5, gpt-5-mini ($0.25/$2), gpt-5-nano ($0.05/$0.40) |

The unified model that replaced GPT-4, GPT-4o, GPT-4.1, GPT-4.5, o3, and o4-mini. Internal router system automatically chooses between fast and deep thinking modes. Hallucination rate: 9.6% (down from GPT-4o's 12.9%).

**Reception was notably rough:** Users had no control over the router at launch. Many preferred GPT-4o's warmer tone. The 5.0 release had a 15% failure rate on structured formatting tasks where Mistral achieved 0.1%, and timeout rates above 50% with six-minute limits. Amp evaluated GPT-5 as a primary agent and rejected it after one week, citing slow reasoning, research loops, poor tool selection, and invalid JSON for tool arguments.

### GPT-4.1 Family

Still relevant for cost-sensitive production workloads needing massive context.

| Variant | Input $/M | Output $/M | Context |
|---------|----------|-----------|---------|
| GPT-4.1 | $2.00 | $8.00 | 1M tokens |
| GPT-4.1 mini | $0.40 | $1.60 | 1M tokens |
| GPT-4.1 nano | $0.10 | $0.40 | 1M tokens |

No reasoning levels (pre-dates the reasoning effort system). GPT-4.1 nano at $0.10/$0.40 remains one of the cheapest capable models available for classification and extraction tasks.

---

## Gemini Variants (Google)

### Gemini 3 Pro

| Spec | Detail |
|------|--------|
| **Release** | November 18, 2025 |
| **Context** | 1M input / 64K output |
| **Pricing (standard)** | $2.00/M input, $12/M output |
| **Pricing (>200K)** | $4.00/M input, $18/M output |
| **Thinking** | `thinkingLevel`: high (default), low |
| **Deep Think** | Available to AI Ultra subscribers |

Top of the LMSYS Chatbot Arena at 1501 Elo. AIME 2025: 100% with code execution. SWE-Bench Verified: 76.2%. Described by Amp as having "impressively clever" tool deployment and "uncannily good" prose writing.

**The reliability problem:** Despite top benchmark scores, Gemini 3 Pro exhibited serious production issues when Amp adopted it as their primary agent. Documented problems included infinite thinking loops (3-5% of requests at scale), thinking prose leaking into outputs, control character corruption, reluctance to execute bash commands, unrequested git commits despite explicit instructions, and using relative paths instead of absolute. Amp switched away after approximately one week.

**Amp's evaluation:**

| Metric | Gemini 3 Pro | vs Opus 4.5 |
|--------|-------------|-------------|
| Internal Evals | 53.7% | -3.6% |
| Thread Cost | $2.04 | -$0.01 cheaper |
| Off-the-Rails | 17.8% | 7.4x more waste |
| Speed (p50) | 4.3 min | 0.8 min slower |

The off-the-rails metric tells the story: nearly 1 in 5 dollars went to problematic outputs. The model is capable at its best but unpredictable at its worst.

**Current Amp role:** Review agent (code review with agentic depth). Also available via [Gemini CLI](/tools/gemini-cli.html) as `gemini-3-pro-preview`.

### Gemini 3 Flash

| Spec | Detail |
|------|--------|
| **Release** | December 17, 2025 |
| **Context** | 1M input / 64K output |
| **Pricing** | $0.50/M input, $3/M output |
| **Speed** | 218 tokens/sec |
| **Thinking** | `thinkingLevel`: high (default), medium, low, minimal |

The parallel processing specialist. Achieves ~8 parallel tool calls per iteration versus Haiku 4.5's ~2.5, completing searches in ~3 turns instead of ~9. This makes it 3x faster than Haiku for codebase search at the same quality.

**Amp roles:** Search subagent (codebase retrieval) and Look At system (image/PDF/media analysis). Replaced Haiku 4.5 as Search agent in December 2025.

**Agentic Vision (February 2026):** Converts image understanding from static analysis to an agentic process. The model formulates a plan for how to inspect an image, combining visual reasoning with Python code execution. Delivers 5-10% quality boost across vision benchmarks.

**Known issues:** Can experience infinite reasoning loops at scale (3-5% of requests). Latency degrades significantly with >500K token prompts (from 1-2s to 8-12s). 22% slower raw token output than Gemini 2.5 Flash.

### Gemini 2.5 Flash

| Spec | Detail |
|------|--------|
| **Context** | 1M tokens |
| **Pricing** | $0.15/M input, $0.60/M output (non-thinking), $3.50/M output (thinking) |
| **Speed** | 392.8 tokens/sec, 0.29s time-to-first-token |
| **Thinking** | `thinkingBudget`: 0 to 24,576 tokens; default: dynamic (-1) |

One of the fastest production-grade models available. Still used by Amp as the Handoff system model (context analysis for task continuation). Default model for simple prompts in Gemini CLI auto-routing.

**Cost warning:** Thinking mode makes it dramatically more expensive -- 150x versus Gemini 2.0 Flash due to 9x more expensive output tokens combined with 17x higher token usage.

### Gemini 2.5 Flash-Lite

| Spec | Detail |
|------|--------|
| **Release** | July 22, 2025 |
| **Context** | 1M tokens |
| **Pricing** | $0.10/M input, $0.40/M output |
| **Speed** | 392.8 tokens/sec |
| **Thinking** | Off by default (can be enabled) |

Google's cheapest model in the 2.5 family. 50% less verbose output than standard Flash. Used by Amp as the Topics system model (thread categorization for indexing and analytics). Ideal for high-volume classification and routing tasks.

### Gemini 3 Pro Image

| Spec | Detail |
|------|--------|
| **Pricing** | $0.134/image (2K), $0.24/image (4K) |
| **Capabilities** | Generation, editing, text rendering, physics control |
| **Resolution** | Up to 4K output |

Separate model optimized for image generation and editing, built on Gemini 3 Pro's reasoning. Supports up to 14 reference images. Used by Amp as the Painter system model. Preview-stage reliability: ~45% of API calls during peak hours result in errors.

---

## Open-Weight Models

### DeepSeek V3 / V3.1

| Spec | Detail |
|------|--------|
| **Parameters** | 671B total (MoE), 37B active |
| **Context** | 128K tokens |
| **API pricing (official)** | $0.07/M input (cache hit), $0.56/M (miss), $1.68/M output |
| **Training cost** | ~$5.6M (2.788M H800 GPU hours) |

The most capable open-weight option for general coding. SWE-bench Verified: 45.4% (V3-0324). The V3-0324 update brought major gains: AIME jumped from 39.6% to 59.4% (+19.8), LiveCodeBench from 39.2% to 49.2%.

**Self-hosting economics:** Running the full 671B model on consumer hardware (dual RTX 5090s) costs roughly $30K over three years including electricity, yielding $30-60 per million tokens -- more expensive than cloud API pricing. The breakeven only works at sustained high volume or when data sovereignty is the primary concern.

**Hardware requirements:** FP8 (recommended): ~750 GB VRAM, minimum 8x H100 80GB. Consumer-grade: not feasible for full model; distilled variants (7B, 16B) run on RTX 4090.

### DeepSeek R1

| Spec | Detail |
|------|--------|
| **Parameters** | 671B total (MoE), 37B active |
| **Context** | 128K tokens |
| **Architecture** | MoE with RL-based reasoning training |

The reasoning specialist. Differs from V3 in purpose: V3 is the fast general-purpose model, R1 is the specialized reasoner. Exposes step-by-step chain-of-thought in `<think>` tags, enabling verification.

**Distilled variants for local use:**

| Variant | Parameters | Hardware Minimum | Best For |
|---------|-----------|-----------------|----------|
| R1-Distill-Qwen-7B | 7B | 8GB VRAM (INT4) | Consumer GPU, rapid iteration |
| R1-Distill-Qwen-14B | 14B | 16GB VRAM (INT4) | Mid-range, balanced |
| R1-Distill-Qwen-32B | 32B | 32GB VRAM (INT4) | Best reasoning among mid-tier |
| R1-Distill-Llama-70B | 70B | 70GB VRAM (INT4) | Maximum distilled performance |

### Llama 4 Scout / Maverick

| Variant | Total Params | Active Params | Context | Experts |
|---------|-------------|--------------|---------|---------|
| Scout | 109B | 17B | 10M tokens | 16 |
| Maverick | 400B | 17B | 1M tokens | 128 |

Released April 5, 2025. Scout runs on a single H100 (INT4 quantized) with an industry-leading 10M token context window. Maverick needs multi-GPU but delivers substantially higher quality with 128 experts. Both use early fusion multimodality.

**API pricing:** Scout at $0.11/M (Groq) is among the cheapest capable models. Maverick at $0.50/M (Groq) trades cost for quality. Behemoth (~2T parameters) exists only in limited research preview.

### Qwen 3 Family

The efficiency story: Qwen3-8B outperforms Qwen2.5-14B. Qwen3-32B matches Qwen2.5-72B. A generational improvement in parameter efficiency through strong-to-weak distillation.

| Variant | Params | Active | LiveCodeBench | Best For |
|---------|--------|--------|--------------|----------|
| Qwen3-8B | 8B dense | 8B | 60.2 | RTX 3060, rapid iteration |
| Qwen3-30B-A3B (MoE) | 30.5B | 3.3B | -- | Local inference, consumer hardware |
| Qwen3-32B | 32B dense | 32B | -- | Single H100 balance of quality/speed |
| Qwen3-Coder-480B-A35B | 480B | 35B | -- | Maximum open-weight coding (SWE: 66.5%) |

Qwen3-30B-A3B is the standout for local use: outperforms every dense 72B-110B model on coding and math while running on 32GB RAM (INT4). Achieves 100+ tokens/sec on Apple M4 Max.

### Mistral

| Variant | Params | Input $/M | Output $/M | SWE-bench |
|---------|--------|----------|-----------|-----------|
| Medium 3 | MoE | $0.40 | $2.00 | -- |
| Small 3 | 24B | -- | -- | -- |
| Devstral 2 | 123B dense | $0.40 | $2.00 | 72.2% |
| Devstral Small 2 | 24B | $0.10 | $0.30 | 68.0% |

Mistral's standout claim: a 0.1% structured output failure rate on formatting tasks where GPT-5 failed 15% of the time. Devstral Small 2 is the best open-weight coding model at its size (24B) -- runs on a single RTX 4090 with 68% SWE-bench.

### Kimi K2.5

| Spec | Detail |
|------|--------|
| **Parameters** | 1T total (MoE), 32B active |
| **Context** | 256K tokens |
| **API pricing** | $0.60/M input, $3/M output |
| **SWE-bench Verified** | 76.8% |
| **LiveCodeBench** | 85.0% |

From Moonshot AI. The LiveCodeBench score of 85.0% significantly exceeds Opus 4.5's 64.0%, though Opus leads on SWE-bench Verified (80.9% vs 76.8%). Specialized strength in visual coding -- generating code from UI designs and wireframes. Can self-direct up to 100 sub-agents with 1,500 tool calls.

**Cost position:** 76% lower than Opus 4.5 for comparable coding tasks. Best suited for cost-sensitive deployments, parallel workflows, and vision-based frontend development.

---

## Reasoning Level Deep Dive

All three major providers now offer configurable reasoning depth. Understanding these settings is one of the highest-leverage optimizations for both cost and quality.

### Cross-Provider Comparison

| Provider | Parameter | Levels | Default |
|----------|-----------|--------|---------|
| OpenAI | `reasoning.effort` | none, minimal, low, medium, high, xhigh | medium (pre-5.1), none (5.1+) |
| Anthropic | `effort` | low, medium, high, max | high |
| Anthropic (legacy) | `budget_tokens` | 1,024 to 128K | 31,999 (Claude Code) |
| Google (2.5 models) | `thinkingBudget` | 0 to 32,768 | 8,192 (Pro), -1/dynamic (Flash) |
| Google (3.x models) | `thinkingLevel` | minimal, low, medium, high | high |

### OpenAI Reasoning Effort

Six levels from `none` (traditional LLM, sub-second responses) through `xhigh` (maximum compute, available on GPT-5.2-Codex and GPT-5.2 Pro). Reasoning tokens are billed as output tokens at the standard rate -- no separate multiplier, but higher effort means more tokens consumed.

**Latency scaling:** Low is often under 1 second. Medium is ~3x longer. High is ~3x longer than medium (~9x longer than low). xhigh adds further latency on top.

**Amp's Oracle configuration:** GPT-5.2 with medium reasoning -- found to balance analytical depth against speed and cost for planning and debugging tasks.

### Claude Effort Parameter

Four levels: low, medium, high (default), and max (Opus 4.6 exclusive). The effort parameter is a behavioral signal, not a strict token budget. At lower effort, Claude will still think on sufficiently difficult problems -- it just thinks less.

**Adaptive thinking (Opus 4.6):** `thinking: {type: "adaptive"}` lets the model dynamically allocate reasoning based on task difficulty. Recommended over manual `budget_tokens` on Opus 4.6. Combined with the effort parameter for best results.

**Extended thinking costs:** Thinking tokens are billed at the model's output token rate ($25/M for Opus, $15/M for Sonnet, $5/M for Haiku). You are charged for full thinking tokens, not the summarized version -- billed output count will not match visible token count.

### Gemini Thinking Configuration

Two systems depending on model generation. Gemini 2.5 models use `thinkingBudget` (0 to 32,768 tokens, or -1 for dynamic). Gemini 3 models use `thinkingLevel` (high, medium, low, minimal). Cannot disable thinking entirely on Gemini 3 Pro. Gemini 3 Flash's `minimal` level means the model likely will not think but still can.

### Per-Task Reasoning Recommendations

| Task Type | OpenAI | Claude | Gemini |
|-----------|--------|--------|--------|
| Quick edits, formatting | none or low | low | minimal or low |
| Daily coding (default) | medium | medium or high | medium (Flash) or high |
| Complex debugging, architecture | high | high | high |
| Benchmarks, critical reviews | xhigh | max (Opus 4.6) | high + Deep Think |
| Simple completions | none (GPT-5.1+) | low | minimal |

### Tool-Specific Configuration

| Tool | Model Config | Reasoning Config |
|------|-------------|------------------|
| [Codex CLI](/tools/codex.html) | config.toml profiles, `/model` | `model_reasoning_effort` in config |
| [Claude Code](/tools/claude-code.html) | `/model` with effort slider | `effortLevel` in settings, `CLAUDE_CODE_EFFORT_LEVEL` env var |
| [Gemini CLI](/tools/gemini-cli.html) | settings.json, `--model` flag | `thinkingBudget` / `thinkingLevel` in settings |
| [Cursor](/tools/cursor.html) | Settings > Models | Thinking toggle, MAX mode, Auto-select |
| [Copilot](/tools/copilot.html) | Model dropdown, Auto mode | Think Mode toggle (some models) |
| [Windsurf](/tools/windsurf.html) | Cascade model selector | Reasoning effort on GPT-5.2-Codex (low/medium/high/xhigh) |
| [Aider](/tools/aider.html) | `--model` flag, config YAML | `--reasoning-effort`, `--thinking-tokens` |
| [Cline](/tools/cline.html) | BYOK per provider | UI reasoning effort config, Plan/Act workflow |

---

## Amp's Complete Model Roster

[Amp Code](/tools/amp.html) provides the most concrete example of production multi-model routing, using 15 distinct model deployments across 5 vendors.

### User-Facing Modes

| Mode | Model | Purpose | Performance |
|------|-------|---------|-------------|
| **Smart** | Claude Opus 4.6 | Collaborative pair-programming | Default; highest first-try success |
| **Rush** | Claude Haiku 4.5 | Small, well-defined tasks | 67% cheaper, 50% faster than Smart |
| **Deep** | GPT-5.2 Codex | Extended thinking, autonomous | Works silently 5-15 min before changes |

### Feature & Subagent Models

| Role | Model | Purpose |
|------|-------|---------|
| **Review** | Gemini 3 Pro | Agentic bug identification and code review |
| **Search** | Gemini 3 Flash | Codebase retrieval (~8 parallel tool calls/iteration) |
| **Oracle** | GPT-5.2 (medium reasoning) | Read-only planning, debugging, code review |
| **Librarian** | Claude Sonnet 4.5 | External code research, GitHub repo search |

### System Models (Auxiliary)

| Role | Model | Purpose |
|------|-------|---------|
| **Look At** | Gemini 3 Flash | Image, PDF, and media file analysis |
| **Painter** | Gemini 3 Pro Image | Image generation and editing |
| **Handoff** | Gemini 2.5 Flash | Context analysis for task continuation |
| **Topics** | Gemini 2.5 Flash-Lite | Thread categorization for analytics |
| **Titling** | Claude Haiku 4.5 | Fast title generation |
| **Amp Tab** | Custom fine-tuned model | Code completion (SFT + DPO, TensorRT-LLM) |

### The Off-the-Rails Metric

Amp's most original contribution to model evaluation -- the percentage of total spend wasted on problematic outputs. This captures something benchmarks miss entirely: how much a model costs when it fails.

| Model | Internal Evals | Thread Cost | Off-the-Rails | Speed (p50) |
|-------|---------------|------------|--------------|-------------|
| Claude Sonnet 4.5 | 37.1% | $2.75 | 8.4% | 2.4 min |
| Gemini 3 Pro | 53.7% | $2.04 | 17.8% | 4.3 min |
| Claude Opus 4.5 | 57.3% | $2.05 | 2.4% | 3.5 min |

Gemini 3 Pro wasted nearly 1 in 5 dollars on bad outputs. Opus wasted 1 in 40. When you factor in developer time spent identifying, reverting, and re-doing failed work, the real-world cost difference is larger than the numbers suggest.

**The principle:** Waste percentage matters as much as peak capability. A model that scores 10 points lower on benchmarks but wastes 7x less on dead ends is the better engineering choice.

### Model Switching Timeline

Amp switched primary models six times in twelve months, demonstrating that model selection is a dynamic engineering decision:

| Date | Primary Model | Reason for Switch |
|------|-------------|-------------------|
| Feb 2025 | Claude Sonnet 3.5/3.7 | Launch |
| Jun 2025 | Claude Sonnet 4 | Faster, more stable, better tool calling |
| Sep 2025 | Claude Sonnet 4.5 | Reduced sycophancy, better debugging |
| Dec 2025 | Gemini 3 Pro | +17 points on Terminal-Bench 2.0 |
| Jan 2026 | Claude Opus 4.5 | Gemini's 17.8% off-the-rails rate |
| Feb 2026 | Claude Opus 4.6 | Current |

### Models Evaluated and Rejected

Amp tested but did not adopt as primary: Kimi K2, Qwen3-Coder, GLM-4.5, GPT-OSS, Grok, Gemini 2.5. GPT-5 was evaluated for one week as a primary agent and repositioned to Oracle role due to slow reasoning, research loops, and poor tool selection.

---

## Multi-Model Routing Strategies

### The DreamTeam Concept

A practitioner-reported configuration pairing models from all three major providers by specialization:

| Role | Model | Reasoning | Rationale |
|------|-------|-----------|-----------|
| Architect/Planner | Claude Opus 4.6 or GPT-5.2 | max / xhigh | Deep multi-step reasoning |
| Implementer | Claude Sonnet 4.5 or GPT-5.1 | medium / none | Speed; plan already exists |
| Reviewer | Claude Opus 4.6 or GPT-5.2 | high / high | Thorough analysis, complementary perspectives |
| Security | Gemini 3 Pro | high | Broad pattern recognition |
| Test Writer | Gemini 3 Flash or Haiku 4.5 | low / medium | Formulaic work |
| Codebase Search | Gemini 3 Flash | -- | 3x faster with parallel tool calls |
| Legacy Code Reader | Grok | -- | Used as "archaeologist" agent |

One practitioner reported getting the best code quality with "a full project team using opencode with multiple sub agents which are all managed by a single Opus instance" -- giving each subagent a specialized role (coder, reviewer, tester, documentation writer) using different models.

### Cross-Model Review Pattern

A specific pattern that emerged from HN discussions: using GPT-5.2 at high reasoning to review code written by Opus 4.5. As one practitioner noted, "they find different things." The different training lineages make models complementary rather than redundant for review tasks.

### Escalate-on-Failure Pattern

The most widely adopted multi-model strategy:

1. Start with low reasoning effort or a cheaper model
2. If the task fails (test failure, lint error, wrong output), retry with higher reasoning
3. Continue escalating: low to medium to high to xhigh, or Haiku to Sonnet to Opus
4. Log escalation events to learn which tasks need higher reasoning by default

This naturally optimizes cost while maintaining quality. Both [Codex CLI](/tools/codex.html) (via config profiles) and [Claude Code](/tools/claude-code.html) (via the `/model` effort slider) support this workflow.

---

## Complete Cost Reference

### Frontier Models (Per Million Tokens)

| Model | Input | Output | Cache Discount | Context |
|-------|-------|--------|---------------|---------|
| **Claude Opus 4.6** | $5.00 | $25.00 | 90% | 200K / 1M beta |
| Claude Opus 4.6 (>200K) | $10.00 | $37.50 | -- | 1M |
| **Claude Sonnet 4.5** | $3.00 | $15.00 | 90% | 200K / 1M API |
| **Claude Haiku 4.5** | $1.00 | $5.00 | 90% | 200K |
| **GPT-5.2 / 5.2-Codex** | $1.75 | $14.00 | 90% | 400K |
| GPT-5.2 Pro | ~$17.50 | ~$140.00 | -- | 400K |
| **GPT-5.3-Codex** | ~$1.75 | ~$14.00 | TBD | 400K |
| GPT-5.0 / 5.1 | $1.25 | $10.00 | 90% | 400K |
| GPT-5 mini | $0.25 | $2.00 | 90% | 400K |
| GPT-5 nano | $0.05 | $0.40 | 90% | 400K |
| **Gemini 3 Pro** | $2.00 | $12.00 | -- | 1M |
| Gemini 3 Pro (>200K) | $4.00 | $18.00 | -- | 1M |
| **Gemini 3 Flash** | $0.50 | $3.00 | -- | 1M |
| Gemini 2.5 Flash | $0.15 | $0.60 | -- | 1M |
| Gemini 2.5 Flash-Lite | $0.10 | $0.40 | -- | 1M |
| **GPT-4.1** | $2.00 | $8.00 | -- | 1M |
| GPT-4.1 mini | $0.40 | $1.60 | -- | 1M |
| GPT-4.1 nano | $0.10 | $0.40 | -- | 1M |

### Open-Weight / API Models

| Model | Input $/M | Output $/M | Provider |
|-------|----------|-----------|----------|
| DeepSeek V3 (cache hit) | $0.07 | $1.68 | Official API |
| DeepSeek V3 (cache miss) | $0.56 | $1.68 | Official API |
| Llama 4 Scout | $0.11 | varies | Groq |
| Llama 4 Maverick | $0.50 | varies | Groq |
| Devstral Small 2 | $0.10 | $0.30 | Mistral |
| Mistral Medium 3 | $0.40 | $2.00 | Mistral |
| Kimi K2.5 | $0.60 | $3.00 | Moonshot |
| Qwen3 (various) | $0.20-$1.20 | varies | Alibaba Cloud |

### Subscription Plans

| Plan | Monthly | What You Get |
|------|---------|-------------|
| Claude Pro | $20 | Sonnet primary, limited Opus |
| Claude Max 5x | $100 | Full Opus 4.6, 1M context, agent teams |
| Claude Max 20x | $200 | 20x Pro usage, everything in 5x |
| ChatGPT Plus | $20 | GPT-5.x access, Codex |
| ChatGPT Pro | $200 | xhigh reasoning, maximum quality |
| Gemini CLI | Free | 1,000 requests/day (mix of Flash and Pro) |

### What Practitioners Actually Spend

- **Individual developers:** Claude Max at $100-200/month flat rate. One practitioner described never exceeding 80% of the weekly limit at $200/month. Cursor tracked at $928 over 70 days (~$416/month) with heavy use.
- **Per-thread (Amp data):** $2.05 with Opus, $2.04 with Gemini 3 Pro, $2.75 with Sonnet. Comparable headline numbers but dramatically different waste profiles.
- **Annual baseline:** Multiple sources converge on $5-6K per year per developer for AI tooling.
- **Cache optimization:** One Cursor user achieved 88.8% cache hit rate, bringing effective cost per 1,000 tokens to $0.0009. Understanding your tool's caching behavior can reduce spend by an order of magnitude.

---

## Domain-Specific Recommendations (Variant Precision)

Based on aggregated practitioner reports across all sources:

| Domain | Top Choice | Config | Runner-Up |
|--------|-----------|--------|-----------|
| Full-stack web (React) | Opus 4.6 via Claude Code | high effort | Opus 4.5 |
| Rust | Opus 4.6 + cargo check loop | high effort | -- |
| C# | Opus 4.5/4.6 | high effort | -- |
| C++ (mainstream) | Opus 4.5/4.6 | high effort | Gemini 3 Pro |
| 3D / Graphics / Spatial | Gemini 3 Flash | high thinking | -- |
| Low-level C / Shaders | GPT-5.2-Codex | high reasoning | -- |
| CUDA kernels | Opus 4.5/4.6 | max effort | -- |
| Transpilation | GPT-5.2 | high reasoning | -- |
| Structured output | Mistral Medium 3 | -- | GPT-4.1 mini |
| Architecture guidance | Opus 4.6 at max effort | + Kimi K2.5 | GPT-5.2 xhigh |
| Codebase search | Gemini 3 Flash | default thinking | Haiku 4.5 |
| Code review | GPT-5.2 high + Opus 4.6 | cross-model | Gemini 3 Pro |
| Complex debugging | GPT-5.2 Codex xhigh | autonomous mode | Opus 4.6 max |
| Legacy code reading | Grok | -- | Opus 4.6 (1M context) |
| Data science | Opus 4.5/4.6 | high effort | GPT-5.2 Thinking |
| Batch analysis | GPT-5.2 Pro | xhigh | -- |
| Local coding (single GPU) | Devstral Small 2 (24B) | -- | Qwen3-30B-A3B |
| Local coding (Mac) | Qwen3-30B-A3B | -- | Devstral Small 2 |
| Swift | None excel | -- | -- |

These are practitioner opinions, not controlled evaluations. Your mileage will vary based on codebase, prompt quality, and harness configuration. The most reliable approach remains: test on your own workload, track your own metrics, and maintain the ability to switch.

For comprehensive tool-by-tool comparison, see the [Tool Comparison Matrix](/tools/compare.html). For the principles behind choosing and switching models, see [Model Selection](/practices/model-selection.html).
