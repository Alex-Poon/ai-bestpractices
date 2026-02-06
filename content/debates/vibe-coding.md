---
title: "The Vibe Coding Question"
description: "Where on the spectrum from full delegation to tight leash should AI-assisted development land?"
weight: 2
tags: [vibe-coding, delegation, autonomy, workflow]
date: 2026-02-06
related_debates: ["/debates/junior-skills", "/debates/engineering-vs-programming"]
---

## The Question

Andrej Karpathy coined the term "vibe coding" to describe a mode of AI-assisted development where you fully cede implementation to the model, accepting code you don't fully understand as long as it works. The term quickly became a lightning rod -- embraced by some as the future of software development, rejected by others as professional malpractice.

But the community has moved beyond a simple for-or-against debate. Practitioners now describe a spectrum from full delegation to tight step-by-step control, with most experienced developers settling somewhere in between. The real question isn't whether vibe coding is good or bad -- it's where on this spectrum responsible development should land, and whether the answer changes depending on context.

This matters because the answer determines how developers spend their time, how teams structure their workflows, how companies assess risk, and ultimately what the software industry looks like in five years. If full delegation works, the developer role transforms into something closer to product management. If it doesn't, we're building on sand.

## Side A: Vibe Coding Is Revolutionary

### The Productivity Explosion

The most compelling argument for vibe coding comes from practitioners who report extraordinary productivity gains when they stop trying to understand every line of generated code and instead focus on outcomes.

> "70%+ of the time I just blindly accept changes." -- kaydub

This developer runs multiple Claude Code sessions simultaneously, catching problems at the PR review stage rather than during generation. The approach is deliberate -- not laziness but a calculated bet that review-at-the-end is more efficient than supervision-during-generation.

The numbers reported by enthusiasts are striking. One developer described implementing a binary JSON format in Go, Rust, Swift, Python, and Jackson in a single week -- work that would have taken a year otherwise. Another split test-writing into 26 parallel subagents, completing months of work in 20 minutes (though verification took days).

For builders -- developers who see coding as a means to an end rather than the end itself -- vibe coding represents liberation. The tedious implementation work that stood between an idea and a working product has collapsed from weeks to hours.

### The Spectrum Is the Point

Defenders of vibe coding argue that treating it as binary misses the point. One commenter captures this well: the two kinds of vibe coding are not separate categories but a spectrum of how much context you care to understand.

In practice, most vibe coders describe a contextual approach. For happy-path work in familiar codebases, they ask for small changes step by step, examining each one. For unfamiliar territory, they let the model generate an initial attempt as inspiration, then direct it from there. The signal to switch modes: when you spend more time explaining context than it would take to just write the code yourself.

> "Treat it like onboarding a contractor -- bounded tasks with clear acceptance criteria." -- jackfranklyn

This framing recasts vibe coding not as abandoning understanding but as choosing the right level of engagement for the task at hand. Nobody reviews every line of a library they import -- vibe coding extends this trust boundary to AI-generated application code.

### The New Workflow Paradigm

Some practitioners have pushed vibe coding into genuinely new workflow territory. One developer described building a complete SwiftUI application without looking at a single line of code -- using a PRD-to-agent-loop workflow where ideation happens in conversation, specs get broken into tasks, parallel agents implement, and the human does smoke testing.

The argument here isn't that understanding code doesn't matter but that understanding shifts to a higher level of abstraction. You understand what the system should do, how the pieces connect, and what the acceptance criteria are. The implementation details become analogous to assembly language -- important to someone, but not necessarily to the person directing the work.

> "I like engineering where I figure out data flow and structures -- writing code is the boring part." -- theshrike79

This perspective sees vibe coding as enabling developers to work at the level they find most valuable: architecture, system design, and data modeling. The actual code generation is the mechanical step, and delegating it to AI is no different from delegating it to a compiler.

### The "Good Enough" Argument

For personal tools, prototypes, and internal utilities, vibe coding advocates argue that perfect code quality is the wrong optimization target. One developer built a QR code generator rather than fighting adware-laden online tools -- faster and more private than any alternative. A retired developer used Claude to build a disassembler, assembler, and partially working emulator for reverse engineering firmware in weeks.

The philosophy: if the code works, passes tests, and serves its purpose, the fact that a human didn't write every line is irrelevant. Demanding full human understanding of every line is a luxury that serves craft but not necessarily users.

## Side B: Vibe Coding Produces Unmaintainable Systems

### The Technical Debt Accelerator

The most damning criticism of vibe coding comes from practitioners who see its aftermath. Consultants report being hired increasingly to rescue vibe-coded projects -- applications with real users but no engineering behind them.

> "The bottleneck is drowning under your own slop." -- embedding-shape

The pattern is consistent: AI generates code fast initially, but projects slow down as they grow. The models optimize for getting something working now, not for maintainability, readability, or extensibility. What starts as rapid prototyping becomes a maintenance nightmare as features accumulate without coherent architecture.

One developer coined the term "slop-coding" to describe the phenomenon, arguing it produces the software equivalent of fast food -- satisfying in the moment, harmful over time. Another noted that vibe-coded stuff "limps faster" with each model release but still cannot walk.

### The Review Crisis

Even proponents acknowledge that AI-generated code must be reviewed. But the math doesn't work in vibe coding's favor: generating code is now near-instant, while reviewing it takes the same time it always did. This creates an asymmetry where the bottleneck shifts entirely to human review capacity.

> "We can only produce code as fast as responsibility-takers can execute due diligence." -- zmmmmm

When a model generates 500 lines of code in seconds, a developer now faces a review task that may take longer than writing the code manually would have. The code often lacks the structural clarity that comes from a human building it incrementally with a mental model of the whole. Misleading comments, inconsistent abstractions, and subtle logical errors hide in the volume.

One developer caught Sonnet 4.5 producing code with a misleading comment that described the opposite of what the implementation did. They argued that 99.99% of true vibe coders would never have caught this -- and that "fix X" prompts assume bugs are always detectable, which they're not.

### The Complexity Jenga Tower

A recurring metaphor in the skeptic camp is that of building Jenga towers -- each piece of AI-generated code adds to a structure that looks stable until it suddenly isn't. The problem isn't any individual piece but the accumulation of code that nobody fully understands.

> "LLMs produce lower quality at higher volumes." -- barrell

One practitioner described building a simple expenses app, only to have the AI keep inserting double-entry bookkeeping, turning a simple tool into an accounting system nobody asked for. This "scope creep into the average" is a fundamental tendency of models that optimize for typical patterns rather than minimal implementations.

The professional responsibility angle is sharp. Multiple commenters argue that you cannot prompt, test, and ship a complex multi-service application where nobody understands the implementation. When bugs appear in production -- as they inevitably do -- someone needs to understand the system well enough to diagnose and fix them under pressure.

### The Craft Matters

Beyond practical concerns, a significant camp argues that understanding your code is a professional obligation, not a luxury.

> "It is not just my job to generate code; it is my job to know the code." -- chasing

This perspective distinguishes between generating code and taking responsibility for it. A pilot doesn't just get a plane to its destination -- they understand the systems well enough to handle failures. If you can't trust an LLM to either complete a task reliably or explain why it's difficult, then shipping its output into production is a professional risk.

Several developers describe deliberately avoiding full vibe coding to preserve their skills -- using AI for documentation, debugging, and code review but writing implementations themselves. One maintains a strict separation: AI agents at work for velocity, manual coding for hobby projects to maintain skills.

### The Doom Loop

Perhaps the most visceral argument against vibe coding is the "going in circles" failure mode. When vibe-coded projects hit bugs that the model can't fix, the developer -- who doesn't understand the code -- is trapped in a loop of prompting, getting wrong fixes, and prompting again.

One developer described spending hours and half a million tokens trying to get a frontier LLM to fix a simple CSS issue, ultimately fixing it manually in minutes. Another reported the model claiming to "clearly see the issue now" ten times in succession, being wrong every time.

Without a mental model of the code, there's no escape from this loop. The human can't diagnose the problem themselves, and the model's attempts aren't converging on a solution. The result is worse than if the code had been written manually in the first place.

## Where It Stands

The community is converging on a nuanced position that neither fully embraces nor rejects vibe coding:

**Context determines the appropriate level of delegation.** Prototypes, personal tools, and throwaway scripts are broadly accepted as legitimate vibe coding territory. Production systems with real users, regulatory requirements, or long maintenance horizons demand significantly more human oversight.

**The spectrum is real and valuable.** Most effective practitioners work somewhere in the middle -- using AI for generation but maintaining enough understanding to review, debug, and extend the code. Pure vibe coding (zero code reading) and pure manual coding (zero AI assistance) are both suboptimal extremes for most professional work.

**The "tight leash" approach outperforms full delegation.** Practitioners who ask for small changes step by step, examine each one, and commit before moving on report better outcomes than those who delegate large tasks and hope for the best. Smaller tasks with verification between each produce better results than large delegations.

**Testing is necessary but not sufficient.** Near-100% test coverage with property-based and fuzz tests can substitute for line-by-line code review in some cases. But tests can only catch failures you think to test for, and the code's long-term maintainability isn't captured by any test suite.

**The review bottleneck is real and unsolved.** Until AI-generated code can be reviewed as efficiently as it's generated, human review capacity will cap the productivity benefits of vibe coding. Multi-agent review approaches (using one AI to review another's output) show promise but haven't proven reliable enough for production use.

## What's Still Unknown

- **Will model improvements make vibe coding safer?** If models consistently produce correct, maintainable code, the arguments against delegation weaken. Current evidence suggests improvement is real but uneven.
- **Can verification substitute for understanding?** The test-first crowd argues you don't need to understand implementation if your tests are comprehensive enough. Whether this holds for complex systems under edge-case pressure is untested at scale.
- **What is the long-term maintenance cost of vibe-coded systems?** Most vibe-coded applications are less than a year old. Whether they survive their first major refactoring, security audit, or scaling challenge is unknown.
- **Will liability and regulation force the question?** If legislation holds developers accountable for code they ship, regardless of how it was generated, that may impose a floor on how much understanding is professionally required.
- **Does the "right level" of vibe coding shift as projects mature?** Vibe coding may be appropriate for the first 80% of a project and inappropriate for the last 20%. Whether practitioners can effectively switch modes mid-project is unclear.
