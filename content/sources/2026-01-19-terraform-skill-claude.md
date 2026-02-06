---
title: "Claude Skill for Terraform/OpenTofu"
source_url: "https://github.com/antonbabenko/terraform-skill"
hn_url: "https://news.ycombinator.com/item?id=46676801"
date: 2026-01-19
hn_points: 1
hn_comment_count: 1
tags: [terraform, claude-code, skills, infrastructure-as-code, devops]
tier: 2
weight: 99
---

## Summary

Anton Babenko, a well-known contributor in the Terraform ecosystem and maintainer of many popular terraform-aws-modules, released a Claude Code skill focused on Terraform and OpenTofu best practices. The skill aggregates trusted sources including terraform-best-practices.com and community-tested patterns from over 100 production modules.

The skill provides comprehensive guidance across several domains: a testing decision matrix for choosing between native tests and Terratest, module development standards for naming conventions and directory structure, CI/CD workflows for GitHub Actions and GitLab CI with Atlantis integration, and security and compliance patterns including policy-as-code and secrets management.

What distinguishes this skill from generic AI assistance is its emphasis on decision frameworks rather than just code generation. It helps practitioners understand not just what to do but when and why, providing side-by-side comparisons of recommended practices versus anti-patterns. The skill supports Terraform 1.0+ and OpenTofu 1.6+.

Babenko's motivation was clear: he wants to eliminate the excuse that AI hallucinates with Terraform by grounding the model in real documentation and proven patterns. The skill is designed to work alongside the HashiCorp Terraform MCP server so the model can reference both official docs and battle-tested community practices.

## Key Insights

- **Grounding AI in domain expertise**: Rather than relying on the model's training data alone, packaging curated best practices as a skill ensures more reliable Terraform guidance
- **Decision frameworks over templates**: The skill emphasizes when and why to use specific patterns, not just what code to write
- **Ecosystem composability**: Designed to complement the HashiCorp Terraform MCP, showing how skills and MCP servers can work together

## Notable Quotes

> "I do not want to hear that AI hallucinates with Terraform" — antonbabenko

## HN Discussion Highlights

The discussion generated 1 point and 1 comment. The sole comment was from the author himself.

**Author's rationale**
- **antonbabenko**: Explained the skill aggregates Terraform best practices from trusted sources collected over years, and recommended using it alongside the HashiCorp Terraform MCP so the model can ground itself in real docs and proven patterns
