---
title: "Is AI-Assisted Coding Getting Worse?"
description: "Practitioners disagree on whether models are degrading — or whether users are simply hitting real limits."
weight: 1
tags: [model-quality, degradation, reliability, benchmarks]
date: 2026-02-06
related_debates: ["/debates/cost-sustainability", "/debates/brain-atrophy"]
---

## The Question

Few topics generate more heat in developer communities than the question of whether AI coding tools are getting worse over time. The complaint surfaces constantly: tasks that worked last month now require more prompting, models seem to lose coherence during US business hours, and context windows that once felt adequate now collapse under normal workloads.

The stakes are real. Developers are paying $125-400+ per month for AI coding tools and building workflows around model capabilities they believe were promised. When those capabilities seem to fluctuate -- or quietly degrade -- trust erodes. And in a market where providers compete fiercely for developer loyalty, the perception of degradation can be as damaging as actual degradation.

What makes this debate so difficult to resolve is the fundamental opacity of LLM-as-a-service. Users cannot inspect what model is actually being served, whether A/B tests are running, or how load management affects inference quality. This information asymmetry transforms a technical question into one of trust -- and the community is deeply split on whether providers deserve that trust.

## Side A: Yes, Quality Is Declining

### The Practitioner Evidence

The case for degradation rests primarily on practitioner experience -- and the volume of complaints is hard to dismiss. Developers who use these tools daily, with consistent prompts and workflows, report unmistakable quality declines.

> "Tasks that it could accomplish quickly a month ago now require more detailed prompting." -- davidee

This isn't a vague feeling. Users describe specific, reproducible regressions: workflows that stop working, models that spiral into incoherent multi-file edits, and sessions where the model appears to give up after hitting certain token thresholds. One developer described watching the model override commits without thinking, losing days of work in the process.

Daily users who maintain stored prompts -- essentially creating controlled conditions -- report noticing degradation across months. As one put it, the quality decline feels like cost optimizations rather than any technical change.

### The Time-of-Day Pattern

One of the most persistent observations is that model quality varies by time of day. Multiple developers report a clear pattern: performance degrades during US business hours (roughly 1 PM to 9 PM Eastern) and recovers at night and on weekends.

> "The best time to code with modern LLM stacks is when nobody else is." -- johnsmith1840

This pattern has a plausible mechanism. If providers use load-based routing, quantization, or reduced compute during peak hours, users would experience exactly this kind of degradation. One developer in a non-US timezone noted their consistently positive experience might be explained by never overlapping with peak US traffic.

After a service outage that drove most users away, one remaining user reported the service running three times faster than usual -- suggesting load-dependent performance is real, even if the mechanism differs from what users assume.

### The Transparency Problem

What fuels the degradation narrative most powerfully is the lack of transparency from providers. Users paying premium prices want to know what model they're actually getting, whether A/B tests are running, and what happens under load.

> "I would 100x prefer being forced to back-off" -- dmos62

The sentiment is clear: developers would rather receive honest rate limits or explicit refusals than silent quality reduction. One developer discovered a hard performance cliff at 45,000 tokens with ChatGPT -- the kind of threshold that, without documentation, looks like arbitrary degradation.

The opacity extends to benchmarking. When third-party trackers attempt to measure model quality over time, the results show oscillation patterns that could indicate A/B testing of checkpoints. Users who see these patterns naturally conclude that something is changing on the provider side.

### The Context Drift Problem

Beyond provider-side changes, there's a genuine technical failure mode: quality degradation within sessions as context accumulates. Multiple practitioners report that after any compaction of the context window, sessions become effectively useless.

Models forget design goals, revert to default patterns, and mix approaches in ways that produce incoherent code. One developer described repeatedly telling the model to use TanStack Router, only to have it default back to ReactRouter every time context pressure increased.

## Side B: No, Users Are Hitting Real Limits

### The Honeymoon-Hangover Effect

The counter-argument begins with a well-documented psychological pattern: users' perception of tool quality follows a predictable arc from amazement to frustration as expectations calibrate.

> "People just notice the flaws more the longer they use them." -- eli

This isn't dismissive. The honeymoon-hangover effect is a real phenomenon in technology adoption. Initial encounters with AI coding tools feel magical because expectations are low. Over weeks and months, users develop more sophisticated mental models of what the tool should be capable of, and failures that would have been invisible early on become infuriating.

Several commenters point out that as developers learn what models can and cannot do, the experience of hitting genuine limitations feels like degradation. One put it directly: is it possible that your expectations are increasing, not that the model is getting worse?

### The Statistical Case Against Degradation

Salvatore Sanfilippo (antirez), the creator of Redis, brought rigorous thinking to the debate. He argued that the observed oscillation pattern in benchmark trackers is better explained by A/B testing of model checkpoints, Claude Code harness updates, and natural sampling variability than by intentional model degradation.

His key point: if providers were silently swapping in cheaper models (like routing Opus requests to Sonnet), the performance drop would show a clear step-function pattern, not the gradual oscillation that benchmarks actually show. The percentage differences are too small and too variable for model swapping.

An Anthropic engineer directly stated that they never do anything to reduce model intelligence during inference. While users are free to disbelieve this, it's worth noting that deliberate degradation would be a severe business risk if discovered.

### The Benchmaxxing Problem

The relationship between benchmarks and real-world performance is more complex than either side acknowledges. Benchmark improvements consistently fail to predict user satisfaction.

> "On benchmarks GPT 5.2 was roughly equivalent to Opus 4.5 but most people who've used both would say Opus 4.5 is noticeably better." -- ifwinterco

This disconnect runs both directions. Models can improve on benchmarks while feeling worse to individual users, and models can score lower on benchmarks while handling specific workflows better. One detailed analysis explained how benchmark numbers can be technically true yet not reflect customer experience, through subtle mechanisms like load balancing and operational drift.

The skeptics also point out that the IEEE Spectrum article that catalyzed much of the "getting worse" narrative was an opinion piece based on anecdotal evidence -- but they fairly note that articles praising AI are equally unsubstantiated.

### The Scaffolding Argument

A significant camp argues that perceived degradation is actually a scaffolding problem. As projects grow more complex and users attempt more ambitious tasks, the harness engineering required to get good results increases -- and most users haven't kept up.

> "They are not getting worse... you haven't figured out the scaffolding." -- theptip

This argument holds that success with AI coding tools depends on providing proper context, maintaining documentation, and learning to communicate effectively with models. Developers who invest in 15,000-token world model files, AGENTS.md configurations, and structured workflows report consistently good results. Those who type prompts and hope for magic report degradation.

The "you're holding it wrong" framing is deeply controversial. Critics find it offensive -- the amount of specialized knowledge required to get useful output seems unreasonable for tools marketed as productivity boosters. Defenders argue that prompt quality is the primary interface with these tools, and expecting good results from poor prompts is like expecting good code from vague specifications.

## Where It Stands

The evidence suggests multiple overlapping phenomena that both sides partially capture:

**Load-dependent performance variation is likely real.** Too many independent observations of time-of-day patterns exist to dismiss entirely, even if the mechanism isn't the model swapping that users fear. Whether it's reduced compute allocation, longer queue times, or infrastructure effects, something changes under peak load.

**Context-related degradation within sessions is definitely real.** This is a fundamental limitation of transformer architectures with finite context windows, not provider malfeasance. The quality of long sessions degrades as context fills and compaction artifacts accumulate.

**Expectations are also definitely rising.** Developers who have used these tools for months have calibrated expectations far above what they brought to their first session. This genuinely creates the perception of degradation where none exists.

**Benchmark methodology remains deeply flawed.** Third-party trackers cannot control for harness changes, system prompt updates, or the dozens of confounding variables that affect measured performance. Without proper statistical rigor -- confidence intervals, controlled variables, sufficient sample sizes -- the data doesn't support strong conclusions in either direction.

The most productive framing may come from a production engineering perspective: in practice, degradation cause doesn't matter. What matters is building canary systems that test execution paths and route to what's actually working, treating model quality as a variable to be monitored rather than a constant to be trusted.

## What's Still Unknown

- **Do providers actually reduce inference quality under load?** No independent verification exists, and provider denials are unfalsifiable without transparency.
- **How much of the perceived degradation comes from harness/system prompt updates vs. model changes?** Claude Code ships frequent updates that could change agent behavior without any model-level change.
- **Will third-party QoS monitoring become standard?** As AI costs grow and subsidies end, organizations may demand the same service-level verification they expect from cloud providers.
- **Is there a ceiling on context management techniques?** Even the most sophisticated scaffolding approaches eventually hit context window limits. Whether future models solve this or users must adapt is an open question.
- **Does the honeymoon-hangover effect eventually stabilize?** If so, experienced users should reach a steady state of realistic expectations. Whether current complaints represent that stabilization or genuine regression remains unclear.
