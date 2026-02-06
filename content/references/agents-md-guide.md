---
title: "The AGENTS.md / CLAUDE.md Guide"
description: "A practical template and maintenance guide for the files that give AI agents persistent memory."
date: 2026-02-05
tags: [harness-engineering, agents-md, practical-guide]
sources:
  - https://mitchellh.com/writing/my-ai-adoption-journey
  - https://www.anthropic.com/engineering/building-c-compiler
weight: 3
---

## What These Files Are

AGENTS.md and CLAUDE.md are project-root files that AI coding agents read at the start of every session. They give agents persistent, project-specific context that would otherwise be lost between conversations. Different tools use different filenames -- Claude Code reads CLAUDE.md, Amp reads AGENTS.md, and most tools now support both -- but the purpose is identical: tell the agent how to work in this codebase.

## Why They Matter: The Compounding Effect

Every time you correct an agent's mistake, you face a choice: fix it once and move on, or document the correction so it never happens again. The AGENTS.md file is where those corrections accumulate.

Mitchell Hashimoto describes this as the core of "harness engineering" -- building infrastructure that makes agents more effective over time. Nicholas Carlini's parallel compiler project took this further: agents maintained their own documentation files, updating progress notes and recording failed approaches so that fresh agent sessions could pick up where previous ones left off.

The compounding math is straightforward. Session one: the agent makes ten types of mistakes. You document three. Session two: seven types of mistakes. You document two more. By session ten, the agent avoids most known pitfalls and you are only dealing with genuinely novel problems. The file gets more valuable with every entry.

## Practical Template

```markdown
# Project: [name]

Brief description of what this codebase does and its primary language/framework.

## Build & Test

```bash
# Build
make build

# Run all tests
make test

# Run a single test file
pytest tests/test_specific.py -v

# Lint
make lint
```

## Architecture Constraints

- Module `api/` never imports from `cli/`. Data flows through `core/`.
- All database access goes through `db/repository.py`. No raw SQL elsewhere.
- Frontend components in `components/` must not import from `pages/`.

## Coding Conventions

- Error handling: use Result types, not exceptions, in the core module.
- Naming: snake_case for functions, PascalCase for classes. No abbreviations.
- Imports: standard library first, third-party second, local third. Sorted.

## Known Mistakes

- When modifying the parser, always run `make test-parser` first. The full
  test suite takes 10 minutes; the parser subset takes 30 seconds.
- The `config.yaml` loader silently ignores unknown keys. If you add a new
  config field, you must also update the schema validator in `config/schema.py`.
- Do NOT use `datetime.now()` anywhere. Use `clock.now()` from `utils/clock.py`
  so tests can control time.

## Testing Requirements

- Every new public function needs a test. No exceptions.
- Integration tests that hit the database must use the `db_session` fixture.
- Snapshot tests: run `pytest --snapshot-update` only when you intentionally
  change output format.

## Never Do This

- Never commit directly to `main`. Always use a feature branch.
- Never disable type checking with `# type: ignore` without a comment explaining why.
- Never use `subprocess.shell=True`. Use the `run_command()` wrapper instead.
```

Adapt the sections to your project. Start sparse and add entries as you encounter real issues -- do not try to document everything upfront.

## Maintenance Discipline

**When to add entries.** Immediately after correcting an agent mistake. If you find yourself typing the same correction twice, it belongs in the file. The best entries follow the pattern: "When doing X, always Y, because Z." The "because" clause helps the agent generalize rather than memorize.

**When to remove entries.** Review the file weekly. Remove rules that are no longer relevant -- deprecated APIs, fixed bugs, refactored modules. A stale file teaches the agent outdated habits, which is worse than no file at all.

**When to reorganize.** If the file exceeds roughly 200 lines, split it. Some tools support directory-level files (e.g., `src/api/CLAUDE.md` for API-specific rules). Use this to keep each file focused and relevant to the code nearby.

## Anti-Patterns

**Over-documenting before you have data.** Do not spend an hour writing rules before your first agent session. Run the session, see what goes wrong, then document. Premature rules tend to be either too vague to help or wrong about what actually matters.

**Duplicating what the code already says.** If your linter enforces a rule, you do not need to repeat it in AGENTS.md. Focus on things the agent cannot learn from the code or tooling alone: architectural intent, non-obvious constraints, historical context.

**Writing rules without verification commands.** A rule like "always ensure tests pass" is useless without the command to run them. Every constraint should include the command or check the agent can use to verify compliance.

For the conceptual foundations behind harness engineering, see the [Harness Engineering pattern](/patterns/harness-engineering.html).
