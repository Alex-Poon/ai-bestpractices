# AI Best Practices Knowledge Base

This repository consolidates articles, insights, and practical advice on using AI effectively — primarily sourced from Hacker News discussions and linked articles.

## Repository Purpose

- Collect and organize high-quality articles on AI best practices
- Extract actionable insights from real-world usage
- Build a searchable reference for AI-assisted development workflows

## Structure

The repo has three layers: **sources** (full-fidelity captures), **synthesis** (practical takeaways), and **theme-driven content** (skills, tools, workflows, etc).

### Source Layer (`content/sources/`)
Full-fidelity captures of 32+ HN articles and discussions. Each file contains:
- Article summary (in original words, respecting copyright)
- Key insights extracted
- Notable short quotes (under 15 words)
- HN discussion highlights with username attribution

### Theme-Driven Content
- `content/start-here/` — Getting started guide and core loop framework
- `content/skills/` — The 4 core skills: task-scoping, harness-engineering, verification, model-selection
- `content/tools/` — Tool landscape: Claude Code, Cursor, Amp, Copilot, MCP ecosystem
- `content/workflows/` — How people actually work: daily practice, parallel agents, AGENTS.md, vibe coding spectrum
- `content/landscape/` — State of AI in 2026: model releases, adoption, costs, open questions
- `content/evidence/` — Case studies and curated practitioner voices

### Synthesis Layer (`content/synthesis/`)
- `state-of-practice-feb-2026.md` — Mega-synthesis connecting all sources

### Static Site (`docs/`)
Hugo-generated static site. Rebuilt by running `hugo` at the project root.

## Conventions

- When adding an article, always record the source URL and date in `sources.md`
- Article files should be named: `YYYY-MM-DD-short-slug.md`
- Each article file should have YAML frontmatter with: title, source_url, hn_url, date, hn_points, hn_comment_count, tags, tier
- Tags use lowercase kebab-case (e.g., `prompt-engineering`, `code-review`, `agent-workflows`)
- HN discussion captures should preserve attribution (username) for all quotes
- Keep direct quotes under 15 words to respect copyright
- Site uses dark mode by default with light mode toggle

## Adding Content

To add a new article, provide the URL (and optionally the HN discussion link). Claude will:
1. Fetch and read the article
2. Create a source capture in `content/sources/`
3. Update relevant theme-driven content pages
4. Add the source to `sources.md`
5. Run `hugo` to rebuild the static site into `docs/`
6. Commit the changes (markdown + docs/)

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

## Technical Stack

- **Hugo** static site generator with custom layouts
- **Inter** font via Google Fonts
- **Client-side search** via search-index.json (no external dependencies)
- **Dark mode by default** with localStorage preference
- **Section-colored design** — each section has its own accent color
