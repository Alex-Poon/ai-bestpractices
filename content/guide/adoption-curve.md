---
title: "The Adoption Curve"
description: "What to expect at each stage — from skepticism through the valley of inefficiency to proficiency."
weight: 3
tags: [adoption, learning-curve, skill-development]
date: 2026-02-06
---

If you have been using AI coding tools for more than a few weeks, you have probably noticed something: the initial excitement fades. Tasks that seemed magical at first start revealing cracks. The agent makes the same category of mistake for the third time. You spend twenty minutes fixing something that should have taken five. You wonder if you were wrong about the whole thing.

You are not wrong. You are on the adoption curve, and almost everyone passes through this valley. Understanding the shape of the curve does not make the valley disappear, but it does help you avoid quitting at the point of maximum frustration -- which is exactly when you are closest to the breakthrough.

## The Honeymoon

Every practitioner starts here. The first time you watch an agent generate a working function in seconds, or produce a comprehensive test suite from a brief description, it feels like a different world. You tell colleagues. You try bigger tasks. The tool seems to understand you.

This phase is real. The capabilities are real. But your expectations are calibrating upward much faster than your skills are calibrating to the tool's actual limitations. **eli** described a well-documented pattern: users "just notice the flaws more the longer they use them." **warkdarrior** asked the question directly: "Is it possible that your expectations are increasing, not that the model is getting worse?"

The honeymoon typically lasts one to three weeks. It ends not because the tool changes but because you start encountering the failure modes that were always there. You just had not hit them yet because your early tasks were simple and well-suited to AI assistance.

## The Hangover

This is where most people drop out.

The agent starts going in circles on a task that seems straightforward. It produces plausible-looking code that has a subtle bug buried in it. It ignores a convention you explained three times. It adds a feature you did not ask for. You spend more time reviewing and fixing output than it would have taken to write the code yourself.

**postalcoder** captured the emotional dimension of this phase: with older, weaker models, you still had to do a significant amount of the thinking yourself, which forced learning. The newer models are so capable that they short-circuit the productive struggle -- until they fail, and the failure is disorienting because you were not engaged enough to see it coming.

The hangover is not a sign that the tool is bad. It is a sign that your calibration is adjusting. You are discovering the real boundaries of what works, and those boundaries are less magical than the honeymoon suggested.

Common hangover symptoms:

- **Over-delegation.** You tried a task that was too broad, and the agent produced something confidently wrong. The fix took longer than doing it from scratch.
- **Trust whiplash.** The agent nailed a hard task, so you trusted it on the next one. It failed badly. You do not know which results to trust.
- **Review fatigue.** **InfinityByTen** described the experience: after a few seconds of "thinking," you get hundreds of lines of code to review from an entity that never pushes back. The volume is overwhelming.
- **The "holding it wrong" frustration.** You read comments saying the tool works great and wonder what you are doing wrong. **dannersy** expressed the exhaustion: tired of being told AI is great if only you used it right, when the amount of knowledge required to get useful output is unreasonable. **frizlab** distilled the sentiment to a terse question that resonated widely.

## The Valley of Inefficiency

The hangover settles into a longer period where you are slower with the tool than without it, but you can see the potential. You know what needs to change -- better task scoping, more harness investment, improved verification habits -- but you have not built those muscles yet.

This is the phase where discipline matters most. The practitioners who emerge from the valley share a few characteristics:

**They invest in the harness.** Every mistake becomes an entry in AGENTS.md. Every convention the agent misses gets documented. The harness grows from real failures, not speculation. **conception** described the investment ratio that makes the valley worth crossing: invest an hour of upfront work in context and documentation, and get five hours of productive output in return.

**They tighten task scope.** Tasks get smaller and more precisely defined. Instead of "implement the settings page," it becomes "add the email validation function with these specific rules." Smaller tasks mean faster verification, which means faster loop iterations, which means faster calibration.

**They separate their learning from the tool's output.** **renegade-otter** made the analogy to physical training: use AI for the tedious repetitive work, but do the learning work yourself. "It requires discipline... sometimes you need to embrace the discomfort." **ekropotin** described an elegant split: AI agents at work where velocity matters, but deliberately coding by hand on hobby projects to maintain skills and neural connections.

**They accept non-determinism.** The tool does not produce the same output twice. **joebates** noted that skills fail 5-10% of the time with no clear pattern, making it nearly impossible to evaluate prompt improvements. The valley includes learning to work with a probabilistic collaborator rather than a deterministic compiler.

## The Breakthrough

At some point -- usually after two to four weeks of deliberate practice -- something clicks. You stop fighting the tool and start working with its grain. Task scoping becomes instinctive. The harness catches most recurring errors. Verification is fast because the tasks are properly sized. You develop what **handoflixue** described as a "trust but verify" relationship, similar to managing human collaborators: you learn what the agent is good and bad at, like learning how each employee works.

The breakthrough does not mean the tool stops failing. It means you anticipate the failure modes and have systems in place to catch them. The loop is fast enough that a failed iteration costs you minutes, not hours.

Several markers indicate you have crossed into this territory:

- You instinctively know which tasks to delegate and which to do yourself
- Your harness file is a living document that you update weekly
- You review diffs rather than reading entire files
- You start new sessions for new tasks without thinking about it
- Failed agent outputs no longer frustrate you -- they are just data

**seer** described the mental shift as "eerily similar to jump from IC to manager" -- you stop obsessing over implementation details and focus on direction, guidance, and review. If the agent chose an approach that differs from yours but the tests pass, you accept it.

## Proficiency

Proficient practitioners have internalized the loop to the point where it is invisible. They think in terms of delegatable units of work. They maintain harnesses across multiple projects. They run parallel agent sessions -- one for feature work, one for review, sometimes a third for exploration.

This is where the experience split becomes most visible. **drooby** described the dynamic bluntly: experienced developers who already know what needs to happen make AI produce quality output, while those without that foundation create "working monsters." **Oras** framed it as an architect-coder split: system design remains the human's domain, and AI handles implementation within well-designed boundaries.

**mlrtime**, with over 25 years of experience, described reaching this stage as "god mode, and it's fun again." **freediver** said something similar: the joy of building came back because the boring parts were handled. But both of these experiences were grounded in decades of prior expertise that informed their direction, review, and architectural decisions.

The proficiency stage is not a destination. Models change. Tools evolve. New failure modes appear. But the underlying skills -- task scoping, context management, verification discipline, harness engineering -- transfer across tools and models. They are the durable investment.

## The Skill Development Question

There is a tension running through the entire adoption curve that deserves direct acknowledgment.

Anthropic's own research found that AI-assisted developers learned less while coding only marginally faster. The skills most affected were debugging and comprehension -- exactly the skills you need to verify agent output effectively. **gergo_b** described the practical consequence: returning to AI-written code after two weeks and being unable to understand it, while self-written code remained immediately clear.

This creates a paradox: the more you use AI, the less equipped you become to check its work, unless you actively counteract the effect. **jbellis** offered a useful analogy: it is like arithmetic with calculators. You do not need to mentally compute large multiplications, but you should know roughly what the answer should be. Maintaining that high-level understanding -- enough to detect when something is wrong -- is the essential skill.

The practitioners who navigate this best use a combination of approaches: they engage critically with output rather than accepting it passively, they review diffs line by line, they periodically implement tasks manually, and some deliberately maintain non-AI coding practice outside of work. The adoption curve is not just about learning the tool. It is about learning the tool while preserving the judgment that makes you effective with it.

## Where You Are Is Normal

If you are in the honeymoon, enjoy it -- but start building your harness now, while motivation is high.

If you are in the hangover, know that it passes. Tighten your task scoping, invest in documentation, and resist the urge to evaluate the tool based on your worst experience.

If you are in the valley, keep going. The practitioners who emerge from it consistently say the investment was worth it. But be honest about the skill development question. Use the tool deliberately, not passively.

If you have broken through, the next page is for you too. [When It Fails](when-it-fails.html) covers the failure modes that affect even proficient users -- because the tool's limitations do not disappear with experience. They just become easier to manage.
