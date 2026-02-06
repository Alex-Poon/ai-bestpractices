---
title: "Tell HN: Claude Has Had 57 Incidents in the Past 3 Months"
source_url: "https://news.ycombinator.com/item?id=46885666"
hn_url: "https://news.ycombinator.com/item?id=46885666"
date: 2026-02-04
hn_points: 2
hn_comment_count: 0
tags: [claude, reliability, anthropic, service-quality, developer-experience]
tier: 1
weight: 20
---

## Summary

This HN text post by shikkra documents reliability concerns with Anthropic's Claude service, providing a detailed incident count from the official status page (status.claude.com). The author, a $100/month Max plan subscriber, was prompted to investigate after encountering a retry issue where Claude attempted to generate a response 10 times with Opus 4.5 and extended thinking enabled before silently switching to a different model without indication or confirmation.

The incident data paints a concerning picture of service reliability. February 2026 had 10 incidents in just 4 days. January 2026 had 26 incidents. December 2025 had 21 incidents. At least 16 of these directly affected Claude Opus 4.5: 3 incidents in December (21-23), 9 in January (across 7-28), and 4 in February (1-4). Ten additional incidents affected the claude.ai platform itself.

Beyond the status page incidents, the author describes a recurring bug where Claude generates a nearly complete response only for something to go wrong and wipe the entire thing from the conversation with no way to recover it — representing wasted tokens for paying customers. The post questions why Anthropic, as one of the highest-valued AI companies with substantial engineering resources, is not prioritizing reliability.

This post connects to the broader theme of AI coding tool degradation discussed in the IEEE Spectrum article and the Claude Code daily benchmarks tracker, suggesting reliability concerns span both the API and consumer products.

## Key Insights

- **57 incidents in 3 months**: A quantified reliability problem that may be underappreciated by users who attribute issues to their own usage
- **Silent model switching**: The system switching from Opus 4.5 to a different model without user notification undermines trust and reproducibility
- **Opus 4.5 specifically affected**: 16 of the incidents directly impacted the most capable (and most expensive) model
- **Lost responses are not recoverable**: Completed responses being wiped without recovery options represents a poor user experience for paying customers
- **Reliability as competitive differentiator**: As AI tools become mission-critical for development workflows, uptime and consistency matter more than raw capability

## Notable Quotes

> "How is Anthropic not addressing this?" — shikkra

## HN Discussion Highlights

The discussion generated 2 points and 0 comments. No community engagement beyond the original post, though the topic of Claude reliability surfaces frequently in other HN threads.
