---
title: "AI Coding Tools: A Practitioner's Comparison"
description: "A decision framework for choosing between Claude Code, Cursor, Amp, Copilot, and other AI coding tools."
date: 2026-02-05
tags: [tool-comparison, claude-code, cursor, amp-code, copilot]
sources:
  - https://ampcode.com
  - https://mitchellh.com/writing/my-ai-adoption-journey
weight: 2
---

## Use a Decision Framework, Not Rankings

The AI coding tool landscape changes faster than any comparison can keep up with. Models improve monthly. Pricing shifts quarterly. New entrants appear constantly. Nearly $2 billion has been raised by coding agent startups in just the past five months.

Rather than ranking tools, this page provides a decision framework based on factors that are relatively stable: workflow type, pricing model, extensibility, and integration approach. Use these to evaluate any tool, including ones that do not exist yet.

## What Matters When Choosing

### Workflow Type

The most fundamental split is between **autocomplete** and **agentic** workflows.

- **Autocomplete** tools suggest code inline as you type. They are fast, low-friction, and optimized for keeping you in flow. Best for: experienced developers who want acceleration on familiar codebases.
- **Agentic** tools take a task description and execute it autonomously -- reading files, running commands, iterating on failures. Best for: multi-file changes, unfamiliar codebases, tasks with clear verification (tests, compilation).
- **Hybrid** tools offer both. The question is whether both modes are first-class or whether one is clearly secondary.

### Model Strategy

- **Single-model** tools use one provider (typically Anthropic or OpenAI). Simpler to reason about, but you are coupled to that provider's strengths and weaknesses.
- **Multi-model** tools route different task types to different models. More flexible, but introduces complexity in context transfer and debugging. See [The Multi-Model Agent Landscape](/deep-dives/multi-model-agents.html) for a deeper treatment.

### Pricing Model

- **Flat rate** ($10-200/month) gives cost predictability. You know your bill before the month starts. The tradeoff is rate limits or usage caps during peak demand.
- **Pay-as-you-go** charges based on actual token usage. No rate limits, but costs can spike unpredictably. Power users report monthly costs from $50 to over $1,000.

### Extensibility

How much can you customize the tool's behavior?

- **Project files** (AGENTS.md, CLAUDE.md): persistent instructions the agent reads at the start of every session. See the [AGENTS.md / CLAUDE.md Guide](/references/agents-md-guide.html).
- **Custom subagents**: the ability to spawn specialized agents for specific tasks.
- **Hooks and plugins**: programmatic integration points for CI/CD, linting, or custom workflows.
- **MCP server support**: Model Context Protocol for structured tool integration.

### IDE Integration

- **CLI-first** tools run in the terminal and work with any editor. Flexible but require comfort with command-line workflows.
- **IDE-first** tools are built into or forked from an editor (typically VS Code). Lower friction for adoption but tie you to that editor.
- **Multi-platform** tools offer both CLI and IDE modes, letting you choose per situation.

## Tool Profiles

### Claude Code

Anthropic's CLI-first agent. Single-model (Anthropic's Claude family). Available through Claude Max subscription at $100-200/month with rate limits. Highly extensible: supports custom subagents, hooks, CLAUDE.md project files, and MCP servers. Focused entirely on agentic workflows. Mitchell Hashimoto credits Claude Code as his primary tool for the workflow described in his AI adoption guide.

**Best for**: Developers who want deep extensibility, work primarily in terminals, and prefer predictable monthly costs.

### Amp Code

Sourcegraph-built agent available as CLI, VS Code extension, and JetBrains plugin. Multi-model routing across Anthropic, OpenAI, and Google models. Pay-as-you-go pricing with no markup for individuals. Supports parallel subagents, AGENTS.md project files, and cross-repository code search via its Librarian feature. Dropped autocomplete entirely in January 2026 to focus on agentic workflows.

**Best for**: Power users who want model diversity, no rate limits, and are comfortable with variable costs.

### Cursor

VS Code fork with built-in AI capabilities. Multi-model support with user-selectable models. $20/month base plus usage for heavier workloads. Offers both autocomplete (Tab) and agentic (Composer/Agent) modes as first-class features. Largest adoption among AI coding tools in the IDE-first category.

**Best for**: Developers who want a familiar VS Code experience with both autocomplete and agentic modes, and who value broad model choice.

### GitHub Copilot

IDE extension available across VS Code, JetBrains, Neovim, and others. Primarily OpenAI-powered. $10-19/month with predictable pricing. Originally autocomplete-focused, with growing agentic capabilities (Copilot Workspace, Copilot Chat). Over 100 million developers with access through GitHub.

**Best for**: Teams already invested in the GitHub ecosystem who want low-friction AI assistance, especially autocomplete.

### Windsurf

IDE-first tool (VS Code-based) with a hybrid approach combining autocomplete and agentic workflows. Multi-model support. Targets a similar niche to Cursor with different UX choices.

**Best for**: Developers evaluating IDE-first alternatives to Cursor.

## Cost Reality

Monthly costs vary dramatically based on usage patterns:

| Usage Level | Typical Spend | Profile |
|---|---|---|
| Light | $10-20/mo | Autocomplete only, occasional chat |
| Moderate | $20-100/mo | Daily agentic use, single tasks |
| Heavy | $100-500/mo | Multiple agent sessions daily, complex refactors |
| Power | $500-1,000+/mo | Continuous agent usage, parallel agents, large codebases |

Flat-rate subscriptions cap your downside but may throttle you during heavy use. Pay-as-you-go removes throttling but requires budget awareness. Some practitioners use both: a subscription tool for daily work plus pay-as-you-go for intensive sessions.

## Choosing

There is no universally best tool. Start with these questions:

1. **Do you primarily want acceleration (autocomplete) or delegation (agentic)?** This narrows the field immediately.
2. **How important is cost predictability?** If very important, lean toward flat-rate subscriptions.
3. **Do you need multi-model flexibility?** If your work spans different task types with different requirements, multi-model tools offer an advantage.
4. **Are you comfortable in a terminal?** CLI-first tools are more flexible; IDE-first tools are more approachable.
5. **How much will you invest in customization?** Tools with strong extensibility (project files, hooks, subagents) reward investment in [harness engineering](/references/agents-md-guide.html).

The landscape will keep shifting. The decision framework will not.
