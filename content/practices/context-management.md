---
title: "Context Management"
description: "Working within and around context window limits — TODO lists, plan files, working memory patterns."
weight: 6
tags: [context-management, working-memory, context-window]
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
