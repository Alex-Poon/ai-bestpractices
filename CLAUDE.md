# AI Best Practices Knowledge Base

This repository consolidates articles, insights, and practical advice on using AI effectively — primarily sourced from Hacker News discussions and linked articles.

## Repository Purpose

- Collect and organize high-quality articles on AI best practices
- Extract actionable insights from real-world usage
- Build a searchable reference for AI-assisted development workflows

## Structure

- `articles/` — Full or summarized articles, organized by topic
  - `articles/prompting/` — Prompt engineering and interaction patterns
  - `articles/coding/` — AI-assisted coding practices
  - `articles/workflows/` — Development workflows and integration patterns
  - `articles/pitfalls/` — Common mistakes and antipatterns
  - `articles/evaluation/` — Testing, benchmarking, and evaluating AI outputs
- `summaries/` — One-pager distillations of key articles
- `sources.md` — Master list of all source URLs with dates and HN discussion links

## Conventions

- When adding an article, always record the source URL and date in `sources.md`
- Article files should be named: `YYYY-MM-DD-short-slug.md`
- Each article file should have a YAML-style header with: title, source URL, HN link (if any), date, and tags
- Tags use lowercase kebab-case (e.g., `prompt-engineering`, `code-review`, `agent-workflows`)
- Summaries should capture: key claims, actionable takeaways, and any notable HN commentary

## Adding Content

To add a new article, provide the URL (and optionally the HN discussion link). Claude will:
1. Fetch and read the article
2. Create a summary with metadata in the appropriate `articles/` subdirectory
3. Add the source to `sources.md`
4. Commit the changes

## Key Topics of Interest

- Prompt engineering techniques
- AI-assisted code generation best practices
- Code review with AI
- Agent-based workflows (Claude Code, Cursor, Copilot, etc.)
- Testing and validation of AI outputs
- Cost optimization and model selection
- Security considerations when using AI tools
- Team adoption strategies
