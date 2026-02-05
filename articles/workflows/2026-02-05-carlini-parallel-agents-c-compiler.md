---
title: "Building a C Compiler with Parallel Claude Agents"
source: https://www.anthropic.com/engineering/building-c-compiler
date: 2026-02-05
author: Nicholas Carlini (Anthropic Safeguards team researcher)
tags: [parallel-agents, autonomous-coding, harness-engineering, test-design, claude-code, large-scale]
---

## Project Summary
- Stress-test of autonomous LLM capabilities: 16 parallel Claude instances building a production-grade C compiler from scratch
- 2,000+ Claude Code sessions across two weeks
- 100,000-line Rust-based compiler capable of compiling Linux 6.9 on x86, ARM, and RISC-V
- $20,000 total API cost (2 billion input tokens, 140 million output tokens)
- 99% pass rate on GCC torture test suites
- Compiled real projects: QEMU, FFmpeg, SQLite, PostgreSQL, Redis, and Doom

## The Agent Loop Architecture

### Basic Harness
Infinite loop pattern where Claude autonomously picks up tasks:
```bash
while true; do
  COMMIT=$(git rev-parse --short=6 HEAD)
  LOGFILE="agent_logs/agent_${COMMIT}.log"
  claude --dangerously-skip-permissions \
         -p "$(cat AGENT_PROMPT.md)" \
         --model claude-opus-X-Y &> "$LOGFILE"
done
```
Key: the loop never terminates. Claude works continuously until success or hitting fundamental limits.

### Parallel Synchronization via Git
Each agent in isolated Docker containers with shared upstream repo:
1. **Task locking:** Agents claim work by writing lock files to `current_tasks/` (e.g., `parse_if_statement.txt`). Git synchronization prevents duplicate work.
2. **Merge workflow:** Pull upstream → merge → push → release lock. Merge conflicts frequent but Claude handled them autonomously.
3. **Fresh starts:** Each loop iteration spawns new Claude Code session in clean container. Context maintained through git history and documentation, NOT conversation memory.

## Critical Design Lessons

### 1. Test Harness Quality is Paramount
Direct quote from Carlini: "Claude will work autonomously to solve whatever problem I give it. So it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem."

Implementation:
- Integrated high-quality compiler test suites
- Built verifiers and build scripts for real open-source projects (SQLite, Redis, libjpeg, MQuickJS, Lua)
- CI/CD pipeline enforcement: new commits cannot break existing code
- Tests designed assuming Claude would discover failure modes humans missed

### 2. Anthropomorphic Test Design (Tests Written for Claude's Cognition)
- Limited output verbosity to prevent context window pollution
- Pre-computed aggregate statistics so Claude wouldn't waste tokens recalculating
- Maintained extensive READMEs and progress files updated frequently by agents
- Formatted errors with "ERROR" prefix on single lines for grep-friendly parsing
- Included `--fast` option running 1-10% random samples to prevent time-wasting
- Time blindness accommodation: Claude left alone will "happily spend hours running tests instead of making progress" — harness enforced fast-path testing

### 3. Parallelism Requires Task Structure
**Worked (early phase):** Many failing tests = each agent picks different test cases independently. Trivial parallelization.

**Failed (Linux kernel):** Compiling the kernel was one monolithic task. All 16 agents hit identical bugs, fixed them identically, then overwrote each other's changes. More agents = zero advantage.

**Solution — Oracle-Based Testing:** Used GCC as "known-good compiler oracle." Test harness randomly compiled most kernel files with GCC, remainder with Claude's compiler. If build succeeded, Claude's subset was fine. Failures allowed binary-search-style refinement. Enabled parallel debugging of different file combinations.

### 4. Agent Role Specialization
Deployed specialist agents rather than generic ones:
- Core compiler developers (main functionality)
- Deduplication specialist (coalescing redundant implementations)
- Performance optimizer (compiler speed)
- Code quality critic (refactoring from Rust-developer perspective)
- Documentation maintainer (keeping materials current)

Prevented bottlenecks, enabled parallel progress on orthogonal concerns.

## What Worked
- SSA Intermediate Representation: enabled multiple optimization passes
- Modular code organization: multiple agents could work simultaneously on parsing, codegen, optimization
- Git-based synchronization: simple, decentralized — no orchestration agent needed
- Deterministic subsampling: agents covered all code paths while staying efficient

## What Failed / Hit Ceilings
1. **16-bit x86 compilation:** Couldn't generate compact enough code for real-mode boot. Output exceeded 60KB when Linux kernel limited x86 16-bit to 32KB. Pragmatically delegated to GCC.
2. **Assembler/linker:** "Very last bits Claude started automating and are still somewhat buggy." Demo used GCC toolchain for these.
3. **Code generation efficiency:** Generated code less efficient than GCC with optimizations DISABLED. Stark gap even with all Claude optimizations enabled.
4. **Non-universal compilation:** Worked on many projects but not a drop-in GCC replacement.
5. **Rust code quality:** "Reasonable" but far below expert-level.
6. **Feature regression:** "New features and bugfixes frequently broke existing functionality." Even CI couldn't fully prevent this.

## Model Capability Progression
- Opus 4.0: "Barely capable of producing a functional compiler"
- Opus 4.5: First to pass large test suites; couldn't compile real projects
- Opus 4.6: Crossed threshold enabling Linux kernel compilation on multiple architectures

Each generation opened new capability frontiers.

## Metrics Table

| Metric | Value |
|--------|-------|
| Agent instances | 16 parallel |
| Duration | 2 weeks |
| Code sessions | ~2,000 |
| Output lines | 100,000 |
| Input tokens | 2 billion |
| Output tokens | 140 million |
| API cost | $20,000 |
| Test pass rate | 99% (GCC torture) |
| Architectures | x86, ARM, RISC-V |
| Real projects compiled | QEMU, FFmpeg, SQLite, PostgreSQL, Redis, Doom |

## Broader Implications and Concerns
Carlini expressed cautious optimism mixed with genuine concern:
- Autonomous development enables dramatically faster iteration but eliminates human quality gates
- Passing tests provides false confidence: "easy to see tests pass and assume the job is done, when this is rarely the case"
- Background in penetration testing: "The thought of programmers deploying software they've never personally verified is a real concern"
- "We're entering a new world which will require new strategies to navigate safely."

## How Claude Managed Itself (Without Orchestration)
Individual Claude instances:
- Identified "next most obvious problems" intuitively
- Maintained running docs of failed approaches and remaining tasks
- Took independent locks on specific features without global coordination
- Read git history to understand project state and avoid duplicate effort

## Collaborators
Josef Bacik, Edwin Chen, Bernardo Meurer Costa, Jake Eaton, Dan Kelley, Felix Klock, Jannet Park, Steve Weis, and others at Anthropic.
