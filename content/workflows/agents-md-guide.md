---
title: "AGENTS.md Guide"
description: "How to write effective AGENTS.md and CLAUDE.md files — the evidence-backed approach to AI harness configuration."
weight: 3
tags: [agents-md, harness-engineering, claude-code, best-practices]
date: 2026-02-06
---

AGENTS.md and CLAUDE.md are project-root files that AI coding agents read at the start of every session. They give agents persistent, project-specific context that would otherwise be lost between conversations. Different tools use different filenames -- Claude Code reads CLAUDE.md, Amp reads AGENTS.md, and most tools now support both -- but the purpose is identical: tell the agent how to work in this codebase.

This guide covers what to put in these files, how to maintain them, and the evaluation evidence showing why this approach works.

## Why Passive Context Wins

Vercel's engineering team ran a formal evaluation comparing two approaches to providing agents with documentation: AGENTS.md files (passive context in the system prompt) versus skills (active retrieval tools the agent invokes on demand). The results were decisive.

A compressed 8KB documentation index embedded in AGENTS.md achieved a 100% pass rate on evaluation tasks targeting Next.js 16 APIs absent from model training data. Skills-based retrieval maxed out at 79% -- and that required explicit instructions telling the agent to use the skill. Without those instructions, skills performed no better than the 53% baseline. The root cause: in over half of eval cases, the agent simply never invoked the skill. It failed to recognize when it needed documentation help.

The takeaway is structural. Passive context eliminates the decision point that trips up active retrieval. There is no sequencing issue, no need for the agent to decide whether to look something up. The documentation is present in every turn. Small wording changes in skill instructions produced dramatic behavioral shifts, revealing the fragility of the retrieval approach. Passive context sidesteps this fragility entirely.

For the full evaluation details, see [AGENTS.md Outperforms Skills](/sources/2026-01-29-agents-md-outperforms-skills/).

## What to Include

### Build and Test Commands

The most immediately useful entries. Every agent session should know how to build the project and run its tests without asking.

```markdown
## Build & Test
- Build: `make build`
- Run all tests: `make test`
- Run single test file: `pytest tests/test_specific.py -v`
- Lint: `make lint`
- Parser-only tests (fast): `make test-parser`
```

Include the fast paths. Agents have no internal sense of time-cost tradeoff -- without a fast test command, they will run the full suite on every iteration.

### Architecture Constraints

Rules about how modules relate to each other. These are things the agent cannot infer from reading individual files -- they require understanding the system design.

```markdown
## Architecture
- Module `api/` never imports from `cli/`. Data flows through `core/`.
- All database access goes through `db/repository.py`. No raw SQL elsewhere.
- Frontend components in `components/` must not import from `pages/`.
```

### Coding Conventions

Style rules that differ from common defaults. Do not duplicate what your linter already enforces -- focus on conventions the agent cannot learn from tooling alone.

```markdown
## Conventions
- Error handling: use Result types, not exceptions, in the core module.
- Naming: snake_case for functions, PascalCase for classes. No abbreviations.
- Use `clock.now()` from `utils/clock.py`, never `datetime.now()`.
```

### Known Mistakes

Hard-won corrections from real agent errors. These are the highest-value entries because they prevent specific, observed failure modes.

```markdown
## Known Mistakes
- When modifying the parser, run `make test-parser` first. Full suite takes
  10 minutes; parser subset takes 30 seconds.
- The `config.yaml` loader silently ignores unknown keys. If you add a new
  config field, also update the schema validator in `config/schema.py`.
- Do NOT use `datetime.now()` anywhere. Use `clock.now()` from `utils/clock.py`
  so tests can control time.
```

The best entries follow the pattern: "When doing X, always Y, because Z." The "because" clause helps the agent generalize rather than memorize a brittle rule.

### "Never Do This" Rules

Explicit prohibitions that prevent recurring categories of mistakes.

```markdown
## Never Do This
- Never commit directly to `main`. Always use a feature branch.
- Never disable type checking with `# type: ignore` without a comment.
- Never use `subprocess.shell=True`. Use the `run_command()` wrapper.
```

## How to Start

Do not spend an hour writing rules before your first agent session. Run the session, see what goes wrong, then document.

1. Start with just build and test commands
2. After each session, add entries for any mistakes you corrected
3. After a week, you will have a file that reflects your codebase's actual failure modes

Premature rules tend to be either too vague to help or wrong about what actually matters. Let the file grow empirically.

## Maintenance Discipline

**Add entries immediately.** When you correct an agent mistake, add the entry before moving on. This takes thirty seconds. "Later" means "never." If you find yourself typing the same correction twice across sessions, it belongs in the file.

**Remove stale entries weekly.** Rules referencing deprecated APIs, resolved bugs, or refactored modules add noise and can mislead the agent. A stale file is worse than no file at all.

**Reorganize when it gets long.** If the file exceeds roughly 200 lines, split it. Many tools support directory-level files (e.g., `src/api/CLAUDE.md` for API-specific rules). Keep each file focused and relevant to the code nearby.

**Compress aggressively.** The Vercel evaluation showed that an 8KB compressed index performed as well as full documentation content. Brevity is not a compromise -- it is a feature. Agents process concise, structured rules better than narrative text.

## Anti-Patterns

### Over-Documenting Before You Have Data

Writing extensive rules before your first session. You do not know what the agent will get wrong yet. Start sparse, add entries empirically.

### Duplicating What the Code Already Says

If your linter enforces a rule, you do not need to repeat it in AGENTS.md. Focus on things the agent cannot learn from the code or tooling alone: architectural intent, non-obvious constraints, historical context.

### Writing Rules Without Verification Commands

A rule like "always ensure tests pass" is useless without the command to run them. Every constraint should include the command or check the agent can use to verify compliance.

### Documentation Without Structure

Long paragraphs instead of scannable rules. Agents process bullet points, headers, and explicit "do this / not that" formatting more reliably than prose.

### Harness Rot

Letting the file accumulate outdated entries without periodic review. Old rules that reference removed modules or deprecated patterns actively mislead the agent. Review weekly and prune aggressively.

## Advanced: Compressed Documentation Indexes

The Vercel evaluation validated a technique worth adopting: compressing documentation into an index format that fits within the system prompt. Rather than including full documentation text, create a condensed index of API signatures, key patterns, and common gotchas.

This works because agents need to know what exists and when to use it, not the full specification. The compressed index provides enough context to guide correct usage while staying within token budgets. Vercel provides a codemod tool for Next.js projects, but the principle applies to any framework: distill your key documentation into the densest useful format and embed it in the harness file.

## Template

```markdown
# Project: [name]

Brief description of what this codebase does.

## Build & Test

[Build, test, lint commands with fast-path options]

## Architecture Constraints

[Module boundaries, data flow rules, technology choices]

## Coding Conventions

[Style rules that differ from defaults, naming, error handling]

## Known Mistakes

[Observed agent errors with corrections -- "When X, always Y, because Z"]

## Testing Requirements

[How to run tests, what constitutes passing, common fixtures]

## Never Do This

[Hard prohibitions from past mistakes]
```

Adapt the sections to your project. Start with what you know and let the file grow from real usage.

## Sources

- [AGENTS.md Outperforms Skills in Our Agent Evals](/sources/2026-01-29-agents-md-outperforms-skills/) -- Vercel's evaluation showing 100% pass rate for passive context versus 79% for active retrieval
- [Harness Engineering Pattern](/patterns/harness-engineering/) -- The conceptual foundations and compounding dynamics
- [AGENTS.md / CLAUDE.md Reference](/references/agents-md-guide/) -- The condensed template version
- [Karpathy's Claude Coding Notes](/sources/2026-01-26-karpathy-claude-coding-notes/) -- Observations on persistent configuration in practice
