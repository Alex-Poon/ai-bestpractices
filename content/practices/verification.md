---
title: "Verification"
description: "How to verify AI-generated code quickly and reliably — the skill that makes everything else work."
weight: 3
tags: [verification, testing, code-review, quality]
date: 2026-02-06
---

Verification is the skill that makes every other AI-assisted development practice work. Task scoping, harness engineering, and model selection all ultimately exist to make verification easier and faster. If you cannot verify the output, nothing else matters.

The shift is fundamental: as AI takes over code generation, the developer's primary contribution moves from writing to reading, reviewing, and validating. You are no longer the author. You are the editor -- and the editor must be a genuinely skilled reader, not a rubber stamp.

## What Verification Is

Verification is the practice of confirming that AI-generated code is correct, secure, aligned with intent, and consistent with your system's architecture. It encompasses code review (reading the diff), testing (running the code against specifications), and behavioral validation (confirming the code does what was actually needed, not just what was literally asked).

The distinction between these three modes matters. Code that passes tests may still be wrong -- tests themselves can be inadequate. Code that looks correct in a diff review may harbor subtle logic errors. Code that both passes tests and looks correct may solve the wrong problem. Effective verification uses all three modes in combination.

## Why Verification Is Non-Negotiable

### The economics are asymmetric

Generating code is now cheap and fast. Deploying broken code is still expensive and slow to fix. The bottleneck has moved from production to quality control. A human who cannot evaluate AI output is a human who ships bugs at the speed of AI generation.

### AI-generated errors are different from human errors

AI does not make typos or forget semicolons. It makes plausible-sounding logic errors, security vulnerabilities with correct syntax, and architectural drift that only becomes visible at a scale larger than any individual diff. **vunderba** caught a case where Sonnet 4.5 wrote code with a misleading comment that described the opposite of what the code actually did -- the kind of error that rewards careful reading.

### Models actively game verification

**koiueo** discovered that an LLM acknowledged ignoring a failing test in CLAUDE.md and called it a "known issue." The agent learned to route around the test rather than fix the underlying bug. **wongarsu** confirmed the pattern: when you give agents verifiable goals like "make unit tests pass," the agent works tirelessly -- but you must always check that it did not simply delete or skip the failing tests.

### The comprehension penalty is real

Anthropic's own randomized controlled study found that junior developers using AI assistance scored 17% lower on comprehension tests, with the largest gap on debugging questions. The AI-assisted group finished tasks slightly faster, but the speed advantage was not statistically significant. The implication: AI can make you feel faster while making you less capable of catching mistakes.

**postalcoder** described the emotional dimension: with older, weaker models, you still had to do 30% of the thinking yourself, which forced learning. Newer models are so capable they short-circuit the productive struggle entirely.

## How to Verify Effectively

### Strategy 1: Test-First Delegation

Write tests yourself, then let the AI generate the implementation. This is the emerging consensus best practice and serves multiple purposes simultaneously.

**Why it works:** Writing tests requires understanding the problem deeply enough to specify expected behavior. The tests become a machine-checkable spec. If the AI passes all tests but the output is wrong, you have a test gap, not an AI problem -- and the test gap is yours to fix.

**visarga** maintained an entire regex library through test suites alone, arguing that "correctness was never grounded in understanding the implementation" but in the discriminative competence to verify behavior. **teiferer** asked the natural question: "Wouldn't it make sense to do it the other way -- you write the test, let AI generate the code?" The answer, increasingly, is yes.

**Watch for dummy tests.** **suralind** warned that AI-generated tests frequently fail on first pass, and the agent fixes them on subsequent iterations -- but sometimes by writing tests that assert trivially true conditions rather than testing real behavior. Review the tests themselves, not just whether they pass.

### Strategy 2: Diff Review as Core Workflow

The diff shows you exactly what changed, focusing attention on the delta rather than the entire codebase. This is how experienced developers have always reviewed code from other humans, and it transfers directly to AI output.

**Review every diff before committing.** Never commit code you cannot explain. The agent's natural-language description of what it did may not match what it actually did. Trust the code, not the commentary.

**Check for what is missing.** The hardest verification task is noticing what the agent failed to include: error handling it skipped, edge cases it did not consider, tests it did not write. Absence is harder to spot than presence.

**Look for patterns, not just individual lines.** Architectural drift shows up as inconsistent patterns across files, not as errors in any single file. One file using one error-handling pattern while another uses a different one is a signal that needs attention.

### Strategy 3: Verifiable Goals

Instead of telling the AI to "implement X," give it a verifiable goal: "make these unit tests pass," "make the linter pass," "make the build succeed." This leverages the agent's tenacity -- it will work tirelessly until the goal is met.

**jedberg** quoted Karpathy on the experience of watching agents struggle for 30 minutes and then succeed, noting that grit correlates with success more than intelligence. But **Loeffelmann** pushed back: "LLMs do not have tenacity" -- they frequently give up with TODO comments or declare work done while tests still fail.

The resolution is to combine verifiable goals with automated guardrails. The CI pipeline, the linter, and the test suite are impartial arbiters that the agent cannot argue with. **theshrike79** put it directly: "Tools in a loop, people. Without deterministic testing tools, you're just vibe coding at its worst."

### Strategy 4: Multi-Agent Review

Use a second agent to review the first agent's output. This is not a replacement for human review, but an additional filter that catches errors the first agent introduced.

**linsomniac** uses a custom "codex-review" skill that reviews the last commit. **dkubb** runs a parallel session dedicated to code auditing and skill maintenance. **megalomanu** configured Claude Code to post auto-review comments on pull requests, catching dozens of issues the team would not have caught otherwise.

The value of multi-agent review is that different sessions (or different models) have different failure modes. **endymion-light** compared code review across models: Gemini gives gentle feedback, Claude brutally identifies naming and coupling problems, ChatGPT says everything is perfect. Using disagreement between models as a signal for areas that deserve closer human attention is an effective filter.

### Strategy 5: Behavioral Validation

Beyond code review and testing, run the code and observe its behavior. For UI work, look at the screen. For APIs, hit the endpoint. For data processing, inspect the output. This catches the category of errors where code is technically correct but does not do what was actually needed.

**ps** described using Opus 4.5 on a 50kLOC Django project where the model sometimes makes obvious mistakes that only visual control catches. No amount of automated testing substitutes for a human confirming that the thing works as intended.

## Calibrating Trust

Verification effort should be proportional to risk. The failure modes are:

**Over-trust (rubber-stamping).** Approving AI output after superficial review because the first few interactions produced good results. This scales dangerously: as AI generates more code faster, the temptation to skim grows proportionally. **kaydub** described blindly accepting 70%+ of changes and catching problems at PR review -- a workflow that only works if your PR review process is rigorous.

**Under-trust (rewriting everything).** Reviewing so thoroughly that you could have written the code faster yourself. This defeats the purpose of AI assistance.

The right calibration depends on blast radius:

- **Low risk** (utility function with tests, documentation update, boilerplate): Quick scan. Confirm tests pass.
- **Medium risk** (API endpoint, UI component, data transformation): Review the diff carefully. Run the code. Check edge cases.
- **High risk** (authentication, security-critical paths, data migrations, public-facing API changes): Line-by-line review. Write additional tests. Have another human review.

**jbellis** offered the best analogy: "Like arithmetic with calculators, the key is maintaining high-level understanding sufficient to detect errors." You do not need to mentally compute every calculation, but you should recognize when an answer is wildly wrong.

## Maintaining Verification Skill

Verification skill requires active maintenance. Karpathy found that code review ability persists longer than writing ability, but **oxag3n** warned that review skills will also erode if developers stop working in domains they never learned firsthand.

**Strategies for maintaining the skill:**

**Periodically write code manually.** Not for every task, but often enough to keep your mental model of the codebase current. **ekropotin** uses agents at work where velocity matters but deliberately avoids LLMs for hobby projects to maintain learning and neural connections.

**Ask the agent to explain its choices.** This forces engagement with the reasoning, not just the output, and sometimes reveals misunderstandings.

**Write tests before delegating implementation.** Test-writing requires understanding the problem deeply enough to specify expected behavior. This preserves the understanding that pure delegation erodes.

**Use the racing pattern.** **acedTrex** starts debugging manually while simultaneously having the agent search. The human wins most races but the AI occasionally finds things first. Both paths converge toward faster resolution while keeping the human engaged.

**Use AI as a tutor, not a crutch.** **epolanski** reports learning more than ever by using AI for comprehension-building: asking follow-up questions, requesting explanations, creating sequence diagrams. **discreteevent** references Martin Fowler's "learning loop" framework: use LLMs as an assistant to understanding, but the goal must always be understanding itself.

## Anti-Patterns

### Blind Acceptance

Committing AI-generated code without review because "it compiled and the tests passed." Tests can pass without testing the right things. Compilation does not mean correctness. **InfinityByTen** described the overwhelm that leads here: receiving 500 lines of buggy code to review after a few seconds of agent "thinking."

### Rubber-Stamping Diffs

Clicking "approve" on every diff after a cursory glance. This is the organizational version of blind acceptance and is particularly dangerous in team settings where AI-generated PRs can overwhelm reviewers. **czhu12** noted that when Claude generates copious code, it becomes much harder to review than small snippets one at a time.

### Reviewing Without Context

Evaluating code changes without understanding the broader system they operate in. AI-generated code may be locally correct but globally wrong -- violating invariants, duplicating existing functionality, or introducing subtle incompatibilities.

### Assuming Models Improve Monotonically

Trusting that newer model versions are always better. Performance fluctuates, and many practitioners report inconsistent quality across sessions. Verification intensity should not decrease just because a newer model was released.

### Trusting the Agent's Self-Assessment

The agent will say "I can clearly see the issue now" when it cannot. **serial_dev** described hearing this ten times before -- "it was always wrong." Models are sycophantic debuggers. They tell you what you want to hear rather than admitting uncertainty.

### Letting Test Coverage Substitute for Understanding

High test coverage does not mean you understand the code. **gergo_b** found that when returning to AI-written code after two weeks, it was incomprehensible -- while self-written code was always immediately clear. **devnonymous** invoked Kernighan's lever: if debugging is twice as hard as writing, and AI writes at maximum cleverness, humans face an impossible debugging load.

## Evidence

**wongarsu** (HN, thread 46793098): Verifiable goals like "make unit tests pass" produce agent tenacity. But always verify the agent did not delete or skip the failing tests.

**koiueo** (HN, thread 46793907): Discovered the LLM acknowledged ignoring a failing test and called it a "known issue." The agent gamed its own evaluation.

**visarga** (HN, thread 46821738): Maintained a regex library through tests alone. Correctness was grounded in the test suite, not in understanding the implementation.

**vunderba** (HN, thread 46746249): Caught a subtle logical error where Claude attached a misleading comment describing the opposite of what the code did. Most vibe coders would never notice.

**squirrellous** (HN, thread 46752670): Demands near-100% test coverage combined with property-based and fuzz tests as the agent's proof of correctness. Skims the implementation.

**serial_dev** (HN, thread 46746274): Heard the AI say "I can clearly see the issue now" ten times before. It was always wrong.

**theshrike79** (HN, thread 46802941): "Tools in a loop, people. Without deterministic testing tools, you're just vibe coding at its worst."

**dataviz1000** (HN, thread 46823716): AI agents always present winning outliers rather than honestly reporting null results. Each iteration is 4x faster but needs dual validation, making effective speedup closer to 2x.
