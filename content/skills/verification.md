---
title: "Verification: Reading AI-Generated Code"
description: "The most critical skill -- how to effectively review and validate AI output."
weight: 3
tags: [verification, core-skill, code-review, skill-atrophy]
date: 2026-02-06
---

As AI takes over more code generation, the developer's primary contribution shifts from writing to reading. Verification -- the ability to evaluate whether AI-generated code is correct, secure, and aligned with intent -- becomes the skill that separates productive AI usage from expensive mistakes.

## Why Verification Matters More Than Generation

The economics of AI-assisted development are asymmetric. Generating code is now cheap and fast. Deploying broken code is still expensive and slow to fix. The bottleneck has moved from production to quality control.

This is not a temporary state while models improve. Even as models get better at generating correct code, the consequences of undetected errors in production remain severe. A human who cannot evaluate AI output is a human who ships bugs at the speed of AI generation.

Anthropic's own research quantified the risk. A [randomized controlled study](/sources/2026-01-30-ai-assistance-coding-skills/) found that junior developers using AI assistance scored 17% lower on comprehension tests, with the largest gap appearing on debugging questions. The AI-assisted group finished tasks slightly faster, but the speed advantage was not statistically significant. The implication: AI can make you feel faster while making you less capable of catching mistakes.

## The Karpathy Insight: Reading Persists When Writing Atrophies

Andrej Karpathy's [widely discussed observations](/sources/2026-01-26-karpathy-claude-coding-notes/) on AI-assisted coding identified a critical asymmetry in skill atrophy. After extensive AI usage, he found it harder to recall syntax and implementation details -- writing fluency degraded. But code review ability remained intact. He drew a parallel to how reading comprehension persists even when spelling ability degrades.

This asymmetry is the foundation of the verification skill. As long as you can read code effectively, you can verify AI output even if you could no longer write that code from scratch. The developer role evolves from author to editor -- but the editor must be a genuinely skilled reader, not a rubber stamp.

HN commenter **oxag3n** pushed back on this framing, warning that review skills will also erode eventually if developers stop working in domains they never learned firsthand. The implication: verification skill requires active maintenance through periodic hands-on coding, not just passive review.

## What AI Gets Wrong

Understanding common failure modes makes verification more efficient. You learn where to focus attention instead of reviewing every line with equal scrutiny.

**Plausible but incorrect logic.** AI-generated code often looks correct on first reading because it follows familiar patterns. The errors tend to be in edge cases, off-by-one conditions, and subtle misunderstandings of business requirements rather than obvious syntax mistakes.

**Security vulnerabilities.** Models frequently produce code with injection risks, missing input validation, or overly permissive access controls. [Burke Holland's Opus 4.5 evaluation](/sources/2026-01-06-opus-4-5-agent-experience/) estimated only about 80% confidence in robust security implementations even from frontier models.

**Architectural drift.** Over multiple agent interactions, small decisions accumulate into an architecture nobody designed. Each individual change seems reasonable; the aggregate result is incoherent. This is the hardest failure mode to catch because it only becomes visible at a scale larger than any individual diff.

**Tests that pass without testing.** [David Bau's analysis of vibe coding](/sources/2025-12-18-two-kinds-vibe-coding/) identified a critical failure mode: agents can produce solutions that technically pass tests without actually doing what is intended. Tests themselves must be tested -- through code coverage analysis, fuzz testing, and benchmarking.

**Overconfident error handling.** Agents tend to add error handling that catches exceptions broadly rather than specifically, masking real failures behind generic error messages. This makes debugging harder, not easier.

## Diff Review as the Core Workflow

The most effective verification workflow centers on diff review rather than reading complete files. This is how experienced developers have always reviewed code from other humans, and it transfers directly to AI output.

Karpathy emphasized that despite the power of CLI agents, visual code review through IDE diffs remains essential for quality control. The diff shows you exactly what changed, focusing attention on the delta rather than the entire codebase.

Practical diff review habits:

- **Review every diff before committing.** [Addy Osmani's workflow](/sources/2026-01-04-llm-coding-workflow-2026/) codifies this as a rule: never commit code you cannot explain.
- **Read the diff, not the conversation.** The agent's explanation of what it did may not match what it actually did. Trust the code, not the commentary.
- **Check for what is missing.** The hardest verification task is noticing what the agent failed to include -- error handling it skipped, edge cases it did not consider, tests it did not write. Absence is harder to spot than presence.
- **Look for patterns, not just individual lines.** Architectural drift shows up as inconsistent patterns across files, not as errors in any single file.

## The Trust Calibration Problem

Verification effort should be proportional to risk, but calibrating trust is difficult. The failure modes are:

**Over-trust (rubber-stamping).** Approving AI output after only superficial review because the first few interactions produced good results. This is the most dangerous failure mode because it scales: as AI generates more code faster, the temptation to skim grows proportionally.

**Under-trust (rewriting everything).** Reviewing so thoroughly that you could have written the code faster yourself. This defeats the purpose of AI assistance. As HN commenter **strogonoff** noted, if you are spending all your time reviewing, you have not saved any time.

The right calibration depends on blast radius. For a utility function with tests, a quick scan may suffice. For authentication logic, security-critical paths, or public-facing API changes, line-by-line review is appropriate. Match verification intensity to the cost of an undetected error.

## Maintaining Verification Skill

The Anthropic study found that developers who actively engaged with AI -- asking follow-up questions, requesting explanations, posing conceptual queries -- retained significantly better understanding than those who simply delegated work wholesale. The manner of interaction matters more than whether AI is used at all.

Practical strategies for maintaining verification capability:

- **Periodically write code manually.** Not for every task, but often enough to keep your mental model of the codebase current. Think of it as exercise -- you do not need to run every day to stay fit, but you do need to run regularly.
- **Ask the agent to explain its choices.** This forces engagement with the reasoning, not just the output, and sometimes reveals misunderstandings.
- **Write tests before delegating implementation.** Test-writing requires understanding the problem deeply enough to specify expected behavior. This preserves the understanding that pure delegation erodes.
- **Rotate between AI-assisted and manual work.** Some tasks are better as manual practice. Choose the ones that maintain your skills in areas where AI commonly fails (debugging, security, architecture).

## Anti-Patterns

### Blind Acceptance

Committing AI-generated code without review because "it compiled and the tests passed." Tests can pass without testing the right things. Compilation does not mean correctness. HN commenter **WhyOhWhyQ** described this failure mode vividly: initial exhilaration turning into exhausting QA testing of unreliable output.

### Rubber-Stamping Diffs

Clicking "approve" on every diff after a cursory glance. This is the organizational version of blind acceptance and is particularly dangerous in team settings where AI-generated PRs can overwhelm reviewers.

### Reviewing Without Context

Evaluating code changes without understanding the broader system they operate in. AI-generated code may be locally correct but globally wrong -- violating invariants, duplicating existing functionality, or introducing subtle incompatibilities with other modules.

### Assuming Models Improve Monotonically

Trusting that newer model versions are always better. The [Claude Code benchmarks tracker](/sources/2026-01-29-claude-code-benchmarks/) documented statistically significant performance fluctuations, and many practitioners report inconsistent quality across sessions. Verification intensity should not decrease just because a newer model was released.

## Sources

- [Karpathy's Claude coding notes](/sources/2026-01-26-karpathy-claude-coding-notes/) -- Skill atrophy observations and the reading-persists-when-writing-degrades insight
- [AI assistance and coding skills (Anthropic study)](/sources/2026-01-30-ai-assistance-coding-skills/) -- 17% learning penalty, debugging skills most affected, engagement style matters
- [AI coding getting worse? (IEEE Spectrum)](/sources/2026-01-08-ai-coding-getting-worse/) -- Perception vs reality of model degradation, consistency as the real problem
- [Claude Code benchmarks](/sources/2026-01-29-claude-code-benchmarks/) -- Systematic tracking of performance fluctuations
- [Two kinds of vibe coding](/sources/2025-12-18-two-kinds-vibe-coding/) -- Tests that pass without testing, meta-cognitive infrastructure for verification
- [Addy Osmani's workflow](/sources/2026-01-04-llm-coding-workflow-2026/) -- "Never commit code you cannot explain"
- [Opus 4.5 agent experience](/sources/2026-01-06-opus-4-5-agent-experience/) -- Security confidence gaps even in frontier models
