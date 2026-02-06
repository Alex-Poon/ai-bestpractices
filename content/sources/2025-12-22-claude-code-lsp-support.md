---
title: "Claude Code gets native LSP support"
source_url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
hn_url: "https://news.ycombinator.com/item?id=46355165"
date: 2025-12-22
hn_points: 511
hn_comment_count: 59
tags: [claude-code, lsp, developer-tools, ide, plugins, code-intelligence]
tier: 2
weight: 5
---

## Summary

Anthropic added native Language Server Protocol (LSP) support to Claude Code, enabling the CLI-based agent to integrate with language servers for improved code understanding, navigation, and analysis. The feature was announced through Claude Code's changelog and surfaced via a plugin system where users can discover and install LSP integrations.

LSP support represents a significant step in making CLI-based AI coding agents competitive with IDE-based tools like Cursor. Language servers provide structured information about code: type definitions, references, diagnostics, and refactoring capabilities. By connecting Claude Code to these servers, the agent gains access to the same code intelligence that powers IDE features, without requiring a full IDE environment.

The release included a plugin manager accessible via the `/plugin` command, with a Discover tab for searching and installing LSP integrations. However, the initial rollout had notable limitations: the TypeScript LSP and others were missing diagnostics for real-time errors and warnings, still requiring separate linter or compiler runs. A subsequent version (2.0.76) introduced a regression that broke LSP functionality entirely due to a missing function call in the initialization code.

Other features released around the same time included PDF reading enhancements with page-range parameters, MCP OAuth support, a debug command, expanded git operations in read-only mode, and a 68% memory reduction for the resume feature.

The HN discussion largely debated whether CLI-based agents should be building IDE features from scratch or whether IDE-based agents already solve this problem more naturally.

## Key Insights

- **Bridging the CLI-IDE gap**: LSP support gives CLI agents access to the same code intelligence IDEs have, reducing a major competitive disadvantage
- **Deterministic tools complement probabilistic reasoning**: Combining LSP's precise code analysis with LLM reasoning produces better results than either alone
- **Plugin ecosystem emerging**: Claude Code's plugin system enables community-contributed integrations, though quality and stability vary

## Notable Quotes

> "LSP support is a good start but without mutation functions it is still lackluster" — spullara

> "They moved coding AIs from the IDE into a CLI and now are building an IDE around it" — paxys

## HN Discussion Highlights

The discussion generated 511 points and 59 comments. Key themes:

**CLI vs IDE debate**
- **anthonypasq**: Questioned why people are bullish on CLI when IDE-based agents like Cursor get LSP features for free
- **paxys**: Observed the irony of moving coding AI from IDE to CLI and then rebuilding IDE features in the CLI
- **PrimalPower**: Shared their journey from JetBrains to considering CLI tools, noting IDE preferences are deeply personal

**Technical implementation concerns**
- **spullara**: Wished JetBrains had integrated refactoring tools into AI systems, noting LSP read-only capabilities are useful but mutation functions are needed
- **hexsprite**: Pointed out the TypeScript LSP lacks diagnostics for real-time errors, still requiring separate linter runs
- **vexna**: Reported LSP was completely broken in version 2.0.76 due to a missing function call in initialization
- **brianyu8**: Built a custom skill teaching Codex CLI to use LSP for rename and move operations, showing the composability potential

**Ecosystem and alternatives**
- **dvtkrlbs**: Noted that OpenCode had LSP support for at least 6 months prior, expressing surprise at the slower pace of closed-source tools
- **CharlesW**: Provided practical setup instructions since official documentation was hard to find
- **stared**: Shared a community directory of Claude Code plugins at claude-plugins.dev

**Philosophical perspectives**
- **ed_blackburn**: Argued LLMs waste tokens doing work that deterministic tools handle better, advocating for using the best tool for each job
- **zby**: Proposed LSPs should expose their APIs through shell commands, making integration with any LLM trivial
