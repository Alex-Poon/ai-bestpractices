---
title: "OpenAI Codex"
description: "OpenAI's coding agent ecosystem — Desktop App, CLI, IDE extension, and the GPT-5.3-Codex model."
weight: 8
tags: [codex, openai, tools, agent, multi-agent]
date: 2026-02-06
---

OpenAI Codex has evolved from a single cloud-sandboxed coding agent into a multi-surface ecosystem: a Desktop App for parallel agent orchestration, a CLI for terminal-first workflows, and an IDE extension for in-editor use. The February 2026 launch of the Codex Desktop App and GPT-5.3-Codex model represents a significant expansion of what Codex can do, moving it from a submit-and-review tool to a full multi-agent development environment.

## The Codex Ecosystem (February 2026)

Codex now spans three surfaces, each targeting different workflows:

**Codex Desktop App** (launched February 2, 2026): A standalone macOS application for managing multiple AI agents in parallel. This is the newest and most ambitious surface -- it introduces multi-agent orchestration, git worktree isolation, scheduled automations, and a skills system. Windows support is planned.

**Codex CLI**: The original terminal-based agent (`npm install -g @openai/codex`), now updated with parallel shell command execution, steer mode for mid-task redirection, and personal skill loading.

**Codex IDE Extension**: A VS Code extension (also compatible with Cursor and Windsurf) offering three autonomy levels -- Chat, Agent, and Agent (Full Access). Supports image drag-and-drop for visual context.

All three surfaces share the same model (GPT-5.3-Codex), AGENTS.md configuration, and skills system, giving developers a consistent experience across form factors.

## GPT-5.3-Codex: The Model

Released February 5, 2026, GPT-5.3-Codex is OpenAI's most capable agentic coding model. It combines frontier coding performance with general reasoning and runs 25% faster than its predecessor GPT-5.2-Codex. OpenAI reports the model was instrumental in building itself during training and deployment.

**Benchmark highlights:**
- **SWE-Bench Pro**: 56.8% (industry high across 4 languages)
- **Terminal-Bench 2.0**: 77.3% (terminal skills for coding agents)
- **OSWorld-Verified**: 64.7% (up from 38.2% for GPT-5.2-Codex; human baseline is roughly 72%)

Reasoning levels are selectable (low, medium, high, minimal), letting users trade depth for speed depending on the task. API access is planned but not yet available.

## Codex Desktop App: Multi-Agent Orchestration

The Desktop App is Codex's most distinctive new surface. It introduces capabilities that no other coding tool currently offers:

### Git Worktrees for Agent Isolation

Each agent works on an isolated git worktree -- an independent copy of the codebase. Multiple agents can work on the same repository simultaneously without merge conflicts. This fundamentally changes how developers approach complex features: instead of working sequentially, you can have agents explore different architectural approaches in parallel, then review and merge the best result.

### Skills System

Skills are reusable instruction sets that package domain knowledge into discoverable capabilities:

- **Repository skills** live in `.agents/skills/` and are shared via version control
- **Personal skills** live in `~/.codex/skills/` and apply across projects
- **Remote skills** can be listed and downloaded from a public catalog
- OpenAI ships built-in "plan" and "skill-creator" skills

Each skill is a folder containing a `SKILL.md` file with a name and description. The model decides when to activate a skill based on the current task.

### Automations (Scheduled Tasks)

Automations combine instructions with optional skills, running on user-defined schedules. Results land in a review queue and are auto-archived if there is nothing to report. Use cases include daily issue triage, CI failure summarization, release brief generation, and scheduled bug detection. Future plans include cloud-based triggers so Codex runs continuously rather than only when the computer is open.

### Mid-Turn Steering

You can submit a message while Codex is actively working to redirect its behavior. This addresses one of the original Codex's biggest criticisms -- the inability to course-correct mid-task. Steer mode is now stable and enabled by default.

### AGENTS.md Configuration

Codex supports two-level discovery: global scope (`~/.codex/AGENTS.md`) and project scope (git root down to current working directory). Override files (`AGENTS.override.md`) are supported, with configurable fallback filenames and byte limits via `~/.codex/config.toml`.

## Security Model

The Desktop App uses defense-in-depth security: approval policies, command safety analysis, and OS-level sandboxing (Seatbelt on macOS, Landlock on Linux, experimental on Windows). Cloud runs use isolated OpenAI-managed containers. Local execution limits agents to designated folders and branches by default, with network access and elevated permissions requiring explicit approval.

## What Practitioners Report

### Strengths

**Multi-agent worktrees are genuinely novel.** Simultaneous architectural exploration without merge conflicts is a workflow no other tool offers. Practitioners describe it as fundamentally changing how they approach complex features.

**GPT-5.2/5.3 has improved substantially.** Multiple practitioners report that Codex with GPT-5.2+ reliably handles complex problems. One user described switching to Codex around the GPT-5 timeframe because it was solving problems that other tools struggled with. Another noted that Codex with 5.2 is "reliably good" enough to earn default status.

**Deep analysis remains strong.** Extended thinking mode, where the agent spends several minutes reading and reasoning about the codebase before making changes, continues to produce thorough results on complex tasks. The agent reads and navigates the codebase extensively, reducing the failure mode of editing before understanding.

**Background task execution.** The submit-and-review model works well for code review, test generation, documentation, and large-scale analysis. The new automations feature extends this into scheduled, recurring work.

**Token efficiency.** OpenAI claims roughly 3x fewer tokens for equivalent tasks compared to competitors, which matters for cost-conscious teams at scale.

### Weaknesses

**Quality still trails Claude Code for some users.** Several practitioners report that Claude models produce correct code on the first attempt more consistently, with one noting roughly 30% less rework. The gap has narrowed with GPT-5.2+, but it persists in reports from users who have tried both recently.

**Experiences vary widely across model versions.** The quality improvement from GPT-5.1 to GPT-5.2 was dramatic. Practitioners who tried Codex with earlier models and had poor experiences may not realize how much it has improved. One commenter explicitly noted trying Codex months ago and finding it a "huge letdown," while another who returned more recently found it substantially better.

**Mac-only Desktop App.** Launching a desktop app only on macOS was noted as an odd limitation for an AI tool in 2026. Windows support is planned but not yet available.

**UX concerns.** Early adopters on Reddit reported speed issues, coding errors, and undefined wait times before getting results. The Electron-based architecture drew some criticism from the HN community.

**Cloud-first raises privacy concerns.** Codex's architecture runs code in OpenAI's cloud by default, which raises data privacy questions compared to Claude Code's local-first approach.

## Codex vs Claude Code

This remains one of the most discussed comparisons in practitioner communities. The February 2026 updates change the picture significantly:

| Dimension | OpenAI Codex (Feb 2026) | Claude Code |
|---|---|---|
| Form factors | Desktop App + CLI + IDE extension | Terminal CLI + IDE extension |
| Architecture | Cloud-first; Electron desktop app | Local-first; terminal |
| Multi-agent | First-class (worktrees, parallel threads) | Sub-agents, agent teams (research preview) |
| Model | GPT-5.3-Codex | Claude Opus 4.6 |
| Scheduling | Automations (cron-like tasks) | None built-in |
| Skills/Plugins | Skills system + remote catalog | CLAUDE.md, hooks, MCP, custom commands |
| Mid-task steering | Yes (steer mode, now default) | Yes (interactive by default) |
| Interaction style | Both async and interactive now | Real-time collaboration |
| Local context | Limited (sandboxed by default) | Full (filesystem access) |
| Safety model | Defense-in-depth sandbox | Runs with user permissions |
| Token efficiency | ~3x fewer tokens claimed | Large context (200K-1M) |
| Extensibility | Skills, AGENTS.md, automations | CLAUDE.md, hooks, MCP, sub-agents |

The practitioner consensus is shifting. Previously, Codex was clearly the "background task" tool while Claude Code owned interactive development. With the Desktop App's mid-turn steering, multi-agent parallelism, and automations, Codex now competes more directly:

- **Claude Code still wins on day-to-day interactive coding** where local context, rapid iteration, and the Claude model's first-attempt accuracy matter most
- **Codex now uniquely owns multi-agent orchestration** -- running several agents in parallel on isolated worktrees is something no other tool offers
- **Codex wins on automated workflows** -- scheduled automations and background execution for recurring development tasks

Several practitioners use both tools for different phases of work, which mirrors the broader multi-model trend.

## Pricing and Access

Codex is bundled with ChatGPT subscriptions rather than priced separately:

- **Plus**: $20/month (30-150 messages per 5-hour window)
- **Pro**: $200/month (300-1,500 messages per 5-hour window)
- **Business**: $30/user/month
- **Enterprise/Education**: contact sales
- **API key option**: usage-based billing for those who prefer it

OpenAI temporarily included Codex access for free-tier users (a 2-month promotional window), which represents an aggressive growth play. Paid plans receive double rate limits during the promotional period, and additional credits are purchasable when limits are reached.

## Scale and Adoption

OpenAI reports over 1 million developers used Codex in the past month, with usage growing 20x since August 2025 and doubling since the GPT-5.2-Codex launch in mid-December 2025.

## Where Codex Fits

Codex is the strongest choice for:

- **Multi-agent parallel development** where git worktree isolation lets you explore alternatives simultaneously
- **Automated recurring tasks** using the scheduling and automations system
- **Teams already in the OpenAI ecosystem** who want agentic capabilities bundled with ChatGPT
- **Background code analysis** where extended reasoning improves quality
- **Security-conscious organizations** requiring sandboxed execution
- **Cost-sensitive teams** where token efficiency at scale matters

It is less well-suited for:

- **Developers who prioritize first-attempt code accuracy** where practitioners still give Claude models an edge
- **Windows and Linux desktop users** (CLI and IDE extension work, but the Desktop App is Mac-only)
- **Teams wanting local-first execution** where sending code to the cloud is unacceptable
- **Budget-conscious individuals** -- while the free tier is generous, serious use requires $20-200/month

## The Bigger Picture

The Codex Desktop App represents OpenAI's bet that the future of AI-assisted development is multi-agent orchestration and continuous automation, not just interactive pair programming. The combination of parallel agents on isolated worktrees, a skills system for reusable workflows, and scheduled automations points toward a model where developers manage a team of AI agents rather than working with a single assistant.

Whether this vision wins depends on whether multi-agent workflows deliver enough value to justify the added complexity. Today, most practitioners still find that a single capable agent (Claude Code, Cursor) handles the majority of their work. But for complex projects with multiple independent workstreams, Codex's parallel execution model is genuinely novel.

For the broader decision framework, see the [Tool Comparison Matrix](/tools/compare.html). For the interactive alternative, see [Claude Code](/tools/claude-code.html).
