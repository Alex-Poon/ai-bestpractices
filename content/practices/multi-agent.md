---
title: "Multi-Agent Patterns"
description: "Running parallel agents, agent teams, and team-based workflows — when it works and when it doesn't."
weight: 7
tags: [multi-agent, parallel, agent-teams, orchestration]
date: 2026-02-12
---

Multi-agent patterns involve running multiple AI agents simultaneously on related tasks. They represent the highest-throughput mode of AI-assisted development -- and the most complex. When they work, months of work happen in minutes. When they fail, you get merge conflicts, duplicated effort, and code that no single agent (or human) fully understands.

The practice is still emerging. There is no consensus on when multi-agent is worth the overhead versus well-scoped single-agent work. But practitioners are converging on principles that separate productive multi-agent usage from expensive chaos.

## What Multi-Agent Patterns Are

Multi-agent patterns are any workflow where two or more AI agents work concurrently on related tasks within the same project. This ranges from simple parallelism (two independent agents working on unrelated features) to complex orchestration (a lead agent delegating subtasks to specialist agents and integrating their outputs).

The key distinction from single-agent work is coordination. With one agent, coordination is trivial -- you talk to the agent, the agent acts. With multiple agents, you need mechanisms for task allocation, conflict avoidance, result integration, and quality verification.

**joshuaisaact** provided the most precise framing: agents are "stateless functions with a limited heap." Roles are scope constraints. Context window is local memory. A shared state file is global state. Swarm patterns are just function scoping dressed up as organizational charts. The value comes from giving each function a clean context, not from the organizational metaphor.

## Why Multi-Agent Matters

### Clean context windows produce better output

The primary benefit is not parallelism for its own sake but context freshness. A subagent spawned for a specific task starts with a clean context containing only the information it needs. It reasons better than a parent agent whose context is polluted with thousands of tokens of previous work.

**AffableSpatula** confirmed this: subagents with fresh context burn fewer tokens and reason better than continuing in a degraded monolithic session. **baby** always delegates self-contained tasks to subagents for this reason, maintaining a dependency graph so they do not step on each other.

### Some work is embarrassingly parallel

When you have many independent, well-scoped tasks -- writing tests for different modules, implementing similar endpoints, generating documentation for different components -- parallel execution delivers massive speedups without complex coordination.

**esperent** split test-writing into 26 subagents that completed months of drudge work in 20 minutes. The key was clear non-overlapping boundaries. Verification still took days, but the generation phase compressed dramatically.

### Role specialization improves output quality

Rather than running N identical generalist agents, deploying specialists whose work products are orthogonal by design reduces coordination overhead and improves quality in each domain.

Nicholas Carlini's 16-agent compiler project demonstrated this with role specialization: core developers, a deduplicator, a performance optimizer, a code quality critic, and a documentation maintainer. Each agent had a constrained scope that naturally avoided conflicts with other agents' work.

## How to Use Multi-Agent Patterns Effectively

### Pattern 1: Independent Parallel Tasks

The simplest and most reliable pattern. Multiple agents work on completely independent tasks with no shared state and no need for coordination.

**When it works:** You have N tasks that do not touch the same files and do not depend on each other's output. Examples: writing tests for different modules, implementing independent features, generating documentation for separate components.

**How to do it:**
1. Scope each task independently (see [task scoping](../task-scoping.html)).
2. Assign each task to a separate agent session.
3. Let agents work independently.
4. Review and merge results sequentially.

**kaydub** described this workflow: rip through new features with one agent, then have another come through to clean up, look for code smells, and review. Catch remaining problems at the PR stage.

### Pattern 2: Lead-Plus-Subagents

A lead agent maintains the overall plan and delegates specific subtasks to subagents. The lead agent integrates results and handles coordination.

**When it works:** You have a complex task that can be decomposed into independent subtasks, but the subtasks need to be sequenced or their results need to be integrated intelligently.

**How to do it:**
1. The lead agent reads the task specification and creates a decomposition.
2. The lead spawns subagents for each independent subtask.
3. Subagents work with fresh context containing only their task-relevant information.
4. The lead integrates results, resolving any conflicts.

**AffableSpatula** uses this pattern with Claude Code's delegation mode. The lead agent maintains the dependency graph, spawns subagents for self-contained tasks, and integrates their outputs. System-reminder breadcrumbs help the lead track subagent progress.

### Pattern 3: Domain-Specialized Teams

Multiple agents with different roles and expertise areas work concurrently, each responsible for a specific domain.

**When it works:** The project has clear domain boundaries (frontend, backend, infrastructure, testing) and the domains can work independently for significant stretches.

**How to do it:**
1. Define clear domain boundaries.
2. Assign one agent per domain.
3. Each agent has domain-specific context (relevant files, conventions, tools).
4. Coordination happens through shared state files or sequential integration points.

**neom** maintains separate chat sessions for devops, frontend, architecture, and security. Each writes to a shared log file that other sessions pick up through system reminder processes. **ryanjshaw** treats agents as threads with one agent managing writing state, using the actor model with mailboxes for orchestration.

### Pattern 4: Generator-Reviewer Pipeline

One agent generates code while a second agent reviews it. The review agent catches errors the generator introduced, providing an additional quality filter before human review.

**When it works:** For any task where the cost of an undetected error is high and human review bandwidth is limited.

**How to do it:**
1. Generator agent implements the task.
2. Reviewer agent examines the output with fresh context.
3. Feed review findings back to the generator (or to a human for resolution).

**dkubb** runs two Claude Code sessions in parallel: one for implementation, another for auditing. The audit session reviews code, identifies patterns, and writes custom lints. **linsomniac** uses a "codex-review" skill that reviews the last commit, using one agent to check another.

**megalomanu** configured an auto-review workflow where Claude Code creates PRs, requests reviewers, and posts auto-review comments.

### Pattern 5: Oracle-Based Decomposition

When a monolithic failure cannot be easily decomposed into independent tasks, use a reference implementation (the "oracle") to mechanically decompose the problem.

**When it works:** You have a known-good implementation to compare against and a failing implementation that fails opaquely.

**How to do it:**
1. Use the oracle to binary-search for the specific failure point.
2. Each identified failure becomes an independent, well-scoped task.
3. Assign independent tasks to separate agents.

Nicholas Carlini's compiler project demonstrated this: when a single monolithic failure appeared (compiling the Linux kernel), all 16 agents independently discovered the same bug. The solution was using GCC as an oracle to binary-search for the specific compilation unit causing the failure, converting one opaque problem into many scoped tasks.

### Pattern 6: Enterprise Autonomous Agents

At the far end of the multi-agent spectrum, Stripe's Minions system demonstrates what enterprise-scale autonomous agents look like when backed by sufficient infrastructure. Over a thousand pull requests per week are entirely produced by agents with no human-written code, though every PR undergoes human review before merging. Engineers trigger minion runs from Slack, CLI, web interfaces, or internal tools, and the system produces a reviewed PR with no interaction in between.

The architecture was purpose-built because off-the-shelf agents could not handle Stripe's constraints: hundreds of millions of lines of code, proprietary libraries unknown to any pretrained model, and the operational stakes of processing over a trillion dollars annually. Each agent gets an isolated developer environment with the full codebase pre-loaded, accesses 400+ internal tools via MCP, and operates within a layered feedback loop of linting, selective CI, and automated fixes.

Engineers frequently run multiple minion tasks in parallel, finding the system especially valuable during on-call rotations for resolving many small issues quickly. This maps to Pattern 1 (independent parallel tasks) but with enterprise-grade infrastructure handling the coordination that individual practitioners manage manually.

The pattern validates two principles: first, that autonomous agents can be production-viable at scale when the harness is strong enough (see [harness engineering](../harness-engineering.html)). Second, that human review remains the hard bottleneck even at enterprise scale -- Stripe kept humans in the review loop despite the agent handling everything else end-to-end.

## The Coordination Tax

Multi-agent patterns come with overhead that single-agent work avoids. The coordination tax must be lower than the parallelism benefit, or multi-agent is net negative.

### Merge conflicts

**nulone** identified merge cost as the killer of multi-agent approaches. When agents modify the same files, resolving conflicts is expensive and error-prone. The solution: design task boundaries around file ownership, not logical decomposition.

### Mental model desynchronization

The "beyond agentic coding" critique highlights a coordination cost specific to autonomous agents: developers lose track of what their codebase actually contains. With a single agent, this is manageable -- you review one stream of changes. With multiple agents operating concurrently, desynchronization compounds. As **matheus-rr** observed, with agent-generated code "you get a diff with no context for why it went that direction." Multiply that across several agents and the review burden grows non-linearly.

**rubenflamshep** described frequent disorientation when managing multiple Claude sessions, finding it easier to work across two different projects than two features in one project. This suggests that the cognitive overhead of multi-agent is not just about code conflicts but about maintaining a mental model across concurrent streams of autonomous change.

### The review bottleneck

**czhu12** noted that when Claude generates copious code across many agents, it becomes much harder to review than small snippets one at a time. **zmmmmm** formalized this: "We can only produce code as fast as responsibility-takers can execute due diligence." Human review capacity is the hard ceiling on multi-agent throughput.

### Orchestration overhead

**storystarling** warned that orchestration overhead in frameworks like LangGraph often costs more tokens than the clean-context savings provide. Simple orchestration (a lead agent with subagents) outperforms complex frameworks for most use cases.

**MrOrelliOReilly** observed that most orchestration concepts are just workarounds for bad model behavior -- the model provider is best positioned to fix this natively.

### Diminishing returns at scale

**joshuaisaact** cited research showing multi-agent benefits diminish as LLM capabilities improve. As models get better at handling larger contexts and more complex tasks, simpler single-agent abstractions may outperform complex multi-agent setups. Today's multi-agent solution may be tomorrow's over-engineering.

## When NOT to Use Multi-Agent

**asimeqi** asked the pointed question: "Can barely keep up with one instance of Claude Code -- what are people programming that needs 10 agents?"

Multi-agent is not appropriate when:

- **Tasks have high interdependence.** If agents need to coordinate on every change, the overhead exceeds the benefit.
- **The codebase is small.** For projects that fit comfortably in a single context window, fresh subagents provide no advantage.
- **You cannot verify the output.** More code generated faster is worse than useless if you cannot review it. **serial_dev** noted that in professional settings with coding standards and real users, one agent at a time is plenty.
- **The orchestration is more complex than the task.** If setting up the multi-agent workflow takes longer than doing the work with one agent, you are over-engineering.
- **You lack clear task boundaries.** Without clear non-overlapping boundaries, agents will step on each other. **nulone** found that merge costs kill the approach without file ownership boundaries.

## Anti-Patterns

### Swarm Everything

Spawning many agents for every task regardless of whether the task benefits from parallelism. More agents do not mean better results. They mean more coordination overhead, more merge conflicts, and more code to review.

**Fix:** Start with one well-scoped agent. Only parallelize when you have clearly independent subtasks that would benefit from fresh context.

### No File Ownership

Letting multiple agents modify the same files concurrently. This guarantees merge conflicts and inconsistent code.

**Fix:** Design task boundaries around file ownership. Each agent owns specific files or directories. If a task requires cross-cutting changes, assign it to a single agent or sequence the work.

### Trusting Agent Self-Coordination

Assuming agents will coordinate with each other without explicit mechanisms. They will not. Each agent operates in its own context with no awareness of other agents' work.

**Fix:** Use explicit coordination mechanisms: shared state files, dependency graphs, file ownership rules, or a lead agent that manages task allocation.

### Generating Without Reviewing

Using multi-agent to generate code faster without proportionally increasing review capacity. More code faster is only valuable if it is correct code faster.

**Fix:** Pair generation agents with review agents. Budget review time proportional to generation throughput. **squirrellous** suggested demanding near-100% test coverage as the agent's proof of correctness to reduce human review burden.

### Over-Orchestration

Building complex orchestration frameworks when simple patterns would suffice. **nonethewiser** tried a project management framework that felt organized but ultimately the agent does whatever it does. Went back to raw prompting with plan mode as the only guardrail.

**comboy** identified a meta-failure: once you find a pattern that works (like planning or TODO management), it gets internalized into the model's behavior, and your external abstraction on top becomes defective because agents get confused about planning the planning.

**Fix:** Use the simplest coordination mechanism that works. Often that is a lead agent with a TODO file and fresh subagents for self-contained tasks.

## The Verification Challenge

Multi-agent output requires more verification effort, not less. Each agent produces code that is coherent within its own context but may conflict with other agents' output. Integration testing, consistency checks, and human review must scale with the number of agents.

**esperent** is honest about this: 26 subagents completed months of test-writing in 20 minutes, but verification took days. This is the characteristic ratio: fast generation, slow verification.

**chasing** put it directly: "It is not just my job to generate code but to know and vouch for it." Multi-agent makes generation cheap but does not change the cost of taking responsibility for the output.

## Evidence

**esperent** (HN, thread 46749612): Split test-writing into 26 subagents. Months of drudge work done in 20 minutes. Verification took days. Clear non-overlapping boundaries were the key.

**joshuaisaact** (HN, thread 46752037): Agents are stateless functions with a limited heap. Swarm patterns are function scoping dressed up as org charts. Research shows multi-agent benefits diminish as models improve.

**AffableSpatula** (HN, thread 46744478): Subagents with fresh context burn fewer tokens and reason better than a monolithic context.

**nulone** (HN, thread 46744901): Merge cost kills multi-agent approaches. File ownership boundaries and test-before-merge are essential.

**serial_dev** (HN, thread 46746274): In professional settings with coding standards and real users, one agent at a time is plenty. Output quality is never good enough to run unchecked.

**zmmmmm** (HN, thread 46748947): We can only produce code as fast as responsibility-takers can execute due diligence. Review caps output at human review rates.

**asimeqi** (HN, thread 46761700): Can barely keep up with one instance of Claude Code. Asks what people are programming that needs 10 agents.

**baby** (HN, thread 46752104): Always delegates self-contained tasks to subagents. Coordination via dependency graph. Better results because of clean context windows.

**Stripe Minions** (Stripe blog, 2026-02-10): Over 1,000 PRs per week from autonomous agents, zero human-written code, full human review. 400+ MCP tools, isolated devboxes, layered CI feedback. Enterprise-scale autonomous multi-agent validated by trillion-dollar operational stakes.

**matheus-rr** (HN, thread 46930565): Agent-generated diffs lack context for why they went in a particular direction, making review harder. A coordination cost that scales with number of agents.

**rubenflamshep** (HN, thread 46930565): Describes disorientation when managing multiple Claude sessions. Easier to work across two different projects than two features in one project.
