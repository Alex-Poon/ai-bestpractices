---
title: "Tool Landscape"
description: "The AI coding tools practitioners actually use — CLI agents, IDE integrations, multi-model platforms, and the MCP ecosystem."
weight: 20
---

The AI coding tool landscape is moving faster than any static comparison can capture. Models improve monthly, pricing shifts quarterly, new entrants appear constantly. Nearly $2 billion has been raised by coding agent startups in just the past five months.

Rather than ranking tools, this section profiles each major player based on practitioner experience and community discussion. The goal is to help you understand what each tool does well, where it falls short, and how it fits into a broader workflow.

## The Fundamental Split

The most important distinction is between **autocomplete** tools (inline suggestions as you type) and **agentic** tools (autonomous task execution with file editing, command running, and iterative error correction). Some tools offer both; the question is which mode is first-class.

- **Autocomplete-first**: GitHub Copilot
- **Agentic-first**: Claude Code, Gemini CLI, Aider, OpenAI Codex, Amp Code
- **Hybrid**: Cursor, Windsurf, Cline, Kiro (IDE-based with both inline and agentic modes)

## CLI-First Agents

Terminal-native tools that run in your shell, operate on your codebase directly, and integrate with Unix workflows. Preferred by developers who want maximum control and scriptability.

- [Claude Code](/tools/claude-code.html) -- Anthropic's agentic CLI, with support for swarms, LSP integration, and AGENTS.md configuration
- [Gemini CLI](/tools/gemini-cli.html) -- Google's open-source terminal agent powered by Gemini models
- [Aider](/tools/aider.html) -- Open-source terminal agent supporting dozens of models via a bring-your-own-key approach
- [OpenAI Codex](/tools/codex.html) -- OpenAI's CLI agent with sandboxed execution and code reasoning

## IDE-Based Tools

Editors and extensions that embed AI directly into your development environment. These provide inline completions, chat panels, and increasingly autonomous agent modes within a visual interface.

- [Cursor](/tools/cursor.html) -- AI-native IDE forked from VS Code, combining autocomplete, chat, and agentic editing
- [GitHub Copilot](/tools/copilot.html) -- The original AI coding assistant, now expanding from autocomplete into agentic workflows
- [Cline](/tools/cline.html) -- VS Code extension that turns your editor into an autonomous coding agent
- [Windsurf](/tools/windsurf.html) -- AI-native IDE from Codeium with deep editor integration and agentic flows
- [Kiro](/tools/kiro.html) -- AWS-backed IDE that uses specs and structured requirements to drive agent behavior

## Multi-Model Platforms

- [Amp Code](/tools/amp.html) -- Sourcegraph's multi-model coding agent that routes tasks across providers

## Cross-Cutting Topics

- [Model Deep Dive](/tools/models.html) -- Which model works best for which task, and how to think about model selection for coding
- [Tool Comparison](/tools/compare.html) -- Side-by-side decision framework covering pricing, extensibility, and integration approach
- [The MCP Ecosystem](/tools/mcp-ecosystem.html) -- Model Context Protocol and the interoperability layer emerging around AI tools
