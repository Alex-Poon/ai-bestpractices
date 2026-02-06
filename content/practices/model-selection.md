---
title: "Model Selection"
description: "Choosing the right model for each sub-task — when to use fast models, when to use deep reasoning, and when to use multiple."
weight: 4
tags: [model-selection, multi-model, cost-optimization]
date: 2026-02-06
---

Model selection is the skill of matching the right model to the right task. The gap between a well-chosen and poorly-chosen model often matters more than the quality of the prompt itself. As models proliferate and differentiate, this is no longer a set-and-forget decision -- it is an ongoing practice of matching capability to need.

## What Model Selection Is

Model selection means choosing which AI model (or combination of models) to use for a specific task, based on the task's complexity, error tolerance, speed requirements, and cost constraints. It also means knowing when to switch models mid-task, when to use multiple models for cross-validation, and when to escalate from a cheap model to an expensive one.

The landscape as of early 2026 has settled into recognizable tiers, though the boundaries shift with every major release. Competition is fierce: **esperent** noted that latest models from all providers are "great and nearly commodities," while **callamdelaney** found that Claude models are "right first time for me" whereas ChatGPT and Gemini often have fundamental misunderstandings. The right model depends on your specific workload.

## Why It Matters

### First-try success saves more than per-token pricing

A frontier model that succeeds on the first try can be cheaper than a budget model that requires three attempts plus an hour of debugging. One developer documented spending $638 over six weeks on AI coding, with 85% of the budget going to Claude despite trying seven alternatives. The reason: cheaper models required more iterations and produced more rework. Total cost is (per-request cost) x (attempts) + (developer time reviewing failures).

### Different models fail differently

**endymion-light** compared code review across models: Gemini gives gentle 7/10 feedback, Claude brutally identifies naming and coupling problems, ChatGPT says everything is perfect. For code generation, **fluidcruft** found that GPT 5.2 misses things Opus finds and vice versa. No model dominates across all tasks.

### Speed matters for iteration

**CraigJPerry** reported that GPT 5.2 in extended thinking mode beats Opus 4.5 by a significant margin -- but is 4x slower, making it unusable for interactive development. For background analysis tasks, that tradeoff might be acceptable. For the tight loop of write-test-fix, speed determines how many iterations you can run before losing focus.

## Model Tiers and When to Use Each

### Frontier Reasoning Models

Claude Opus 4.5/4.6, GPT-5/5.2 (extended thinking), Gemini 3 Pro.

**Use when:**
- The task involves architectural decisions or multi-component coordination
- You are working in an unfamiliar codebase or domain
- Errors are expensive to detect or fix (security-critical paths, data migrations)
- The task has failed with a cheaper model and you need the capability uplift
- You need the agent to autonomously debug and self-correct over multiple tool calls
- Code review where thoroughness matters more than speed

**Characteristics:** These models get things right on the first attempt more often, reducing total cost when the alternative is multiple retry cycles. They handle complex multi-file refactoring, novel problems, and tasks requiring sustained coherence across long outputs. **cube2222** described Opus 4.5 as "quite a magnificent improvement" while finding Codex (pre-GPT-5.2) a letdown for precise context management.

### Fast Mid-Tier Models

Claude Sonnet 4.5, GPT-4.1, Gemini 3 Flash.

**Use when:**
- You have clear specifications and defined success criteria
- The task is implementation within a structure you have already defined
- You can verify output quickly through tests
- You are doing iterative development with frequent human checkpoints
- Budget is a concern and the task is well-scoped

**Characteristics:** The workhorse tier for daily development. Good enough for most implementation tasks, significantly cheaper and faster than frontier models. **verdverm** found Gemini-3-Flash to be a strong model at a fraction of the cost, and suggested that distillations into fast models are the future rather than ever-larger frontier models.

### Lightweight Models

Claude Haiku 4.5, GPT-4.1 mini, small open-weight models.

**Use when:**
- Generating boilerplate or repetitive code transformations
- Writing or updating documentation
- Simple refactors (renaming, reformatting, mechanical transformations)
- Quick factual lookups or syntax questions
- Drafting commit messages, PR descriptions, or code comments
- High-volume tasks where per-request cost matters

**Characteristics:** Low cost per request means you can use them liberally. Fast response times keep iteration cycles tight. Not suitable for tasks requiring reasoning about novel problems or maintaining coherence across complex codebases.

### Open-Weight Models

DeepSeek, Qwen, Llama, Mistral, Gemma.

**Use when:**
- Privacy requirements prohibit sending code to external APIs
- You need to run models locally or on your own infrastructure
- Cost must be minimized for high-volume workloads
- You need fine-tuning capability for domain-specific tasks

**Characteristics:** As **mvkel** articulated, open-weight models guarantee a competitive floor -- essential to the ecosystem but not chasing state-of-the-art. **cmrdporcupine** noted that DeepSeek 3.2 competes with Sonnet 4 for 80% of use cases at a fraction of the cost. **troyvit** is happy with 80% quality for privacy-friendly, low-energy, cheap inference.

## Multi-Model Strategies

### Start Cheap, Escalate on Failure

Use a mid-tier model by default. If it fails or produces inadequate output, escalate to a frontier model. This captures the cost savings of cheaper models on easy tasks while reserving expensive models for where they are needed. This matches the [task scoping](../task-scoping.html) principle: well-scoped leaf tasks rarely need frontier reasoning.

### Multi-Model Cross-Validation

Generate code with one model and review it with another. **fluidcruft** found that neither Opus nor GPT-5.2 is strictly better -- they catch different things. Disagreements between models flag areas that deserve closer human attention. **harrall** uses ChatGPT for generation and Gemini as a corrective check, exploiting the fact that different models have different sycophancy levels and failure modes.

### Frontier for Planning, Fast for Execution

Use a frontier model for planning and architectural decisions, then a cheaper model for implementation of the resulting plan. This matches the tree model from [task scoping](../task-scoping.html): trunk and branch decisions demand the highest capability, while leaf-level implementation can be handled by less capable models.

### Model-Specific Strengths

Practitioners report different models excelling in different domains:

- **Claude (Opus/Sonnet)**: Coding, agentic tool use, code review thoroughness, following complex instructions
- **GPT-5.x**: General research, recipes, travel planning, extended reasoning (when speed is not critical)
- **Gemini**: Multilingual tasks, search integration, large context windows, some algorithmic exploration
- **Open models**: Privacy-sensitive workloads, high-volume batch processing, domain-specific fine-tuning

**wild_egg** observed that different human thinking styles seem to align with different models -- a metacognitive factor that practitioners rarely discuss but that may explain the wide variance in model preferences.

## Cost Management

### Caching Matters Enormously

One practitioner reported an 88.8% cache hit rate that significantly controlled costs. Understanding your tool's caching behavior and optimizing for it (consistent prompts, stable context) can cut spend dramatically.

### Flat-Rate Plans Change the Calculus

Services like Claude Code Max ($100-200/month flat) remove per-request anxiety and let you use frontier models liberally. If your usage is high enough, flat-rate plans are almost always more economical. **esperent** described cycling between $20 accounts across providers -- an indication that the per-request model creates friction that flat rates eliminate.

### Token Efficiency Is a Harness Problem

**jtms** pointed out that agents "blow tens of thousands of tokens just searching for files" during refactoring tasks. LSP integration, MCP tools, and better context management save tokens that would otherwise be wasted on mechanical operations. Model selection interacts with [harness engineering](../harness-engineering.html): a well-harnessed cheap model can outperform a poorly-harnessed expensive one.

### Environmental Considerations

**dataviz1000** reported burning $400 in tokens in January, adding "this cannot be good for the environment." **dcreater** noted that wasteful token consumption during inefficient agentic operations causes real environmental harm. Token efficiency is not just a cost issue.

## Model Degradation and Consistency

A recurring concern is that model quality fluctuates unpredictably. The Claude Code benchmarks tracker documented measurable performance swings, and many practitioners report inconsistent quality across sessions and times of day.

**F7F7F7** reported that performance degrades from 1pm EST until around 8-9pm, with recovery at night. **kuboble** speculated that non-US timezone users may systematically get better performance. **silverlight** noted that after a service outage, performance was 3x faster for remaining users -- suggesting load-related effects.

**antirez** (Redis creator) provided a measured counter-analysis: the oscillation pattern is better explained by A/B testing of checkpoints, Claude Code updates, and natural sampling variability than by intentional model degradation. Anthropic engineer **mgraczyk** stated directly: "We never do anything that reduces model intelligence."

**Practical implications:**

- **Do not assume newer is always better.** Test new model versions against your specific workload before switching.
- **Pin to specific versions when possible.** Several practitioners advocate for version pinning similar to software dependency management.
- **Maintain a fallback.** If your primary model degrades, have a tested alternative ready.
- **Track your own metrics.** Notice when your rework rate increases and investigate whether the model is the cause.
- **Consider off-peak usage.** If your schedule permits, heavy AI work during off-peak hours may yield more consistent results.

## Anti-Patterns

### One Model for Everything

Using the same frontier model for every task regardless of complexity. This maximizes cost without maximizing quality. A lightweight model generating boilerplate is not just cheaper -- it is also faster, reducing your iteration cycle.

### Chasing Benchmarks

Selecting models based on synthetic benchmark scores rather than performance on your actual tasks. **nullbio** reported that despite Gemini performing best on benchmarks, it hallucinates more frequently than ChatGPT or Claude in practice. **alfalfasprout** noted that benchmarks have not been a good measure of competence for some time. **moffkalast** found that Kimi K2 tops open-source benchmarks but fabricates information more than Llama 3.

### Ignoring Total Cost of Ownership

Comparing models only on per-request pricing without accounting for success rate, rework time, and developer review overhead. The cheapest model per token is rarely the cheapest model per completed task.

### Loyalty to a Single Provider

Refusing to switch models or providers out of familiarity. The model landscape changes rapidly. **cmiles8** observed that AI is a commodity with zero brand loyalty -- customers swap API endpoints instantly. Maintain the ability to switch.

### Confusing the Model with the Harness

Attributing quality differences to the model when the harness is the actual variable. **stared** asked of benchmark results: "Does it benchmark the underlying model or Claude Code harness?" Without controlling for harness version changes, you may be measuring system prompt drift, not model capability.

## Evidence

**esperent** (HN, thread 46521144): "The real differentiating factor right now is quota and cost." Latest models from all providers are great and nearly commodities.

**callamdelaney** (HN, thread 46910495): "Anthropic models are right first time for me." ChatGPT and Gemini often have fundamental misunderstandings on the same tasks.

**CraigJPerry** (HN, thread 46905187): GPT 5.2 in extended thinking mode beats Opus 4.5 by a significant margin -- but is 4x slower, too slow for interactive use.

**endymion-light** (HN, thread 46911261): Code review comparison across models: Gemini gives gentle feedback, Claude identifies real structural problems, ChatGPT praises everything.

**verdverm** (HN, thread 46521531): Paying by token with Gemini-3-Flash. Believes distillations into fast models are the future, not ever-larger frontier models.

**antirez** (HN, thread 46811365): Oscillation pattern in benchmarks is better explained by A/B testing and sampling variability than intentional degradation.

**wild_egg** (HN, thread 46440574): Different human thinking styles align with different models. Nobody discusses this.

**nullbio** (HN, thread 46123345): Despite Gemini performing best on benchmarks, it hallucinates nonsense more frequently than alternatives in practice.
