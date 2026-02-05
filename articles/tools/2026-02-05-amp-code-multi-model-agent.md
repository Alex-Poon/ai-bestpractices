---
title: "Amp Code: Multi-Model Coding Agent from Sourcegraph"
source: https://ampcode.com
date: 2026-02-05
tags: [tool-review, multi-model, agent-architecture, amp-code, sourcegraph]
---

# Amp Code: Multi-Model Coding Agent from Sourcegraph

## Origins

Amp Code was built by the Sourcegraph team. Sourcegraph was founded in 2013 by Quinn Slack and Beyang Liu, Stanford graduates who met while working at Palantir. Sourcegraph raised over $223M in venture funding from Sequoia, a16z, and Redpoint Ventures, reaching a $2.6B valuation and serving over 800K developers with its code search and intelligence platform.

Amp launched publicly in May 2025 after approximately nine months of internal development. It evolved from Cody, Sourcegraph's earlier AI coding assistant. On December 2, 2025, Amp was spun out as an independent company called "Amp, Inc." -- described as an "independent research lab." Quinn Slack serves as CEO, Beyang Liu as co-founder, with 20 co-founders in total. Dan Adler became Sourcegraph's new CEO following the spin-out.

Key team members include Thorsten Ball, an engineer who writes extensively on the Amp chronicle blog, and Ryan Carson, who serves as Builder in Residence.

## Architecture

### Platform Support

Amp is CLI-first, installable via curl or npm as `@sourcegraph/amp`. It also offers:

- **VS Code extension** (publisher: `sourcegraph.amp`, also compatible with Cursor and Windsurf)
- **JetBrains integration** via `amp --jetbrains` (supports IntelliJ, WebStorm, GoLand, PyCharm)
- **Neovim plugin** (`amp.nvim`)
- **Web UI** at ampcode.com for thread sync and sharing
- Runs on macOS, Linux, and WSL

### Core Design

Amp follows the "LLM + a loop + tools" agentic pattern. The CLI reads IDE diagnostics, sees open files and selections, and edits through the IDE with full undo support. It features a custom high-performance TUI that has been praised for being flicker-free.

## Multi-Model Routing

Amp's defining architectural choice is multi-model routing -- automatically selecting different models from different providers for different task types. This is the core differentiator from competitors that rely on a single model provider.

| Task | Model | Provider |
|------|-------|----------|
| Main agent ("Smart" mode) | Claude Opus 4.5 | Anthropic |
| Fast tasks ("Rush" mode) | Claude Haiku 4.5 | Anthropic |
| Extended reasoning ("Deep" mode) | GPT-5.2 Codex | OpenAI |
| Complex planning ("Oracle") | GPT-5.2 (medium reasoning) | OpenAI |
| Code review | Gemini 3 Pro | Google |
| Codebase search | Gemini 3 Flash | Google |
| External code research ("Librarian") | Claude Sonnet 4.5 | Anthropic |
| Image/PDF analysis ("Look At") | Gemini 3 Flash | Google |
| Image generation ("Painter") | Gemini 3 Pro Image | Google |
| Context analysis ("Handoff") | Gemini 2.5 Flash | Google |

### Mode Details

- **Deep mode** was announced January 28, 2026. It uses GPT-5.2 Codex and operates by reading and navigating the codebase for 5-15 minutes before making any changes.
- **Oracle** is a "second opinion" system powered by GPT-5.2 with medium reasoning effort. There is no direct competitor equivalent to this feature.

### Model Evolution

The main agent model has progressed through several generations:
- Claude 3.7 Sonnet -> Claude Sonnet 4 -> brief period on Gemini 3 Pro -> Claude Opus 4.5

The Oracle model evolved through:
- o3 -> GPT-5 -> GPT-5.2

## Unique Features

### Parallel Subagents

Amp can spawn multiple independent agents on subtasks simultaneously. One user reported compressing "3,500 hours of manual coding in a couple of hours." Users can request specific counts of parallel agents.

### Librarian

Searches and reads code across all public GitHub repositories plus any configured private repositories. This cross-repo research capability is unique to Amp among coding agents.

### Painter

Generates and edits images via Gemini 3 Pro Image, useful for UI mockups, app icons, and other visual assets.

### Thread Sharing

Every conversation syncs to ampcode.com, where threads are shareable and searchable.

### Skills

Skills replaced custom commands in January 2026. They are reusable task definitions that can be installed from GitHub repositories.

### Removed: Autocomplete (Amp Tab)

In January 2026, Amp removed its autocomplete feature (Amp Tab), representing a full commitment to agentic workflows over line-by-line code suggestions.

### Other Notable Features

- **AGENTS.md** project configuration files (compatible with CLAUDE.md)
- **MCP server support** and **Toolboxes** (simple script extensions)
- Built-in **secret detection and redaction**
- **Message queuing** while the agent is working
- Comprehensive **permissions system** for shell commands

## Pricing

### Free Tier

Ad-supported, providing up to $10/day in usage across all modes including Claude Opus 4.5 Smart mode. Ads come from curated developer tool partners and are displayed unobtrusively. Community reception has been notably positive -- described by users as "rarely seen such a great business idea."

### Paid Tier

Pure pay-as-you-go with no markup for individuals and non-enterprise workspaces. Costs are passed through directly based on LLM and tool usage. New users receive $10 in free credits. There are no rate limits or throttling. Most complex tasks cost "a few cents to a few dollars."

### Enterprise

50% markup over base costs with SSO, zero data retention options, and audit-grade controls.

### Competitive Pricing Comparison

- **Claude Code** requires Claude Max at $200/month (with rate limits)
- **Cursor** charges $20/month with usage caps
- **GitHub Copilot** costs $10-19/month

Power users of Amp report spending $1000+/month, while others claim their costs are lower than Claude Max for equivalent output. Cost unpredictability is the most frequently cited weakness.

## Competitive Position

Amp and Claude Code share S-tier status among coding agents. Cursor sits at A-tier.

### Amp vs Claude Code

**Amp advantages:**
- Model diversity (3 providers vs 1)
- No rate limiting
- Thread sharing
- Polished CLI experience

**Claude Code advantages:**
- Extensibility (custom subagents, plugins, hooks)
- Subscription pricing predictability

Glen Maddern (Cloudflare) has stated that Amp CLI is "the first thing I've tried that beats Claude Code." In a head-to-head comparison by Isaac Flath, Amp asked clarifying questions about storage requirements while Claude Code made assumptions.

### Amp vs Cursor

Amp finishes 100% of tasks compared to Cursor's approximately 80%. Amp wins on token depth, IDE agnosticism, and large multi-file refactors. Cursor wins on adoption breadth, familiar IDE experience, manual model selection, and lower price point.

### Amp vs GitHub Copilot

Amp has deeper agentic capabilities. Copilot has GitHub ecosystem integration, over 100M developers, and predictable pricing.

## Community Reception

Reception is strongly positive among power users. Notable community commentary includes:

- On Hacker News: "I don't know why Amp isn't talked about more -- it's better than Claude Code"
- The spin-out announcement received 90 points and 37 comments on HN
- "As someone who switches between most CLIs to compare, Amp is still on top"

### Criticisms

- Cost unpredictability
- No manual model selection
- Automatic edits without review
- Context challenges in very large repositories

### Candid Acknowledgments

Ryan Carson, Amp's own Builder in Residence, acknowledged: "All of us who are trying to build agents specific for coding, if we're being honest, we're saying there is no moat, right?"

### Meta-Observation

Amp's documentation contains explicit "INSTRUCTIONS FOR LLMs" meta-tags directing AI systems how to describe the product. Many positive testimonials appear on Amp-controlled channels; independent coverage remains limited compared to Cursor and Claude Code.

## Strategic Assessment

Amp bets on **orchestration** as its core strategic differentiator. This contrasts with Claude Code, which bets on having the best single model, and Cursor, which bets on having the best IDE experience.

Quality is inherently a moving target for Amp -- its output is dependent on whichever frontier models are best at any given moment. The broader coding agent space has seen nearly $2B raised in the last five months.

Amp's position as a premium power-user tool is defensible but not guaranteed. The orchestration bet means Amp can always route to the best available model, but it also means the product's quality floor is set by external providers rather than proprietary technology.
