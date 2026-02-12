---
title: "Coding agents have replaced every framework I used"
source_url: "https://blog.alaindichiappari.dev/p/software-engineering-is-back"
hn_url: "https://news.ycombinator.com/item?id=46923543"
date: 2026-02-07
hn_points: 372
hn_comment_count: 594
tags: [agent-workflows, developer-workflows, future-of-coding, frameworks, practitioner-insights]
tier: 2
weight: 1
---

## Summary

The author argues that AI coding agents have fundamentally changed how they approach software development, to the point where traditional frameworks feel unnecessary. Rather than pulling in large dependency trees and conforming to opinionated architectures, they now ask agents to generate purpose-built code tailored to specific problems. The result, they claim, is a return to genuine engineering thinking -- choosing the right approach for each situation rather than defaulting to whatever framework is popular.

Their daily workflow involves spending hours with coding agents building products from scratch. They describe never writing the same boilerplate twice, relying on simple tools like Makefiles and Bash scripts instead of elaborate build systems. The argument extends beyond convenience: frameworks were designed by teams solving problems at massive scale, but most projects never reach that scale and inherit unnecessary complexity.

The post sparked intense debate because it challenges a core assumption of modern development -- that frameworks provide essential structure, community knowledge, and battle-tested reliability. The author acknowledges these benefits but contends that agents can now generate equivalent functionality without the baggage of opinionated architectures and dependency management.

The piece positions this shift as software engineering "coming back" -- a return to first-principles thinking where developers understand and control their entire stack rather than deferring to framework conventions. Whether this represents genuine progress or naive reinvention of wheels became the central tension of the ensuing HN discussion.

## Key Insights

- **Frameworks as proxy for scale assumptions**: Most projects adopt frameworks designed for problems they will never have, inheriting complexity without the corresponding benefits
- **Agents enable purpose-built solutions**: Instead of adapting to a framework's opinions, developers can now generate code tailored to their exact requirements
- **Simple tools endure**: Bash (created 1989) and Makefiles handle the majority of build/automation needs when frameworks are removed from the equation
- **The real work is not typing code**: The hard parts of engineering -- architecture, design, coordination -- remain human responsibilities regardless of who or what produces the code
- **Embedded/hardware crossover**: One practitioner reported similar benefits in embedded systems, generating custom hardware wrapper functions instead of integrating full libraries

## Notable Quotes

> "a brutal rude awakening" -- rglover, on developers who rely on AI-generated code without understanding it

> "bespoke square wheels without a maintenance plan" -- avidiax, on abandoning frameworks entirely

## HN Discussion Highlights

The 594-comment thread split sharply between framework defenders and agent enthusiasts, with nuanced middle ground emerging around specific use cases.

**rglover** warned that developers leaning heavily on AI-generated code face a reckoning when limitations surface, arguing that real building experience reveals problems agents miss. This became the most-discussed comment with 40+ replies.

> **mark242** countered that AI agents will transform rather than diminish engineering, citing an AWS re:Invent demo where a trio of SRE agents identified and resolved a bug within two minutes. Argued that AWS is making a massive bet on this future.

**ipsento606** defended frameworks, pointing out that framework designers typically possess superior expertise at scale problems most individual developers haven't encountered.

> **GoatInGrey** noted irony in the article itself appearing to be partially AI-written, with incongruous imagery suggesting LLM generation.

**abcde666777** questioned the premise entirely, noting they find writing code to be the easy part of development. Drew a Tolkien analogy -- would the author have Tolkien spend time on prompt engineering instead of writing?

> **capyba** shared a concrete counterpoint: after using Claude extensively, they concluded the project would have taken the same time written manually, but with far better comprehension of critical code sections.

**pixelat3d** argued against having AI re-implement framework functionality without battle-testing, ecosystem support, or shared terminology that enables team communication.

> **gtirloni** compared AI-assisted coding to the StackOverflow copy-paste era, suggesting it represents the same human behavior pattern with a new tool.

**peteforde** provided an enthusiastic counterexample from embedded development, describing six months using Cursor with Claude Opus for circuit design and CAD work, abandoning external libraries in favor of AI-generated purpose-built wrappers.

**jazzyb** raised concerns about developer intuition, arguing that while frameworks already risked abstracting away foundational understanding, generative AI dramatically amplifies this problem.

**avidiax** pushed back on the anti-framework stance, arguing that Node security patches are a feature not a burden, and that framework familiarity makes developers hireable and codebases maintainable.

**HarHarVeryFunny** noted that LLMs actually perform better generating code within familiar frameworks because of training data distribution, suggesting a pragmatic reason to keep frameworks even in an AI-augmented workflow.

**eqvinox** disputed the article's framing of typing as the hard part, arguing the real exhaustion comes from coordination, alignment, code review, and conceptual design -- citing lock-free data structures as an example of genuinely demanding mental work.
