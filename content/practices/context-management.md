---
title: "Context Management"
description: "Working within and around context window limits — TODO lists, plan files, working memory patterns."
weight: 6
tags: [context-management, working-memory, context-window, memory, claude-md]
date: 2026-02-06
---

Context management is the practice of working within and around the finite context window that constrains every AI agent interaction. It is the most technical of the core practices and the one that separates power users from frustrated ones. Most practical failures in agentic coding -- going in circles, forgetting instructions, losing coherence over long sessions -- trace back to context management problems.

The context window is not just a size limit. It is the agent's entire working memory. Everything the agent knows about your project, your conversation, its instructions, and its tools must fit within this window. As it fills, quality degrades -- not gradually, but in ways that are hard to predict and hard to recover from.

## What Context Management Is

Context management encompasses three activities:

1. **Context budgeting**: Deciding what information to include in the agent's context and what to exclude.
2. **Session management**: Knowing when to start fresh sessions, when to continue, and how to hand off between sessions.
3. **Working memory patterns**: Using external files (TODO lists, plan documents, state files) to extend the agent's effective memory beyond the context window.

The fundamental constraint is simple: the agent can only reason about what it can see. Everything outside the context window does not exist for the agent. Your job is to ensure that what matters most is inside the window and what matters least is not wasting space.

## Why Context Management Matters

### Context windows are the central bottleneck

**conception** found that "after any compacting of the context window, the session is more or less useless." Context compaction -- where the system summarizes earlier conversation to make room for new content -- reliably degrades session quality with no good recovery mechanism. This is not a bug that will be fixed soon; it is inherent to how current models process information.

**joshuaisaact** framed it precisely: agents are "stateless functions with a limited heap." The context window is local memory. As it fills, the function's behavior degrades -- it processes new information less effectively, follows instructions less reliably, and produces lower-quality output.

### Most agent failures are context failures

When the agent goes in circles, it is usually because the context is polluted with previous failed attempts, pushing useful information out of effective attention range. When the agent ignores your AGENTS.md instructions, it is often because the instructions are buried under thousands of tokens of conversation and tool output. When the agent makes the same mistake it made three turns ago, it is because the correction was compacted away.

**guluarte** reported that agents follow the first two or three lines of AGENTS.md and selectively ignore instructions deeper in the file. This is a context attention problem, not a comprehension problem.

### Token waste is real and expensive

**shimman** pointed out that LLM agents spend tens of thousands of tokens grepping entire codebases to find symbols that LSP could locate instantly. **jtms** confirmed that refactoring tasks consume context budget on mechanical operations that deterministic tools could handle. Every wasted token is context window space that could have held useful information.

## How to Manage Context Effectively

### Strategy 1: Short Sessions

The single most effective context management technique is keeping sessions short. Start a new session for each distinct task rather than reusing a long-running conversation.

**bushbaba** advocates avoiding session reuse beyond the initial task or two. Fresh sessions start with clean context -- no pollution from previous attempts, no compaction artifacts, no accumulated tool output. The agent reasons better in a fresh context than in a long one.

The practical workflow: scope a task (see [task scoping](../task-scoping.html)), open a new session, provide the relevant context, complete the task, commit the result, close the session. Each session is disposable.

**jackfranklyn** identified the key signal: when the agent starts going in circles, the session is spent. Stop, start fresh, and provide a narrower task.

### Strategy 2: External Working Memory

Use files on disk to extend the agent's effective memory beyond the context window. The agent reads from and writes to these files, creating a form of persistent memory that survives context compaction and session boundaries.

**Common working memory patterns:**

**TODO files.** A markdown file listing remaining tasks, completed items, and blockers. The agent reads the TODO at the start of each session to understand where things stand and updates it as work progresses. This prevents the agent from losing track of the overall plan when context is compacted.

**Plan files.** A document describing the current approach, key decisions made, and the rationale behind them. When a session gets long, the agent can re-read the plan file to recover alignment rather than relying on compacted conversation history.

**State files.** For multi-agent workflows, a shared state file records what each agent has done and what remains. This is how independent agents coordinate without sharing context windows.

**Decision logs.** A record of architectural decisions and their rationale. When the agent proposes something that contradicts a previous decision, you can point it to the decision log rather than re-explaining the reasoning.

**stevenslade** summarized the fundamental principle: "memory = prompt assembly." All agent memory is just text assembled into prompts. The strategies (sliding window, summarization, RAG, external files) differ in how that assembly happens, but the constraint is the same.

Claude Code's built-in memory system (see Strategy 7) now automates some of these patterns. Auto memory maintains project notes across sessions without manual intervention, and CLAUDE.md files serve as persistent project context loaded at every session start. However, task-specific working memory — TODO files for the current task, plan files for the current approach, state files for multi-agent coordination — remains valuable because it captures ephemeral session state that the persistent memory system is not designed to track.

### Strategy 3: Context-Efficient Tools

Replace context-heavy operations with context-efficient tools. Every tool output that enters the context window competes with your instructions and conversation for the agent's attention.

**LSP integration.** Instead of the agent grepping the entire codebase to find a symbol definition (thousands of tokens of file content), an LSP-backed tool returns just the definition (a few tokens). **jtms** estimated this could save tens of thousands of tokens per refactoring session.

**Filtered test runners.** A wrapper that runs only tests relevant to modified files and formats output concisely. Full test suite output can consume enormous amounts of context.

**Minimal-output tools.** Design agent tools to return the minimum useful output. A tool that returns "3 tests passed, 1 failed: test_auth_token_expiry" is better for context than one that dumps the full pytest output.

**Pre-computed statistics.** Rather than having the agent analyze raw data, provide pre-computed summaries. The agent does not need to see 500 lines of test output if you can tell it "487 passed, 13 failed, failures are in auth and payments modules."

### Strategy 4: Subagent Context Freshness

Delegate self-contained tasks to subagents so they work with fresh, focused context rather than on top of a large monolithic context.

**AffableSpatula** found that subagents with fresh context burn fewer tokens and reason better than continuing in a degraded parent context. The principle is simple: rather than asking a 100k-token-deep session to do one more thing, spawn a new session with only the 5k tokens of context it actually needs.

**baby** always handles Claude Code by spawning subagents for self-contained tasks, with the lead agent maintaining a dependency graph so subagents do not step on each other.

The tradeoff: subagent spawning has overhead (context transfer, result integration). For tasks that take less than a few minutes, the overhead may exceed the benefit. Use subagents for tasks that would suffer in a degraded parent context, not for quick operations.

### Strategy 5: Structured Handoffs

When you must continue work across sessions, structure the handoff explicitly. At the end of a session, have the agent write a summary of:

- What was accomplished
- What remains to do
- Key decisions made and why
- Any blockers or open questions

Start the next session by providing this summary alongside the relevant files. This is more reliable than relying on the new session to re-derive context from the codebase alone.

The pattern is analogous to shift handoffs in operations: the outgoing shift briefs the incoming shift, ensuring continuity without requiring shared memory.

### Strategy 6: Context Checkpointing

Some practitioners create explicit checkpoints during long sessions. Before undertaking a risky or complex sub-task, have the agent write its current understanding and plan to a file. If the sub-task goes badly and pollutes the context, you can start a new session and restore from the checkpoint rather than losing the entire session's progress.

### Strategy 7: Persistent Memory

The strategies above manage context within and between sessions. Persistent memory systems address a related but distinct problem: carrying knowledge forward across sessions without consuming the active context window. Claude Code's built-in memory architecture is the most mature implementation of this idea, and several community plugins extend it further.

**The three-layer memory architecture:**

**1. CLAUDE.md files (manual, hierarchical).** Markdown files you write that Claude reads at session start. They form a hierarchy from broadest to narrowest scope: managed policy (organization-wide) → user memory (~/.claude/CLAUDE.md, personal preferences for all projects) → project memory (./CLAUDE.md, team-shared via source control) → project rules (.claude/rules/*.md, modular and path-scoped) → project local (./CLAUDE.local.md, personal and auto-gitignored). More specific instructions take precedence over broader ones.

Claude Code reads CLAUDE.md files recursively from the current working directory upward. Parent directory files are loaded in full at launch; child directory files are loaded on demand when Claude reads files in those subtrees. This means a monorepo can have a root CLAUDE.md with global rules and subdirectory files with package-specific overrides.

Modular rules in .claude/rules/ support path-specific scoping via YAML frontmatter with glob patterns — a rule in react.md can be scoped to "src/**/*.tsx" files only, loading only when Claude works with matching files. This reduces context waste from rules irrelevant to the current task.

**2. Auto memory (Claude-generated, persistent).** A directory at ~/.claude/projects/<project>/memory/ where Claude records learnings, patterns, and insights as it works. The first 200 lines of MEMORY.md are loaded into Claude's system prompt every session. Topic files (debugging.md, patterns.md, api-conventions.md) are created as needed and loaded on demand.

This replaces some manual working memory patterns. Instead of maintaining TODO files and handoff documents manually, Claude maintains its own persistent notes — project patterns, debugging insights, architecture notes, and user preferences. The system is automatic: Claude writes to memory files during sessions and reads them back at the start of the next session.

The practical impact on context management: auto memory provides a form of RAG-like retrieval without consuming the active context window for information that is not immediately relevant. The 200-line MEMORY.md cap ensures only the most important notes occupy permanent context space.

**3. Community memory plugins (extended memory).** Third-party plugins go beyond Claude's built-in memory. claude-mem (thedotmack) captures session activity, compresses it with AI, and injects relevant context into future sessions. It uses a three-layer progressive disclosure system for token efficiency — compact index first (~50-100 tokens), timeline context on demand, full observations only when filtered. Local SQLite and Chroma vector storage keep everything on-device. claude-supermemory (supermemoryai) takes a different approach with cloud-based team memory, enabling project knowledge shared across team members. This addresses the collaboration gap where auto memory is per-user. Other tools — Nemp Memory (local JSON), Basic Memory (MCP knowledge system), In Memoria (statistical pattern learning from code structure) — each offer different tradeoffs between simplicity, capability, and privacy.

**How persistent memory changes context management practice:**

- CLAUDE.md files partially replace the need for external working memory (Strategy 2) for project conventions and constraints. Rules that you would previously re-explain every session are now loaded automatically.
- Auto memory reduces handoff friction (Strategy 5). Instead of manually writing session summaries, Claude maintains its own continuity across sessions.
- Path-scoped rules (.claude/rules/) help with context budgeting (Strategy 1) by loading rules only when they are relevant to the current files being edited.
- The hierarchy addresses the massive AGENTS.md anti-pattern: instead of one large file, distribute rules across scoped files that load conditionally.

**Practitioner insights:**

**bcherny** (Anthropic team) recommends keeping CLAUDE.md under approximately 1,000 tokens. His own file is about half that size. He advises breaking instructions into smaller files per subdirectory for lazy loading.

**bonsai_spool** keeps CLAUDE.md under 50 lines with a focused structure: one-line hypothesis or goal, a "Start Here" link to a roadmap file, quick reference commands, a key files table, and an end-of-session protocol.

**pigpop** treats Claude as a short-term contractor in 30-60 minute sessions. He disables auto-compaction because summaries "often remove important details" and keeps context usage under 80%.

**nivertech** reports that auto-memories get written to CLAUDE.md, requiring periodic manual organization to prevent bloat — the memory system needs maintenance just like any external working memory pattern.

**steveklabnik** notes that native memory tools allow Claude to store and consult information outside the context window, enabling persistent knowledge bases without context inflation.

**The residual gap:** Memory systems address knowledge persistence but do not solve context window degradation during active sessions. All the strategies from 1-6 remain essential for managing the active context window within a session. Memory systems reduce the cold-start problem (Strategy 5 handoffs) but cannot prevent the quality degradation that occurs when the active window fills (Strategy 1 short sessions).

## Anti-Patterns

### Marathon Sessions

Running a single agent session for hours, accumulating context until quality degrades noticeably, then struggling with an agent that cannot follow instructions or remember what it was doing.

**Fix:** Short sessions. One task per session when possible. Commit between sessions.

### Dumping Everything into Context

Providing the entire codebase, all documentation, and exhaustive background information "just in case." The agent's attention is finite. Irrelevant context dilutes attention to relevant content.

**Fix:** Include only what the agent needs for this specific task. Use the "explain back" test: could a competent developer complete this task with only the information you are providing?

### Ignoring Context Compaction

Continuing a session after the system has compacted previous messages, without realizing that important instructions or corrections have been summarized away.

**Fix:** When you notice the agent behaving inconsistently or forgetting rules, check whether compaction has occurred. If so, start a fresh session and re-provide critical context.

### Relying on Conversation History

Assuming the agent can reference and reason about earlier parts of a long conversation. As context fills, earlier turns receive less attention even before compaction occurs.

**Fix:** For any information that must remain active throughout the session, put it in a file the agent can re-read rather than relying on it existing in conversation history.

### No External Memory

Running every session from scratch without TODO files, plan documents, or state files. Each session starts with zero accumulated knowledge, forcing you to re-explain the project state every time.

**Fix:** Maintain working memory files. Even a simple TODO.md that the agent updates at the end of each session dramatically improves continuity.

### Massive AGENTS.md Files

Writing an AGENTS.md so large that it consumes a significant fraction of the context window on its own, leaving less room for the actual task. **CjHuber** warned about this failure mode: elaborate procedures that overwhelm the context before work even begins.

**Fix:** Keep AGENTS.md concise and focused on critical rules. Move specialized instructions to skills or separate files loaded on demand.

## Context Window Sizes and Practical Limits

While context windows are measured in tokens (ranging from 128K to 1M+ across current models), the effective context is always smaller than the theoretical maximum. Attention quality degrades well before the window fills. Practitioners consistently report that agent behavior deteriorates long before hitting the hard limit.

**dmos62** discovered a hard performance cliff at 45k tokens with ChatGPT -- not the stated limit, but a practical one where quality drops sharply. The effective context for reliable work is often 30-50% of the stated maximum.

This means that even with a 200K context window, treating the first 50-80K as your reliable working space and managing the rest carefully is the pragmatic approach.

## Evidence

**conception** (HN, thread 46815585): "After any compacting of the context window, the session is more or less useless." Context compaction reliably degrades quality with no good recovery.

**joshuaisaact** (HN, thread 46752037): Agents are "stateless functions with a limited heap." Context window is local memory that degrades as it fills.

**AffableSpatula** (HN, thread 46744478): Subagents with fresh context burn fewer tokens and reason better than a monolithic context.

**guluarte** (HN, thread 46827212): Agents follow the first two or three lines of AGENTS.md and selectively ignore deeper instructions.

**jtms** (HN, thread 46365747): Refactoring tasks "blow tens of thousands of tokens just searching for files." LSP integration would dramatically reduce waste.

**stevenslade** (HN, thread 46577498): "Memory = prompt assembly." All agent memory is text assembled into prompts. The fundamental constraint is always the same.

**baby** (HN, thread 46752104): The system produces better results because of clean context windows. Always delegates to subagents for self-contained tasks.

**dmos62** (HN, thread 46812832): Discovered hard performance cliff at 45k tokens. Prefers honest refusals over silent quality degradation.

**bcherny** (HN, thread 46256682): Recommends keeping CLAUDE.md under ~1,000 tokens. Breaks instructions into smaller files per subdirectory for lazy loading.

**bonsai_spool** (HN, thread 46486664): CLAUDE.md under 50 lines: one-line hypothesis/goal, "Start Here" link, quick reference commands, key files table, end-of-session protocol.

**pigpop** (HN, thread 46521933): Treats Claude as a short-term contractor (30-60 minute sessions). Disables auto-compaction because summaries "often remove important details."

**steveklabnik** (HN, thread 45530858): Native memory tools enable persistent knowledge bases outside the context window without context inflation.

**nivertech** (HN, thread 45788866): Auto-memories written to CLAUDE.md require periodic manual organization to prevent bloat.
