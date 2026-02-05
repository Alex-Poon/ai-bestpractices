---
title: "Pattern: Harness Engineering"
tags: [pattern, harness-engineering, tooling, agents-md]
---

# Pattern: Harness Engineering

## Problem

The agent keeps making the same mistakes. You correct it in-session, it complies, and then the next session it makes the identical error because it has no memory of the previous correction. You find yourself re-explaining the same project conventions, re-specifying the same constraints, and re-fixing the same categories of errors across every interaction.

There is no institutional memory across sessions. Each session starts from zero.

## Solution

Build persistent infrastructure that constrains and guides agents across sessions. This infrastructure --- the "harness" --- takes two complementary forms: documentation files that agents read, and purpose-built tools that agents use.

The harness externalizes your accumulated knowledge about how the agent should behave in your specific codebase. Instead of relying on the agent to remember or infer constraints, you make the constraints explicit and persistent.

## Mechanism 1: Documentation Files (AGENTS.md / CLAUDE.md)

These are markdown files placed in the root of your project (or in relevant subdirectories) that the agent reads at the start of every session. They serve as a persistent memory layer.

### What to Include

**Project conventions:**
- Coding style rules that differ from common defaults
- Naming conventions specific to the project
- File organization patterns
- Import ordering and grouping rules

**Architectural constraints:**
- "Module X should never import from module Y"
- "All database access goes through the repository layer, never direct queries"
- "The API layer must not contain business logic"
- Technology-specific rules ("Use date-fns, not moment.js")

**Known mistakes and corrections:**
- "When generating tests for the auth module, always mock the token service. Do not call the real service."
- "The config object uses snake_case keys, not camelCase, even though the rest of the codebase uses camelCase."
- "Never use `any` type in TypeScript files under src/core/. Use proper generics instead."

**Testing requirements:**
- How to run tests (specific commands, environment variables)
- What constitutes a passing test in this project
- Common test setup patterns

**"Never do X" rules:**
- Hard-won corrections from past mistakes
- Framework-specific gotchas
- Deprecated patterns that the agent might still suggest

### How to Maintain It

The documentation file is a living document. The maintenance cycle is:

1. Agent makes a mistake during a session.
2. You correct the mistake.
3. Before moving on, you add an entry to the documentation file describing the mistake and the correct approach.
4. The mistake does not recur in future sessions.

Step 3 is the critical discipline. It takes thirty seconds and prevents hours of future re-correction. The most common failure mode is skipping this step because you are focused on the immediate task.

## Mechanism 2: Purpose-Built Tools

Some constraints are better enforced through tooling than documentation. Purpose-built tools are scripts and utilities designed specifically for agent consumption, not for human use.

### Examples

**Screenshot tools with structured output:**
Instead of letting the agent interpret raw screenshots, provide a tool that captures a screenshot and returns structured data (element positions, text content, visual state) that the agent can parse reliably.

**Filtered test runners:**
A wrapper around your test suite that runs only the tests relevant to the files the agent has modified, formats the output in a way the agent can parse, and highlights only the failures that need attention. This prevents the agent from being overwhelmed by unrelated test output.

**Output formatters:**
Scripts that take the output of a command (build output, linter results, API responses) and restructure it for agent consumption. Agents process structured, concise output more reliably than verbose human-oriented output.

**Pre-commit validators:**
Scripts that check agent output against project constraints before it reaches human review. Catches common agent errors (wrong import paths, incorrect naming, missing error handling) automatically.

**Context assemblers:**
Scripts that gather relevant context (related files, interface definitions, recent changes) and present it to the agent in a single, well-organized input. Reduces the chance that the agent misses important context.

### Design Principles for Agent Tools

- **Structured output over prose.** Agents parse JSON, YAML, and consistent formats more reliably than free-text descriptions.
- **Minimal output.** Include only what the agent needs. Verbose output increases the chance of distraction and drift.
- **Clear error messages.** When something fails, the error message should tell the agent exactly what went wrong and what to do about it.
- **Deterministic behavior.** The tool should produce the same output for the same input. Non-deterministic tools confuse agents.

## Why This Compounds

The compounding effect is the core reason harness engineering is the highest-leverage investment in agent-assisted development.

**Linear effort, exponential return:**
- Session 1: You document 3 mistakes. Future sessions avoid those 3 mistakes.
- Session 10: You have documented 30 mistakes. The agent's effective error rate is dramatically lower.
- Session 50: The harness is tight enough that the agent's output requires minimal correction for common tasks.

**Knowledge preservation:**
When you leave the project, the harness stays. A new developer inheriting the codebase gets the benefit of all your accumulated agent-interaction knowledge. This is institutional memory that persists across people, not just across sessions.

**Transferable patterns:**
Many harness entries are transferable across projects. "Always handle the error case first" or "Never use string concatenation for SQL queries" are universal. Over time, you develop a starter harness that you bring to new projects.

**Quality floor, not ceiling:**
The harness establishes a minimum quality level. The agent cannot drop below the constraints the harness enforces. This makes the worst-case output better, which matters more for productivity than making the best-case output better.

## Anti-Patterns

### Relying on Prompt Memory
Assuming the agent will remember corrections from earlier in the session or from previous sessions. Agents have limited context windows, and sessions are stateless. If a correction matters, externalize it.

### "The Agent Will Learn"
Hoping that repeating a correction enough times will train the agent. Current agents do not learn from in-session corrections in any persistent way. The only persistent memory is what you write down in the harness.

### Over-Documenting Too Early
Writing a massive AGENTS.md file before you have real data on what the agent gets wrong. Start small. Add entries only when you observe actual mistakes. The harness should be empirical, not speculative.

### Documentation Without Structure
Writing harness documentation in long paragraphs instead of scannable rules. Agents process structured, concise rules better than narrative text. Use bullet points, headers, and explicit "do this / not that" formatting.

### Harness Rot
Letting the documentation file accumulate outdated entries. Rules that referenced old libraries, deprecated patterns, or resolved issues add noise and can mislead the agent. Review the harness periodically (weekly is a reasonable cadence) and remove entries that no longer apply.

## Key Insight

**The harness is MORE important than the prompt.**

A well-harnessed mediocre prompt outperforms a perfect prompt with no harness. The harness constrains the space of possible outputs, reducing the chance of drift and repeated errors. A perfect prompt in a vacuum still allows the full range of agent failure modes because it has no persistent memory of what has gone wrong before.

This is counterintuitive because prompt engineering gets most of the attention in public discussion. But practitioners who have been using agents for months consistently report that their investment in harness files and custom tools delivers more value than any improvement in prompting technique.

## Sources

- **Hashimoto, Stage 5:** Identifies the transition to infrastructure-building (harness engineering) as a distinct and advanced stage of AI adoption, beyond prompting proficiency.
- **EastLondonCoder** (HN): Coined the phrase "continuously tightening the harness" to describe the iterative process of documenting mistakes and constraints.
- **fix4fun** (HN): Described building custom tools specifically for agent consumption, distinct from human-facing tooling, as a key productivity multiplier.
