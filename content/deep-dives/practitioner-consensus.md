---
title: "What Practitioners Actually Think About AI Coding"
description: "A consensus report from experienced developers on what works, what fails, and what remains unresolved."
date: 2026-02-05
tags: [community-discussion, adoption-strategy, productivity-debate, task-scoping, craft-vs-ai]
sources:
  - https://news.ycombinator.com/item?id=46903558
  - https://mitchellh.com/writing/my-ai-adoption-journey
weight: 2
---

The Hacker News discussion around Mitchell Hashimoto's AI adoption article drew dozens of experienced practitioners into a remarkably grounded conversation about what actually works, what fails, and what remains genuinely uncertain about AI-assisted development. Unlike most online AI discourse, this thread was dominated by people sharing concrete experiences rather than abstract positions.

What follows is a synthesis of where this community of practitioners has converged -- and where honest disagreement remains.

## Finding 1: Task scoping is THE skill

This was the single strongest area of consensus in the entire discussion, with multiple commenters arriving at the same conclusion independently.

The core insight is that the primary skill in AI-assisted development is not prompting, not tool selection, and not model knowledge. It is learning to decompose work into units that are small enough for an agent to complete reliably and large enough to justify the overhead of delegation.

**mjr00** described the failure modes on both ends: instructions that are too specific ("write a for loop summing numbers") offer no benefit from an LLM, while instructions that are too broad ("make Facebook for dogs") result in agents making too many unchecked assumptions. The skill is finding the zone between these extremes.

**allenu** offered a structural metaphor that resonated with several others: think of projects as tree structures where humans retain editorial control of the main trunk (architecture and module boundaries) while delegating the smaller branches (bounded implementations) to agents. The key constraint is that delegated work must be easy to verify.

**sho_hn** noted that developing this intuition -- understanding what an agent can handle and how to frame tasks for it -- is cognitively similar to the modularization and architecture work that has always been central to software engineering. For experienced practitioners, this is not an alien skill. It is a familiar one applied in a new context.

**apercu**, who has built a consulting career around writing detailed specifications, confirmed the pattern from a different angle: the more detailed the decomposition, the easier verification becomes and the more likely the output meets expectations.

The convergence here is striking. These commenters were not responding to each other; they arrived at the same framework independently. Task scoping is not one skill among many for AI-assisted development. It is the foundational one, and it connects directly to the [Task Scoping pattern](/patterns/task-scoping.html) that experienced practitioners are developing.

## Finding 2: Drift is the primary failure mode

**EastLondonCoder** provided what may be the single highest-signal comment in the thread by naming and characterizing the central failure mode of agentic coding: drift.

Drift is what happens when an agent stays locally plausible -- the code compiles, the logic looks reasonable, the output sounds confident -- while gradually walking away from the real constraints of the repository. You do not notice the divergence until you hit reality: failing tests, unexpected runtime behavior, performance degradation, or broken user experience.

The solution EastLondonCoder described was a tight feedback loop: use chat to shape the plan (discussing tradeoffs, invariants, and failure modes), then treat the agent as something that produces narrow, reviewable diffs against that plan. The human role becomes verification: run it, check it, decide whether the output is acceptable.

This practitioner shipped four real projects using this approach -- including a ticketing system with real users and a git-like tool for media projects -- and identified one common thread across all of them: small diffs, fast verification, and continuously tightening the harness so drift cannot go unnoticed.

The observation that the bottleneck shifts from writing code to reading code has deep implications for how teams should structure their workflows. It also connects to [Harness Engineering](/patterns/harness-engineering.html): if your verification infrastructure is weak, drift will accumulate silently until it becomes a crisis.

## Finding 3: These are just good engineering practices, made mandatory

A brief but revealing exchange cut to the heart of a recurring tension in AI adoption discourse.

**bdangubic** asked the blunt question: how is any of this different from how we should have been building software all along?

**EastLondonCoder** agreed completely: there is no secret. Small diffs, clear specifications, modular architecture, and fast verification loops have always been the practices that produce good software. AI does not invent new engineering discipline. It punishes the absence of existing discipline and rewards its presence.

The implication is that experienced developers have a structural advantage in AI adoption -- not because they know AI better, but because they already practice the decomposition, specification, and verification habits that make agent-assisted work reliable. The [Six Stages of AI Adoption](/guides/adoption-stages.html) reflect this: the later stages are fundamentally about engineering maturity applied to a new tool, not about learning AI-specific techniques.

## Finding 4: The craft of programming is evolving, not dying

The most emotionally charged sub-thread grappled with identity: what does it mean to be a programmer when agents write much of the code?

**jplusequalt** articulated the concern directly: some developers derive deep satisfaction from understanding systems and doing hard things. AI removes that satisfaction. If someone else writes the code, why not just become a product manager?

**mitchellh** (the article's author) pushed back on the framing itself: there is no dichotomy between craft and AI. He considers himself a craftsman, and AI gives him the ability to focus on the parts that demand the most craftsmanship -- architecture, design judgment, verification of correctness -- rather than spending time on mechanical implementation.

**fizx** offered the market-pressure counterpoint with a memorable quip about enjoying Japanese joinery while the housing market remains indifferent. The tension between personal satisfaction and professional efficiency is real, and different practitioners will resolve it differently.

The emerging consensus is not that craft is dead but that where craft is applied is shifting. The judgment calls -- what to build, how to decompose it, whether the output is correct, whether the architecture will hold -- remain deeply human and deeply skilled work. The implementation of well-specified components is increasingly delegated.

## Finding 5: Costs are real and under-discussed

**jonathanstrange** raised a point that rarely surfaces in AI adoption narratives: before evaluating whether agentic AI is worth it, you need to know what it costs. Most adoption stories omit this entirely.

The numbers shared in the thread painted a concrete picture. **JoshuaDavid** reported spending around $190 per month. **latchkey** described a stack combining JetBrains AI, GPT subscriptions, and Claude credits that implied $175-$325 monthly.

These are meaningful expenses, particularly for individual developers or small teams without corporate budgets. The lack of cost transparency in most AI adoption narratives is itself a finding: if proponents consistently omit the cost dimension, the resulting picture of "AI productivity" is incomplete at best and misleading at worst.

## Finding 6: The productivity debate remains unresolved

This was the most contentious area of discussion, with strong claims on both sides and no clear resolution.

**jorvi** cited the METR study showing a 19% reduction in productivity when AI tools were used by experienced developers on familiar codebases -- hard data that challenges the prevailing narrative.

**vonneumannstan** argued from authority: Mitchell Hashimoto is an exceptionally accomplished developer, and if he gets value from these tools, skeptics should examine why they cannot.

**dakiol** dismantled this argument effectively: that is survivorship bias. What works for an elite developer may not generalize. It is the equivalent of citing a billionaire's morning routine as career advice.

**tux1968** added a particularly sharp nuance: if AI tools require expert-level skill to use effectively, that fundamentally limits their broad applicability. The tools might be genuinely powerful in expert hands while offering little or nothing to the median developer. This would make them more like advanced IDEs or specialized debugging tools -- valuable for those with the skill to wield them, but not the universal productivity multiplier that the marketing suggests.

The honest conclusion is that we do not yet have sufficient evidence to resolve this debate. Individual anecdotes conflict with the available controlled studies. The answer likely depends heavily on the developer's experience level, the nature of the work, and the quality of the verification infrastructure -- variables that most productivity discussions collapse into a single number.

## Finding 7: AI adoption is a skill that requires practice

**polyrand** made a point that sounds obvious but has practical consequences: the only way to get good at coding with AI is to actually do it, even when it is inefficient or slower at first.

This commenter also cautioned against over-relying on plugins, IDE integrations, and abstraction layers. The fundamental skill is learning to prompt and steer the model directly. Tooling that hides the interaction can actually impede the development of that skill.

This maps to a broader pattern: AI adoption follows a learning curve, and the early stages involve real productivity costs. Organizations and individuals who expect immediate returns may abandon the tools before reaching the competence threshold where they start paying off. The [Six Stages of AI Adoption](/guides/adoption-stages.html) model captures this progression.

## Open questions

Several important questions surfaced in the discussion without resolution:

**Security and trust.** **underdeserver** noted that the capabilities agents require -- reading files, executing programs, making HTTP requests -- sit dangerously close to what security researchers call the "lethal trifecta" of prompt injection risk. **recursive** was blunter: "I'm definitely not running that on my machine." The question of how to grant agents sufficient capability to be useful while maintaining security boundaries remains wide open.

**Who benefits?** If AI coding tools primarily benefit already-expert developers, the implications for the profession are very different than if they democratize capability. The thread surfaced this question clearly but could not answer it.

**What is the right unit of measurement?** Lines of code, features shipped, bugs introduced, time to completion, developer satisfaction -- different metrics tell different stories about AI productivity. The community has not converged on which metrics matter most, which makes cross-study comparison nearly impossible.

**How does this change teams?** If the bottleneck shifts from writing code to reading and verifying code, team structures, hiring criteria, and review processes all need to adapt. No one in the discussion had a clear picture of what that adaptation looks like at scale.

These are not rhetorical questions. They are the open research and practice frontiers that the next wave of AI adoption will need to address. The practitioner community represented in this discussion has done the valuable work of identifying them clearly. Answering them will take more time, more data, and more honest reporting of both successes and failures.
