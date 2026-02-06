---
title: "LLM coding workflow going into 2026"
source_url: "https://addyosmani.com/blog/ai-coding-workflow/"
hn_url: "https://news.ycombinator.com/item?id=46570115"
date: 2026-01-10
hn_points: 7
hn_comment_count: 2
tags: [workflow, prompt-engineering, model-selection, code-review, testing, agent-workflows]
tier: 2
weight: 93
---

## Summary

Addy Osmani, a well-known Google engineering leader, shared his comprehensive approach to integrating LLMs into daily coding workflows. The article frames LLMs not as autonomous coders but as powerful pair programmers requiring clear direction, context, and consistent oversight.

The workflow begins with collaborative planning, where the developer works with an AI to develop detailed specifications and project plans before writing code. Osmani describes this as achieving a traditional waterfall planning cycle compressed into roughly 15 minutes. Implementation then proceeds in small, iterative chunks sized to fit within context windows and remain comprehensible for human review.

Context management is a central theme. The article recommends using tools like gitingest and repo2txt to bundle codebases for AI ingestion, combined with rules files, style guides, and system prompts to align AI behavior with project conventions. Strategic model selection is also emphasized: rather than defaulting to one model, Osmani practices what he calls switching between models when one struggles with a particular task.

The human oversight dimension is treated as non-negotiable. AI-generated code should be treated like contributions from a junior developer, requiring thorough testing and review. Version control discipline with frequent commits serves as save points enabling quick rollback. The article also explores using one model to review another model's output as an additional quality layer.

The tooling landscape covered includes Claude Code, GitHub Copilot Agent, Jules (for asynchronous cloud-based tasks), Cursor, Context7 for context packaging via MCP, and Chrome DevTools MCP for giving agents browser debugging capabilities.

## Key Insights

- **Plan first, code second**: Collaborative AI planning compresses traditional waterfall cycles into minutes, but should precede all implementation
- **Model diversity as strategy**: Switching between models based on task type and difficulty improves overall output quality
- **Context is king**: Proper context packaging through tools and conventions dramatically reduces hallucinations and improves coherence
- **Junior developer analogy**: Treating AI output as requiring the same review rigor as junior developer contributions sets appropriate expectations

## Notable Quotes

> "the LLM is an assistant, not an autonomously reliable coder" — Addy Osmani

## HN Discussion Highlights

The discussion generated 7 points and 2 comments.

**Complementary workflows**
- **dchuk**: Shared their experience using Agent OS with Claude Code's $100 plan, describing a workflow of ideating with Claude and ChatGPT, bootstrapping through Agent OS, then looping through specs, tasks, and implementation. They are building a Mac SwiftUI app in a language they've never used before with good test coverage, comparing the approach favorably to the popular Ralph Wiggum agent concept.

**Implementation challenges**
- **sciences44**: Asked probing questions about how to ensure Claude completes everything in a spec and finds optimal paths, noting that LLMs often skip edge cases with too much autonomy. Raised the balance between human specification and agent autonomy as the key challenge for 2026.
