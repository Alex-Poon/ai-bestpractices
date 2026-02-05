# AI Best Practices Knowledge Base

This repository consolidates articles, insights, and practical advice on using AI effectively — primarily sourced from Hacker News discussions and linked articles.

## Repository Purpose

- Collect and organize high-quality articles on AI best practices
- Extract actionable insights from real-world usage
- Build a searchable reference for AI-assisted development workflows

## Structure

The repo has two layers: **source** (full-fidelity captures) and **analysis** (practical takeaways).

### Source Layer (`articles/`)
Full-fidelity captures of articles and discussions, organized by type:
- `articles/tools/` — Product reviews and tool comparisons (Amp, Claude Code, Cursor, etc.)
- `articles/workflows/` — Development workflows and integration patterns
- `articles/discussions/` — HN and community discussions with attributed quotes
- `articles/prompting/` — Prompt engineering and interaction patterns
- `articles/coding/` — AI-assisted coding practices
- `articles/pitfalls/` — Common mistakes and antipatterns
- `articles/evaluation/` — Testing, benchmarking, and evaluating AI outputs

### Analysis Layer (`analysis/`)
Synthesized insights and practical takeaways:
- `analysis/synthesis/` — Cross-source synthesis documents
- `analysis/patterns/` — Reusable pattern cards (problem → solution → anti-patterns → sources)
- `analysis/checklists/` — Practical daily/weekly checklists

### Metadata
- `sources.md` — Master list of all source URLs with dates and HN discussion links
- `summaries/` — One-pager distillations of key articles

## Conventions

- When adding an article, always record the source URL and date in `sources.md`
- Article files should be named: `YYYY-MM-DD-short-slug.md`
- Each article file should have a YAML-style header with: title, source URL, HN link (if any), date, and tags
- Tags use lowercase kebab-case (e.g., `prompt-engineering`, `code-review`, `agent-workflows`)
- Pattern cards follow the format: Problem → Solution → Mental Model → Anti-patterns → Key Indicators → Techniques → Sources
- HN discussion captures should preserve attribution (username) for all quotes

## Adding Content

To add a new article, provide the URL (and optionally the HN discussion link). Claude will:
1. Fetch and read the article
2. Create a full-fidelity source capture in the appropriate `articles/` subdirectory
3. Create or update relevant `analysis/` files (synthesis, patterns, checklists)
4. Add the source to `sources.md`
5. Commit the changes

When using subagent teams, parallelize: one agent per source file, one agent for analysis layer.

## Key Topics of Interest

- Prompt engineering techniques
- AI-assisted code generation best practices
- Code review with AI
- Agent-based workflows (Claude Code, Cursor, Copilot, Amp, etc.)
- Testing and validation of AI outputs
- Cost optimization and model selection
- Security considerations when using AI tools
- Team adoption strategies
- Harness engineering (AGENTS.md, custom tooling)
- Task scoping for agent delegation
