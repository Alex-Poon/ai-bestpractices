---
title: "My AI Adoption Journey"
source: https://mitchellh.com/writing/my-ai-adoption-journey
hn_link: https://news.ycombinator.com/item?id=46903558
date: 2026-02-05
author: Mitchell Hashimoto
tags: [adoption-strategy, agent-workflows, harness-engineering, task-scoping, claude-code]
---

# My AI Adoption Journey -- Mitchell Hashimoto

## Author Context

Mitchell Hashimoto is the creator of HashiCorp, the company behind widely-used infrastructure tools including Vagrant, Terraform, Vault, Consul, and others. He is currently working on Ghostty, a terminal emulator project. He states explicitly that he has no financial interest in any AI companies, positioning this article as a personal exploration of what has worked for him rather than a universal prescription for others. He respects that individuals may choose differently regarding AI adoption.

---

## The Six-Stage Progression Model

Hashimoto describes his AI adoption as a progressive journey through six distinct stages, each building on the calibration and confidence gained from the previous one.

---

### Stage 1: Drop the Chatbot

The first and most fundamental shift is moving beyond chat interfaces such as ChatGPT or Gemini for coding work. Hashimoto argues that chatbot-style interactions rely on hope rather than verification -- you paste code in, get a response back, and hope it works. This is particularly inefficient for brownfield projects (existing codebases) where context is deep and sprawling.

Instead, the minimum viable tool for AI-assisted coding is an agent that can:

- Read files from the codebase directly
- Execute programs and observe their output
- Make HTTP requests
- Operate in autonomous loops rather than single-shot question-and-answer exchanges

The key distinction is autonomy: an agent can iterate on its own work, run tests, observe failures, and retry -- rather than requiring the developer to manually shuttle context back and forth.

---

### Stage 2: Reproduce Your Own Work

This stage is deliberately painful. The practice is to complete tasks twice: first do the work yourself manually, then attempt the same task again through an agent. Hashimoto describes this as "excruciating" but considers it essential for building calibration about what agents can and cannot do well.

Through this reproduction phase, three critical practices emerged:

1. **Break sessions into separate, clear, actionable tasks.** Hashimoto refers to this as avoiding the "draw the rest of the owl" problem. Rather than giving an agent a vague, large objective, decompose work into discrete, well-scoped steps that the agent can realistically complete.

2. **Separate planning from execution phases.** Have the agent plan first, review the plan, and only then proceed to execution. Mixing planning and execution leads to the agent going off in unproductive directions.

3. **Give agents verification mechanisms to self-correct.** Agents perform dramatically better when they can run tests, check compiler output, or otherwise verify their own work rather than operating blindly.

The most important learning from this stage is knowing **when NOT to deploy agents**. Not every task is suitable for agent delegation, and the reproduction phase builds the judgment to distinguish between tasks where agents excel and tasks where they waste time. This prevents significant wasted effort on unsuitable work.

---

### Stage 3: End-of-Day Agents

This stage introduces strategic timing as a lever for agent productivity. The practice is to launch agents during the last 30 minutes of the workday, giving them tasks that benefit from extended unsupervised runtime.

Suitable end-of-day agent tasks include:

- **Deep research:** Exploring a codebase, reading documentation, or investigating a technical question thoroughly
- **Parallel implementation ideas:** Having the agent explore alternative approaches to a problem you have been thinking about during the day
- **GitHub issue triage:** Processing, categorizing, and drafting initial responses to accumulated issues

The benefit is that results are waiting the next morning, providing immediate momentum to start the day. This effectively extends productive hours without requiring human attention during the extended work period.

---

### Stage 4: Outsource the Slam Dunks

With the calibration built through Stages 2 and 3, you now have real confidence about which tasks agents handle reliably. At this stage, you begin delegating high-confidence tasks to agents while you perform deep work on other problems simultaneously.

The **critical insight** at this stage is to **disable agent notifications**. The reasoning is about attention management:

- You should control context-switching timing, not the agent
- Notifications create an interruption-driven workflow where the agent dictates when you shift focus
- Instead, check agent results on your own schedule, when you are at a natural stopping point in your own work

This preserves the deep work benefits of delegation rather than turning agents into another source of interruptions.

---

### Stage 5: Engineer the Harness

Hashimoto introduces the concept of **"harness engineering"** as a distinct discipline: building infrastructure specifically designed to make agents more effective. This is not about prompting or prompt engineering in the narrow sense -- it is about creating a persistent, compounding support system for agent work.

Two primary mechanisms make up the harness:

#### 1. Documentation Files (AGENTS.md / CLAUDE.md)

These are project-specific documentation files that agents read before beginning work. Their content includes:

- **Encountered mistakes and their solutions:** When an agent makes a specific error, document what went wrong and the correct approach. This prevents the same mistake from recurring across future sessions.
- **Project-specific patterns and conventions:** Coding style, architectural decisions, naming conventions, and preferred approaches that the agent would not know from the code alone.
- **Constraints and invariants the agent must respect:** Hard rules about what the agent should never do, boundaries it must stay within, and non-obvious requirements.

#### 2. Purpose-Built Tools

Beyond documentation, harness engineering involves creating tooling specifically designed for agent consumption rather than human consumption:

- **Screenshot scripts formatted for LLM consumption:** Tools that capture visual state and format it in ways that language models can parse effectively, not optimized for human viewing.
- **Filtered test runners:** Scripts that run relevant subsets of tests and present the output in a targeted way that gives the agent actionable feedback, rather than dumping the full test suite output.
- **Output formatting designed for agent parsing:** Structuring tool output so agents can reliably extract the information they need to make decisions.

The compounding nature of harness engineering is its most powerful property. Each mistake documented, each tool built, each convention captured makes every future agent session more effective. The investment accumulates over time.

---

### Stage 6: Always Have an Agent Running

The final stage is aspirational: maintaining continuous background agent work throughout the workday. Hashimoto reports currently spending roughly 10-20% of his working time with an agent running on a task.

Reaching this stage requires a shift in thinking. The developer must constantly be identifying delegable tasks -- maintaining a mental queue of work that could be handed off to an agent at any moment. The question becomes habitual: "What can I delegate right now?"

Hashimoto describes this stage as not yet fully realized for himself, but as the direction his practice is heading. The habit of continuously identifying delegation opportunities becomes second nature with practice.

---

## Tool Preferences and Practical Notes

**Primary tool:** Claude Code (Anthropic's CLI agent) provided Hashimoto with breakthrough results after an initial period of friction and adjustment.

**Speed vs. quality tradeoff:** Slower models, particularly extended reasoning or thinking modes, often produce superior results despite taking 30 or more minutes to process. Hashimoto recommends patience with longer processing times rather than defaulting to faster but less capable configurations.

**Single vs. parallel agents:** For most users, Hashimoto recommends single-agent workflows rather than running multiple agents in parallel. Parallel execution introduces coordination complexity that may not pay off until the practitioner is more experienced with agent-based workflows.

---

## Key Caveats and Honest Acknowledgments

- **Junior developer skill formation:** Hashimoto acknowledges the legitimate concern that delegating tasks to agents without first building strong fundamentals may hinder a developer's learning and growth. This is a real tension without an easy resolution.
- **No financial interest:** He reiterates having no financial stake in any AI company, lending independence to his assessment.
- **Personal framework, not universal prescription:** The six-stage model reflects his personal experience. He explicitly does not claim it is the right path for everyone.
- **Respect for individual choices:** He respects that some developers may choose not to adopt AI tooling at all, and does not frame non-adoption as a failure.

---

## Practical Recommendations Summary

1. **Start with agents, not chatbots.** The autonomous loop of reading, executing, and iterating is fundamentally different from copy-pasting into a chat window.
2. **Invest in the painful reproduction phase.** Doing tasks twice -- once manually, once with an agent -- builds irreplaceable calibration.
3. **Use strategic timing.** End-of-day agent launches extend productive hours and provide next-morning momentum.
4. **Build documentation and tooling for agents.** Harness engineering compounds over time and prevents recurring mistakes.
5. **Control notifications -- do not let agents drive your attention.** You decide when to context-switch, not the agent.
6. **Slower can be better for complex tasks.** Extended reasoning modes that take longer often produce higher-quality results.
7. **Know when NOT to use agents.** The calibration to identify unsuitable tasks is as valuable as knowing what to delegate.
