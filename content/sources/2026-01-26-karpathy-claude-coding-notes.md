---
title: "A few random notes from Claude coding quite a bit last week"
source_url: "https://twitter.com/karpathy/status/2015883857489522876"
hn_url: "https://news.ycombinator.com/item?id=46771564"
date: 2026-01-26
hn_points: 911
hn_comment_count: 98
tags: [claude-code, vibe-coding, agent-workflows, skill-atrophy, productivity, ide-tools]
tier: 1
weight: 2
---

## Summary

Andrej Karpathy shared a widely discussed thread of observations from extensive Claude Code usage. His notes touched on several key themes that resonated deeply with the developer community, generating nearly 100 HN comments and over 900 upvotes.

One of Karpathy's central observations was around the tension between AI-assisted productivity and personal skill development. He noted that he was already experiencing atrophy in his ability to write code manually, finding it harder to recall syntax and implementation details. However, he argued this might be acceptable since code review skills remain intact even as writing fluency declines, drawing a parallel to how reading comprehension persists even when spelling ability degrades.

He highlighted agent tenacity as a striking quality: AI agents never tire or get demoralized, continuing to work through problems where a human would have given up. He described watching an agent struggle for 30 minutes before succeeding as a visceral demonstration of what abundant computational persistence can achieve.

Karpathy predicted that AI-assisted coding would create a split between engineers who primarily enjoy the craft of coding itself and those who primarily enjoy building products. The builder-oriented engineers would embrace AI tools enthusiastically while craft-oriented programmers would feel their identity threatened.

He also warned about the coming wave of AI-generated low-quality content across platforms, coining the concept of a content quality decline across GitHub, Substack, arXiv, and social media. Despite these concerns, he maintained that IDEs remain valuable, as the visual diff review workflow is essential for maintaining code quality when working with AI agents.

## Key Insights

- **Skill atrophy is real but manageable**: Code writing fluency degrades with AI use, but code review abilities persist, suggesting a natural evolution of the developer role
- **Agent tenacity as competitive advantage**: AI agents' inability to get tired or demoralized enables solving problems that humans would abandon, representing a genuine capability expansion
- **Builder vs coder split**: AI will widen the gap between product-oriented and craft-oriented engineers, with different groups having fundamentally different reactions to AI tools
- **IDEs still matter**: Despite the power of CLI agents, visual code review through IDE diffs remains essential for quality control
- **Content quality concerns**: AI-generated slop will increasingly flood repositories and knowledge platforms in 2026

## Notable Quotes

> "stamina is a core bottleneck to work" — Karpathy (via HN comments)

> "slopacolypse across all of github, substack, arxiv" — Karpathy (via HN comments)

## HN Discussion Highlights

The discussion generated 911 points and 98 comments, making it one of the most engaged threads in this collection. Key themes:

**Brain atrophy and complacency**
- **daxfohl**: Described experiencing not just atrophy but complacency, noting that AI constantly pulls code back toward its preferred patterns. After initial productivity excitement, this led to disillusionment as projects drift from the developer's vision. Compared the experience to doom scrolling.
- **oxag3n**: Warned that review skills will also erode eventually, challenging you to review AI code in domains you never learned firsthand like SIMD or FPGA programming

**Builder vs coder identity**
- **atonse**: Identified as a builder who has always coded for outcomes rather than craft, noting this distinction explains the different reactions to AI tools across the community
- **strogonoff**: Pushed back, arguing that after sufficient experience, coding is 99% architecture, and questioned whether AI truly saves time given the review overhead

**Agent tenacity and its limits**
- **jedberg**: Connected Karpathy's tenacity observation to research showing grit correlates more with success than intelligence, suggesting AI may outperform humans simply by never giving up
- **netcraft**: Offered a counterpoint that agents do give up sometimes, citing cases where Sonnet skipped failing tests or asked to work on something else
- **jwilliams**: Noted Sonnet in particular will modify every file in a codebase chasing a type error, while Opus is better at avoiding rabbit holes

**Skepticism and environmental concerns**
- **einrealist**: Raised concerns about GPU energy consumption, data privacy, and vendor dependency behind the impressive tenacity
- **philipwhiuk**: Pointed out the unsaid costs of token burning and questioned whether brute-force persistence is actually desirable
- **forrestthewoods**: Called for banning AI experience discussions that don't include concrete artifacts, noting a year of hype with little measurable quality or output improvement

**Practical IDE usage**
- **jimbokun**: Described a productive workflow using Copilot in VS Code with context diffs, supporting Karpathy's view that IDEs remain necessary
- **markb139**: Shared a success story of using Claude for reverse engineering Intel 8096 firmware, building a disassembler, assembler, and partial emulator in two weeks
