---
title: "Start Here: AI-Assisted Development"
description: "The essential introduction to working effectively with AI coding agents."
date: 2026-02-05
tags: [getting-started, agent-workflows, core-concepts]
weight: 1
---

This site is a practitioner reference for developers who use AI coding agents in their daily work. It is built from real-world experience, community discussion, and empirical evidence --- not marketing claims. If you use tools like Claude Code, Cursor, Copilot, or Amp to write and modify code, the patterns and frameworks here will help you get better results and waste less time.

## The Core Loop

Effective AI-assisted development follows a four-phase loop. Every technique on this site maps back to one of these phases.

**Plan** --- Decide what to delegate and how to scope it. Most failed agent interactions trace back to poor planning: tasks that are too broad, too vague, or missing context. Planning is the phase where you make architectural decisions, define interfaces, and determine success criteria. The agent never does this work for you.

**Delegate** --- Hand the task to an agent with clear instructions, bounded scope, and a way to verify the result. A well-delegated task reads like a spec a competent developer could complete without asking follow-up questions.

**Verify** --- Review the agent's output against your success criteria. Verification must be fast. If reviewing the output takes longer than doing the work yourself would have, the task was scoped wrong. Tests, compiler output, and visual inspection are your primary verification tools.

**Harness** --- When something goes wrong (and it will), capture the correction in a persistent form: a documentation file the agent reads next session, a purpose-built tool, a test that encodes the constraint. This is the phase that compounds. Every correction you externalize prevents the same mistake from recurring across all future sessions.

The loop is continuous. Each pass through it builds your calibration about what agents handle well and what they do not. The first few cycles are slow and sometimes frustrating. That is normal. The payoff comes from the harness phase, where each investment reduces future friction.

## Prerequisites

You need three things to get value from the practices described here.

**An agent tool.** Not a chatbot --- an agent that can read your files, run commands, and iterate on its own output. The distinction matters. A chatbot requires you to manually shuttle context back and forth. An agent operates in an autonomous loop: read code, make changes, run tests, observe results, adjust. Claude Code, Cursor, Copilot Workspace, and Amp all qualify. A plain ChatGPT or Gemini conversation does not.

**An existing codebase.** Agent-assisted development is most valuable in brownfield projects where context is deep and boilerplate is plentiful. If you are starting from scratch with a blank file, the dynamics are different. Most of the patterns here assume you have an existing project with established conventions, tests, and structure.

**Willingness to practice deliberately.** The single biggest predictor of success is whether you invest time in calibration. That means doing tasks twice (once manually, once with an agent), paying attention to what works and what does not, and building your harness incrementally. There is no shortcut past this phase.

## The Mindset Shift

The core shift is from **writing code** to **reading and verifying code.** Your job changes from implementation to specification and review. You spend more time defining what you want, reviewing what you get, and encoding constraints --- and less time typing out implementations line by line.

This is uncomfortable at first. Writing code is satisfying in a way that reviewing code is not. But the leverage is real: a well-scoped task delegated to an agent can produce in minutes what would take you an hour, and your job is to confirm it is correct rather than produce it from scratch.

The developers who get the most from AI agents are the ones who were already good at code review, task decomposition, and specification writing. If those skills feel underdeveloped, agent-assisted development is an excellent forcing function to build them.

## Key Concepts

Three ideas form the backbone of everything else on this site.

### Task Scoping

The most important skill in agent-assisted development is knowing how to size a task. Too broad and the agent produces confidently wrong output you have to discard. Too narrow and the overhead of delegating exceeds the time you would spend doing the work yourself. The sweet spot is a task that is small enough to verify in two minutes but large enough to be worth delegating.

The [Task Scoping pattern](/patterns/task-scoping.html) is the most detailed resource on this skill, including the tree metaphor (you own the trunk and branches, the agent owns the leaves) and specific anti-patterns to avoid.

### Harness Engineering

Agents do not learn across sessions. Every new session starts from zero. The only way to build persistent memory is to externalize it: documentation files (AGENTS.md, CLAUDE.md) that capture project conventions and known mistakes, and purpose-built tools designed for agent consumption rather than human use.

The [Harness Engineering pattern](/patterns/harness-engineering.html) covers both mechanisms in detail, including what to document, how to maintain it, and why the harness matters more than the prompt.

### The Adoption Curve

Most developers follow a predictable progression when adopting AI agents, from chatbot usage through calibration to continuous delegation. Understanding where you are in this progression helps you know what to practice next and what common pitfalls to expect at each stage.

The [Six Stages of AI Adoption](/guides/adoption-stages.html) provides the full framework.

## What to Read Next

Start with whichever resource matches where you are right now.

- **[The Six Stages of AI Adoption](/guides/adoption-stages.html)** --- The progression framework. Understand the full arc from chatbot to continuous agent usage, and identify which stage you are at.
- **[Task Scoping](/patterns/task-scoping.html)** --- The most important single skill. If you read only one pattern on this site, make it this one.
- **[Daily Workflow Checklist](/references/daily-workflow-checklist.html)** --- Concrete habits for each day. Useful if you want to start practicing immediately.
- **[What Practitioners Actually Think](/deep-dives/practitioner-consensus.html)** --- Community evidence from developers who are using these tools daily. Grounds everything in real experience rather than theory.
