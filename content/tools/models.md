---
title: "Model Deep Dive"
description: "Which model for which task — combining Amp's evaluation data with 6,000+ practitioner reports."
weight: 2
tags: [models, model-selection, comparison, costs]
date: 2026-02-06
---

The [model selection](/practices/model-selection.html) practice page covers the principles: start cheap, escalate on failure, use multiple models, ignore benchmarks in favor of your own workload. This page is the complement -- a deep look at specific models, how they compare in real-world usage, and what they actually cost when practitioners put them to work.

The data here comes from two sources: Amp Code's published model evaluation data (including their distinctive "off-the-rails" metric), and practitioner reports from over 6,000 Hacker News comments across 20+ discussion threads.

## The Model Landscape (February 2026)

The frontier has stabilized into three major providers and a growing open-weight tier. Every provider now offers models at multiple capability levels, and the practical differences between tiers often matter more than the differences between providers at the same tier.

**Anthropic:** Claude Opus 4.6 (frontier), Sonnet 4.5 (mid-tier), Haiku 4.5 (lightweight). Single-provider stack used by Claude Code.

**OpenAI:** GPT-5.2/5.3 (frontier), GPT-4.1 (mid-tier), GPT-4.1 mini (lightweight). Powers Codex CLI and is available through Copilot.

**Google:** Gemini 3 Pro (frontier), Gemini 3 Flash / 3.5 Flash (mid-tier/fast). Available through Gemini CLI and as subagents in Amp Code.

**Open-weight:** DeepSeek (671B parameter flagship), Llama 4, Qwen 3, Mistral. Runnable locally or through inference providers.

**Emerging:** Kimi 2.5 from Moonshot AI has drawn practitioner attention for architecture guidance tasks alongside Opus.

The most notable shift in late 2025 and early 2026 is that tools increasingly use multiple providers simultaneously. Amp Code draws from all three major providers. Multi-agent setups mix Claude, GPT, and Gemini in specialized roles. Single-vendor loyalty is fading.

## Model-by-Model Profiles

### Claude Opus 4.5 / 4.6

**Best at:** Full-stack web development (especially React), Rust development with cargo check loops, agentic autonomous coding, multi-file refactoring, code review that identifies structural problems rather than offering polite suggestions, AWS troubleshooting, CUDA kernel development, SIMD/NEON optimizations, and following complex instructions over sustained interactions.

**Weaknesses:** Swift API coverage lags (latest Swift APIs trip it up), novel 3D graphics algorithms remain difficult, and it defaults to popular framework choices like ReactRouter even when alternatives are specified -- a training data bias. One practitioner noted it was "terrible with C++" for shadowing algorithms, though another called it "incredible at C++," suggesting the gap is between mainstream and niche C++ use cases.

**Cost profile:** Amp's evaluation data shows an average thread cost of $2.05 with Opus -- nearly identical to Gemini 3 Pro ($2.04) despite higher per-token pricing. The reason: Opus wastes far fewer tokens on dead ends. Claude Code Max subscriptions run $100-200/month flat rate.

**Speed:** Moderate. Amp measured a median of 3.5 minutes per thread -- faster than Gemini 3 Pro (4.3 min) but slower than Sonnet 4.5 (2.4 min).

**Reliability:** This is where Opus stands apart. Amp's off-the-rails metric showed only 2.4% of spend wasted on problematic outputs. One practitioner described the Sonnet-to-Opus upgrade as delivering a 20% quality lift on CTF challenge solving. Another reported 259 PRs and 497 commits in 30 days using Claude Code with Opus.

**Opus 4.6 specifically:** Launched with a 1M token context window. In needle-in-haystack testing, it found 49 of 50 target items across roughly 733K tokens of text -- substantially outperforming Gemini Flash on the same test.

### Claude Sonnet 4.5

**Best at:** Implementation tasks within an already-defined architecture, high-volume coding where speed matters more than peak reasoning, research and retrieval tasks as a subagent.

**Weaknesses:** Struggles with some validation tasks that Opus handles cleanly. Multiple practitioners describe it as the model you use when cost matters and the task is well-defined, but not when you need novel problem-solving. As one commenter put it, there is now "little reason to use Sonnet" given Haiku for simple tasks and Opus for everything else.

**Cost profile:** Amp measured $2.75 per thread -- actually more expensive than Opus ($2.05) at the thread level because it requires more iterations to reach correct solutions.

**Speed:** The fastest of the three models Amp tested, at 2.4 minutes median per thread. This is its primary advantage.

**Multi-agent role:** Practitioners use Sonnet as the architect or senior developer in multi-agent setups -- handling implementation alongside Opus for planning.

### Claude Haiku 4.5

**Best at:** Quick summaries, boilerplate generation, test writing, and any task where latency matters more than depth.

**Speed:** Described repeatedly as "lightning fast." This is the model for tight iteration loops on well-defined tasks.

**Multi-agent role:** Junior developer and test writer in multi-agent teams. Amp uses it as their Rush mode for small, well-defined tasks.

**Cost:** The cheapest Claude tier. Best deployed for high-volume simple tasks where per-request cost compounds.

### GPT-5.x Family (5.0, 5.1, 5.2)

**Best at:** Extended thinking mode delivers strong reasoning on complex problems -- one practitioner reported it beats Opus 4.5 by a significant margin when given time. Good for transpilation tasks, general research, and planning. GPT-5.2 serves as Amp's Deep reasoning and Oracle planning agent.

**Weaknesses:** Speed is a serious constraint. Extended thinking mode runs roughly 4x slower than Opus, making it impractical for interactive development. GPT-5.1 was caught hallucinating its own product roadmap -- claiming Codex had been discontinued when it had not. The 5.0 release had a 15% failure rate for structured formatting tasks where Mistral achieved 0.1%, and timeout rates above 50% with six-minute limits.

**Cost profile:** Home inference on GPT-class models runs $30-60 per million tokens -- more expensive than cloud API pricing, which undercuts the self-hosting argument for these models. API pricing is competitive with Opus at the frontier tier.

**Multi-agent role:** Planning and deep reasoning. The DreamTeam concept pairs GPT 5.2 Max for planning with Opus for coding and Gemini for security review. Amp uses GPT-5.2 as both their Deep (reasoning) and Oracle (planning) subagents.

### Gemini 3 Pro / Flash / 3.5 Flash

**Best at:** Fast codebase search (Gemini 3 Flash achieved 3x faster search than Haiku 4.5 in Amp's testing, using 8 parallel tool calls per iteration versus 2.5 for Haiku). 3D understanding and graphics tasks. Large-scale infrastructure with reliable uptime. Gemini Flash offers strong performance at roughly $3 per million tokens.

**Weaknesses:** Gemini 3 Pro exhibited serious reliability problems when Amp adopted it as their primary agent. Documented issues included infinite thinking loops, thinking prose leaking into visible outputs, control character corruption, reluctance to execute bash commands, unrequested git commits, and using relative paths instead of absolute. A Czech academic study found 76% of Gemini answers had quality issues. In JetBrains IDEs, one practitioner called it "laughably bad."

**Cost profile:** Amp measured $2.04 per thread with Gemini 3 Pro -- the cheapest at the thread level. But 17.8% of that spend was wasted on off-the-rails outputs, meaning nearly 1 in 5 dollars went to problematic results. Gemini Flash at ~$3/Mtok is positioned as the budget-friendly option. Google's TPU infrastructure avoids Nvidia GPU pricing, potentially giving them a structural cost advantage.

**Speed:** Paradoxically, Gemini 3 Pro was the slowest at 4.3 minutes median despite being positioned as a fast alternative. Gemini Flash lives up to its name.

**Infrastructure:** Google has the most reliable serving infrastructure among the three major providers. While Anthropic faces periodic capacity constraints, Google's scale means more consistent availability.

**Multi-agent role:** Gemini 3 Flash serves as Amp's Search subagent (codebase retrieval). Gemini 2.5 has been used as a librarian/documentation agent. Gemini Pro 3 appears in the DreamTeam concept for security review.

### DeepSeek

**Best at:** Self-hosted inference for teams with privacy requirements or very high volume workloads.

**Cost profile:** The economics are nuanced. A competent local inference machine runs $10-20K for hardware (or $4K for a budget version). Running DeepSeek 671B on dual RTX 5090s costs roughly $30K over three years including electricity. At that scale, inference runs $30-60 per million tokens -- actually more expensive than cloud API pricing for moderate usage. The breakeven only works at sustained high volume. An 8xB200 cluster ($500K hardware) delivers 30K tokens per second and roughly 1 trillion tokens per year at full utilization.

**Adoption:** Widely used outside the US. The primary appeal is sovereignty and privacy rather than cost.

### Mistral

**Best at:** Structured output formatting. One practitioner documented a 0.1% failure rate on formatting tasks where GPT-5 failed 15% of the time. Positioned as a reliable, cost-effective option for well-defined tasks.

**Cost profile:** Priced competitively at the lower tier. Available through OpenRouter and other inference aggregators.

**Trend:** Part of the commoditization wave. Models are becoming interchangeable for simple tasks, and Mistral competes effectively in that space.

### Kimi 2.5

An emerging model from Moonshot AI that practitioners describe as strong at architecture guidance -- comparable to Opus for high-level design discussions. Limited practitioner data so far, but worth watching.

## Head-to-Head Comparisons

### Claude Opus vs GPT-5.x: The Frontier Rivalry

The most common comparison in practitioner discussions. The consensus is nuanced: GPT-5.2 in extended thinking mode produces higher-quality reasoning on complex problems, but runs 4x slower. Opus gets things right on the first attempt more consistently and is fast enough for interactive use. For autonomous agentic coding, Opus dominates practitioner preference. For batch analysis where latency does not matter, GPT-5.2 competes.

On reliability, the gap is significant. Opus wasted 2.4% of spend on bad outputs in Amp's testing. GPT-5.0 had a 15% structured output failure rate. GPT-5.1 hallucinated its own product discontinuation. Practitioners who need predictability choose Claude.

One practitioner summarized the dynamic: Anthropic models are "right first time," while ChatGPT and Gemini often have "fundamental misunderstandings" on the same tasks.

### Gemini vs Claude/GPT: The Benchmark Gap

Gemini consistently performs well on synthetic benchmarks but underperforms in practitioner reports. Despite topping benchmarks, it hallucinates more frequently than alternatives in practice. The Czech academic study quantified this: 76% of Gemini answers had issues with citation accuracy alone.

Where Gemini genuinely excels is infrastructure reliability and specific niches like 3D understanding (Gemini 3.5 Flash outperformed Sonnet on 3D tasks). Google's structural advantages -- TPU infrastructure, no Nvidia dependence, massive serving scale -- make Gemini the pragmatic choice when uptime and cost predictability matter more than peak capability.

### Fast Models: Sonnet vs Flash vs GPT-4.1

The workhorse tier where most daily coding happens. Sonnet 4.5 is the speed champion (2.4 min median) with strong instruction following. Gemini Flash excels at parallel operations -- 8 simultaneous tool calls versus Sonnet's 2-3. GPT-4.1 occupies the middle ground.

The counterintuitive finding from Amp's data: Sonnet was actually the most expensive per thread ($2.75) despite being the cheapest per token, because it needed more iterations. The cheapest model per token is not always the cheapest model per completed task.

### Open-Weight Models: DeepSeek vs Llama vs Qwen

A rapidly evolving space. Qwen 3's 8B parameter model outperformed Qwen 2.5's 72B model on 27 of 40 benchmarks -- a 9x size reduction for better performance, demonstrating how fast distillation and training improvements are closing the gap with frontier models.

DeepSeek remains the most capable open-weight option for coding. Llama 4 provides Meta's alternative. The primary differentiator is not capability but deployment flexibility: these models run on your hardware, under your control, with no data leaving your network.

## Amp's Model Routing: A Template for Multi-Model Architecture

Amp Code's agent role system provides the most concrete example of production multi-model routing. Rather than using one model for everything, they assign specialized roles:

| Role | Model | Why This Model |
|------|-------|----------------|
| **Smart** (primary coding) | Claude Opus 4.6 | Highest first-try success rate, lowest waste |
| **Rush** (fast tasks) | Claude Haiku 4.5 | Speed for small, well-defined work |
| **Deep** (reasoning) | GPT-5.2 Codex | Extended thinking for hard problems |
| **Oracle** (planning) | GPT-5.2 | Complex reasoning about code architecture |
| **Librarian** (research) | Claude Sonnet 4.5 | Large-scale retrieval and external code research |
| **Search** (codebase) | Gemini 3 Flash | Fast parallel tool calls for file search |

The key insight: they draw from all three providers simultaneously. No single provider dominates every task type. The willingness to route across vendor boundaries -- Claude for reliability, GPT for deep reasoning, Gemini for fast parallel operations -- represents where the industry is heading.

Amp switched primary models three times in three months (Sonnet 4.5 to Gemini 3 Pro to Opus 4.5 to Opus 4.6), demonstrating that model selection is a dynamic engineering decision, not a one-time architectural choice.

## The Off-the-Rails Metric

Amp's most original contribution to model evaluation is the "off-the-rails cost" -- the percentage of total spend wasted on problematic outputs. This captures something benchmarks miss entirely: how much a model costs when it fails, not just how often it succeeds.

| Model | Internal Evals | Avg Thread Cost | Off-the-Rails Cost | Speed (p50) |
|-------|---------------|----------------|--------------------|----|
| Claude Sonnet 4.5 | 37.1% | $2.75 | 8.4% | 2.4 min |
| Gemini 3 Pro | 53.7% | $2.04 | 17.8% | 4.3 min |
| Claude Opus 4.5 | 57.3% | $2.05 | 2.4% | 3.5 min |

The table reveals why Amp switched from Gemini to Opus despite Gemini's strong benchmark scores. Gemini 3 Pro wasted nearly 1 in 5 dollars on bad outputs -- outputs that were not just wrong but required recovery work. Opus wasted 1 in 40. When you factor in the developer time spent identifying, reverting, and re-doing failed work, the real-world cost difference is larger than the numbers suggest.

This metric aligns with practitioner intuition. Multiple HN commenters described Gemini producing "very frustrating behaviors" despite seemingly good capability. The problem is not what the model can do at its best -- it is what happens at its worst.

The off-the-rails metric suggests a general principle: **waste percentage matters as much as peak capability.** A model that scores 10 points lower on benchmarks but wastes 7x less on dead ends is the better engineering choice.

## Cost Reality

### What Practitioners Actually Spend

The data paints a clear picture of real-world AI coding costs:

**Individual developers:** Claude Code Max at $100-200/month flat rate is the most predictable option. One practitioner described spending $200/month and hitting the 5-hour rate limit exactly once while never exceeding 80% of the weekly limit. Cursor usage tracked at $928 over 70 days (~$416/month) with heavy use.

**Per-thread economics from Amp:** A typical coding thread costs $2.05 with Opus, $2.04 with Gemini 3 Pro, or $2.75 with Sonnet. These numbers are roughly comparable, but the waste profiles differ dramatically.

**Annual projection:** Multiple sources converge on $5-6K per year per developer as the baseline AI tooling cost. This aligns with Cursor at ~$416/month ($5K/year) and Claude Max at $200/month ($2.4K/year) plus occasional API overages.

**Enterprise scale:** One commenter reported processing over 1 billion tokens per month in enterprise agentic loops. At standard API pricing, this represents substantial infrastructure spend.

### The Cache Hit Rate Factor

A single data point illuminates how much caching matters: one Cursor user achieved an 88.8% cache hit rate, bringing the effective cost per 1,000 tokens down to $0.0009. Understanding and optimizing for your tool's caching behavior -- consistent prompts, stable context, avoiding unnecessary context resets -- can reduce spend by an order of magnitude.

### Self-Hosting Economics

Self-hosting is not the cost savings it appears to be for most teams. Running DeepSeek 671B on consumer hardware costs $30-60 per million tokens when you factor in hardware depreciation and electricity -- more than cloud API prices. The math only works at very high sustained utilization (think: an 8xB200 cluster processing a trillion tokens per year) or when the primary motivation is data sovereignty rather than cost.

### The Sustainability Question

AI tooling costs are likely subsidized. OpenAI reported $10 billion in annual losses. Google claims 33x energy reduction per text prompt over 12 months, but practitioners dispute whether inference costs are actually dropping as fast as providers claim. One commenter added a blunt environmental note about burning $400 in tokens in a single month: "this cannot be good for the environment."

The implication for practitioners: build workflows that are token-efficient regardless of current pricing, because prices may go up before they go down.

## Domain-Specific Recommendations

Based on aggregated practitioner reports across all sources:

| Domain | Top Choice | Runner-Up | Notes |
|--------|-----------|-----------|-------|
| Full-stack web (React) | Claude Opus | -- | Dominant across multiple threads |
| Rust | Claude Opus + cargo check | -- | Strong consensus from multiple practitioners |
| C# | Claude Opus | -- | Described as "ubercharged" for C# |
| C++ (mainstream) | Claude Opus | Gemini | Contested -- depends on the subdomain |
| 3D / Graphics | Gemini 3.5 Flash | -- | Outperforms Claude on spatial reasoning |
| Low-level C / Shaders | Codex (OpenAI) | -- | Specialist advantage |
| CUDA kernels | Claude Opus | -- | Practitioner-reported success with io_uring and CUDA |
| Transpilation | GPT-5 | -- | Specific strength noted by practitioners |
| Structured output | Mistral | -- | 0.1% failure vs 15% for GPT-5 |
| Architecture guidance | Opus + Kimi 2.5 | -- | Both praised for high-level design |
| Codebase search | Gemini Flash | -- | 3x faster than Haiku with parallel tool calls |
| Legacy code reading | Grok | -- | Used as "archaeologist" agent in multi-agent setup |
| Swift | None excel | -- | Struggles across all models |

These are practitioner opinions, not controlled evaluations. Your mileage will vary based on codebase, prompt quality, and harness configuration. The most reliable approach remains: test on your own workload, track your own metrics, and maintain the ability to switch.
