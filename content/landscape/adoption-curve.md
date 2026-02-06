---
title: "The Adoption Curve"
description: "Where the industry stands on AI-assisted development adoption."
weight: 2
tags: [adoption-strategy, industry-trends]
date: 2026-02-06
---

AI-assisted development in early 2026 is past the novelty phase but far from universal. The community is split, the data is mixed, and where a given developer lands depends as much on their workflow and identity as on the technology itself.

## The Six Stages Framework

The [AI Adoption Curve](/guide/adoption-curve.html) framework, synthesized from Mitchell Hashimoto's influential account and extensive practitioner discussion, describes a progression from chatbot usage through always-running agents. It remains the best map of the adoption journey because each stage builds on the calibration and infrastructure of the previous one.

Most developers who abandon AI tools get stuck between Stages 1 and 2 --- using chatbots rather than agents, or delegating without first calibrating on what the agent handles well. Most who succeed credit investments in Stage 2 (reproducing their own work to build intuition) and Stage 5 (engineering the harness). See the [Practitioner Consensus](/evidence/practitioner-voices.html) for the community data behind these observations.

The framework's central insight is that AI adoption is primarily about engineering maturity applied to a new tool, not about learning AI-specific techniques. Developers who already practice decomposition, specification, and verification have a structural advantage --- not because they know AI better, but because they already do what agents require.

## Community Sentiment: Polarized but Trending Positive

The HN discussions captured in this knowledge base reveal a community that is deeply divided but trending toward cautious adoption. The data points:

**Enthusiastic adopters** report transformative productivity gains, particularly for greenfield projects and personal tools. Burke Holland described completing four substantial full-stack projects in rapid succession with Opus 4.5. **jedberg** on HN described a decade-old app idea built exactly as specified on the first attempt. **simonw** reported consistent surprise at the results of absurdly difficult challenges.

**Experienced skeptics** push back on the replacement narrative while acknowledging real gains. **mcv** concluded that despite heavy use, the model still frequently gets stuck. **honeycrispy** found architecture decisions that required rewriting half the code. **multisport** argued the demos address isolated greenfield work, not the team-scale engineering that constitutes most professional development.

**Measured practitioners** occupy the middle ground. The [Practitioner Consensus](/evidence/practitioner-voices.html) synthesis found convergence on several points: agents work best for well-scoped tasks with clear verification, the quality of the harness determines the quality of the output, and experienced developers get more value than novices because they already have the judgment AI adoption requires.

([Sources](/sources/2026-01-06-opus-4-5-agent-experience.html), [Practitioner Consensus](/evidence/practitioner-voices.html))

## The Builder vs. Crafter Split

Andrej Karpathy identified what may be the most useful lens for understanding adoption patterns: the split between engineers who primarily enjoy building products and those who primarily enjoy the craft of programming.

Builder-oriented engineers tend to embrace AI tools enthusiastically. They see code as a means to an end and welcome anything that accelerates the path from idea to working product. **atonse** on HN identified with this group explicitly, noting they have always coded for outcomes rather than craft.

Craft-oriented engineers feel their identity threatened by AI tools. For them, the act of writing code is the point, not just the artifact it produces. **tripledry** expressed concern that if programming becomes prompt engineering, the joy of building would be lost.

This split is not about skill level. Both groups contain excellent engineers. But it predicts adoption behavior more reliably than technical sophistication, years of experience, or even measured productivity gains. Organizations rolling out AI tools should expect fundamentally different reactions from these two groups and plan accordingly.

([Source](/sources/2026-01-26-karpathy-claude-coding-notes.html))

## Enterprise Adoption Patterns

Large organizations face a distinct set of adoption challenges that individual developers do not:

**Security and compliance.** Enterprise adoption requires clearing legal, security, and compliance hurdles before any productivity discussion begins. Apple's decision to run Gemini under its Private Cloud Compute infrastructure illustrates the level of architectural consideration required. Even trillion-dollar companies need guarantees about data handling before integrating AI models into core workflows.

**Cost predictability.** Individual developers can tolerate variable costs. Enterprises need budgets. The tension between flat-rate plans (with rate limits) and pay-as-you-go pricing (with unpredictable bills) is an active friction point. The [Costs and Tradeoffs](/landscape/costs-and-tradeoffs.html) section covers this in detail.

**Skill development concerns.** Anthropic's own research found a 17% learning penalty when junior developers used AI assistance, with debugging skills most affected. Organizations that care about developing their junior talent face a genuine dilemma: the promise of productivity versus the risk of skill atrophy. See [Open Questions](/landscape/open-questions.html) for the ongoing debate.

**Uneven adoption across teams.** Some teams within an organization will reach Stage 5 or 6 while others remain at Stage 1. This creates coordination challenges, as the teams using agents extensively may produce code with different characteristics than teams coding manually.

## Where We Are

If forced to place the industry on a single point of the adoption curve, the best characterization is: **early mainstream, with a long tail of holdouts**. The enthusiasts have moved well beyond experimentation into daily use. A growing middle group is actively integrating agents into their workflows. But a substantial minority remains skeptical or has tried and abandoned AI tools, often because they hit the Stage 1-to-2 gap without building the calibration needed to see reliable results.

The pace of model improvement continues to push the curve forward. Each generation of models makes more tasks delegable, which expands the population of developers for whom agents provide clear value. But adoption is ultimately gated by the human investments --- calibration, harness engineering, workflow redesign --- that no model improvement can shortcut.
