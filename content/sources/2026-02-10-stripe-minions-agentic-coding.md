---
title: "Stripe Minions – End to end agentic coding"
source_url: "https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents"
hn_url: "https://news.ycombinator.com/item?id=46959177"
date: 2026-02-10
hn_points: 5
hn_comment_count: 0
tags: [enterprise, agent-workflows, autonomous-coding, production-engineering, coding-agents]
tier: 2
weight: 1
---

## Summary

Stripe built a custom internal coding agent system called Minions that handles end-to-end task completion with no human involvement during execution. Over a thousand pull requests per week at Stripe are entirely produced by minions — no human-written code — though every PR still undergoes human review before merging. The system was purpose-built because off-the-shelf agentic tools could not handle Stripe's unique constraints: a codebase spanning hundreds of millions of lines, specialized stacks including Ruby with Sorbet typing, hundreds of proprietary internal libraries unfamiliar to any pretrained model, and the operational stakes of code that processes over a trillion dollars in annual payment volume.

The architecture is built on a customized fork of Block's Goose coding agent. Minions integrate with MCP (Model Context Protocol) for function calling across more than 400 internal tools. Each agent run gets an isolated "devbox" — a pre-warmed developer environment that spins up in about 10 seconds with the full Stripe codebase pre-loaded. An internal MCP server called Toolshed provides access to documentation, build statuses, and code intelligence services.

A typical workflow starts from a Slack message and ends with a pull request that passes CI and is ready for human review, with no interaction in between. Engineers can also trigger minions from a CLI, web interface, or directly within internal tools like documentation platforms and ticketing systems. The system implements a layered feedback loop: local linting runs in under 5 seconds on each push, CI selectively runs relevant tests from Stripe's suite of over 3 million tests, automated fixes apply where available, and minions attempt manual fixes otherwise. To balance speed and cost, agents are limited to two CI rounds maximum.

Stripe found that aligning agent tooling with human developer tooling was key — if a tool works well for human engineers, it works well for agents too. Engineers frequently run multiple minion tasks in parallel, finding the system especially valuable during on-call rotations for resolving many small issues quickly.

## Key Insights

- **Scale of autonomous code production is remarkable.** Over 1,000 PRs per week with zero human-written code, but full human review, demonstrates that unattended agents can be production-viable at enterprise scale when paired with proper guardrails.
- **Custom builds are necessary for complex codebases.** Off-the-shelf agents failed Stripe's constraints — proprietary libraries, specialized type systems, and trillion-dollar operational stakes required a purpose-built system with deep internal tool integration.
- **MCP as the integration layer.** With 400+ tools accessible via MCP, Stripe's architecture validates the protocol as a practical standard for connecting agents to enterprise infrastructure at scale.
- **Shift feedback left.** The layered testing approach (5-second linting, selective CI, two-round limit) balances thoroughness against cost and speed — a practical pattern for any team deploying autonomous agents.
- **Agent-human tool alignment.** Building agent workflows on the same infrastructure human developers use reduces maintenance overhead and ensures agents benefit from existing tooling investments.

## Notable Quotes

> "If it's good for humans, it's good for LLMs, too." — Alistair Gray, Stripe

## HN Discussion Highlights

No comments at time of capture. Post submitted by **lockranore2** with 5 points.
