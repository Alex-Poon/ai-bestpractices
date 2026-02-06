---
title: "Converts"
description: "Practitioners who changed their mind — from skepticism to adoption, or from enthusiasm to caution."
weight: 3
voice_category: "convert"
tags: [practitioner-insights, converts, changed-minds, adoption]
date: 2026-02-06
---

The most interesting voices in any technology debate are the ones who changed their mind. These practitioners describe a specific before-and-after: a concrete moment or experience that shifted their position. The conversions go both directions -- skeptics who became believers and enthusiasts who developed reservations.

---

## From IC to manager (reluctantly)

**seer** describes the shift to AI-assisted coding as eerily similar to the jump from individual contributor to manager. He stopped obsessing over implementation details and learned to give guidance instead of instructions. If the AI chose an iterative loop instead of a functional pattern, he let it go -- the tests still pass. The conversion was not instant; it required the same letting-go that management demands.

This is one of the most cited framings in the community, and it resonates because many developers have already made the IC-to-manager transition and recognize the emotional landscape.

---

## From fighting defaults to accepting them

**nonethewiser** spent significant effort trying to get Claude to use TanStack Router instead of ReactRouter. Eventually he realized the model's default worked correctly and the fight was pointless. The conversion was pragmatic: if the tool has a strong preference and it produces working code, the cost of insisting on your preferred approach often exceeds the cost of accepting the default.

This represents a broader pattern. Many converts describe a moment where they stopped fighting the model and started working with its tendencies.

---

## From skepticism to speed

**kstenerud** implemented a binary JSON format in Go, Rust, Swift, Python, and Jackson in a single week using Claude -- work he estimates would have taken a year manually. The conversion came from experiencing the speed directly. He describes hand-holding through the optimization phase and watching experiments that used to take days complete in minutes. The main frustration: hitting token limits one to two hours before each reset.

The specificity of this account -- five languages, one week, one spec -- makes it one of the most concrete productivity stories in the dataset.

---

## From enthusiasm to disillusionment

**ps** uses Opus 4.5 on a 50,000-line Django project and reports that the experience feels less like development and more like testing. The model sometimes excels but sometimes makes mistakes no competent human would make. He describes the shift as unwelcome -- becoming a tester rather than a developer was not why he entered the field.

This conversion is the mirror image of most adoption stories. The tool works, but the work it creates is not the work the developer wants to do.

---

## From human communication to AI communication

**verdverm** noticed his job shifting from writing formal language for compilers to writing natural language for what he calls a junior developer with goldfish memory but all-star skills. The paradox of this agent -- simultaneously brilliant and forgetful -- requires a fundamentally different communication approach than either talking to humans or writing code.

The conversion here is about communication style. Once you accept that you are writing for a different kind of reader, the entire approach changes.

---

## From vibe code to understanding the gap

**JustSkyfall** vibe-coded a complete Toggl Track clone. It works. But he freely admits that if he had to rewrite the PDF generation component himself, he would have no idea how. The conversion is a recognition: functional output and actual understanding are two completely different things, and AI delivers the first without the second.

This is the clearest articulation of the learning gap that Anthropic's own study later confirmed empirically.

---

## From productivity optimism to expectation realism

**FitchApps** describes a vivid workplace scenario: the project manager now reports bugs with Claude's suggested fix pasted directly into the ticket. The developer's role has been reduced to copying what Claude said and making sure it compiles. He sleeps well at night, he adds, only because Claude does not yet support 9 PM deployments.

The conversion here is not about the developer's skill but about organizational dynamics. Once managers can get AI-generated fixes, the developer's perceived value shifts from problem-solving to compilation verification.

---

## From OSS frustration to AI-powered creation

**nberkman** had years of bottled-up ideas for open source projects but never had the bandwidth to execute them. Using AI tools, he built a clipboard utility that hit 200 stars and resurrected a stale SDK. The conversion is straightforward: AI gave him the capacity to ship things he had been imagining for years.

This is the counter-narrative to the "AI kills OSS" concern. For experienced developers with clear vision, AI removes the implementation bottleneck between idea and release.

---

## From multi-agent hype to single-agent pragmatism

**esperent** carefully specified test coverage requirements and asked Claude to split the work. He expected three to four subagents; it spawned twenty-six. Months of test-writing drudge work completed in twenty minutes. But verification took days. The conversion is nuanced: the technique works, but the hidden cost of verification means the actual time savings are far less dramatic than the headline number suggests.

Many converts land in this territory -- genuinely impressed but with a much more calibrated view of the real productivity multiplier once verification costs are factored in.

---

*What unites these voices is honesty about the transition. None describe a clean binary switch. The conversions are messy, partial, and qualified -- which is what makes them credible.*

For other perspectives, see [Power Users](power-users.html), [Thoughtful Skeptics](skeptics.html), and [Builders](builders.html).
