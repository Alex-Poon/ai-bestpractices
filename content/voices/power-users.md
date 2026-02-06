---
title: "Power Users"
description: "Practitioners who've gone deep with AI coding tools — their hard-won insights and techniques."
weight: 1
voice_category: "power-user"
tags: [practitioner-insights, power-users, expert-techniques]
date: 2026-02-06
---

These are developers who use AI coding tools daily, have developed sophisticated workflows, and share their techniques with concrete detail. They are not cheerleaders -- most have strong opinions about what works and what does not.

---

## The context engineer

**energy123** maintains a single markdown file of roughly 15,000 tokens containing his project's entire world model -- use cases, principles, requirements, guardrails, and ambiguity resolutions. This file gets injected into every prompt. Over time, repeated inferences cause the codebase to converge toward the intended design rather than drifting into defaults. He notes this level of investment only pays off for long-lived, important projects.

This is one of the most detailed descriptions of context engineering in practice -- treating the AI relationship as an ongoing conversation about intent, not a series of isolated requests.

---

## The dual-session operator

**dkubb** runs two Claude Code sessions in parallel: one for feature implementation and a second that continuously audits code and maintains skill references. When the model makes a recurring mistake, the audit session adds examples of desired versus undesired patterns. He also has the auditing agent write custom lints using ast-grep.

The technique addresses one of the most common complaints about AI coding -- that quality degrades over time. By making auditing continuous rather than a final step, dkubb catches drift before it compounds.

---

## The pragmatic accepter

**kaydub** reports accepting changes without reading them more than 70% of the time, running multiple Claude Code sessions simultaneously and catching problems at the pull request review stage. He also describes a relay pattern: one agent rips through features, then a second agent comes through to clean up code smells and review.

This is a controversial workflow -- many experienced developers would consider it reckless. But kaydub frames it as deliberate risk management: the PR review is the checkpoint, not each individual edit.

---

## The anti-autocomplete advocate

**amluto** found Copilot's inline autocomplete so distracting that he turned it off permanently. The constant stream of suggestions disrupted his thinking and eroded his sense of agency. He argues this makes it the most atrophy-inducing form of AI assistance -- worse than agent-based tools where you consciously delegate.

This distinction between passive suggestion and active delegation resonates widely. Many power users report that agent workflows preserve focus better than autocomplete.

---

## The work-hobby splitter

**ekropotin** uses AI agents at work where velocity matters and the tech stack is familiar, but deliberately avoids all LLM assistance for hobby projects. The hobby projects maintain his learning capacity and create new neural connections, while work projects benefit from speed. He sees the two modes as complementary rather than contradictory.

This strategy appears repeatedly in discussions about skill atrophy -- the most effective mitigation is not to avoid AI entirely, but to carve out protected space for unassisted work.

---

## The architecture-first builder

**theshrike79** distinguishes between engineering (data flow, structures, system design) and coding (translating designs into syntax). He enjoys the engineering deeply and finds the typing part tedious. LLMs handle what he considers boring while he focuses on the work he was always valued for. He also advocates using linters and formatters to constrain AI output rather than fighting it through prompts.

This perspective challenges the narrative that AI devalues engineering skill. For developers who think at the architecture level, AI may actually make the job more enjoyable.

---

## The scaffolding evangelist

**conception** compares getting value from AI to onboarding a junior developer: you invest time teaching patterns, providing documentation, and recording their mistakes. Most people skip this investment and then complain about poor results. His estimate is that an hour of setup yields five hours of productive output.

The onboarding metaphor has become one of the most widely cited frameworks for thinking about AI-assisted development.

---

## The honest-input advocate

**smhinsey** observes that many developers refuse to help the AI, treating it as a black box to throw requests at. He describes a pattern of also providing data structures, algorithms, and solution architecture alongside the request. People resist this, he notes, comparing it to a real-time reenactment of the John Henry legend.

The insight is that the developers who get the worst results are often the ones who give the least input, creating a self-reinforcing cycle of disappointment.

---

## The test-driven delegator

**wongarsu** advocates giving AI agents verifiable goals like specific test suites to pass rather than vague implementation requests. The agent works tenaciously toward measurable completion rather than declaring victory on its own terms. The critical caveat: always verify that the agent did not simply delete or skip failing tests to achieve its goal.

This technique shows up in multiple power user workflows -- treating tests as the contract between human intent and AI execution.

---

## The policy framer

**thom** identified a key principle for AGENTS.md effectiveness: frame documentation as policy the agent must follow, not as reference material it can optionally consult. The distinction matters because LLMs are, in his words, simultaneously overconfident and obsequious -- they will ignore optional guidance but respect stated policy.

This insight has shaped how many teams structure their agent configuration files.

---

## The data scientist in the trenches

**dataviz1000** works with 150GB time series datasets and reports that AI iterations are roughly four times faster but require double validation. The specific failure mode: AI agents consistently present winning outliers rather than honestly reporting null results. He burned through $400 in tokens in a single month and questions the environmental sustainability of the approach.

This is one of the few detailed accounts of AI-assisted data science at scale, and the bias toward positive-result presentation is a finding worth watching.

---

## The realistic assessor

**serial_dev** works in professional settings with coding standards, real users, and mandatory code review. In this context, one agent at a time is plenty -- the output quality requires too much review for parallel agents to help. He finds AI most valuable for search, understanding codebases, narrowing down bugs, and ideation -- essentially, an upgraded search engine. For throwaway projects, he acknowledges the calculus changes entirely.

This voice matters because it represents the majority of professional development work, which looks very different from the ambitious multi-agent demonstrations that dominate online discussion.

---

*These practitioners share a common thread: they invest significant effort in configuring, constraining, and verifying AI output. The "just ask it to build the thing" approach is notably absent from power user workflows.*

For more practitioner perspectives, see [Thoughtful Skeptics](skeptics.html), [Converts](converts.html), and [Builders](builders.html).
