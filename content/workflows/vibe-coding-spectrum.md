---
title: "The Vibe Coding Spectrum"
description: "From rapid prototyping to production engineering — understanding when to be rigorous."
weight: 4
tags: [vibe-coding, workflow, code-quality, productivity]
date: 2026-02-06
---

"Vibe coding" entered the vocabulary in early 2025, but practitioners quickly discovered that the term covered fundamentally different activities. David Bau's influential article identified two distinct types, and the community debate that followed revealed a full spectrum of approaches between them. Understanding where you are on this spectrum -- and where you should be -- is one of the most consequential workflow decisions in AI-assisted development.

## The Two Types

David Bau drew a line between two modes that both get called "vibe coding" but require entirely different infrastructure and mindset.

**Type 1: Delegated with oversight.** The human programmer remains fully informed and in control. You delegate small, well-defined tasks to the AI, review each piece of output, and make all key decisions. You understand every line of code in the project. The AI is handling implementation details within constraints you set.

This is what most experienced practitioners actually do. Some in the HN discussion argued this is not "vibe coding" at all -- it is simply AI-assisted development. The distinction matters because this mode scales safely with normal development practices: code review, testing, and incremental commits.

**Type 2: Surrendered cognitive control.** You stop reading all the code in detail. The AI builds complexity beyond what you have time to fully understand. You are trusting the agent to make autonomous decisions across longer development arcs. You evaluate results by behavior ("does it work?") rather than by code comprehension ("do I understand how it works?").

This is closer to what Karpathy originally described: prompting and running the output without closely reading the implementation. It is also where most of the productivity gains and most of the risks concentrate.

For the full source analysis, see [Two Kinds of Vibe Coding](/sources/2025-12-18-two-kinds-vibe-coding/).

## The Full Spectrum

In practice, these two types are endpoints on a continuum. Most real work falls somewhere between them.

### Pure Vibe (High Risk, High Speed)

You describe what you want in natural language, run the output, and iterate based on observable behavior. You do not read the generated code. You judge success by whether the application does what you asked.

**Appropriate for:** Throwaway prototypes, personal scripts, hackathon demos, exploring whether an idea is feasible, one-off data transformations you will not maintain.

**Not appropriate for:** Anything with users, anything that handles data you care about, anything you will need to maintain or debug later.

### Guided Generation (Moderate Risk, Moderate Speed)

You provide detailed specifications and constraints. You review the generated code at a structural level -- checking architecture, key logic paths, and error handling -- without verifying every line. You rely on automated tests to catch implementation-level issues.

**Appropriate for:** Internal tools, features with comprehensive test coverage, well-understood problem domains, code with strong type systems that catch categories of errors at compile time.

**Not appropriate for:** Security-critical code, novel algorithms, code in domains where you lack the expertise to evaluate correctness.

### Rigorous Review (Low Risk, Lower Speed)

You use AI for initial drafts but review every line as thoroughly as you would review a human colleague's pull request. You understand every decision in the code. The AI accelerates your implementation speed without reducing your comprehension.

**Appropriate for:** Production systems, security-sensitive code, shared libraries, code that other people will maintain, anything where a subtle bug has outsized consequences.

## Choosing Your Level of Rigor

The right position on the spectrum depends on the consequences of getting it wrong, not on how good the AI is.

**Low-consequence code** (personal scripts, prototypes, exploratory work): vibe coding is fine. The cost of a bug is restarting or throwing the code away. Speed matters more than correctness.

**Medium-consequence code** (internal tools, features behind feature flags, code with strong test coverage): guided generation works well. Automated tests and type systems provide a safety net. You can review at the structural level and let tooling catch implementation errors.

**High-consequence code** (production services, security boundaries, data pipelines, shared infrastructure): rigorous review is mandatory. Karpathy observed that code review skills persist even as writing fluency declines -- this is the right use of that preserved capability. The AI drafts; you verify thoroughly.

## The Infrastructure Gap

The critical insight from Bau's analysis is that moving along the spectrum toward less oversight requires proportionally more infrastructure. Type 1 works with normal development practices. Type 2 requires what Bau calls "meta-cognitive infrastructure" -- systems that maintain human comprehension and control over increasingly complex agent-built codebases.

**Automated testing is non-negotiable for Type 2.** Without automated tests, the human becomes a manual tester, repeatedly running the application and checking behavior by hand. Automated tests let agents validate their own work across longer development cycles.

**Tests must themselves be tested.** Agents can produce solutions that technically pass tests without actually doing what is intended. Meta-level testing -- code coverage analysis, fuzz testing, property-based testing, benchmarking against reference implementations -- reveals gaps and prevents false confidence. See [Verification](/skills/verification/) for techniques.

**The transition point is where projects fail.** Moving from Type 1 to Type 2 without building the supporting infrastructure first is the most common path to the experience one HN commenter described as "exhausting QA testing of a bad engineer's work."

## Community Debate: Quality vs. Speed

The practitioner community remains divided on where vibe coding belongs in professional practice.

**The skeptics** report that initial productivity excitement gives way to disillusionment as AI-generated code accumulates subtle issues. One practitioner described the result as reaching a destination faster but arriving with a product that does not really work. The concern is that AI-generated code ships faster but breaks harder.

**The pragmatists** find vibe coding valuable within clear boundaries: small tasks, digestible scope, code you do not intend to maintain long-term. They keep the AI on a short leash, constantly reviewing and simplifying, treating it as a fast but unreliable junior developer.

**The enthusiasts** argue that with proper infrastructure (strong tests, CI/CD, good harness files), the speed advantage of less-rigorous approaches outweighs the quality cost. They point to the Carlini compiler project as evidence that high-volume AI-generated code can produce working software at scale -- but note that the project's success depended entirely on robust verification infrastructure.

## Anti-Patterns at Each Extreme

### Too Much Vibe

- **No tests, no review, full send.** Shipping AI-generated code without any verification. Works until it does not, and "until it does not" usually arrives when the consequences are highest.
- **Accumulated incomprehension.** Letting the AI build complexity you cannot debug. When something breaks -- and it will -- you have no mental model of the system and no path to diagnosis.
- **Confusing "it runs" with "it works."** Observable behavior is necessary but not sufficient. AI-generated code can produce correct-looking output through incorrect logic, especially in edge cases.

### Too Much Rigor

- **Reviewing every line of boilerplate.** Spending twenty minutes reviewing an AI-generated test file that follows an obvious pattern. Some code does not warrant line-by-line review.
- **Refusing to delegate anything.** Treating AI tools as fundamentally untrustworthy and doing everything manually. You are paying the cost of the tool without receiving the benefit.
- **Perfectionism as procrastination.** Using the need for thorough review as a reason to avoid shipping. The goal is appropriate rigor for the context, not maximum rigor for everything.

## The Decision Framework

For each task, ask three questions:

1. **What are the consequences of a subtle bug?** If the answer is "I restart" or "I throw it away," lean toward speed. If the answer involves users, data, or money, lean toward rigor.

2. **Do I have automated verification?** Strong tests and type systems let you safely reduce manual review. No tests means you are the test suite -- act accordingly.

3. **Will I or someone else need to understand this code later?** If yes, you need enough comprehension to maintain it. If no, comprehension is optional.

Match your position on the spectrum to your answers. And invest in the infrastructure that lets you safely move toward speed when the situation warrants it.

## Sources

- [Two Kinds of Vibe Coding](/sources/2025-12-18-two-kinds-vibe-coding/) -- Bau's original taxonomy and the community response
- [Karpathy's Claude Coding Notes](/sources/2026-01-26-karpathy-claude-coding-notes/) -- Observations on skill atrophy and the builder/coder split
- [Verification](/skills/verification/) -- Techniques for reviewing AI-generated code effectively
