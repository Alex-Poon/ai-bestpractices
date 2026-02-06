---
title: "Claude Code daily benchmarks for degradation tracking"
source_url: "https://marginlab.ai/trackers/claude-code/"
hn_url: "https://news.ycombinator.com/item?id=46810282"
date: 2026-01-29
hn_points: 759
hn_comment_count: 63
tags: [claude-code, benchmarks, model-degradation, evaluation, swe-bench, reliability]
tier: 1
weight: 1
---

## Summary

MarginLab launched a daily benchmark tracker for Claude Code performance, measuring the CLI tool against a curated subset of SWE-Bench-Pro tasks using the Opus 4.5 model. The tracker was created in response to widespread community concerns about silent model degradation, where users noticed performance fluctuations but had no systematic way to measure or verify them.

The methodology involves running 50 daily evaluations against SWE-Bench-Pro tasks without custom harnesses, then aggregating results over 7-day and 30-day windows for statistical reliability. Statistical significance is determined using Bernoulli modeling with 95% confidence intervals. At the time of the HN discussion, the tracker showed a daily pass rate of 48%, a 7-day aggregate of 53%, and a 30-day aggregate of 53%, compared against a historical baseline of 58%.

The tracker reported statistically significant degradation at both the 7-day (-5.5%) and 30-day (-4.5%) timeframes, while the daily -10% swing was within normal variance. This data provided the first systematic evidence for what many users had been reporting anecdotally.

The discussion generated an unusually high engagement of 759 points and 63 comments, reflecting the community's deep frustration with perceived quality fluctuations in AI coding tools. A member of the Claude Code team (trq_) responded, confirming a harness bug introduced on January 26 that was rolled back on January 28, providing a concrete explanation for at least some of the observed degradation.

## Key Insights

- **Systematic tracking fills a critical gap**: Users have no way to verify day-to-day quality of AI services, creating a trust deficit that benchmarking can address
- **Harness bugs vs model changes**: The Claude Code team confirmed a real harness bug, distinguishing tool-level issues from model-level degradation
- **Statistical rigor is hard**: Multiple commenters noted the methodology needs more samples and better significance testing to draw valid conclusions
- **Vendor incentive misalignment**: As costs rise and competition intensifies, vendors face pressure to quietly reduce service quality

## Notable Quotes

> "detect statistically significant degradations" — MarginLab tracker description

## HN Discussion Highlights

The discussion generated 759 points and 63 comments. This was one of the most emotionally charged threads, reflecting deep community concern about AI service reliability.

**Official response**
- **trq_** (Claude Code team): Confirmed a harness issue was introduced on January 26 and rolled back on January 28, advising users to run `claude update` for the latest version

**Methodology critiques**
- **ofirpress** (SWE-bench co-author): Recommended running 300 tasks with 5-10 tests per day rather than 50 daily tasks, noting significant variance from factors like server load
- **crazygringo**: Challenged the statistical methodology, pointing out that confidence intervals need to be computed for the difference itself rather than just testing whether new values fall outside the old interval
- **goldenarm**: Called the 14% significance threshold meaningless and recommended using the monthly scale as the default
- **account266928**: Warned that the confidence intervals appear to include the baseline value, meaning the test may simply lack statistical power
- **drc500free**: Questioned what makes the chosen baseline appropriate for statistical tests

**Alternative explanations for degradation**
- **antirez**: Argued the data doesn't show model swapping, noting oscillating patterns are better explained by A/B testing of checkpoints, Claude Code tool updates, and natural sampling variability
- **dajonker**: Speculated that vendors may gradually quantize models over time to reduce costs, making new releases feel like bigger improvements
- **parquor**: Asked whether daily account usage affects performance, referencing a separate finding about Claude getting less capable throughout the day

**User frustration and trust**
- **silverlight**: Described a moment after an outage when reduced load made Claude roughly 3x faster and dramatically more productive, offering a glimpse of what unconstrained performance could look like
- **dmos62**: Criticized the lack of transparency around performance consistency, noting that ChatGPT silently degrades intelligence above 45k input tokens
- **jampa**: Reported using the API and observing Claude giving up by doing absurdly wrong things like deleting entire features when asked for a one-line fix, noting this worsens after a daily token threshold
- **Dowwie**: Humorously suggested measuring user hostility via curse word detection as a proxy for agent quality

**Broader implications**
- **mrandish**: Argued that benchmark tracking will be crucial as vendor costs skyrocket and the pressure to quietly dial back performance becomes overwhelming, especially for organizations with hundreds of developers
