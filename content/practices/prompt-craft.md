---
title: "Prompt Craft"
description: "Writing effective prompts for coding agents — from simple instructions to complex architectural guidance."
weight: 5
tags: [prompts, instructions, context-engineering]
date: 2026-02-06
---

Prompt craft is the skill of communicating effectively with AI coding agents. It is not the most important skill in AI-assisted development -- [task scoping](../task-scoping.html) and [verification](../verification.html) matter more -- but it is the interface through which every other skill is expressed. A well-scoped task still needs to be communicated clearly. A well-built harness still needs to be written in language the agent processes reliably.

The key insight practitioners have converged on: prompt craft is less about clever techniques and more about providing the right context. The model's behavior is dominated by what you put in front of it, not by how cleverly you phrase the request.

## What Prompt Craft Is

Prompt craft encompasses three activities:

1. **Instruction writing**: Telling the agent what to do in a single interaction.
2. **Context engineering**: Deciding what information the agent needs to see and in what order.
3. **Persistent documentation**: Writing AGENTS.md files, skills, and system-level instructions that shape every interaction.

Activity 3 overlaps heavily with [harness engineering](../harness-engineering.html). The distinction is that harness engineering is about the infrastructure (files, tools, scripts), while prompt craft is about the language within that infrastructure.

## Why Context Dominates Technique

As models improve, the marginal return on prompt engineering tricks diminishes. A strong model with a simple, well-contextualized prompt increasingly outperforms a weak model with an elaborate prompt. The optimization priority should be: choose the best available model first, then provide the right context, then refine your phrasing.

**energy123** maintains a 15k-token markdown file containing the full project world model -- use cases, principles, requirements, and guardrails -- that goes into every prompt. The result: over repeated inferences, the codebase converges toward the desired state. The investment is in context, not in prompt tricks.

**smhinsey** observed a "strange insistence on not helping the LLM" among practitioners -- treating AI as a black box you throw requests at rather than a collaborator you equip with information. Describing data structures, algorithms, and solution architecture alongside your request dramatically improves output. People resist this, like watching a "John Henry legend in real time."

**hug** provided a philosophical defense of why good prompting matters: it is the primary interface. Those who prompt poorly and complain about results are within the scope of the advice to improve their approach. But this is not victim-blaming -- it is acknowledging that communication skill is a real and learnable factor.

## How to Write Effective Prompts

### Principle 1: Be Specific About the Outcome

Vague goals produce vague results. "Make this code better" gives the agent no target. "Extract the validation logic from this 200-line function into separate functions, one per validation rule, maintaining the same execution order" gives the agent a concrete specification.

The more precisely you can describe the desired state, the more likely the agent is to reach it. This connects directly to task scoping: a well-scoped task is inherently easier to describe precisely.

### Principle 2: Provide Examples, Not Just Rules

Agents follow demonstrated patterns more reliably than stated rules. If you want a specific coding style, show it. If you want a particular error-handling approach, include an example. **chickensong** found that defining code styles in a design document and setting up initial examples in key files produces much better adherence than stating rules abstractly.

This principle applies to AGENTS.md files as well. A rule that says "use functional error handling" is less effective than a rule that says "use functional error handling" followed by a 5-line code example of the pattern.

### Principle 3: State Constraints Explicitly

The agent does not know what it does not know. Constraints that are obvious to you are invisible to the agent unless you state them:

- "Do not modify files outside the /src/auth/ directory."
- "This function must remain backwards-compatible with the existing API."
- "Do not add new dependencies."
- "The solution must work with Node 18."

Each unstated constraint is an opportunity for the agent to produce plausible but wrong output.

### Principle 4: Frame Instructions as Policy

**thom** identified the key to making agents follow instructions: frame docs as policy the agent must follow, not as reference material it can optionally consult. The difference between "here is how we handle errors" (informational) and "you must handle errors this way" (prescriptive) is significant for agent compliance.

Models are, as **thom** put it, "wildly overconfident but utterly obsequious." They will confidently ignore guidelines they interpret as suggestions while dutifully following rules they interpret as mandates.

### Principle 5: Front-Load the Most Important Information

**guluarte** reported that in practice, agents follow the first two or three lines of AGENTS.md and selectively ignore instructions deeper in the file. As context grows, attention to later instructions degrades.

Practical implication: put your most critical rules first. Put "never do X" rules before "prefer Y" guidelines. Put architectural constraints before style preferences. The information the agent must never ignore goes at the top.

**aaroninsf** found an additional 14% improvement just from mentioning AGENTS.md in the first 16 lines of the README -- increasing the probability that the agent loads the documentation at all.

### Principle 6: Use Structured Formats

Agents parse structured formats (bullet points, numbered lists, headers, do/don't comparisons) more reliably than narrative prose. A prompt that says:

```
**Do:**
- Use date-fns for date manipulation
- Return typed errors, not thrown exceptions
- Include JSDoc for public functions

**Do Not:**
- Import from the legacy utils package
- Use any/unknown types
- Catch errors silently
```

is more effective than the equivalent information written as a paragraph.

### Principle 7: Include Verification Instructions

Tell the agent how to verify its own work. "After implementing, run `npm test` and confirm all tests pass." "After making changes, verify the build succeeds with `cargo build`." This leverages the agent's tool-calling ability to self-check before presenting results to you.

**wongarsu** found that giving agents verifiable goals like "make these unit tests pass" produces significantly better outcomes than open-ended implementation requests. The verifiable goal creates a feedback loop the agent can use to self-correct.

## Writing AGENTS.md Files

The AGENTS.md file (or CLAUDE.md for Claude Code) is the most durable form of prompt craft. It shapes every interaction without requiring you to repeat yourself.

### Structure That Works

Based on Vercel's evaluation and practitioner consensus, effective AGENTS.md files share these characteristics:

**Compressed, not verbose.** Aggressively compressed documentation performs as well as full content in evals. Concise rules work better than lengthy explanations.

**Organized by priority.** Critical constraints first, style preferences later. The agent's attention to later sections degrades as context fills.

**Empirically grown.** Start small. Add entries only when you observe actual mistakes. The best AGENTS.md files are collections of corrections, not speculative guidelines.

**Action-oriented.** "Always do X" and "never do Y" rather than "consider whether X might be appropriate." Remove ambiguity.

### The Scaling Problem

Static AGENTS.md works well for small to medium projects. For large projects with many procedures, the document exceeds useful context limits. The resolution, as discussed in [harness engineering](../harness-engineering.html), is to split between always-loaded critical rules and on-demand skills for specialized workflows.

**hu3** is experimenting with splitting a large AGENTS.md into smaller SKILL.md files, though worried the agent might skip loading some of them. The 5-10% skill invocation failure rate that **joebates** reported suggests this concern is valid.

## Prompting for Different Modes

### Planning Prompts

When using the agent to explore a problem space:
- Ask open-ended questions about tradeoffs
- Request multiple approaches with pros and cons
- Ask the agent to identify risks and edge cases
- Do not ask for code yet -- keep the conversation at the design level

### Implementation Prompts

When delegating execution:
- Provide the spec (function signature, expected behavior, edge cases)
- Reference the relevant existing code
- State constraints explicitly
- Include verification instructions

### Debugging Prompts

When investigating failures:
- Include the error message and stack trace
- Describe what you expected vs. what happened
- Indicate what you have already tried
- Ask for hypotheses before fixes

### Review Prompts

When asking the agent to review code:
- Specify what to focus on (security, performance, correctness, style)
- Ask for specific concerns, not generic approval
- Request the agent to identify what is missing, not just what is wrong

## Anti-Patterns

### The Wall of Text

Providing so much context that the agent drowns in information. Context windows are finite, and attention degrades with length. **conception** warned that after context window compaction, sessions become "more or less useless." Include only what the agent needs for this specific task.

### Prompt-and-Pray

Firing off a prompt and hoping for the best without providing context, constraints, or examples. This is the most common mistake practitioners make and the source of most complaints about model quality.

**Fix:** Invest the "hour of setup" that **conception** described. Provide context, examples, and constraints. The agent cannot read your mind.

### Fighting the Agent's Defaults

Spending more time overriding the agent's preferences than it would take to write the code yourself. **nonethewiser** described fighting Claude's preference for ReactRouter, eventually concluding it was pointless when the agent's default works correctly.

**Fix:** Pick your battles. Fight the agent on architectural decisions and security constraints. Accept its preferences on implementation details that do not matter. If the choice genuinely does not affect quality, let it go.

### Copy-Paste Prompting

Reusing the same prompt across different projects or contexts without adaptation. Prompts that worked on one codebase may fail on another because the implicit context has changed.

**Fix:** Externalize the reusable parts into AGENTS.md and keep per-task prompts focused on the specific task.

### Anthropomorphizing Intent

Assuming the agent "understands" your goal when it is simply pattern-matching on your text. **serial_dev** described the agent claiming "I can clearly see the issue now" ten times -- always wrong. The agent's confident tone does not indicate comprehension.

**Fix:** Verify the output rather than trusting the agent's self-assessment. Rely on tests and review, not on the agent's explanation of what it did.

## Evidence

**energy123** (HN, thread 46550710): Maintains a 15k-token markdown file with the full project world model injected into every prompt. Over time, the codebase converges toward the desired state.

**smhinsey** (HN, thread 46790769): Observes a "strange insistence on not helping the LLM." Describing data structures and architecture alongside requests dramatically improves output.

**chickensong** (HN, thread 46797040): Defining code styles in design docs and setting up initial examples in key files produces much better pattern adherence.

**thom** (HN, thread 46817363): Frame documentation as policy the agent must follow, not as reference material. Models are responsive to authority framing.

**guluarte** (HN, thread 46827212): Agents follow the first two or three lines of AGENTS.md and selectively ignore deeper instructions.

**hug** (HN, thread 46547792): Philosophical defense of prompt quality as valid criticism. The prompt is the primary interface; communication skill is a learnable factor.

**conception** (HN, thread 46549865): "Put in an hour of work, get five hours out." Most people skip the setup investment and then wonder why output is poor.

**nonethewiser** (HN, thread 46799218): Fighting the agent's preference for ReactRouter was pointless. Accept defaults when the choice does not affect quality.
