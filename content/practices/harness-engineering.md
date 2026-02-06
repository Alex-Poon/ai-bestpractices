---
title: "Harness Engineering"
description: "Building the infrastructure around your AI agent — AGENTS.md files, custom tools, and test harnesses that compound over time."
weight: 2
tags: [harness-engineering, agents-md, tooling, infrastructure]
date: 2026-02-06
---

Harness engineering is the practice of building persistent infrastructure that constrains and guides AI agents across sessions. It is the highest-leverage investment in AI-assisted development because it compounds: every mistake you document is a mistake that never recurs, every custom tool you build saves time in every future session, and every test harness you configure raises the floor on output quality.

The harness is the answer to the fundamental limitation of current AI agents: they are stateless. Each session starts fresh with no memory of corrections, preferences, or past failures. The harness is the only mechanism that carries knowledge forward.

## What Harness Engineering Is

The harness is everything around the model that shapes its behavior for your specific project: configuration files the agent reads at session start, custom tools optimized for agent consumption, test infrastructure designed for agent cognition, linter rules that catch common agent mistakes, and workflow scripts that enforce your development process.

As **tptacek** observed, "there's no such thing as a frontier agent" -- while frontier models require massive resources, any developer can build a competitive agent harness. The moat is in engineering, not model access. **jackfranklyn** drew the distinction more precisely: the core agent loop (model plus tools plus system prompt) can be built in 200 lines, but "the production version captures the paperwork" -- TODO injection, context cleanup, subagent management, and error recovery are boring but load-bearing features.

**NitpickLawyer** identified Anthropic's specific advantage: co-development of model and harness, using telemetry from the client to improve model behavior. But the local harness -- your AGENTS.md, your tools, your test scripts -- is where individual practitioners gain their edge.

## Why the Harness Matters More Than the Prompt

A well-harnessed mediocre prompt outperforms a perfect prompt with no harness. This is counterintuitive because prompt engineering gets most of the attention. But practitioners who have been using agents for months consistently report that their investment in configuration files and custom tools delivers more value than any improvement in prompting technique.

The reason is straightforward: prompts are ephemeral, but the harness is persistent. The agent cannot remember that you corrected it yesterday. The harness can.

**vinhnx** distilled agent quality down to two factors after building a custom coding agent: context management strategy and model capability. The harness is your context management strategy made concrete and durable.

## How to Build an Effective Harness

### Mechanism 1: Documentation Files (AGENTS.md / CLAUDE.md)

These are markdown files placed at your project root (or in relevant subdirectories) that the agent reads at the start of every session. They serve as persistent memory.

**What to include:**

**Project conventions.** Coding style rules that differ from defaults, naming conventions, file organization patterns, import ordering. Anything the agent would get wrong by following general best practices rather than your specific practices.

**Architectural constraints.** "Module X should never import from module Y." "All database access goes through the repository layer." "Use date-fns, not moment.js." These prevent the agent from making plausible but wrong design choices.

**Known mistakes and corrections.** "When generating tests for the auth module, always mock the token service." "The config object uses snake_case keys even though the rest of the codebase uses camelCase." These entries come directly from real mistakes observed during sessions and represent the highest-value content in the harness.

**Testing requirements.** How to run tests, what commands and environment variables are needed, what constitutes a passing test, common setup patterns.

**"Never do X" rules.** Hard-won corrections from past failures. Framework-specific gotchas. Deprecated patterns the agent might still suggest.

### The Maintenance Discipline

The harness is a living document. The cycle is:

1. Agent makes a mistake during a session.
2. You correct the mistake.
3. You add an entry to the documentation file.
4. The mistake does not recur in future sessions.

Step 3 takes thirty seconds and prevents hours of future re-correction. The most common failure mode is skipping this step because you are focused on the immediate task. **EastLondonCoder** coined this "continuously tightening the harness" -- the iterative discipline that compounds over time.

### AGENTS.md vs Skills: The Reliability Tradeoff

Vercel's evaluation provides the strongest quantitative evidence on how to structure agent instructions. They tested documentation strategies against Next.js 16 APIs absent from model training data. An 8KB compressed documentation index embedded in AGENTS.md achieved a 100% pass rate, while dynamically invoked skills maxed out at 79%. As **velcrovan** summarized, "the new approach works 100% of the time as opposed to 79%."

The root cause: in 56% of skill-invocation failures, the agent simply failed to invoke the retrieval tool when it needed help. Passive context eliminates that decision point entirely.

But this approach has scaling limits. **CjHuber** warned that you cannot cram many elaborate procedures into AGENTS.md. **remify** added that as projects grow, the documentation exceeds what context can hold. **guluarte** reported that in practice, agents follow the first two or three lines of AGENTS.md and selectively ignore instructions deeper in the file.

The practical resolution:

- **Put critical rules in AGENTS.md.** Architectural constraints, testing commands, "never do X" rules -- anything the agent must follow on every task.
- **Use skills for specialized workflows.** Complex procedures that only apply to specific tasks can be invoked on demand.
- **Use explicit activation phrases.** **joebates** found that skills fail 5-10% of the time when relying on agent intuition. Using rigid phrases like "enter planning mode" or "enter execution mode" reduces the failure rate to near-zero.
- **Add reminders at boundaries.** **embedding-shape** found that explicitly ending prompts with "Remember to follow AGENTS.md" and adding a reference in the first 16 lines of README.md significantly improves instruction adherence.
- **Frame docs as policy, not reference.** As **thom** articulated, the key is framing documentation as policy the agent must follow, not as reference material it can optionally consult. Models are responsive to authority framing.

### Compression Works

Vercel's evaluation showed that aggressively compressed documentation performed as well as full content. You do not need verbose explanations in your AGENTS.md. Concise, structured rules are what agents parse best. Use bullet points, headers, and explicit "do this / not that" formatting rather than narrative paragraphs.

**energy123** maintains a 15k-token markdown file with the full project world model -- use cases, principles, requirements, and guardrails. This investment of effort pays off because repeated inferences cause the codebase to converge toward the desired state rather than drifting into inconsistency. But it is only worth the effort for long-lived, important projects.

### Mechanism 2: Purpose-Built Tools

Some constraints are better enforced through tooling than documentation. Purpose-built tools are scripts and utilities designed specifically for agent consumption, not for human use.

**Filtered test runners.** A wrapper that runs only tests relevant to modified files and formats output for agent parsing. Prevents the agent from being overwhelmed by unrelated test output.

**LSP-backed refactoring via MCP.** **shimman** pointed out that LLM agents "grep entire codebases to find symbols" instead of using semantic code navigation, wasting tokens on what LSP could do instantly. Wrapping deterministic refactoring tools (like rope for Python or LSP servers) in MCP servers and instructing agents to use them saves tokens and eliminates reference-missing errors during renames and extracts.

**Output formatters.** Scripts that restructure build output, linter results, or API responses into concise structured formats. Agents process JSON and consistent formats more reliably than verbose human-oriented text.

**Pre-commit validators.** Scripts that check agent output against project constraints before it reaches human review. **theshrike79** advocated using impersonal tooling (linters, formatters, editorconfig) to constrain AI output: "If the CI computer says no, the agent fixes it without complaint."

**Context assemblers.** Scripts that gather relevant context (related files, interface definitions, recent changes) and present it in a single well-organized input.

### Design Principles for Agent Tools

- **Structured output over prose.** Agents parse JSON, YAML, and consistent formats more reliably than free text.
- **Minimal output.** Include only what the agent needs. Verbose output increases distraction and context drift.
- **Clear error messages.** When something fails, tell the agent exactly what went wrong and what to do about it.
- **Deterministic behavior.** Same input, same output. Non-deterministic tools confuse agents.

### Mechanism 3: Anthropomorphic Test Design

Nicholas Carlini's parallel compiler project introduced the concept of designing test infrastructure for the agent's cognition, not for human developers:

- **Limited output verbosity** to prevent context window pollution.
- **Pre-computed aggregate statistics** presented to the agent rather than requiring calculation.
- **ERROR-prefixed single-line formatting** optimized for mechanical parsing.
- **A `--fast` flag** running only 1-10% of tests via random sampling, because agents have no internal sense of time-cost tradeoff and will otherwise spend hours running full suites.

This last point is broadly applicable: agents do not manage their own time. The harness must impose time budgets.

### Mechanism 4: The Dual-Session Pattern

**dkubb** described an advanced technique: run two Claude Code sessions in parallel -- one for feature implementation, another for code auditing and skill maintenance. The audit session reviews code, adds examples of desired vs. undesired patterns to skills and references, and writes custom lints using ast-grep. When the model makes a recurring mistake, the audit session adds it as a skill reference.

This pattern turns harness maintenance from an afterthought into a concurrent workflow. The audit session produces artifacts (lint rules, skill entries, pattern examples) that improve every subsequent implementation session.

## Anti-Patterns

### Relying on Prompt Memory

Assuming the agent will remember corrections from earlier in the session or from previous sessions. Agents have limited context windows, and sessions are stateless. If a correction matters, externalize it in the harness.

### "The Agent Will Learn"

Hoping that repeating a correction enough times will train the agent. Current agents do not learn from in-session corrections in any persistent way. The only persistent memory is what you write down.

### Over-Documenting Too Early

Writing a massive AGENTS.md before you have real data on what the agent gets wrong. Start small. Add entries only when you observe actual mistakes. The harness should be empirical, not speculative.

### Harness Rot

Letting documentation accumulate outdated entries. Rules referencing old libraries or resolved issues add noise and can mislead the agent. Review the harness periodically and remove entries that no longer apply.

### Narrative Over Structure

Writing AGENTS.md in prose paragraphs instead of structured rules. Agents parse bullet points and explicit do/don't formatting more reliably than narrative text. Save the explanations for humans; give the agent actionable instructions.

### Ignoring the Scaling Problem

Putting everything in AGENTS.md and wondering why the agent ignores half of it. As context grows, agents follow rules selectively. Prioritize your most critical rules at the top of the file and use separate mechanism (skills, MCP tools, linters) for less critical or specialized instructions.

## Why This Compounds

**Linear effort, exponential return.** Session 1: you document 3 mistakes. Session 10: 30 documented mistakes. Session 50: the agent's effective error rate is dramatically lower for common tasks.

**Knowledge preservation.** When you leave the project, the harness stays. A new developer inheriting the codebase gets the benefit of your accumulated agent-interaction knowledge. This is institutional memory that persists across people, not just across sessions.

**Quality floor, not ceiling.** The harness establishes a minimum quality level. It makes the worst-case output better, which matters more for productivity than making the best-case output better.

**Tool synergy.** Custom tools, documentation, and test infrastructure reinforce each other. A linter rule catches what the documentation missed. A test harness validates what the linter cannot check. The combination is stronger than any individual component.

## Evidence

**tptacek** (HN, thread 46546731): "There's no such thing as a frontier agent." The moat is in engineering, not model access. Anyone could build a competitive agent; the differentiator is the surrounding infrastructure.

**jackfranklyn** (HN, thread 46546220): "The production version captures the paperwork around the loop." TODO injection, subagents, and context management are boring but load-bearing.

**velcrovan** (HN, thread 46817482): AGENTS.md approach works 100% of the time vs 79% for skills. Reliability of passive context over active retrieval is significant for production workflows.

**energy123** (HN, thread 46550710): Maintains a 15k-token markdown file that goes into every prompt. Over repeated inferences, the codebase converges toward the desired state.

**deanc** (HN, thread 46523634): "The real magic lies in how the tools are managing and injecting context." Switching from Copilot to Cursor was night and day -- same model, different harness, dramatically different results.

**dkubb** (HN, thread 46797924): Runs a second session that audits code and maintains skills/references. Custom lints via ast-grep catch recurring mistakes automatically.

**theptip** (HN, thread 46542782): "They are not getting worse... you haven't figured out the scaffolding." Understanding the contours of AI capability and buttressing weak spots is the real skill.

**shimman** (HN, thread 46360269): LLM agents ignore 50 years of progress on code navigation by defaulting to grep. LSP integration would save tens of thousands of tokens.
