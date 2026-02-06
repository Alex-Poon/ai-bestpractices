---
title: "Opus 4.5 is not the normal AI agent experience"
source_url: "https://burkeholland.github.io/posts/opus-4-5-change-everything/"
hn_url: "https://news.ycombinator.com/item?id=46515696"
date: 2026-01-06
hn_points: 879
hn_comment_count: 131
tags: [opus, claude-code, agent-workflows, vibe-coding, ai-capabilities, developer-experience]
tier: 2
weight: 3
---

## Summary

Burke Holland wrote an enthusiastic account of his experience using Claude's Opus 4.5 model, arguing it represents a fundamental shift in AI agent capabilities that goes beyond anything he had previously experienced. His central claim is that Opus 4.5 delivers on promises that earlier AI coding agents could not fulfill, particularly around autonomous problem-solving and first-attempt success rates.

Holland completed four substantial projects in rapid succession: an image conversion utility, a video editor, a social media automation app, and a route optimization tool. He highlighted the model's ability to handle full-stack development spanning frontend, backend, authentication, database integration, and cloud infrastructure -- areas that had traditionally been weak points for AI agents.

Key capabilities he observed included autonomous self-correction and debugging without human intervention, the ability to learn new tools like Firebase CLI without explicit instruction, and sophisticated framework comprehension. The model would read error logs, identify issues, and iterate on fixes independently.

Holland proposed a provocative "LLM-first" coding philosophy that optimizes for machine maintainability rather than human readability, prioritizing linear control flow, explicit code, and regenerability over traditional software design aesthetics. However, he acknowledged security as a primary concern, estimating only about 80% confidence in robust implementations.

The HN discussion was extensive and polarized, with many experienced developers pushing back on the replacement narrative while acknowledging genuine productivity gains for greenfield projects and personal tools.

## Key Insights

- **First-attempt success is the differentiator**: Unlike prior agents that required extensive back-and-forth, Opus 4.5 often solved problems correctly on the first try
- **Full-stack autonomy**: The model handled end-to-end development including auth, databases, and cloud infra -- historically the weakest areas for AI agents
- **LLM-first coding philosophy**: Holland proposed optimizing code for machine maintainability rather than human readability, a controversial but thought-provoking stance

## Notable Quotes

> "Opus 4.5 feels like the model that we were promised" — Burke Holland

> "It's still not as smart as a good human programmer" — mcv

## HN Discussion Highlights

The discussion generated 879 points and 131 comments. Key themes:

**Enthusiastic adoption**
- **s-macke**: Praised Opus 4.5's ability to act independently, make decisions, collaborate, and actually execute plans, noting every clearly defined coding problem was solved
- **simonw**: Reported throwing absurdly difficult challenges at the model (JS interpreter in Python, WebAssembly runtime) and being consistently surprised by results
- **jedberg**: Described a decade-old app idea that Claude built exactly as described on the first attempt, then iterated improvements conversationally

**Skepticism and pushback**
- **multisport**: Argued mid-level engineers don't work on isolated greenfield projects and the hard part of engineering is building things the right way for teams to extend
- **tannedNerd**: Pointed out none of the demos address production quality concerns like edge case testing, security audits, or maintainability
- **honeycrispy**: Found that while Opus works for targeted tasks, its architecture decisions were baffling and required rewriting half the code
- **mcv**: Despite heavy use, concluded the model frequently got stuck, went down wrong paths, and repeated corrected mistakes

**Philosophical debate**
- **poisonborz**: Argued the discussion misses what developers are actually hired for -- responsibility, not just code output
- **tripledry**: Expressed concern that if programming becomes prompt engineering, the joy of building would be lost
- **maciejzj**: Raised societal implications of commoditizing technology knowledge through subscription access

**Author's response**
- **hollandburke**: Acknowledged both sides of the debate, clarifying he doesn't consider himself an exceptional developer and that his experience is the only objective evidence he has
