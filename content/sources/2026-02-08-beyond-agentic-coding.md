---
title: "Beyond agentic coding"
source_url: "https://haskellforall.com/2026/02/beyond-agentic-coding"
hn_url: "https://news.ycombinator.com/item?id=46930565"
date: 2026-02-08
hn_points: 266
hn_comment_count: 90
tags: [agentic-patterns, limitations, future-of-coding, verification, code-quality]
tier: 2
weight: 1
---

## Summary

This article takes a contrarian position within the AI-assisted development space: rather than celebrating autonomous coding agents, the author argues they fundamentally disrupt the developer flow state and proposes alternative paradigms inspired by "calm technology" principles. The core thesis is that chat-based agentic interfaces are indirect, slow, and imprecise -- and that the industry should explore AI tools that keep developers close to their code instead of mediating through conversation.

The author introduces a guiding principle: good tools should keep users in a flow state as long as possible. By this measure, agentic coding fails because developers spend significant time waiting for agent output, lose synchronization with their codebase during autonomous operations, and interact with English-language prompts rather than code directly. They cite research suggesting idle time roughly doubles when using agentic tools, and note that interview candidates using agents sometimes failed to recognize their code produced incorrect results.

As an alternative vision, the article sketches several "calm" AI tool concepts. Facet-based project navigation would let developers browse code by semantic meaning rather than file paths. Automated commit refactoring would split messy diffs into logical, reviewable units. File lens tools would allow filtering code by feature domain or even editing in an alternative programming language syntax that gets transpiled back. The author highlights GitHub Copilot's Next Edit Suggestions as an existing example of calm design -- small, unobtrusive suggestions that maintain flow.

The piece resonated with developers who have experienced the frustration of context-switching between coding and agent management, while also drawing pushback from those who find chat interfaces genuinely productive when used correctly.

## Key Insights

- **Flow state as the primary metric**: The author proposes evaluating AI coding tools by whether they maintain or disrupt developer flow, rather than by raw output volume
- **Chat interfaces are inherently indirect**: Communicating through natural language adds a translation layer between intent and code, introducing imprecision and latency
- **Mental model desynchronization**: The biggest risk of autonomous agents is not bad code but the developer losing track of what their codebase actually contains
- **Calm technology alternatives exist**: Semantic navigation, automated commit organization, and language-transpiling lenses could deliver AI benefits without flow disruption
- **Inline suggestions as proven calm design**: Copilot's Next Edit Suggestions demonstrate that AI assistance can be bite-sized and unobtrusive rather than autonomous and disruptive

## Notable Quotes

> "a sufficient shift in quantity produces a phase shift in quality" -- andai, on how faster LLM inference changes the interaction paradigm

> "You get a diff with no context for why it went that direction" -- matheus-rr, on the review challenge of agent-generated code

## HN Discussion Highlights

The 90-comment thread was notably more aligned with the article than typical HN discussions, with many commenters sharing similar frustrations about agentic workflows.

**WilcoKruijer** proposed that AI code review tools should focus on organizing changes into logical, reviewable segments rather than performing autonomous reviews -- reducing human burden while maintaining quality oversight.

> **wazHFsRy** described using an agent to generate "review plans" that organize code changes with suggested review ordering and dependency diagrams, finding this simple structural aid more valuable than autonomous review.

**andai** explored whether LLM latency is the root problem, noting that faster providers create a qualitatively different experience. However, they identified mental model desynchronization as the deeper issue regardless of speed. Their preferred approach: manually directing rapid incremental edits rather than autonomous agent operation.

> **rubenflamshep** echoed the synchronization concern, describing frequent disorientation when managing multiple Claude sessions and finding it easier to work across two different projects than two features in one project.

**Insanity** praised the article while noting the title was misleading (it was on the Haskell for All blog but had nothing to do with Haskell). They predicted AI coding will evolve toward the calm technology vision described, comparing current tools to the MS-DOS era.

> **josephcsible** clarified that "Haskell for All" is simply the blog name, not a claim about the article's content.

**kstenerud** pushed back, arguing that critics of chat interfaces often fail to leverage their strengths. They described a workflow of conversing with LLMs to develop designs and plans before deploying agents, finding this particularly effective with Claude.

**matheus-rr** highlighted the review problem with agent-generated code: unlike human developers who leave explanatory trails through commit messages and PR descriptions, agents produce diffs without documenting their reasoning.

**eigenblake** proposed a concrete implementation of the article's vision: color-coding function names and variable types based on hashes to create a visual "mipmap" of code structure, readable at a glance without parsing individual identifiers.

**cess11** agreed with the article's assessment, noting that interview candidates using agentic tools often achieved only superficial understanding, and that chat is the least interesting interface to LLMs.

**tossandthrow** offered a counterpoint, noting they strongly prefer chat interfaces over inline AI suggestions because inline completions disruptively move the text they are reading.

**agnishom** suggested the HN title should be revised to "Calm Technology - Beyond Agentic Coding" to better capture the article's thesis.
