---
title: "Model Selection"
description: "Choosing the right model for the right task -- balancing capability, cost, and speed."
weight: 4
tags: [model-selection, core-skill, cost-optimization]
date: 2026-02-06
---

Model selection is the skill of matching the right model to the right task. The gap between a well-chosen and poorly-chosen model often matters more than the quality of the prompt itself. As one practitioner put it, model choice now outweighs prompt engineering as the primary lever for coding quality.

## Model Tiers

Models fall into rough capability tiers, each suited to different kinds of work.

**Frontier reasoning models** (Claude Opus 4.5/4.6, GPT-5) -- The most capable models available. Best for complex architectural reasoning, multi-file refactoring, unfamiliar codebases, and tasks requiring sustained coherence across long outputs. These models are expensive and slower, but they get things right on the first attempt more often, which reduces total cost when the alternative is multiple retry cycles with cheaper models.

**Fast mid-tier models** (Claude Sonnet 4.5, GPT-4.1) -- The workhorse tier for daily development. Good enough for most implementation tasks, significantly cheaper and faster than frontier models. The right choice when you have clear specifications and the task does not require deep reasoning about novel problems.

**Lightweight models** (Claude Haiku 4.5, GPT-4.1 mini) -- Best for high-volume, low-complexity tasks: generating boilerplate, writing documentation, simple refactors, code formatting, and quick Q&A. The per-request cost is low enough to use liberally without budget concerns.

**Specialized coding models** (DeepSeek, Code Llama, open-source fine-tunes) -- Models optimized specifically for code generation, sometimes matching mid-tier general models on coding tasks at a fraction of the cost. Useful when you need high throughput on well-defined coding tasks and do not need general reasoning.

## When to Use Which Tier

The decision factors are task complexity, error tolerance, and iteration cost.

**Use frontier models when:**
- The task involves architectural decisions or multi-component coordination
- You are working in an unfamiliar codebase or domain
- Errors are expensive to detect or fix (security-critical paths, data migrations)
- The task has failed with a cheaper model and you need the capability uplift
- You need the agent to autonomously debug and self-correct

**Use mid-tier models when:**
- You have clear specifications and defined success criteria
- The task is implementation within a structure you have already defined
- You can verify output quickly through tests
- You are doing iterative development with frequent human checkpoints

**Use lightweight models when:**
- Generating boilerplate or repetitive code transformations
- Writing or updating documentation
- Simple refactors (renaming, reformatting, mechanical transformations)
- Quick factual lookups or syntax questions
- Drafting commit messages, PR descriptions, or code comments

## Cost-Quality Tradeoffs

The economics of model selection are not intuitive. Cheaper per-request does not always mean cheaper per-task.

One developer [documented spending $638 over six weeks](/sources/2025-11-13-ai-coding-agent-costs/) on AI coding, with 85% of the budget going to Claude despite trying seven alternative models. The reason: cheaper models required more iterations and produced more rework. The total cost of a task is (per-request cost) x (number of attempts) + (developer time reviewing failed attempts). A frontier model that succeeds on the first try can be cheaper than a budget model that requires three attempts plus an hour of debugging.

Key cost-management strategies from the community:

- **Caching matters enormously.** The same developer reported an 88.8% cache hit rate that significantly controlled costs. Understanding your tool's caching behavior and optimizing for it (consistent prompts, stable context) can cut spend dramatically.
- **Flat-rate plans change the calculus.** Services like Claude Code Max ($100-200/month flat) remove per-request anxiety and let you use frontier models liberally. If your usage is high enough, flat-rate plans are almost always more economical.
- **Start cheap, escalate on failure.** Use a mid-tier model by default. If it fails or produces inadequate output, escalate to a frontier model. This captures the cost savings of cheaper models on easy tasks while using expensive models only where needed.

## Multi-Model Approaches

Several tools and workflows now support using different models for different stages of the same task.

The pattern is straightforward: use a frontier model for planning and architectural decisions, then use a cheaper model for implementation of the resulting plan. This matches the [task scoping](/skills/task-scoping/) principle that architectural reasoning (trunk/branch work) demands the highest capability, while leaf-level implementation can often be handled by less capable models.

[Addy Osmani's workflow](/sources/2026-01-04-llm-coding-workflow-2026/) describes multi-model pragmatism: using different models for different tasks and switching when one gets stuck, rather than maintaining loyalty to a single provider.

Some practitioners use multiple models as a verification mechanism -- generating code with one model and reviewing it with another. Disagreements between models flag areas that deserve closer human attention.

## Model Degradation and Consistency

A recurring concern in the community is that model quality fluctuates unpredictably. The [Claude Code benchmarks tracker](/sources/2026-01-29-claude-code-benchmarks/) documented measurable performance swings: a daily pass rate of 48% against a historical baseline of 58%, with statistically significant degradation at both 7-day and 30-day windows. The Claude Code team confirmed at least one harness bug contributed to the observed decline.

The [IEEE Spectrum analysis](/sources/2026-01-08-ai-coding-getting-worse/) explored whether AI coding tools are genuinely degrading. The HN discussion identified several possible explanations: changing user expectations, improved instructability that breaks old prompts, dynamic model routing during high demand, and training data feedback loops where poor code acceptance degrades future model quality.

Practical implications for model selection:

- **Do not assume newer is always better.** Test new model versions against your specific workload before switching.
- **Pin to specific versions when possible.** Several practitioners advocated for version pinning similar to software dependency management.
- **Maintain a fallback.** If your primary model degrades, have a tested alternative ready. Multi-provider capability is insurance against quality fluctuations.
- **Track your own metrics.** Community benchmarks are useful but your specific codebase and task profile may behave differently. Notice when your rework rate increases and investigate whether the model is the cause.

## The Diminishing Returns of Prompt Engineering

As models improve, the marginal return on prompt engineering diminishes. A strong model with a simple prompt increasingly outperforms a weak model with an elaborate prompt. The [model-matters-more-than-prompts analysis](/sources/2026-01-18-model-matters-more-than-prompts/) argues that the optimization priority should be: choose the best available model first, then optimize your prompting and workflow around its specific capabilities.

This does not mean prompting is irrelevant. But it means that switching from a mid-tier model to a frontier model often produces a larger quality improvement than spending an hour refining a prompt for the mid-tier model. [Harness engineering](/skills/harness-engineering/) -- persistent project context via AGENTS.md files -- captures the value of good prompting in a durable form, while one-off prompt optimization is ephemeral.

## Anti-Patterns

### One Model for Everything

Using the same frontier model for every task regardless of complexity. This maximizes cost without maximizing quality, since simple tasks do not benefit from frontier reasoning. A lightweight model generating boilerplate is not just cheaper -- it is also faster, reducing your iteration cycle.

### Chasing Benchmarks

Selecting models based on synthetic benchmark scores rather than performance on your actual tasks. Benchmarks measure specific capabilities that may not correlate with your workload. A model that tops SWE-Bench may underperform on your particular framework, language, or problem domain.

### Ignoring Total Cost of Ownership

Comparing models only on per-request pricing without accounting for success rate, rework time, and developer review overhead. The cheapest model per token is rarely the cheapest model per completed task.

### Loyalty to a Single Provider

Refusing to switch models or providers out of familiarity or sunk-cost reasoning. The model landscape changes rapidly. The best model for your workload six months ago may not be the best model today. Maintain the ability to switch.

## Sources

- [AI coding agent costs ($638 study)](/sources/2025-11-13-ai-coding-agent-costs/) -- Detailed cost breakdown showing 85% of budget on Claude despite trying 7 alternatives
- [Model matters more than prompts](/sources/2026-01-18-model-matters-more-than-prompts/) -- Argument that model capability now dominates prompt quality
- [Claude Code benchmarks](/sources/2026-01-29-claude-code-benchmarks/) -- Systematic tracking of model performance fluctuations
- [AI coding getting worse?](/sources/2026-01-08-ai-coding-getting-worse/) -- Exploration of perceived degradation and its multiple possible causes
- [Opus 4.5 agent experience](/sources/2026-01-06-opus-4-5-agent-experience/) -- Evidence that frontier models deliver qualitatively different results
- [Addy Osmani's workflow](/sources/2026-01-04-llm-coding-workflow-2026/) -- Multi-model pragmatism in practice
- [DeepSeek analysis](/sources/2026-01-01-deepseek-bigger-models-less/) -- Open-source model landscape and cost alternatives
