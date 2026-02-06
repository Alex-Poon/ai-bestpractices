---
title: "AI coding assistants are getting worse?"
source_url: "https://spectrum.ieee.org/ai-coding-degrades"
hn_url: "https://news.ycombinator.com/item?id=46542036"
date: 2026-01-08
hn_points: 451
hn_comment_count: 82
tags: [ai-coding-tools, model-degradation, evaluation, developer-experience, skepticism]
tier: 3
weight: 30
---

## Summary

This IEEE Spectrum article by Jamie Twiss presents the provocative claim that AI coding assistants are experiencing degradation rather than improvement. The central narrative comes from power users who report that these tools have hit a plateau, with some even declining in capability. The article identifies what it calls "silent failures" -- situations where AI coding tools appear functional on the surface but are actually underperforming in subtle, hard-to-detect ways.

The specific test case presented involves giving AI models Python code that references a nonexistent column in a pandas DataFrame, then asking models to fix the error without commentary. Since the problem is fundamentally about missing data rather than code logic, the ideal response would be a refusal or debugging assistance. The article evaluates how different GPT versions handled this scenario over time.

However, the article sparked significant pushback on HN. Many commenters criticized both the methodology and conclusions. The test case was widely viewed as unrepresentative -- a single three-line code snippet that tests an edge case rather than typical coding workflows. Several commenters pointed out that the article's author praised models that defied the prompt instructions (by providing commentary despite being asked not to), while criticizing models that followed the instructions as given.

The deeper debate centers on whether perceived degradation reflects actual model regression, or whether it stems from changing user expectations, improved instructability that breaks old workflows, possible dynamic model routing to smaller models during high demand, or the poisoning of training data as less experienced users generate feedback signals. The article touched a nerve because many developers have experienced inconsistency with AI coding tools, even if the specific evidence presented was seen as weak.

## Key Insights

- **Perception vs. reality of degradation**: The sense that AI coding tools are getting worse is widespread among users, but the evidence presented is largely anecdotal and based on edge cases rather than systematic evaluation.
- **Instructability can look like regression**: Models that better follow instructions may produce worse results when given poorly specified prompts, creating the impression of degradation when the real issue is the prompt.
- **Training data feedback loops**: One theory suggests that as less experienced users accept mediocre AI-generated code, the resulting feedback signal degrades future model performance, creating a vicious cycle.
- **Consistency is the real problem**: Many commenters agreed the core issue is not consistent decline but unpredictable variation in quality from session to session and month to month.

## Notable Quotes

> "The results are not repeatable. The problem is much worse." — renegade-otter (HN)

> "garbage in and garbage out" — sosodev (HN)

## HN Discussion Highlights

The discussion generated 451 points and 82 comments, making it one of the more actively debated topics. Key themes:

**Methodology Critique**
- **bee_rider**: Provided a detailed technical rebuttal, noting the author praised models that defied the prompt (providing commentary when told not to) while criticizing GPT-5 for actually following instructions. The test essentially measured how models fail on impossible tasks under restrictive constraints.
- **ronbenton**: Noted this is an opinion piece with anecdata rather than a technical paper, and the conclusions are not substantiated by the evidence presented.
- **crazygringo**: Called it a sweeping generalization based on a single non-representative three-line test.

**Alternative Explanations**
- **Kuinox**: Speculated that LLM providers may be dynamically serving smaller models during usage spikes or before new model releases, explaining perceived inconsistency.
- **renegade-otter**: Argued the real problem is not that models are worse but that results are not repeatable, and warned that the current pricing is subsidized and unsustainable.
- **nyrikki**: Explained how the feedback signal from accepted code is fundamentally flawed -- experienced users often accept suggestions then heavily edit them, which is indistinguishable from approval in the training data.

**Scaffolding and Workflow**
- **theptip**: Pushed back strongly, arguing models are getting better but users haven't figured out the scaffolding needed. Unit tests, proper prompts, and understanding the contours of AI capabilities are necessary, and the article's eval is not representative of real agent-based workflows like Claude Code.
- **jackfranklyn**: Observed that results vary depending on whether the domain is well-represented in training data versus novel, and noted that fresh context windows sometimes produce better results than long conversation histories.

**User Experience**
- **anttiharju**: Shared a balanced view -- AI is net positive for productivity but makes it easy to gloss over details, leading to more backtracking.
- **kristopolous**: Reported abandoning AI coding tools entirely due to being burned too many times, now using them only as an interactive search tool.
- **StarlaAtNight**: Proposed that users should be able to pin to specific model versions, similar to software package versioning.

**Broader Concerns**
- **CashWasabi**: Raised the long-term worry about what happens when LLMs destroy the information sources they crawl -- if Stack Overflow and open-source code decline, will models cannibalize themselves?
- **amelius**: Quipped that a pre-2024 training dataset will soon be worth billions.
