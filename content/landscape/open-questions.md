---
title: "Open Questions"
description: "The debates still raging in the AI coding community."
weight: 4
tags: [debate, open-questions, ai-skepticism, skill-atrophy]
date: 2026-02-06
---

Not everything about AI-assisted development is settled. Several major questions remain genuinely open, with credible evidence and strong opinions on multiple sides. This page captures the debates as they stand in early 2026.

## Is AI Making Coding Skills Atrophy?

Anthropic's own randomized controlled study provides the most rigorous data point. Junior developers using AI assistance scored 17% lower on comprehension quizzes --- a gap the researchers characterized as equivalent to nearly two letter grades, with the largest deficit appearing in debugging skills. The speed gains (roughly two minutes faster) were not statistically significant.

But the study also found that engagement style matters profoundly. Developers who asked follow-up questions, requested explanations, and posed conceptual queries retained significantly better understanding than those who simply delegated. The manner of AI interaction predicts learning outcomes more than whether AI is used at all.

Karpathy reported experiencing atrophy firsthand, finding it harder to recall syntax and implementation details. But he argued this may be acceptable: code review skills persist even as writing fluency declines, similar to how reading comprehension persists when spelling degrades.

The concern is sharpest for junior engineers. **FitchApps** on HN raised the scenario of agents being unavailable during a midnight production deployment, arguing developers risk becoming unable to debug their own systems. **postalcoder** observed that older models forced developers to do 30% of the tough work themselves, but current models are too capable, removing the productive struggle that builds intuition.

The counterargument from **dr_dshiv**: they have been learning software concepts faster since offloading implementation to AI. **visarga** compared the dynamic to Star Trek replicators, arguing that iterative refinement through AI tools is itself a form of learning.

**Where it stands:** Skill atrophy is real and measurable, but it is not inevitable. The evidence suggests that active, questioning engagement with AI preserves learning, while passive delegation degrades it. Organizations need deliberate policies to protect junior skill development.

([Source](/sources/2026-01-30-ai-assistance-coding-skills.html), [Karpathy Notes](/sources/2026-01-26-karpathy-claude-coding-notes.html))

## Are AI Assistants Getting Worse Over Time?

Many developers report that AI coding tools feel less reliable than they used to. The evidence for actual model regression is weak --- an IEEE Spectrum article making this claim was criticized for using a single three-line test case as evidence. But the perception is widespread enough to warrant explanation.

The most credible theories:

- **Better instructability looks like regression.** Newer models follow instructions more precisely, which produces worse results when prompts are underspecified. The model improved; the prompt did not.
- **Dynamic model routing.** Providers may serve lighter-weight models during high-demand periods, creating quality variation users attribute to the model itself.
- **Training data contamination.** As AI-generated code proliferates, future models may train on lower-quality data, creating a subtle decline in output quality.
- **Recency bias in user memory.** Developers calibrate expectations to their best experiences and perceive average results as deterioration.

HN user **renegade-otter** framed the real problem: results are not repeatable, which is more concerning than consistent decline. **Kuinox** speculated about providers dynamically serving smaller models before new releases. **theptip** argued the issue is not model quality but insufficient scaffolding --- tests, specifications, and harness engineering that make agent interactions reliable.

**Where it stands:** There is no strong evidence that models are getting objectively worse. But consistency remains a legitimate concern, and practitioners should build workflows that tolerate quality variation rather than assuming every interaction will match peak performance. Version pinning, when available, may help.

([Source](/sources/2026-01-08-ai-coding-getting-worse.html))

## Will the AI Bubble Burst?

The financial sustainability of the AI industry is a serious open question. OpenAI's capital requirements are staggering. Data center financing is tightening. Infrastructure milestones are slipping. And the market sentiment has begun shifting from uncritical enthusiasm to active skepticism.

The prevailing view in the HN discussion around OpenAI's cash burn was that AI is analogous to railroads: a genuinely transformative technology that will nonetheless produce massive investor losses during its bubble phase. **avalys** argued that every company investing similar resources produces roughly the same results, suggesting no technological moat exists. **cmiles8** described AI as the worst possible business setup: a commodity requiring huge capital with zero brand loyalty.

The bubble analysis from Ed Zitron identified three pressure points: OpenAI's cash constraints (with circular financing arrangements), tightening data center lending conditions, and cascading infrastructure delays. Market sentiment has begun to shift, with AI announcements no longer reliably boosting stock prices.

The implications for practitioners are concrete. If current AI pricing is subsidized by venture capital, costs will eventually rise --- possibly significantly. If major providers face financial distress, service continuity becomes a risk. The practical response is to build workflows with low switching costs: use open protocols, maintain tool-agnostic practices, and avoid deep provider lock-in.

**Where it stands:** A correction of some kind is widely expected. The question is magnitude and timing. The technology itself will persist regardless --- but the specific tools, pricing, and providers available to practitioners may change substantially.

([Sources](/sources/2025-12-30-openai-cash-burn.html), [Bubble Analysis](/sources/2026-01-19-ai-bubble-bursts-2026.html))

## How Will Vibe Coding Affect Open Source?

Vibe coding --- generating code through AI prompts rather than writing it manually --- threatens the ecosystem that AI models themselves depend on. The concern has three dimensions.

First, **community bypass.** When developers ask an LLM for code instead of visiting project documentation, filing issues, or contributing patches, the organic engagement that sustains open-source projects is diverted. As **arjie** noted on HN, there is no longer pressure to contribute upstream when you can generate a custom solution.

Second, **training data bias.** LLMs recommend libraries based on their prevalence in training data, creating a winner-take-all dynamic that marginalizes newer alternatives. The ecosystem risks ossifying around established tools.

Third, **maintainer burden.** AI-generated pull requests --- some legitimate, some padding --- add new work for already-stretched maintainers, while the organic contributions and bug reports they relied on decline.

The counterarguments are substantive. **observationist** argued that open source is adapting, not dying, and communities will develop new curation hierarchies. **Flavius** defended open source as an ideology about freedom, arguing the mechanism of code creation is irrelevant to the principle. **charcircuit** criticized the concern as outdated, noting modern AI agents search for current libraries rather than relying solely on training data.

**Where it stands:** The impact on open source is real but still unfolding. Small utility libraries face the most pressure, as their functionality can now be generated on demand. Large, complex projects (Linux, PostgreSQL, React) remain essential. The community has not yet found sustainable models for maintaining the long tail of open-source projects in an AI-assisted world.

([Source](/sources/2026-02-02-vibe-coding-killing-open-source.html))

## Is Agent-Oriented Development a Permanent Shift?

The deepest question is whether the move toward agent-assisted coding represents a lasting change in how software is built, or whether it is a productivity fad that will stabilize into a more modest role.

Arguments for permanence: Each model generation makes more tasks delegable. The [AI Adoption Curve](/guide/adoption-curve.html) framework describes a ratchet effect where investments in harness engineering compound over time. Developers who reach Stage 5 or 6 report that going back to fully manual workflows feels like abandoning a power tool.

Arguments for modesty: The METR study showed a 19% productivity reduction when experienced developers used AI on familiar codebases. **strogonoff** on HN questioned whether AI truly saves time given review overhead. The reliability concerns documented in [Costs and Tradeoffs](/landscape/costs-and-tradeoffs.html) create workflow fragility that purely manual coding does not have.

The most likely outcome is neither extreme. Agent-assisted development is probably permanent for the tasks it handles well --- greenfield features, test generation, boilerplate, code in well-documented domains. But the boundary between what to delegate and what to do manually will continue to shift with each model generation, and the skill of knowing where that boundary lies will remain the core practitioner competency.

This is why the [Core Loop](/guide/core-loop.html) emphasizes the "verify" and "harness" phases as heavily as the "delegate" phase. The technology for delegation will keep improving. The judgment about when and how to delegate is the human skill that compounds.
