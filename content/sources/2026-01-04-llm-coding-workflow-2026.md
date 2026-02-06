---
title: "My LLM Coding Workflow Going into 2026"
source_url: "https://addyosmani.com/blog/ai-coding-workflow/"
hn_url: "https://news.ycombinator.com/item?id=46489061"
date: 2026-01-04
hn_points: 6
hn_comment_count: 1
tags: [ai-coding-workflow, prompt-engineering, code-review, testing, tool-selection]
tier: 1
weight: 15
---

## Summary

Addy Osmani, a well-known figure in the web development community, shares his comprehensive approach to AI-augmented software engineering. The central philosophy treats LLMs as powerful pair programmers that require clear direction, context, and human oversight rather than autonomous replacements for developers.

The workflow is structured around several core practices. First, planning comes before coding — create detailed specifications, use AI to iteratively flesh out requirements and edge cases, and generate project plans that break work into bite-sized tasks. Osmani describes this as completing a "waterfall in 15 minutes" to prevent wasted development cycles. Second, iterative chunking — break projects into small manageable pieces rather than requesting monolithic outputs, processing one feature at a time while maintaining context of previous work. Third, context provision — feed the AI all relevant code, documentation, and constraints using tools like gitingest or repo2txt to bundle repository information, and provide style guides through CLAUDE.md files.

For quality assurance, Osmani emphasizes never skipping human code review regardless of AI involvement, running tests after each implementation step, using AI-assisted code reviews with multiple models, and maintaining strong CI/CD pipelines. Version control discipline is critical — commit frequently as "save points" enabling quick rollbacks, use branches or worktrees for parallel AI experiments, and document the process through clear commit messages.

The article also covers tool selection pragmatism: using multiple models when needed (Claude, Gemini, OpenAI), matching tools to specific tasks, leveraging the newest "pro" tier models for quality, and switching models if one gets stuck. Key tools mentioned include Claude Code, Gemini CLI, Jules, Cursor, GitHub Copilot, Context7, MCP tools, and Chrome DevTools MCP for browser integration.

A central insight is that AI amplifies existing skills rather than replacing them — strong fundamentals in design thinking, architecture, and testing discipline become even more valuable with AI assistance.

## Key Insights

- **Planning before coding prevents wasted cycles**: Treat specification and requirements as the first step, using AI to flesh out edge cases — a "waterfall in 15 minutes"
- **Iterative chunking reduces errors**: Process one feature at a time rather than requesting monolithic outputs
- **Context is king**: Providing the AI with all relevant code, documentation, constraints, and style guides dramatically improves output quality
- **Multi-model pragmatism**: Using different models for different tasks and switching when one gets stuck yields better results than loyalty to a single provider
- **Human review remains non-negotiable**: Never commit code you cannot explain, regardless of AI involvement
- **Frequent commits as save points**: Version control discipline enables quick rollbacks when AI-generated code goes wrong

## Notable Quotes

> "Never commit code you can't explain." — Addy Osmani

## HN Discussion Highlights

The discussion generated 6 points and 1 comment. Limited engagement.

**Questioning the efficiency gains**
- **OrderlyTiamat**: Raised the fundamental question of whether the elaborate workflow actually saves time — once you have chosen a strategy, broken down the solution, validated business logic, and reviewed all generated code, how much time have you really saved compared to writing it yourself?
