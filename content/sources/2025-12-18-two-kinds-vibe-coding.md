---
title: "Two Kinds of Vibe Coding"
source_url: "https://davidbau.com/archives/2025/12/16/vibe_coding.html"
hn_url: "https://news.ycombinator.com/item?id=46318852"
date: 2025-12-18
hn_points: 137
hn_comment_count: 26
tags: [vibe-coding, testing, ai-coding-workflow, code-review, meta-cognition]
tier: 1
weight: 8
---

## Summary

David Bau distinguishes between two fundamentally different approaches to what has broadly been called "vibe coding." The first type involves delegating small tasks to an LLM while the human programmer remains fully informed and in control, reviewing each piece of work and making all key decisions. The second type involves surrendering cognitive control to an AI agent, allowing it to build towers of complexity that go beyond what the developer has time to understand in detail.

Bau observes that students typically start with Type 1, pasting algorithm snippets while editing each function. The transition to Type 2 happens when one stops looking at all the code in detail, trusting the agent to write extensively and make autonomous decisions. This distinction matters because the two types require fundamentally different supporting infrastructure.

The article establishes two essential rules for making the second type work. First, automate tests — without automated testing, the human becomes a manual tester, repeatedly reviewing and rejecting solutions. Automated tests allow agents to validate their own work across longer development cycles. Second, test the tests — agents can produce solutions that technically pass tests without actually doing what is intended. Meta-level testing through code coverage analysis, fuzz testing, and benchmarking frameworks reveals gaps and prevents false success metrics.

The deeper insight is that effective vibe coding at scale requires building "meta-cognitive infrastructure" — systems that maintain human comprehension and control over increasingly complex agent-built codebases. Without this infrastructure, the human either becomes a bottleneck (Type 1 at scale) or loses control entirely (Type 2 without safeguards).

## Key Insights

- **Two distinct modes of AI-assisted coding**: Delegated-with-oversight versus surrendered-cognitive-control represent fundamentally different workflows requiring different infrastructure
- **Automated testing is non-negotiable for Type 2**: Without it, the human becomes the manual tester and bottleneck
- **Tests must themselves be tested**: Agents can produce solutions that pass tests without doing what is actually intended — meta-testing catches this
- **Meta-cognitive infrastructure**: Effective scaling requires systems (coverage analysis, fuzz testing, benchmarks) that maintain human comprehension over agent-built complexity
- **The transition point matters**: Moving from Type 1 to Type 2 without proper infrastructure is where projects fail

## Notable Quotes

> "Ceding cognitive control to an AI" — David Bau

> "Keeping yourself as the human 'real programmer' fully informed and in control" — David Bau

## HN Discussion Highlights

The discussion generated 137 points and 26 comments. Key themes:

**Definitional debate over "vibe coding"**
- **wrs**: Argued there is only one kind of vibe coding — letting the LLM write code without looking at it — and that the first type described is simply AI-assisted coding
- **ofconsequence**: Pointed out that Karpathy coined the term with a clear definition that people misuse: prompting an LLM and running the output without reading it
- **charcircuit**: Agreed that staying "fully informed and in control" is not vibe coding, just regular AI-assisted development

**Skepticism about vibe coding productivity**
- **WhyOhWhyQ**: Reported that the initial exhilaration of vibe coding turned into exhausting QA testing of a bad engineer's work, ending with a product that did not really work
- **Dr_Birdbrain**: Questioned what has actually been gained — the work is not easier, not faster, and the reliability benefits from testing are unclear
- **gaigalas**: Characterized vibe-coded output as "limping faster than you can walk" — faster with each model release but still fundamentally unstable

**Practical approaches and boundaries**
- **keyle**: Found vibe coding acceptable for small digestible tasks like shell functions or image converters, but not for multi-day projects you intend to maintain
- **pessimizer**: Currently only uses the first type, constantly making the agent refactor and simplify, but sees potential in Type 2 with proper infrastructure
- **rrix2**: Asks the model for tutorials and implementation plans but demands it not write code itself, finding review of AI code as difficult as reviewing human code
