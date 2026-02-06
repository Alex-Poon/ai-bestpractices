---
title: "Gemini CLI"
description: "Google's entry into the AI coding agent space — memory system, agent skills, and practitioner reception."
weight: 7
tags: [gemini, google, tools, cli, memory, skills]
date: 2026-02-06
---

Gemini CLI is Google's terminal-based coding agent, powered by Gemini models. It offers a similar interaction model to Claude Code -- describe a task in natural language, and the agent reads files, generates code, and iterates -- but draws on Google's model family and ecosystem. It is notable for its generous free tier, massive context windows, a sophisticated memory system, an agent skills framework, and the polarized practitioner reception that consistently separates benchmark performance from real-world experience. As of February 2026, it is at v0.27.0 with rapid weekly releases.

## What Gemini CLI Offers

**Free tier access.** Through Google's AI Studio, Gemini CLI provides roughly 1,500 requests per day with Gemini 2.5 Pro at no cost. For developers who want to experiment with agentic coding without committing to a $100-200/month subscription, this is a meaningful advantage.

**Model variety.** Gemini CLI gives access to the full Gemini model family:
- **Gemini 3 Pro**: Google's flagship model, competitive on benchmarks with Claude Opus and GPT-5.2
- **Gemini 3 Flash**: A fast, cost-efficient variant that practitioners praise for routine tasks. One commenter described it as a strong model at a fraction of the frontier cost.
- **Gemini 3 Ultra**: The largest variant, used for complex reasoning tasks

**Massive context windows.** Gemini 3 supports context windows up to 2 million tokens -- significantly larger than competitors. For codebases that exceed what other agents can hold in context, this is a structural advantage. Practitioners working with very large monorepos or extensive documentation sets report that the larger context window reduces the need for context management gymnastics.

**Multilingual strength.** Google's training data advantages show in multilingual performance. Practitioners working with non-English documentation, code comments in multiple languages, or internationalized applications report strong results.

## Memory and Persistence System

Gemini CLI has developed one of the most granular memory systems among coding agents, built around hierarchical GEMINI.md files, a cross-session memory tool, and conversation branching.

### GEMINI.md: Hierarchical Context Files

Gemini CLI loads context files from multiple locations, concatenating them and sending the combined content with every prompt:

1. **Global**: `~/.gemini/GEMINI.md` -- default instructions for all projects
2. **Project**: Current directory plus every parent directory up to the `.git` root
3. **Subdirectories**: Scans child directories (up to 200) for component-specific instructions, respecting `.gitignore` and `.geminiignore`

This three-tier hierarchy is more granular than Claude Code's CLAUDE.md, which uses a simpler two-tier system (project root plus user-level settings). Each subdirectory can carry its own context, so a monorepo with distinct components can have tailored instructions per component.

**Configurable filenames.** Gemini CLI can be configured to read AGENTS.md, CLAUDE.md, or any custom filename, making it interoperable with instruction files written for other tools.

**Modular imports.** GEMINI.md files support `@file.md` syntax to import content from other files. Imports can be nested (up to 5 levels deep), with circular import detection and graceful handling of missing files. This lets teams build modular instruction sets -- a shared style guide, component-specific rules, and personal preferences -- composed into a single context.

**Memory commands:**
- `/memory show` -- displays the full concatenated content of all loaded context files, providing transparency into exactly what the model sees
- `/memory refresh` -- re-scans and reloads all GEMINI.md files
- `/memory add <text>` -- appends text to `~/.gemini/GEMINI.md` persistently

### save_memory: Cross-Session Persistence

The `save_memory` tool is an AI-callable tool (not just a slash command) that appends facts to the global GEMINI.md under a `## Gemini Added Memories` section. The agent can proactively save insights it discovers during a session -- project preferences, architectural decisions, debugging patterns -- for use in future sessions.

A key difference from Claude Code: Gemini CLI's `save_memory` writes to the global GEMINI.md by default, meaning memories are shared across all projects. Claude Code's auto-memory is project-scoped, keeping memories isolated per project. Both approaches have tradeoffs -- global memory avoids re-learning preferences, while project-scoped memory prevents cross-project contamination.

### Session Management

Gemini CLI offers sophisticated session handling:

- **Automatic saving**: All sessions are saved in the background since v0.20.0
- **Conversation branching**: `/chat save <tag>` saves the current conversation state, `/chat resume <tag>` restores it. This enables exploring different approaches from the same starting point.
- **CLI resume**: `gemini --resume` loads the most recent session; `gemini --resume <UUID>` resumes a specific session
- **Session browser**: `/resume` opens an interactive session picker
- **History navigation**: `/back` moves backward through conversation history; `/rewind` (new in v0.27.0) provides more granular history navigation
- **Auto-cleanup**: Configurable retention policies (max age, max count) prevent unbounded session accumulation

### Context Window Management

The 1-million-token context window of Gemini 2.5 Pro (5x larger than Claude's 200K) changes context management fundamentally. Compression kicks in at a configurable threshold (default 50% of context used), using summarization rather than deletion. Tool output truncation and experimental JIT (Just-In-Time) context loading provide additional controls for managing very large sessions.

## Agent Skills

Agent Skills, promoted to stable in v0.27.0, are self-contained directories that package instructions and assets into discoverable capabilities. The model autonomously decides when to activate a skill based on the user's request.

### How Skills Work

1. Skill metadata is injected into the system prompt (lightweight footprint)
2. The model identifies a matching task and calls `activate_skill`
3. A user confirmation prompt shows skill details
4. Upon approval, the full `SKILL.md` content and folder structure load into context
5. The model prioritizes skill guidance for the remainder of the session

This on-demand loading avoids the token waste of always including all instructions -- skills only consume context when relevant.

### Skill Discovery Tiers

Skills are discovered in precedence order:
1. **Workspace skills** (`.gemini/skills/`) -- shared via version control
2. **User skills** (`~/.gemini/skills/`) -- personal, cross-workspace
3. **Extension skills** -- bundled within installed extensions

### Built-in Skills

- **skill-creator** -- helps create new skills
- **pr-creator** -- pull request creation workflow
- **Generalist agent** -- task routing for multi-step workflows

### Management

Install from repositories, directories, or `.skill` files via `gemini skills install`. Toggle with `/skills disable` and `/skills enable`. Link local skills with `/skills link <path>`.

## Subagents (Experimental)

Gemini CLI supports experimental subagent capabilities (enabled via `experimental.enableAgents`). Subagents use JSON schema for input specifications and are tracked by an AgentRegistry. As of v0.27.0, the architecture has been refactored to "one tool per agent." Note: subagents currently require YOLO mode (auto-approve all tool calls), which limits their use in production contexts.

## What Practitioners Report

Community reception of Gemini CLI is more polarized than for any other tool in this space. The split between benchmark performance and real-world experience is a recurring theme.

### Positive Experiences

Some practitioners report excellent results, particularly for specific use cases:

- **Kubernetes and infrastructure**: One user described setting up k8s clusters with Gemini as a nearly spotless experience.
- **Algorithm exploration**: Practitioners using Gemini for exploring programming ideas and algorithms report strong results, with one commenter saying they were close to cancelling competing subscriptions.
- **Cost-efficient routine work**: For tasks that do not require frontier-level reasoning, Gemini Flash models offer strong output at significantly lower cost.
- **Context window advantage**: The 1M-2M token context is praised for handling large codebases without aggressive truncation.

### Negative Experiences

The criticisms are persistent and specific:

- **Hallucination frequency**: Despite leading on multiple benchmarks, practitioners consistently report that Gemini produces confident but incorrect output more frequently than Claude or GPT. One user described memory issues and hallucination specifically in the CLI coding tool.
- **The benchmark gap**: The most common complaint is that benchmark scores do not match real-world experience. One commenter described benchmarks as not a good measure of competence.
- **Inconsistency**: Experiences vary widely between users and tasks. One commenter observed that varied experiences suggest different thinking styles align with different models.
- **Rapid release cadence**: Weekly releases mean features evolve quickly but can introduce instability.

## Gemini CLI vs Claude Code

The most natural comparison is with Claude Code, as both are CLI-first agentic tools:

| Dimension | Gemini CLI | Claude Code |
|---|---|---|
| Model provider | Google (Gemini) | Anthropic (Claude) |
| Free tier | Yes (~1,500 req/day) | No |
| Max context window | 2M tokens | 1M tokens (Opus 4.6) |
| Memory system | 3-tier GEMINI.md + save_memory + imports | 2-tier CLAUDE.md + auto-memory |
| Memory scope | Global by default | Per-project by default |
| Agent Skills | Yes (stable, on-demand loading) | No equivalent |
| Session branching | /chat save/resume with named tags | No |
| Sub-agents | Experimental (requires YOLO mode) | Built-in (research preview) |
| MCP support | Yes | Native |
| Hooks | Extensive lifecycle hooks | Extensive |
| Approval modes | default, auto_edit, yolo | default, auto, yolo equivalent |
| Sandboxing | Docker-based, auto in YOLO mode | None built-in |

The feature gap that existed when these tools first launched has narrowed significantly. Gemini CLI's memory system, skills framework, and session management now rival or exceed Claude Code's surrounding infrastructure in several areas. Claude Code retains advantages in model quality for coding tasks, per-project memory isolation, and mature sub-agent orchestration.

Practitioners who switch between both tools report that Claude Code produces more consistently correct output on coding tasks, while Gemini CLI offers advantages on cost, context window size, memory granularity, and specific non-coding tasks like documentation and research.

## The Benchmark Debate

Gemini's relationship with benchmarks is a case study in why practitioners should not rely on benchmark scores for tool selection:

**Gemini frequently leads on public benchmarks.** Google's models have topped leaderboards on coding benchmarks, math reasoning, and multimodal tasks at various points.

**Practitioners consistently report a gap.** Across the threads analyzed, more commenters report disappointing real-world results with Gemini than for Claude or GPT, despite Gemini's benchmark leadership. The pattern is persistent enough that multiple commenters have described it as evidence of benchmark optimization that does not translate to practical use.

This does not mean Gemini is a bad model. It means that the gap between benchmark performance and practitioner experience is wider for Gemini than for competitors -- something to factor into any evaluation.

## Where Gemini CLI Fits

Gemini CLI is the strongest choice for:

- **Budget-conscious developers** who want agentic workflows without $100-200/month subscriptions
- **Very large codebase work** where the 2M token context window provides a real advantage
- **Teams wanting sophisticated memory systems** with hierarchical context, modular imports, and conversation branching
- **Reusable workflow packaging** through the Agent Skills system
- **Google ecosystem teams** already using GCP, Vertex AI, or other Google services
- **Multi-model strategies** where Gemini serves as one tool alongside Claude Code or Cursor for cross-validation

It is less well-suited for:

- **Production workflows** where consistent reliability matters more than cost or context size
- **Complex multi-file refactors** where practitioners report Claude Code producing more reliable results
- **Use cases requiring precise factual accuracy** where hallucination risk is not acceptable
- **Teams wanting mature sub-agent orchestration** (Gemini CLI's subagents still require YOLO mode)

## The Multi-Model Angle

Many experienced practitioners use Gemini not as their primary tool but as part of a multi-model strategy. Gemini's different failure modes make it a useful cross-check against Claude and GPT outputs. When two models agree, confidence increases. When they disagree, the discrepancy points to areas needing human review.

This approach -- using model diversity as a reliability mechanism rather than trying to find the single best model -- is increasingly common among power users. Gemini's accessibility through its free tier and Flash pricing makes it the easiest second model to add to an existing workflow.

For the broader decision framework, see the [Tool Comparison Matrix](/tools/compare.html). For the CLI-first alternative, see [Claude Code](/tools/claude-code.html).
