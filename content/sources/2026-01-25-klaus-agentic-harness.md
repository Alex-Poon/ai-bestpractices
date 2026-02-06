---
title: "Klaus – a Claude Code native delegating agentic harness"
source_url: "https://github.com/blas0/klaus-baudelaire"
hn_url: "https://news.ycombinator.com/item?id=46760506"
date: 2026-01-25
hn_points: 1
hn_comment_count: 1
tags: [claude-code, agent-workflows, harness-engineering, delegation, tool-routing]
tier: 2
weight: 99
---

## Summary

Klaus Baudelaire is an open-source agentic harness built entirely on top of Claude Code's native features, designed to automate task delegation and agent routing without external APIs or services. The system addresses the overhead of manually deciding which agent configuration to use for a given prompt by implementing a keyword-based scoring algorithm that evaluates prompt complexity and routes tasks to the appropriate execution tier.

The core mechanism works through a single `UserPromptSubmit` hook. When a user submits a prompt, Klaus analyzes it by assigning scores based on keyword complexity (terms like "system architecture" or "oauth" increase scores, while "fix typo" decreases them) and prompt length. The resulting score maps to one of four tiers: DIRECT (score 0-2, no agents needed for simple edits), LIGHT (3-4, single agent for basic features), MEDIUM (5-6, four agents for multi-file changes), and FULL (7+ for complex architecture requiring six agents).

The project includes 17 specialized agents handling different aspects of development, from documentation and context validation to research coordination and implementation. These agents coordinate through Claude Code's native TaskList management and teammate skills, enabling parallel multi-agent workflows. The system also features configurable routing profiles (conservative, balanced, aggressive) and an optional memory manager aligned with Claude's native memory system rather than external vector databases.

The creator positions Klaus as a response to the proliferation of thin prompt wrappers being marketed as novel abstractions, arguing that Claude Code already provides sufficient native infrastructure for sophisticated delegation when properly harnessed.

## Key Insights

- **Native-first approach**: Building on Claude Code's existing hook system and agent infrastructure eliminates external dependencies and aligns with the platform's intended design
- **Score-based routing**: A simple keyword scoring algorithm can effectively triage prompt complexity without requiring an external LLM router
- **Tiered delegation**: Matching agent count and complexity to task requirements avoids over-engineering simple tasks while enabling full orchestration for complex ones

## Notable Quotes

> "Zero external APIs, zero services, zero reinventing" — blas0 (HN submission)

## HN Discussion Highlights

The discussion generated 1 point and 1 comment, reflecting the niche nature of the project.

**Skepticism about project clarity**
- **forgotpwd16**: Expressed confusion about whether Klaus is a software project, a specification, a prompt, or an essay, suggesting the project's documentation may need clearer framing for newcomers
