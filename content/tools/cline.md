---
title: "Cline"
description: "Open-source VS Code agent with human-in-the-loop approval gates, browser automation, and a thriving fork ecosystem."
weight: 10
tags: [cline, vs-code, agent-workflows, open-source, human-in-the-loop]
date: 2026-02-06
---

Cline is an open-source VS Code extension that turns large language models into autonomous coding agents. Originally released as "Claude Dev," it has grown to over 5 million installs across VS Code, JetBrains, Cursor, and Windsurf. Its defining characteristic is a human-in-the-loop design: the agent proposes actions at every step and waits for your approval before executing. This makes it one of the most transparent and controllable AI coding tools available.

Unlike Cursor (a standalone IDE) or Claude Code (a terminal agent), Cline is an extension that drops into your existing editor setup. Your keybindings, themes, extensions, and configurations stay intact. This preservation of workflow is a major reason for its adoption -- developers can add agentic AI capabilities without abandoning their carefully tuned environments.

## How It Works

Cline operates through multi-step task execution inside VS Code. You describe what you want in natural language, and Cline breaks the task into a sequence of actions: editing files, running terminal commands, automating browser interactions, and calling external tools via MCP. Critically, each action is presented for approval before execution.

The tool supports two primary modes:

- **Plan mode.** Cline creates a detailed action plan before touching any code. You review the plan, adjust it, and then approve execution. This is valuable for complex tasks where you want to validate the approach before the agent starts making changes.
- **Act mode.** The agent executes step by step, showing you each proposed action and waiting for approval. This provides fine-grained control over every file edit, command run, and API call.

Key capabilities include:

- **Human-in-the-loop approval gates.** Every action requires explicit approval. You see exactly what Cline intends to do before it does it -- file edits shown as diffs, terminal commands displayed before execution.
- **Browser automation.** Cline can launch a browser, navigate to your application, and test for visual bugs or runtime errors. This closes the loop between code generation and verification.
- **MCP extensibility.** Connect external tools through the Model Context Protocol. This enables custom integrations -- database queries, API calls, documentation lookups -- without modifying Cline itself.
- **Timeline and revert.** Every action is recorded in a timeline. You can step backward through changes and revert to any previous state, providing a safety net for experimental work.
- **Model-agnostic.** Bring your own API keys for any major provider: Anthropic, OpenAI, Google, and others. No subscription to Cline itself is required for individual use.

## The Approval Gate Philosophy

Cline's approval-based workflow represents a deliberate design choice about the relationship between human developers and AI agents. Where tools like Claude Code and Codex optimize for autonomous execution -- minimizing the number of times you need to intervene -- Cline optimizes for oversight.

This philosophy attracts a specific kind of user: developers who want AI assistance but are uncomfortable delegating execution authority. The approval gates mean you never wonder what the agent did while you were not looking. Every change is explicitly sanctioned.

The tradeoff is speed. Approving each action adds friction. For well-scoped tasks where you trust the agent's judgment, this friction can feel unnecessary. For complex tasks in unfamiliar codebases or security-sensitive environments, the overhead pays for itself in avoided mistakes.

## Practitioner Reports

Cline's practitioner reception reflects its design tradeoffs. Power users who invest time in configuring their setup report strong results on complex, multi-file tasks. The transparency and control resonate with developers working on production systems where unexpected changes carry real consequences.

In HN discussions, Cline is frequently compared to Cursor. The consensus is that Cline offers more control and works better for complex multi-file tasks, while Cursor provides a more polished and immediately usable experience. One practitioner framework captured the distinction well: Cline is an extension that preserves your setup; Cursor is a separate IDE that replaces it.

The BYOK (bring your own key) model means API costs can add up quickly on complex tasks, since multi-step agents consume more tokens than simple completion tools. Several users note that cost management requires attention -- running Opus-class models through Cline on large tasks generates substantial bills.

The tool rewards deliberate users who think carefully about task decomposition and model selection. It can frustrate developers who want a one-click experience with minimal configuration.

## The Cline Fork Ecosystem

One of the most notable developments in the AI coding tool space is the fragmentation of the Cline ecosystem into specialized forks. Two major variants have emerged:

**Roo Code** extends Cline with multi-agent capabilities and role-driven execution. Rather than a single agent handling all tasks, Roo Code can orchestrate multiple specialized agents -- one for planning, another for implementation, a third for testing. This parallels the multi-agent trend seen in Claude Code's swarm feature, but implemented as a VS Code extension. Practitioners describe using Roo Code's "Orchestrator" mode, where the tool breaks tasks into sub-tasks and delegates them to specialized roles.

**Kilo Code** represents another fork with its own direction, contributing to an ecosystem where the core Cline platform has spawned multiple specialized variants.

This forking pattern mirrors broader trends in open-source AI tools: a successful core project splits into variants that explore different tradeoffs around autonomy, control, and specialization. The Cline ecosystem demonstrates that the space is far from settled on what the right level of agent autonomy should be.

## Where Cline Fits in the Landscape

**Choose Cline when:**
- You want maximum transparency and control over agent actions
- You work in VS Code and do not want to switch editors
- You need browser automation for testing visual output
- You want MCP extensibility for custom tool integration
- You value the ability to revert any action through the timeline

**Consider alternatives when:**
- You want minimal friction and fast autonomous execution (Claude Code, Codex CLI)
- You prefer a standalone AI-native IDE experience (Cursor, Windsurf)
- You want terminal-based workflows (Claude Code, Aider)
- You find approval gates too slow for your workflow

## Compared to Cursor

This is the most common comparison in practitioner discussions. Both operate in the IDE space, but they represent different design philosophies:

Cline is an **extension** -- it adds agentic capabilities to VS Code while preserving your existing environment. Every action requires approval. The focus is on transparency and control.

Cursor is a **standalone IDE** -- a fork of VS Code rebuilt around AI. It features inline completions, fast autonomous execution, and a polished visual experience. The focus is on speed and seamless integration.

Cline tends to outperform Cursor on complex, multi-file tasks where careful step-by-step execution matters. Cursor tends to outperform Cline on rapid iteration and simple tasks where the overhead of approval gates adds unnecessary friction.

## Compared to Claude Code

Cline and Claude Code solve similar problems through different interfaces. Cline is visual and IDE-based; Claude Code is terminal-based. Both support agentic workflows where the AI reads files, runs commands, and iterates on failures.

The key philosophical difference is control. Cline's approval gates give you explicit veto power over every action. Claude Code runs more autonomously, though it respects permission boundaries and will ask before potentially destructive operations.

Developers who spend their day in VS Code tend to prefer Cline. Those who live in the terminal gravitate toward Claude Code. Both benefit from well-written project documentation -- CLAUDE.md for Claude Code, and equivalent context files for Cline.

## Pricing

The Cline extension itself is free for individual use under an open-source license. You pay only for API inference through your own keys (BYOK model).

For teams, Cline offers a collaboration plan that was free through Q1 2026, transitioning to $20 per user per month. The first 10 seats remain free permanently, making it accessible for small teams.

This pricing structure -- free tool, pay-per-token API costs -- means your total spend scales with usage intensity rather than headcount. Light users pay very little; heavy users of capable models can see significant bills.

## Practical Tips

1. **Use Plan mode for complex tasks.** Review the agent's proposed approach before any code is modified. This catches misunderstandings early and saves tokens.

2. **Configure MCP tools for your stack.** Database queries, API documentation, and deployment tools can all be exposed through MCP, giving Cline richer context.

3. **Monitor API costs.** Multi-step agentic workflows consume more tokens than autocomplete. Track your spending, especially when using frontier models.

4. **Leverage the timeline for experiments.** Cline's revert capability makes it safe to try aggressive changes. If the result is poor, roll back to a known good state.

5. **Consider Roo Code for multi-agent workflows.** If you find yourself breaking tasks into subtasks manually, the orchestrator pattern in Roo Code may automate that decomposition.

6. **Start with approval gates on, then relax.** New users benefit from reviewing every action. As you build trust with the tool on your codebase, you can approve routine actions more quickly.
