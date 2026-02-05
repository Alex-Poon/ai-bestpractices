---
title: "HN Discussion: My AI Adoption Journey"
source: https://news.ycombinator.com/item?id=46903558
article_source: https://mitchellh.com/writing/my-ai-adoption-journey
date: 2026-02-05
points: 147+
comments: 46+
tags: [community-discussion, adoption-strategy, productivity-debate, cost-analysis, craft-vs-ai]
---

# HN Discussion: My AI Adoption Journey

**Source thread:** [news.ycombinator.com/item?id=46903558](https://news.ycombinator.com/item?id=46903558)
**Article under discussion:** [mitchellh.com/writing/my-ai-adoption-journey](https://mitchellh.com/writing/my-ai-adoption-journey)
**Date:** 2026-02-05 | **Points:** 147+ | **Comments:** 46+

---

## 1. Task Scoping and Sweet Spot (Heavy Consensus)

This was the dominant thread in the discussion, with multiple commenters converging independently on the same insight: the key skill in AI-assisted development is learning how to scope tasks for the agent.

**mjr00:** At one extreme, instructions too specific ("write a for loop summing numbers") — scope too small to benefit from LLM. At other extreme, too broad ("make Facebook for dogs") — agent makes too many assumptions. A lot of successful LLM adoption is finding the sweet spot. Overly specific doesn't feel productive; overly broad means redoing too much work.

**sho_hn:** Forming educated intuition about agent capabilities and tastefully framing/scoping tasks is enjoyable. Feels cognitively similar to modularization, architecture layout, chunking. "It's always been one of the things that make programming pleasurable for me."

**allenu:** Framing and scoping is "becoming a real joy." There's a point where you can scope small enough that AI can't get it wrong AND it's easy for you to verify. Think of projects as tree structures: humans keep editorial control of main trunk (architecture) and sub-modules, delegate smaller branches (implementations). Sometimes you prototype smaller bits to inform higher-level decisions.

**iamacyborg:** Tried Lovable — onboarding set users up for failure by asking them to describe a detailed app upfront. "Taking it piece by piece in Claude Code has been significantly more successful."

**oulipo2:** LLMs are good at "code inpainting" — give outline/constraints/rules and they fill in blanks. Not good at making robust new features from scratch.

**apercu:** Enjoys writing specifications; made it a large part of consulting career. "The more detailed I am in breaking down chunks, the easier it is for me to verify and the more likely I am going to get output that isn't 30% wrong."

### Key Takeaway

The consensus is that effective AI adoption requires treating task scoping as a first-class skill. The "sweet spot" sits between trivially small tasks (where the overhead of prompting exceeds the benefit) and ambitiously large ones (where the agent drifts and makes too many unchecked assumptions). Multiple commenters independently arrived at the tree/modular metaphor: humans own the architecture, agents fill in well-bounded implementations.

---

## 2. Drift and Verification (Key Insight)

One of the highest-signal comments in the thread, from **EastLondonCoder**, articulated a failure mode many others recognized but hadn't named clearly.

**EastLondonCoder:** "The failure mode I kept hitting wasn't just 'it makes mistakes', it was drift: it can stay locally plausible while slowly walking away from the real constraints of the repo. The output still sounds confident, so you don't notice until you run into reality (tests, runtime behaviour, perf, ops, UX)."

**Solution described:** "treating chat as where I shape the plan (tradeoffs, invariants, failure modes) and treating the agent as something that does narrow, reviewable diffs against that plan. The human job stays very boring: run it, verify it, and decide what's actually acceptable."

**On the inflection point:** "Once I got that loop stable, it stopped being a toy and started being a lever."

**Real projects shipped using this approach:**
- A git-like tool for heavy media projects
- A ticketing/payment flow with real users
- A local-first genealogy tool
- A small CMS/publishing pipeline

**Common thread across all:** "small diffs, fast verification, and continuously tightening the harness so the agent can't drift unnoticed."

**On the bottleneck shift:** "The bottleneck has gone from writing code to reading code."

### Key Takeaway

Drift — where the agent remains locally plausible while gradually diverging from actual project constraints — is the central failure mode of agentic coding. The antidote is a tight loop: plan in chat, execute as narrow diffs, verify immediately, repeat. The human role shifts from writing to reading and judging.

---

## 3. Is This Just Good Engineering? (Meta-Debate)

A brief but telling exchange that surfaced a recurring tension: whether "AI best practices" are simply long-established software engineering practices rebranded.

**bdangubic:** "How is this different from how we should have built software all along? I know I have been (after 10+ years…)"

**EastLondonCoder response:** "There is no secret. The secret is that there is no secret." Successful projects always used these techniques. Experience helps because you develop a sense for when the model goes in a wonky direction. "With where the models are right now you still need a human in the loop to make sure you end up with code you (and your organisation) actually understands."

### Key Takeaway

The practices that make AI-assisted development work — small diffs, clear specifications, modular architecture, fast verification — are the same practices that have always made software development work. AI adoption doesn't replace engineering discipline; it rewards and amplifies it. Experienced developers have an advantage because their existing intuitions about code quality and project structure transfer directly to scoping and verifying agent output.

---

## 4. The Craft Debate

One of the more emotionally charged sub-threads, touching on identity, satisfaction, and what it means to be a programmer.

**jplusequalt:** "Some of us enjoy learning how systems work, and derive satisfaction from the feeling of doing something hard, and feel that AI removes that satisfaction. If I wanted to have something else write the code, I would focus on becoming a product manager. This is a craft, and I very much enjoy the autonomy."

**mitchellh (article author) response:** "There is no dichotomy of craft and AI. I consider myself a craftsman as well. AI gives me the ability to focus on the parts I both enjoy working on and that demand the most craftsmanship."

**tux1968:** "Nobody is trying to talk anyone out of their hobby or artisanal creativeness." But in the context of getting work done efficiently, only one approach can get the job done in reasonable time.

**fizx:** (Sardonic) "I enjoy Japanese joinery, but for some reason the housing market doesn't."

### Key Takeaway

The craft debate is real but may present a false dichotomy. mitchellh's framing — that AI lets craftsmen focus on the parts requiring the most craftsmanship — received broad agreement. The counterpoint (fizx's Japanese joinery quip) highlights the market pressure dimension: personal satisfaction and professional efficiency may pull in different directions, and individual developers will resolve that tension differently.

---

## 5. Cost Reality

A practical thread that surfaced numbers rarely shared in AI adoption discussions.

**jonathanstrange:** "Stories about agentic AI rarely post how much they spend. Before I can even consider it, I need to know how it will cost me per month."

**JoshuaDavid:** "Low hundreds ($190 for me) but yes."

**latchkey** (referenced): Combines JetBrains AI ($300/year), GPT subscriptions ($20/month), Claude credits ($5-10 daily). This implies a monthly cost in the range of $175-$325.

### Key Takeaway

Realistic monthly costs for serious agentic AI usage land in the low-to-mid hundreds of dollars. This is a meaningful expense, particularly for individual developers or small teams, and the discussion highlighted that cost transparency is sorely lacking in most AI adoption narratives.

---

## 6. Productivity Skepticism

A contentious thread with strong claims on both sides.

**jorvi:** "The AI skeptics instead stick to hard data, which so far shows a 19% reduction in productivity when using AI." (Cites the METR study.)

**vonneumannstan:** "For the AI skeptics reading this, there is an overwhelming probability that Mitchell is a better developer than you. If he gets value out of these tools you should think about why you can't."

**dakiol pushback:** "That's like saying Bezos is a way better businessman than you, so you should really hear his tips about becoming a billionaire." What works for him may not work for you.

**tux1968 nuance:** "The flip side of that argument might be that you have to be a much better programmer than most of us are, to properly extract value out of the AI... maybe it's only useful in the hands of a real expert."

### Key Takeaway

The productivity debate remains unresolved. The METR study showing a 19% reduction in productivity is cited by skeptics, while proponents point to individual success stories. A particularly interesting nuance emerged: if AI tools require expert-level skill to use effectively, that may limit their broad applicability even if they are genuinely powerful in expert hands. The "appeal to authority" argument (mitchellh is a great developer, so listen to him) was effectively countered by the survivorship bias critique.

---

## 7. Learning Curve

**polyrand:** "The only way to get good at coding with LLMs is actually trying to do it. Even if it's inefficient or slower at first. It's just another skill to develop." Many plugins/features are counter-productive. "Just learn how to prompt and steer the LLM better."

### Key Takeaway

AI-assisted development is a skill that must be practiced, not just read about. The commenter suggests stripping away tooling complexity and focusing on the fundamental skill of prompting and steering, rather than relying on plugins and abstractions.

---

## 8. Miscellaneous Notable Comments

**underdeserver:** Notes that agent requirements (read files, execute programs, HTTP requests) are "one very short step removed from Simon Willison's lethal trifecta." (The lethal trifecta refers to the dangerous combination of capabilities that could enable prompt injection attacks with real-world consequences.)

**recursive:** "I'm definitely not running that on my machine." (On the security implications of giving agents broad system access.)

**mwigdahl:** Liked the approach to replicate manual commits with the agent. Wished they'd done it when learning.

**senko:** Links to mitchellh's prior post on a non-trivial coding session: [mitchellh.com/writing/non-trivial-vibing](https://mitchellh.com/writing/non-trivial-vibing)

**jeffrallen:** "babysitting my kind of stupid and yet mysteriously productive robot friend — LOL, been there, done that."

---

## Overall Tone and Synthesis

The discussion is notably pragmatic and less performative than typical AI threads on Hacker News. Multiple commenters explicitly praised this quality. The consensus leans toward a nuanced position:

1. **AI agents are genuinely useful** but require real skill to wield effectively
2. **The learning curve is non-trivial** — this is a new skill set, not a plug-and-play productivity boost
3. **Costs are real** and rarely discussed honestly in adoption narratives
4. **The craft of programming is evolving** rather than dying — the best framing treats AI as shifting where craftsmanship is applied, not eliminating it
5. **Task scoping is the core skill** — the human's job is increasingly about decomposition, specification, and verification rather than line-by-line implementation
6. **Drift is the primary failure mode** — agents stay locally plausible while gradually diverging from real constraints, making tight verification loops essential
7. **Good AI practices are good engineering practices** — the discipline that makes AI-assisted development work is the same discipline that has always made software development work

The thread represents one of the more grounded public discussions of AI-assisted development practices as of early 2026, with practitioners sharing concrete experiences rather than abstract predictions.
