---
title: "Case Study: Building a C Compiler with AI Agents"
description: "Carlini's experiment with parallel Claude agents on a real compiler project."
weight: 1
tags: [case-study, parallel-agents, autonomous-coding, test-design]
date: 2026-02-06
---

Nicholas Carlini set out to answer a simple question: can you build real, production-grade software using nothing but parallel AI agents? The result was a 100,000-line Rust-based C compiler, produced by 16 parallel Claude instances over two weeks, that passed 99% of the GCC torture test suite and compiled the Linux 6.9 kernel across x86, ARM, and RISC-V architectures.

The compiler itself is impressive. But the lasting value of this experiment lies in what it revealed about how autonomous agents succeed and fail at scale -- and why the infrastructure surrounding the agents matters more than the agents themselves.

## The setup

Carlini ran 16 Claude instances simultaneously, each in an isolated Docker container sharing a common upstream git repository. There was no orchestration agent. Coordination happened through git: agents claimed tasks by writing lock files to a `current_tasks/` directory, then followed a standard pull-merge-push cycle. Context between sessions was maintained through repository history and documentation files, not conversation memory.

Over roughly 2,000 sessions and $20,000 in API costs, the system compiled major open-source projects including SQLite, Redis, libjpeg, Lua, PostgreSQL, QEMU, FFmpeg, and Doom.

## What worked

**Embarrassingly parallel early work.** In the initial phases, hundreds of failing test cases created natural task boundaries. Each agent could independently pick up a different failure and fix it without coordination. Sixteen agents meant roughly sixteen times the throughput. When the work decomposes cleanly, parallelism delivers proportional gains.

**Agent specialization.** Rather than running 16 identical agents, the team deployed specialists: core compiler developers, a deduplication agent that coalesced redundant implementations, a performance optimizer, a code quality critic working from a Rust-developer perspective, and a documentation maintainer. Specialization prevented the common failure where all agents converge on the most obvious next problem and duplicate each other's effort.

**Git as the coordination protocol.** The simplicity of the coordination mechanism is instructive. The temptation in multi-agent systems is to build elaborate orchestration layers. This project demonstrated that a shared repository with lock files can coordinate 16 agents producing 100,000 lines of code. The coordination protocol that already exists -- version control -- was sufficient.

**Test harness quality.** The project integrated established, high-quality test suites (the GCC torture tests) and built verifiers around real open-source projects. A CI pipeline enforced that new commits could never break existing functionality. The quality ceiling of agent output was determined by the quality of the verification infrastructure, not the quality of the prompts.

## What failed

**Monolithic tasks destroyed parallelism.** Compiling the Linux kernel was a single, undivided task. All 16 agents encountered the same bugs, independently produced the same fixes, and overwrote each other's changes on merge. More agents produced zero additional value. Parallelism is a property of task structure, not of agent count -- if you cannot decompose the problem, adding more agents adds more merge conflicts.

**Agent time blindness.** Left unconstrained, Claude would happily run exhaustive test suites for hours without recognizing diminishing returns. The team had to build a `--fast` option that ran 1-10% random test samples, imposing the time discipline the agent lacked. This is a fundamental design lesson: the harness must compensate for cognitive limitations the agent cannot self-correct.

**Context window pollution.** Dumping thousands of lines of test output into the agent's context destroyed its ability to reason about failures. The team pre-computed aggregate statistics and formatted errors with single-line `ERROR` prefixes to keep output parse-friendly. Test infrastructure had to be designed around how the agent processes information, not how a human would.

**Feature regressions.** New functionality regularly broke existing behavior despite CI enforcement. The generated Rust code was functional but far below expert quality. The assembler and linker remained buggy. Code generation efficiency lagged behind GCC even with optimizations disabled.

## The oracle recovery

The most inventive moment in the project came when the team hit the Linux kernel compilation wall. They designed an oracle-based testing approach: GCC served as the known-good compiler, and the test harness randomly compiled most kernel files with GCC and the remainder with Claude's compiler. If the build succeeded, Claude's subset was correct. Failures enabled binary-search-style refinement across different file combinations.

This transformed a monolithic task into a decomposable one. The lesson is that when parallelism breaks down, the solution is not better agents but better task decomposition -- and sometimes that requires creative engineering of the verification infrastructure itself.

## Model capability as a moving target

The project tracked results across three model generations. Opus 4.0 could barely produce a functional compiler. Opus 4.5 first passed large test suites but could not compile real projects. Opus 4.6 crossed the threshold enabling Linux kernel compilation on multiple architectures.

Each generation opened capability frontiers that the previous one could not reach. This has a practical implication for infrastructure design: the harness must verify outcomes rigorously without micromanaging the path to those outcomes, because a harness that over-constrains for current limitations will need rebuilding when the model improves.

## Implications for practitioners

This case study validates several principles that experienced practitioners have identified independently:

1. **The test harness is the product.** Agent output quality is bounded by verification quality, not prompt quality. If you invest in one thing when deploying agents, invest in the harness. See [Harness Engineering](/practices/harness-engineering.html).

2. **Decomposition determines parallelism.** You cannot make a monolithic task faster by adding agents. You can only make a decomposable task faster by matching agent count to the number of independent work units. See [Task Scoping](/practices/task-scoping.html).

3. **Design for agent cognition.** Test output formatting, execution time limits, and progress tracking all need to account for how the agent processes information. Human-oriented tooling often works poorly for agents.

4. **Version control is sufficient coordination.** Before building an orchestration layer, try git. It worked for 16 agents and 100,000 lines of code.

5. **Human judgment remains the final gate.** A 99% pass rate sounds reassuring until you consider what the remaining 1% might contain. Autonomous development without human verification remains a genuine concern -- one the project's author, whose background is in security research, was candid about.

The full technical details are available in [Anthropic's engineering blog post](https://www.anthropic.com/engineering/building-c-compiler). The coordination patterns from this project are distilled in [Multi-Agent Coordination](/practices/multi-agent.html).
