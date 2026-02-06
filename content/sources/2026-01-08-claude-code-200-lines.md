---
title: "How to Code Claude Code in 200 Lines of Code"
source_url: "https://www.mihaileric.com/The-Emperor-Has-No-Clothes/"
hn_url: "https://news.ycombinator.com/item?id=46545620"
date: 2026-01-08
hn_points: 816
hn_comment_count: 70
tags: [claude-code, agent-architecture, tool-calling, coding-agents, demystification]
tier: 1
weight: 2
---

## Summary

Mihail Eric's article, provocatively titled "The Emperor Has No Clothes," argues that AI coding assistants are not magical — they follow a simple architectural loop. The user sends a request, the LLM decides which tools to call, your code executes those tools locally, and the results flow back to the LLM for context. The critical mental model is that the LLM never actually touches your filesystem; it asks for things to happen, and your code makes them happen.

The author demonstrates that only three fundamental tools are sufficient for a functional coding agent: read files (examine code), list files (navigate projects), and edit files (create and modify). The implementation uses a straightforward tool registry where functions are registered with detailed docstrings that the LLM uses to reason about which tools to deploy. Communication uses structured calls in a defined format rather than direct file manipulation, keeping concerns separated.

The architecture centers on a conversation loop that enables tool chaining — the agent reads a file, edits it based on the content, then confirms the result, all within a single user request. Tool descriptions are generated from function signatures and docstrings, reducing maintenance overhead. Dynamic tool registration makes the system extensible.

The article acknowledges that production implementations add significant complexity: error handling, streaming responses, context management, additional tools (bash, grep, web search), and approval workflows. But the core loop — the fundamental architecture — remains identical to this simple 200-line version. The piece serves to demystify what coding agents actually do, lowering the barrier to building custom agents and understanding the limitations of existing ones.

## Key Insights

- **The core loop is simple**: User request, LLM tool selection, local execution, results back to LLM — this is the entire architecture
- **Three tools suffice**: Read files, list files, and edit files are enough for a functional coding agent
- **LLMs never touch your filesystem**: They request actions; your code executes them — understanding this separation is key
- **Production complexity is in the scaffolding**: Error handling, streaming, context management, approval workflows, and additional tools are what distinguish production agents from the core loop
- **Tool descriptions drive behavior**: Detailed docstrings on registered tools are how the LLM reasons about what to use and when
- **Demystification enables customization**: Understanding the simple core makes it practical to build custom agents for specific workflows

## Notable Quotes

> "The LLM never actually touches your filesystem." — Mihail Eric

## HN Discussion Highlights

The discussion generated 816 points and 70 comments. Key themes:

**Agreement on simplicity with caveats**
- **libraryofbabel**: Agreed the core of a coding agent is a simple loop with tool calling, but felt the article undersells the engineering required to make it production-ready
- **mirzap**: Compared the 200-line loop to saying "a DB is a B-tree" — technically true but operationally incomplete
- **prodigycorp**: Argued that modern harnesses have evolved so far past the simple loop that this is no longer an accurate mental model of what Claude Code actually does

**Production engineering challenges**
- **joshmlewis**: Shared experience building an enterprise-grade agentic loop processing a billion-plus tokens per month, noting many small details that greatly magnify complexity in real-world use
- **sams99**: Highlighted that file editing is a surprisingly difficult problem involving fine-tuning challenges and real-world hallucinations
- **nyellin**: Pointed out that the demo agent will exhibit early stopping where it finishes before the task is done, and that reasoning models alone do not fix this

**Broader implications for agent building**
- **tptacek**: Found it interesting that the realistic questions about competing with Claude Code boil down to things any proficient developer could do, while the competitive moat is in the model itself
- **dmvaldman**: Noted that agentic LLMs are trained via reinforcement learning to use specific tools, giving vertically integrated tools like Claude Code an advantage over adding custom tools
- **lmeyerov**: Added that planning is the missing piece — effective agents run on dynamic TODO lists, and plan mode is about bootstrapping how those lists get seeded
- **miki123211**: Took the minimalism further, arguing all you actually need is 50 lines and one tool — bash — since it can do everything
