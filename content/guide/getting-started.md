---
title: "Getting Started"
description: "Your first week with AI coding tools — practical steps to get productive fast."
weight: 2
tags: [getting-started, beginner, setup]
date: 2026-02-06
---

You have read about the [core loop](core-loop.html). Now it is time to put it into practice. This page covers the concrete steps for your first week with AI coding tools -- which tool to pick, what to try first, which mistakes to avoid, and what "working" actually looks like.

The goal is not mastery. The goal is calibration: developing an accurate sense of what AI agents handle well and where they fall apart. That calibration is the foundation everything else builds on, and there is no shortcut to it except doing real work.

## Pick Your Tool

The tool landscape changes fast, but the categories are stable. You need to make one decision: **CLI agent or IDE agent?**

### CLI agents

Tools like Claude Code run in your terminal. You describe a task, the agent reads your files, runs commands, writes code, and iterates in a loop. The interaction feels like directing a collaborator over text.

The advantages are flexibility and independence from any particular editor. **BeetleB** pointed out that CLI tools do not tie you to a specific IDE, which matters if you work across environments. **blitz_skull** was more direct: despite the theoretical advantages of IDE integration, no IDE agent matched the Claude Code CLI experience in practice.

The disadvantage is that you lose built-in visual tools -- inline diffs, syntax highlighting in context, and direct integration with editor features like rename-across-files.

### IDE agents

Tools like Cursor, Copilot, and the Claude Code VS Code extension embed AI assistance directly into your editor. You get inline suggestions, visual diff review, and tight integration with language servers and refactoring tools.

**anthonypasq** argued that CLI agents end up reinventing what IDEs already provide for free -- diffs, LSP integration, refactoring support. That is a fair point. If you live in your editor and want the tightest possible integration, an IDE agent reduces friction.

### Which one to start with

If you are already comfortable in a terminal and prefer text-based workflows, start with Claude Code or a similar CLI agent. If you want the lowest friction path and work primarily in VS Code, start with Cursor or the Claude Code extension.

The specific tool matters less than you think. **esperent** observed that the latest models from all major providers are competitive and approaching commodity status -- the differentiator is how the tool manages context and workflow, not the underlying model. You can switch later. What matters now is picking one and using it consistently for a week.

Do not start with inline autocomplete tools like basic Copilot. The flashing suggestions create a distracting, reactive workflow. **amluto** found it the most skill-atrophy-inducing tool available and turned off autocomplete entirely to preserve agency. Start with an agent that works in a request-response pattern, where you direct the work rather than reacting to suggestions.

## Your First Day

### Set up a test project

Do not start with your most important production codebase. Use a side project, a personal tool, or a fresh repository. You need room to experiment without consequences.

If you do not have a suitable project, create one. **TeMPOraL** described the kind of task that works perfectly for a first session: building a small utility -- something you would otherwise search for online. A static page generator, a data format converter, a simple CLI tool. These are bounded, verifiable, and low-stakes.

### Run the loop once, deliberately

Pick a small, concrete task. Not "build the backend" but something like "write a function that parses this CSV format and returns a list of records." Something you could write yourself in 15-30 minutes.

Then run each phase of the [core loop](core-loop.html) deliberately:

1. **Plan.** Write down the task boundary, the input, the expected output, and how you will verify the result. Two sentences is enough.

2. **Execute.** Give the task to the agent with sufficient context. Include the relevant file, any constraints, and the verification method. If the agent can run tests, tell it which tests to run.

3. **Verify.** Check the output. Run the tests. Read the diff. Does it do what you specified?

4. **Harness.** If the agent got something wrong, note it. If you had to correct a convention or pattern, note that too. You do not need a formal file yet -- just keep a mental or written log of what worked and what did not.

The first pass will feel slow. That is normal. You are building the calibration that makes every subsequent pass faster.

### Do not evaluate yet

Resist the urge to judge the tool after one task. Your prompting is not good yet, your task scoping is not calibrated, and you do not have harness infrastructure in place. Judging the tool now is like evaluating a programming language after writing Hello World.

## Days Two and Three: Reproduce Your Own Work

This is the most important practice in the entire getting-started process. The exercise is simple: complete a task yourself, then attempt the same task through the agent. Compare the results.

Do this across several different kinds of tasks in your codebase:

- A bug fix where you know the root cause
- A small feature addition with clear requirements
- A refactoring task like renaming a concept across files
- Writing tests for existing untested code

The goal is not to prove the agent can replace you. The goal is to build a mental model of where the agent excels and where it struggles. You will discover patterns quickly: the agent is probably strong at boilerplate, test generation, and straightforward implementations, and weaker at tasks requiring deep domain context or novel architecture.

**comrade1234** described the experience of a developer with existing expertise: tasks that would take a couple of hours manually took less than ten minutes with AI -- but only because the developer already knew exactly what needed to happen and could direct the agent precisely. Without that existing knowledge, the same tasks would have produced what **drooby** called "working monsters."

This reproduction phase reveals the gap between what the tool can do and what you can get it to do. That gap closes with practice, but only if you have honest data about where it exists.

## Day Four: Create Your First Harness

By now you have a short list of things the agent got wrong, conventions it missed, or patterns it did not follow. Turn those observations into your first AGENTS.md or CLAUDE.md file.

Create the file in your project root and add three entries:

1. **One coding convention.** A rule about how code should be written in this project -- naming patterns, file organization, import style, whatever the agent got wrong or inconsistent.

2. **One corrected mistake.** A specific error the agent made and the correct approach. Example: "When writing tests for the API layer, always use the test client fixture, not direct function calls."

3. **One hard constraint.** Something the agent must never do. Example: "Never modify the migration files directly. Always create new migrations."

Keep it concise. **guluarte** found that agents tend to follow only the first few lines of long instruction files as context grows. Front-load the most important rules and keep each entry brief.

This file is the seed of your harness. It will grow over the coming weeks as you observe more failure modes. Each entry represents a mistake that will not happen again.

## Day Five: Push the Boundaries

Now that you have basic calibration and a starter harness, try a task that is slightly outside your comfort zone. Not a task you could do in your sleep, but one that stretches your delegation skills:

- A multi-file change that requires coordinated edits
- A task where you write the tests first and let the agent write the implementation
- A task in a part of the codebase you are less familiar with

Pay attention to where the agent needs more context, where your task description was ambiguous, and where the harness file helped or could have helped. Update the harness with what you learn.

This is also a good day to try the test-first pattern. Write a failing test that specifies the behavior you want, then ask the agent to make it pass. **teiferer** proposed this as the natural workflow: human-written tests as specifications, AI-generated implementation. It works well because the tests give the agent a concrete, verifiable goal -- and as **wongarsu** observed, verifiable goals produce the agent's best work.

## Common First-Week Mistakes

### Delegating too broadly

The single most common mistake. "Build the authentication system" is not a task -- it is a project. Break it into pieces small enough to verify in a few minutes each. If you cannot describe the expected output in a sentence, the task is too broad.

### Evaluating the tool after one bad result

AI agents are probabilistic. A single failure tells you almost nothing. What matters is the pattern across many tasks. **eli** noted a well-documented phenomenon: initial amazement gives way to frustration as you calibrate to the tool's real capabilities. This is normal. Push through it.

### Accepting output without reading the diff

Speed feels good. Accepting a plausible-looking output without checking it is how subtle bugs enter your codebase. **InfinityByTen** described the overwhelm: after a few seconds of "thinking," you get hundreds of lines to review from an entity that never pushes back. The antidote is Phase 1 discipline -- scope tasks so the diffs are small enough to review in seconds.

### Fighting the model's preferences

The agent will have default patterns that differ from yours. **nonethewiser** described fighting Claude's preference for ReactRouter over TanStack Router before realizing the agent's default worked correctly. Pick your battles. Fight for constraints that matter -- architecture, security, correctness -- and let go of stylistic preferences that have no practical impact.

### Skipping the harness

Every correction you make manually but do not encode in your harness file is a correction you will make again. And again. The compounding benefit of the harness is the single highest-leverage investment in AI-assisted development, and it is the investment most beginners skip. Start on day four, not day forty.

### Long sessions without fresh context

Agent quality degrades as sessions get long and context fills up. **conception** observed that after context compaction, sessions become unreliable. Start fresh sessions for new tasks. A new session with a good harness file is almost always better than a long session with accumulated context debt.

## What Success Looks Like After One Week

You will not be a power user after five days. But you should have:

- **Calibration.** An honest sense of which tasks the agent handles well (boilerplate, tests, straightforward implementations) and which it struggles with (novel architecture, deep domain reasoning, large cross-cutting changes).

- **A starter harness.** An AGENTS.md or CLAUDE.md file with at least a handful of entries based on real observed errors.

- **Loop fluency.** The ability to run the plan-execute-verify-harness cycle without thinking about the steps. The phases should feel natural, not mechanical.

- **Realistic expectations.** Neither "this will replace all coding" nor "this is useless." The tool has a specific capability profile, and you are beginning to map it.

**mlrtime**, a developer with over 25 years of experience, described the feeling of finding the right working relationship with AI tools as reaching "god mode" where the work becomes fun again. That feeling is real, but it comes after the calibration period, not before.

Similarly, **freediver** observed that working with AI effectively meant using their brain more, not less. The joy comes from operating at a higher level of abstraction -- focusing on design, architecture, and problem decomposition while the agent handles implementation. But that higher level only works if you have built the calibration and harness to support it.

## What Comes Next

You now have the foundation. The [core loop](core-loop.html) gives you the workflow. This page gave you the first week. The next two pages address what happens after that:

- [The Adoption Curve](adoption-curve.html) maps the progression from beginner through the inevitable frustration valley to proficiency.
- [When It Fails](when-it-fails.html) gives you an honest account of the failure modes you will encounter, so you can recognize them early and respond well.

The most important thing you can do right now is keep going. The first week is about building foundation. The second week is where the investment starts paying off.
