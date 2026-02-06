---
title: "Two Kinds of Vibe Coding"
source_url: "https://davidbau.com/archives/2025/12/16/vibe_coding.html"
hn_url: "https://news.ycombinator.com/item?id=46318852"
date: 2025-12-18
hn_points: 137
hn_comment_count: 26
tags: [vibe-coding, testing, ai-coding-workflow, code-review, meta-cognition]
tier: 1
weight: 8
---

## Summary

David Bau distinguishes between two fundamentally different approaches to what has broadly been called "vibe coding." The first type involves delegating small tasks to an LLM while the human programmer remains fully informed and in control, reviewing each piece of work and making all key decisions. The second type involves surrendering cognitive control to an AI agent, allowing it to build towers of complexity that go beyond what the developer has time to understand in detail.

Bau observes that students typically start with Type 1, pasting algorithm snippets while editing each function. The transition to Type 2 happens when one stops looking at all the code in detail, trusting the agent to write extensively and make autonomous decisions. This distinction matters because the two types require fundamentally different supporting infrastructure.

The article establishes two essential rules for making the second type work. First, automate tests — without automated testing, the human becomes a manual tester, repeatedly reviewing and rejecting solutions. Automated tests allow agents to validate their own work across longer development cycles. Second, test the tests — agents can produce solutions that technically pass tests without actually doing what is intended. Meta-level testing through code coverage analysis, fuzz testing, and benchmarking frameworks reveals gaps and prevents false success metrics.

The deeper insight is that effective vibe coding at scale requires building "meta-cognitive infrastructure" — systems that maintain human comprehension and control over increasingly complex agent-built codebases. Without this infrastructure, the human either becomes a bottleneck (Type 1 at scale) or loses control entirely (Type 2 without safeguards).

## Key Insights

- **Two distinct modes of AI-assisted coding**: Delegated-with-oversight versus surrendered-cognitive-control represent fundamentally different workflows requiring different infrastructure
- **Automated testing is non-negotiable for Type 2**: Without it, the human becomes the manual tester and bottleneck
- **Tests must themselves be tested**: Agents can produce solutions that pass tests without doing what is actually intended — meta-testing catches this
- **Meta-cognitive infrastructure**: Effective scaling requires systems (coverage analysis, fuzz testing, benchmarks) that maintain human comprehension over agent-built complexity
- **The transition point matters**: Moving from Type 1 to Type 2 without proper infrastructure is where projects fail

## Notable Quotes

> "Ceding cognitive control to an AI" — David Bau

> "Keeping yourself as the human 'real programmer' fully informed and in control" — David Bau

## HN Discussion Highlights

*94 comments total*

**WhyOhWhyQ**: "the last couple weeks" When I ran this experiment it was pretty exhilarating for a while. Eventually it turned into QA testing the work of a bad engineer and became exhausting. Since I had sunken ...

> **danabramov**: I believe the author explicitly suggests strategies to deal with this problem, which is the entire second half of the post. There’s a big difference between when you act as a human tester in the mi...

>> **WhyOhWhyQ**: I'm just extremely skeptical about that because I had many ideas like that and it still ended up being miserable. Maybe with Opus 4.5 things would go better though. I did choose an extremely ambiti...

>>> **stantonius**: This is so relatable it's painful: many many hours of work, overly ambitious project, now feeling discouraged (but hopefully not willing to give up). It's some small consolation to me to know other...

>> **irrationalfab**: +1... like with a large enough engineering team, this is ultimately a guardrails problem, which in my experience with agentic coding it’s very solvable, at least in certain domains.

>>> **majormajor**: Like with large engineering teams I have little faith people will suddenly get the discipline to do the tedious, annoying, difficult work of building good enough guardrails now. We don't even build...

> **newspaper1**: I've had the opposite results. I used to "vibe code" in languages that I knew, so that I could review the code and, I assumed, contribute myself. I got good enough results that I started using AI t...

>> **WhyOhWhyQ**: I've got 20 years of experience, but w/e. What have you made?

>>> **newspaper1**: I don't want to dox myself since I'm doing it outside my regular job for the most part, but frameworks, apps (on those frameworks), low level systems stuff, linux-y things, some P2P, lots of ai too...

> **stantonius**: This happened to me too in an experimental project where I was testing how far the model could go on its own. Despite making progress, I can't bare to look at the thing now. I don't even know what ...

>> **parpfish**: I’ll chime in to say that this happened to me as well. My project would start good, but eventually end up in a state where nothing could be fixed and the agent would burn tokens going in circles to...

>>> **FrinkleFrankle**: That's kind of what learning to code is like, though. I assume you're using an llm because you don't know enough to do it entirely on your own. At least that's where I'm at and I've had similar exp...

>>> **danabramov**: Curious if you have thoughts on the second half of the post? That’s exactly what the author is suggesting a strategy for.

>> **davidbau**: "I reward-hacked myself" is a great way to put it!! AI is too aware of human behavior, and it is teaching us that willpower and config files are not enough. When the agent keeps producing output th...

> **vhill**: > not only did the thing it made not end up being shippable The difference between then and now is that often with the latest models, it is shippable without bugs within a couple of LLM reviews. I’...

>> **WhyOhWhyQ**: Who are you arguing against? When did I say it wouldn't? I'm glad you like it. No need to fight me?

> **imiric**: > I think the "second way" is good for demos now. It's also good for quickly creating legitimate looking scam and SEO spam sites. When they stop working, throw them away, and create a dozen more. M...

>> **keyle**: Advertising campaigns as well, which, arguably, fits your categories.

>> **yen223**: This argument can be used to shut down anything that makes coding faster or easier. It's not a convincing argument to me.

**arkensaw**: > As AI edges humans out of the business of thinking, I think we need to be wary of losing something essential about being human If AI edges humans out of the business of thinking, then we're all i...

> **adlpz**: Agreed, conceptually. BUT. For 99% of tasks I'm totally certain there's people out there that are orders of magnitude better at them than me. If the AI can regurgitate their thinking, my output is ...

>> **latexr**: > For 99% of tasks I'm totally certain there's people out there that are orders of magnitude better at them than me. And LLMs slurped some of those together with the output of thousands of people w...

>>> **acoard**: > And LLMs slurped some of those together with the output of thousands of people who’d do the task worse, and you have no way of forcing it to be the good one every time. That's solvable though, wh...

>>> **adlpz**: > And LLMs slurped some of those together with the output of thousands of people who’d do the task worse Theoretically fixable, then. > But it can’t. Not definitively and consistently Again, it can...

>> **y0eswddl**: Only if you're less intelligent than the average. The problem with LLMs is that they will always fall to the average/mean/median of information. And if the average person is orders of magnitude bet...

>>> **adlpz**: Your comment is nonsensical. Have you ever used any LLM? Ask the LLM to... I don't know, to explain to you the chemistry of aluminium oxides. Do you really think the average human will even get rem...

>>> **woopwoop**: Do you think that the average person can get a gold on the IMO?

>> **djaouen**: > Humans may not need to think to just... do stuff. God forbid we should ever have to think lol

>>> **gedy**: It is concerning how some people really don't want to think about some things, and just "do".

>>> **alchemism**: Very Zen of you to say

>> **toobulkeh**: Imagine if everyone got the opportunity to work on SOTA. What a world we would be. Unfortunately that’s not where we’re headed.

>>> **adlpz**: We've never been there. With AI and robotics there may be the slim chance we get closer to that. But we won't. Not because AI, but because humans, of course.

> **xtiansimon**: > “…regurgitates previous human thinking.” I was thinking about this after watching YouTube short verticals for about 2 hours last night: ~2min clips from different TV series, movies, SNL skits, mu...

>> **metadope**: > a foundation I made for myself Creative thinking requires an intent to be creative. Yes, it may be a delusion to imagine oneself as creative, one's thoughts to be original, but you have to begin ...

>> **arkensaw**: > Isn’t it all regurgitated thinking all the way down? there it is

> **palmotea**: > If AI edges humans out of the business of thinking, then we're all in deep shit Also because we live under capitalism, and you need something people need you to do to be allowed to live. For a ce...

> **spicyusername**: If AI edges humans out of the business of thinking This will never happen because the business of thinking is enjoyable and the humans whose thinking matters most will continue to be intrinsically ...

>> **palmotea**: > This will never happen because the business of thinking is enjoyable and the humans whose thinking matters most will continue to be intrinsically motivated to do it. What world do you live in, wh...

>> **immibis**: Humans draw, but humans have been edged out of the business of drawing long ago.

> **jagoff**: >With no humans thinking, no advances in code will be possible. What? Coding is like the one thing that RL can do without any further human input because there is a testable provable ground truth; ...

**zkmon**: I became a big fan of David Bau about 10 years back, when I came across his conformal mapping page. My understanding of complex numbers changed forever. There is an amusing parallel with his views ...

**keyle**: I find it's ok to vibe code something digestible like a ZSH function to do X or Y. An image converter, or something along those lines. Anything that involves multiple days of work, or that you plan...

> **newspaper1**: I get a huge emotional reward by conjuring up something that I dreamed of but wouldn't have had time to build otherwise. The best description I can give is back in the day when you would beat a vid...

> **deegles**: not to be antagonistic but are we paid to learn stuff or to build stuff? I think it's the latter. if we have to learn something it's only so that we can build something in the end.

>> **zeta0134**: I am absolutely paid by the hour to learn stuff. The things I'm learning are mostly messy business domain bits: how does our internal API work, who wrote it, what were the constraints, which custom...

>>> **davidbau**: Agreed. The question, for me: Is it possible to vibe code (the second way, without looking at 90% of the code) and still learn the important things? I think the keys to the castle will come from fi...

>>> **orjfi2hsbfith**: > But the value prop of the company isn't the software, it's the ability to solve business problems. Clearly it's critical to the job, but to take your point to its limits: imagine the business has...

>> **keyle**: That's just Stockholm syndrome. Your mind went straight to the job being soulless and coping with it.

**Dr_Birdbrain**: I’m unclear what has been gained here. - Is the work easier to do? I feel like the work is harder. - Is the work faster? It sounds like it’s not faster. - Is the resulting code more reliable? This ...

> **peacebeard**: I have a feeling that the real work of writing a complex application is in fully understanding the domain logic in all its gory details and creating a complete description of your domain logic in c...

>> **joshribakoff**: Its not mutually exclusive. We write test precisely because expressing a complex application is hard without them. But to your point, we should not wave away applications that cannot be understood ...

> **stephendause**: > - Is the work faster? It sounds like it’s not faster. The author didn't discuss the speed of the work very much. It is certainly true that LLMs can write code faster than humans, and sometimes th...

**rrix2**: I've been asking for little tutorials or implementation plans for things, and demanding that the model not write any code itself. Following the advice of Geoffrey Litt.[1] I find reviewing code wri...

> **3vidence**: This is a really great idea going to try this out. I similarly just cannot mentally stand reviewing vibe coding PRs all day, but this sounds genuinely useful.

**busfahrer**: As someone new to this topic, I'd find it interesting to see the actual chat/cli log of a successful LLM-created project like this one, especially when it comes to the meta-layers of tests and test...

**ofconsequence**: > I dislike the term "vibe coding". It means nothing and it's vague. It has a clear and specific definition. People just misuse and abuse the term. Karpathy coined it to describe when you put a pro...

**charcircuit**: >keeping yourself as the human "real programmer" fully informed and in control. That's not vibe coding. That is just AI assisted coding.

**pessimizer**: I'm only doing the first kind right now - I'm not really letting the thing loose ever, even when I'm not great at the language it's writing in. I'm constantly making it refactor and simplify things...

**wrs**: Aaargh, I hate it when useful terms get diffused to meaninglessness. No, there’s one kind of vibe coding. The definition of vibe coding is letting the LLM write the code and not looking at it. That...

> **doctoboggan**: I agree with you that there is one original definition, but I feel like we've lost this one and the current accepted definition of vibe coding is any code is majority or exclusively produced by an ...

> **platevoltage**: I have no idea why an experienced developer who uses LLM's to make them more productive would want to degrade their workflow by calling it "vibe coding".

>> **ares623**: It’s a chance to become the next Uncle Bob in a new era of software

> **christophilus**: Yeah. I agree the distinction is important, but it’s already been lost. Maybe, we need a new phrase to describe “a product you absolutely cannot trust because I blindly followed a non-deterministic...

> **pessimizer**: > Aaargh, I hate it when useful terms get diffused to meaninglessness. I think that when you say this, you have an obligation to explain how the term "vibe coding" is useful, and is only useful by ...

>> **wrs**: People definitely are doing that. Anyone who is not a programmer and asks the LLM to write a program is doing exactly that. The LLM will do that itself behind the scenes nowadays (yesterday Claude ...

> **brikym**: It needs a short concise name. Vibe-cod-ing is catchy. Ell-Ell-Em-Cod-ing isn't.

> **francisofascii**: At this point I think it is no longer a binary yes/no but rather a nebulous percentage. For example, this codebase was 90% vibe coded, leaving 10% that was edited manually or reviewed.

> **dbtc**: In that case, "blind" would be more accurate.

> **hackable_sand**: I'm ngl, when I first heard "vibe coding" I immediately imagined programming from memory.

>> **parpfish**: My mind went… elsewhere. Specifically, the gutter. https://en.wikipedia.org/wiki/Teledildonics

>>> **bitwize**: Unsurprisingly, the Rust community has you covered there also: https://github.com/buttplugio/buttplug https://github.com/Gankra/cargo-mommy (has integration with the former)

>>> **hackable_sand**: Ooooh very interesting

> **exe34**: you're still allowed to alternate between letting it do and consolidating, no?

>> **acedTrex**: no, vibe coding is explicitly NOT looking at the output.

>>> **MisterTea**: From my understanding, the vibe part means you go along with the vibe of the LLM meaning you don't question the design choices the LLM makes and you just go with the output it hands you.

>>> **exe34**: okay so I'm not vibe coding, I'm just writing shittier code than before.

**gaigalas**: There's something wrong with this vibe coded stuff, any kind of it. _It limps faster than you can walk_, in simple terms. At each model release, it limps faster, but still can't walk. That is not a...

**dash2**: I tried the new vibe-coded Mandelbrot viewer and it didn't seem to work well on Safari. I could only get it to zoom in once, and most of the keys didn't work. Maybe the author hasn't done enough ma...

> **davidbau**: Right. Just saw this thread. Yesterday asked claude+codex to add a fallback to WebGL support (another 5000 LoC!). So now it works a bit better on Linux, Safari, though the WebGL impl is not as smoo...

**cornhole**: it took me a bit to figure out my aversion to ai usage in programming, but it comes down to the fact that i like building the thing instead of telling the computer to do it in detailed ways. if i w...

**satisfice**: This article is premised on a shallow notion of testing. Because of this, the author lacks a conceptual toolkit to discuss product risk. He speaks of the most important part of the testing process ...

> **davidbau**: Fair. Let me be more precise. The distinction is between two ways of deploying human thinking. In the first, you are the test oracle: think about every test, repeat every five minutes, or every 30....

**jackfranklyn**: The "going in circles" problem several people mention seems like the key thing to watch for. In my experience it tends to happen when the codebase outgrows what the model can hold in context effect...

> **darkstar_16**: I do the same. Directed tasks with smaller context and start a new "chat" when it's done what I want.

**predkambrij**: Things about those approaches did and will change more when LLMs are getting better. I got some unbelievable good results back in March, then I was tasking LLMs too hard problems and got bunch of f...

**agumonkey**: I asked absurd question to chatgpt 4o when it came out, by mixing haskell and lisp books terminology (say design an isomorphic contravariant base class so that every class fills ). The result was s...

**alyxya**: I don’t think the two kinds of vibe coding are entirely separate. There’s a spectrum of how much context you care to understand yourself, and it’s feasible to ask a lot of questions to gain more un...

**TYPE_FASTER**: > It is when you use a coding agent to build towers of complexity that go beyond what you have time to understand in any detail. I think the quality of the product depends on the person (or people)...

**anthk**: LLM's forget the context fast. Better if you learn programming the hard way. With books, either physical or PDF/EPUB's.

**geldedus**: Neither is vibe coding. Both are AI-assisted programming, a different species. Classical mislabelling.

**latexr**: > The second type of vibe coding is what I am interested in. It is when you use a coding agent to build towers of complexity that go beyond what you have time to understand in any detail. I am inte...

**epgui**: Am I the only one who, rather than being impressed, is recoiling in horror?

**bloppe**: Someone should start an anthology of posts claiming "I vibe-coded this toy project. Software Engineering is dead."

> **ubertaco**: I bet we could vibe-post a bunch of them, even! Blogging is dead!
