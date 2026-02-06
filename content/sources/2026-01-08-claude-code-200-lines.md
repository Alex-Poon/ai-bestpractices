---
title: "How to Code Claude Code in 200 Lines of Code"
source_url: "https://www.mihaileric.com/The-Emperor-Has-No-Clothes/"
hn_url: "https://news.ycombinator.com/item?id=46545620"
date: 2026-01-08
hn_points: 816
hn_comment_count: 70
tags: [claude-code, agent-architecture, tool-calling, coding-agents, demystification]
tier: 1
weight: 2
---

## Summary

Mihail Eric's article, provocatively titled "The Emperor Has No Clothes," argues that AI coding assistants are not magical — they follow a simple architectural loop. The user sends a request, the LLM decides which tools to call, your code executes those tools locally, and the results flow back to the LLM for context. The critical mental model is that the LLM never actually touches your filesystem; it asks for things to happen, and your code makes them happen.

The author demonstrates that only three fundamental tools are sufficient for a functional coding agent: read files (examine code), list files (navigate projects), and edit files (create and modify). The implementation uses a straightforward tool registry where functions are registered with detailed docstrings that the LLM uses to reason about which tools to deploy. Communication uses structured calls in a defined format rather than direct file manipulation, keeping concerns separated.

The architecture centers on a conversation loop that enables tool chaining — the agent reads a file, edits it based on the content, then confirms the result, all within a single user request. Tool descriptions are generated from function signatures and docstrings, reducing maintenance overhead. Dynamic tool registration makes the system extensible.

The article acknowledges that production implementations add significant complexity: error handling, streaming responses, context management, additional tools (bash, grep, web search), and approval workflows. But the core loop — the fundamental architecture — remains identical to this simple 200-line version. The piece serves to demystify what coding agents actually do, lowering the barrier to building custom agents and understanding the limitations of existing ones.

## Key Insights

- **The core loop is simple**: User request, LLM tool selection, local execution, results back to LLM — this is the entire architecture
- **Three tools suffice**: Read files, list files, and edit files are enough for a functional coding agent
- **LLMs never touch your filesystem**: They request actions; your code executes them — understanding this separation is key
- **Production complexity is in the scaffolding**: Error handling, streaming, context management, approval workflows, and additional tools are what distinguish production agents from the core loop
- **Tool descriptions drive behavior**: Detailed docstrings on registered tools are how the LLM reasons about what to use and when
- **Demystification enables customization**: Understanding the simple core makes it practical to build custom agents for specific workflows

## Notable Quotes

> "The LLM never actually touches your filesystem." — Mihail Eric

## HN Discussion Highlights

*193 comments total*

**lmeyerov**: Something I would add is planning. A big "aha" for effective use of these tools is realizing they run on dynamic TODO lists. Ex: Plan mode is basically bootstrapping how that TODO list gets seeded...

> **btown**: I'm unsure of its accuracy/provenance/outdatedness, but this purportedly extracted system prompt for Claude Code provides a lot more detail about TODO iteration and how powerful it can be:...

>> **lmeyerov**: I find in coding + investigating there's a lot of mileage to being fancier on the todo list. Eg, we make sure timestamps, branches, outcomes, etc are represented.  It's impressive how far they get...

>>> **btown**: Ooh, am I reading correctly that you're using the filesystem as the storage for a "living system prompt" that also includes a living TODO list? That's pretty cool! And on a separate note - it looks...

>>> **jodleif**: For humans org-mode is good at this

>> **homarp**: aren't the system prompt of Claude public in the doc at https://platform.claude.com/docs/en/release-notes/system-pro... ?

>>> **Stagnant**: The system prompt of claude code changes constantly. I use this site to see what has changed between versions: https://cchistory.mariozechner.at/ It is a bit weird why anthropic doesn't make that...

>>> **btown**: This is for Claude Code, not just Claude.

>> **what**: From elsewhere in that prompt: > Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked. When did they add this? Real shame because the abundance of emojis in a...

> **rrvsh**: I've had a LOT of success keeping a "working memory" file for CLI agents. Currently testing out Codex now, and what I'll do is spend ~10mins hashing out the spec and splitting it into a list of...

>> **tacone**: I use a folder for each feature I add. The LLM is only allowed to output markdown file in the output subfolder (of course it doesn't always obey, but it still limits pollution in the main folder) The...

> **fastball**: Planning mode actually creates whole markdown files, then wipes the context that was required to create that plan before starting work. Then it holds the plan at the system prompt level to ensure it...

>> **ramoz**: I don’t think it wipes the context window.

> **matchagaucho**: The TODO lists are also frequently re-inserted into the context HEAD to keep the LLM aware of past and next steps. And in the event of context compression, the TODO serves as a compact representation...

> **dboon**: I’m a DIY (or, less generously and not altogether inaccurately, NIH) type who thinks he could do a good job of smarter context management. But, I have no particular reason to know better than anyone...

>> **lmeyerov**: I'm optimistic most people can, given the time and resources In the CCC video, you may enjoy the section on how we are moving to eval-driven AI coding for how we more methodically improve agents....

> **shnpln**: Oh yes, I commonly add something like "Use a very granular todo list for this task" at the end of my prompts. And sometimes I will say something like "as your last todo, go over everything you just...

>> **hadlock**: Right now I start chatting with a separate LLM about the issue, the best structure for maintainability and then best libraries for the job, edge and corner cases, how to handle those, and then have...

>>> **shnpln**: Yeah, this is a good idea. I will have a Claude chat session and a Claude Code session open side by side too. Like a manual sub agents approach. I try not to pollute the Claude code session context...

>> **renjimen**: If you have pre-commit hooks it should do this last bit automatically, and use your project settings

>>> **shnpln**: Yes, I do. But it does not always use them when I change contexts. I just get in the habit of saying it. Belt and suspenders approach.

> **sathish316**: It’s surprising how simple TodoWrite and TodoRead tools are in planning and making sure an Agent follows the plan. This is supposed to be an emulator of Claude’s own TodoWrite and TodoRead, which...

>> **sathish316**: Complex planning and orchestration for Multi-step usecases or persistent Todo lists is achievable by spinning up your own tools that does something similar to this. By extending Claude Todo emulator,...

> **veselin**: I run evals and the Todo tool doesn't help most of the time. Usually models on high thinking would maintain Todo/state in their thinking tokens. What Todo helps is for cases like Anthropic models to...

>> **lmeyerov**: Curious what kinds of evals you focus on? We're finding investigating to be same-but-different to coding. Probably the most close to ours that has a bigger evals community is AI SRE tasks. Agreed wrt...

>>> **veselin**: I am taking for SWE bench style problems where Todo doesn't help, except for more parallelism.

> **jcims**: Mind if I ask what models you’re using for CTF?  I got out of the game about ten years ago and have been recently thinking about doing my toes back in.

>> **lmeyerov**: Yep -- one fun experiment early in the video is showing sonnet 4.5 -> opus 4.5 gave a 20% lift We do a bit of model-per-task, like most calls are sending targeted & limited context fetches into...

>>> **jcims**: Nice! Thank you! I just did an experiment yesterday with Opus 4.5 just operating in agent mode in vscode copilot.  Handed it a live STS session for AWS to see if it could help us troubleshoot an...

> **bdangubic**: at the end of the year than you get “How to Code Claude Code in 200 Million Lines of Code” :)

> **redanddead**: ironic how the peak of code is a TODO list app

**libraryofbabel**: It's a great point and everyone should know it: the core of a coding agent is really simple, it's a loop with tool calling. Having said that, I think if you're going to write an article like this and...

> **bredren**: I've been exploring the internals of Claude Code and Codex via the transcripts they generate locally (these serve as the only record of your interactions with the products)[1]. Given the stance of...

>> **jake-coworker**: IMO these articles are akin to "Twitter in 200 lines of code!" and "Why does Uber need 1000 engineers?" type articles. They're cool demos/POCs of real-world things, (and indeed are informative to...

>>> **tomtomtom777**: > IMO these articles are akin to "Twitter in 200 lines of code!" I don't think it serves the same purpose. Many people understand the difference between a 200 lines twitter prototype and the real...

>> **d4rkp4ttern**: Nice, I have something similar [1], a super-fast Rust/Tantivy-based full-text search across Claude Code + Codex-CLI session JSONL logs, with a TUI (for humans) and a CLI/JSONL mode for agents. For...

>> **dnw**: That is a cool tool. Also one can set "cleanupPeriodDays": in ~/.claude/settings.json to extend cleanup. There is so much information these tools keep around we could use. I came across this one the...

>> **Johnny_Bonk**: This is very interesting, especially if you could then use an llm across that search to figure out what has and maybe has not been completed, and then reinject those findings into a new Claude code...

>>> **bredren**: I haven't written the entry yet but it is pretty incredible what you can get when letting a frontier model RAG your complete CLI convo history. You can find out not just what you did and did not do...

>>> **handfuloflight**: For that you'd be better off having the LLM write TODO stubs in the codebase and search for that. In fact, most of the recent models just do this, even without prompting.

>> **lelanthran**: > So "200 lines" captures the concept but not the production reality of what is involved. How many lines would you estimate it takes to capture that production reality of something like CC? I ask...

>>> **foltik**: My guess is <5k for a coherent and intentional expert human design. Certainly <10k. It’s telling that they can’t fix the screen flickering issue, claiming “the problem goes deep.”

> **misternugget**: Hey! Thorsten Ball here. Thanks for the shout-out. I was quite confused when someone sent me this article: same "Emperor has no clothes", same "it's only x hundred lines", implements the same tools,...

>> **libraryofbabel**: Hi! Thanks again for writing that first Emperor Has No Clothes blog post; like I said, it really inspired me and made everything click early on when I was first dipping my toes into the world of...

>> **justanotherprof**: Many thanks for your article, it was one of the true "aha" moments for me in 2025! It is a shame that your work is apparently being appropriated without attribution to sell an online course...

> **aszen**: The most imp part is editing code, to do that reliably Claude models are trained on their own str replace tool schema I think. Models find it hard to modify existing code, they also can't just...

>> **embedding-shape**: Here's where I was hoping openly available models would shine. Some community gets together, starts sharing successful/failed runs with their own agent, start building a open dataset for their...

>> **libraryofbabel**: Yeah, there is definitely some RLVR training going on for the Claude LLMs to get them good at some of the specific tool calls used in Claude Code, I expect. Having said that, the string replacement...

>>> **aszen**: Yeah that's one example, but I suspect they train the model on entire sequences of tool calls, so unless you prompt the model exactly as them you won't get the same results. There's a reason they won...

> **alansaber**: Ah I just assumed it was the same article reposted

> **justanotherprof**: I am glad you pointed out Thorsten Ball's truly excellent article: I was about to add a comment to that effect!

> **KellyCriterion**: can you show us the >>core of a coding agent which is, according to your words, >>really simple and would you mind sharing a URL so I could check it out then?

>> **libraryofbabel**: It's in TFA or in the https://ampcode.com/how-to-build-an-agent article I linked? Or is that not what you're looking for?

>>> **KellyCriterion**: Sorry, sounded like "your version", instead of the one listed :-)

**joshmlewis**: This is cool but as someone that's built an enterprise grade agentic loop in-house that's processing a billion plus tokens a month, there are so many little things you have to account for that...

> **visarga**: A quick glance over the 200 LOC impl - I see no error handling. This is the core of the agent loop, you need to pass some errors back to the LLM to adapt, while other errors should be handled by the...

> **joebates**: Please do! This sounds way more interesting than a simple coding loop agent (not to knock the blog)

> **handfuloflight**: > I should start a blog with my experience from all of this. Please do.

**jacob019**: Seems everyone is working on the same things these days. I built a persistent Python REPL subprocess as an MCP tool for CC, it worked so insanely well that I decided to go all the way. I already had...

> **giancarlostoro**: >  there's a threshold past which Claude loses the forest for the trees and makes the same mistakes over and over. Try using something like Beads with Claude Code. Also don't forget to have a...

>> **jacob019**: Ohh, looks interesting, thanks for the tip! Git as db is clever, and the sqlite cache is nice. I'd been sketching sqlite based memory features myself. So much of the current ecosystem is suboptimal...

>>> **giancarlostoro**: I am working on a strict sqlite alternative to Beads as an experiment so far it works.

> **freehorse**: This sounds really cool! I love the idea behind it, the agent having persistent access to a repl session, as I like repl-based workflows in general. Do you have any code public from this by any...

>> **jacob019**: https://github.com/jacobsparts/agentlib See CodeAgent or subrepl.py if you're just interested in the REPL orchestration. I also have a Python REPL MCP server that works with CC. It isn't published,...

>>> **dunk010**: I request you to publish it! :-D

>>> **freehorse**: Thanks!

**nyellin**: There's a bit more to it! For example, the agent in the post will demonstrate 'early stopping' where it finishes before the task is really done. You'd think you can solve this with reasoning models,...

> **d4rkp4ttern**: Yes this “premature termination”, becomes particularly evident when you switch out Opus/Sonnet with a weaker LLM, and also happens more often in Codex CLI with GPT-5. Since one of the replies asked...

> **rtgfhyuj**: why would it early stop?  examples?

>> **mickeyp**: Models just naturally arrive at a conclusion that they are done. TODO hints can help, but is not infallible: Claude will stop and happily report there's more work to be done and "you just say the...

>>> **wxce**: > this is a RL problem where you have to balance the chance of an infinite loop (it keeps thinking there's a little bit more to do when there is not) versus the opposite where it stops short of...

>> **embedding-shape**: Not all models are trained with long one-shot task following by themselves, seems many of them prefer closer interactions with the user. You could always add another layer/abstraction above/below to...

>>> **fastball**: Can't this just be a Ralph Wiggum loop (i.e. while True)

**prodigycorp**: This article was more true than not a year ago but now the harnesses are so far past the simple agent loop that I'd argue that this is not even close to an accurate mental model of what claude code...

> **qsort**: Obviously modern harnesses have better features but I wouldn't say it invalidates the mental model. Simpler agents aren't that far behind in performance if the underlying model is the same, including...

>> **prodigycorp**: You’re not wrong but I still think that the harness matters a lot when trying to accurately describe Claude Code. Here’s a reframing: If you asked people “what would you rather work with, today’s...

>>> **aszen**: I don't think so, model improvements far outweigh any harness or tooling. Look at https://github.com/SWE-agent/mini-swe-agent for proof

>>> **rfw300**: Any person who would choose 3.7 with a fancy harness has a very poor memory about how dramatically the model capabilities have improved between then and now.

>>> **nl**: This is SO wrong. I actually wrote my own simple agent (with some twists) in part so I could compare models. Opus 4.5 is in a completely different league to Sonnet 4.5, and 3.7 isn't even on the same...

> **alright2565**: But does that extra complexity actually improve performance? https://www.tbench.ai/leaderboard/terminal-bench/2.0 says yes, but not as much as you'd think. "Terminus" is basically just a tmux session...

>> **prodigycorp**: I'm not a good representative for claude code because I'm primarily a codex user now, but I know that if codex had subagents it would be at least twice as productive. Time spent is an important...

>>> **nyellin**: Not necessarily true. Subagents allow for parallelization but they can decrease accuracy dramatically if you're not careful because there are often dependencies between tasks and swapping context...

>>> **terminalshort**: Are subagents a fundamental change, or just acting as inner loops to the agentic loop similar to the one in the article?

> **lukan**: The article was also published one year ago on january 2025. (Should have 2025 in the title? Time flies)

>> **llmslave2**: Claude Code didn't exist in January 2025. I think it's a typo and should be 2026.

>>> **prodigycorp**: You’re right. No wonder the date felt odd. iirc Claude code was released around march.

> **CuriouslyC**: Less true than you think. A lot of the progress in the last year has been tightening agentic prompts/tools and getting out of the way so the model can flex. Subagents/MCP/Skills are all pretty mid,...

>> **prodigycorp**: All of these things you mentioned are put into a footnote of the article.

> **dkdcio**: it seems to have changed a ton in recent versions too — I would love more details on what exactly I find it doing what I in the past had to interrupt and tell it to do fairly frequently now

>> **terminalshort**: For one thing it seems to splitting up the work and making some determination of complexity, then allocating it out to a model based on that complexity to save resources.  When I run Claude with Opus...

>>> **nyellin**: Haiku is called often, but not always the way you think. E.g. every time you write something CC invokes Haiku multiple times to generate the 'delightful 1-2 word phrase used to indicate progress to...

> **pama**: Agreed. You can get a better model using the codex-cli repo and having an agent help you analyze the core functionality.

> **splike**: I'm interested, could you expand on that?

>> **prodigycorp**: Off the top of my head: parallel subagents, hooks, skills, and a much better plan mode. These features enable way better steering than we had last year. Subagents are a huge boon to productivity.

>>> **rtgfhyuj**: are subagents just tools that are agents themselves?

**floppyd**: > This is the key insight: we’re just telling the LLM “here are your tools, here’s the format to call them.” The LLM figures out when and how to use them. This really blew my mind back then in the...

> **utopiah**: Tools documentation is in text, either directly e.g. tool -h or indirectly e.g. man tool plus they are countless examples of usage online, so it seems clear that a textual mapping between the tool...

> **voidhorse**: Running a command in a shell is a string of text. LLMs produce text and it's easy to write a program that then executes that text as a process. I don't see what's magical about it at all.

> **naasking**: It would seem magical if you think of LLMs as token predictors with zero understanding of what they're doing. This is evidence that there's more going on though.

**ofirpress**: We (the SWE-bench team) have a 100 line of code agent that is now pretty popular in both academic and industry labs: https://github.com/SWE-agent/mini-swe-agent I think it's a great way to dive into...

**miki123211**: All you actually need is 50 lines and one tool. If your agent can execute Bash commands, it can do anything, including reading files (with cat), writing them (with sed / patch / awk /perl), grepping,...

**sams99**: For those interested, edit is a surprisingly difficult problem, it seems easy on the surface but there is both fine tuning and real world hallucinations you are fighting with. I implemented one this...

**ulaw**: How many Claudes could Claude Code code if Claude Code could code Claude?

> **Okkef**: Claude has a nice answer to your riddle: Claude Code could code all the Claudes Claude Code could code, because Claude Code already coded the Claude that codes Claude Code. Or more philosophically:...

> **tuhgdetzhh**: "if Claude Code could code Claude?" Claude Code already codes Claude Code. The limit is set by the amount of GPUs and energy supply.

>> **handfuloflight**: The human element of the Anthropic organization also has some limits placed there.

**dmvaldman**: This misses that agentic LLMs are trained via RL to use specific tools. Adding custom tools is subpar to those the model has been trained with. That's why Claude Code has an advantage, over say,...

> **firloop**: But if one were to write tools that were "abi-compatible" with Claude Code's, could you see similar performance with a custom agent? And if so - is Cursor not doing just that?

>> **yencabulator**: Part of that is likely that Claude Code tools keep changing a little. Imitating them is chasing a moving target.

> **mikmoila**: Are they really? I've been under impression that agentic LLMs are just instances of the LLMs, no "specialized training" involved

**m-hodges**: Also relevant: You Should Write An Agent¹ and, How To Build An Agent.² ¹ https://fly.io/blog/everyone-write-an-agent/ ² https://ampcode.com/how-to-build-an-agent

**mirzap**: The "200 lines" loop is a good demo of the shape of a coding agent, but it’s like "a DB is a B-tree" - technically true, operationally incomplete. The hard part isn’t the loop - it’s the boring...

**tptacek**: What's interesting to me about the question of whether you could realistically compete with Claude Code (not Claude, but the CLI agent) is that the questions boil down to things any proficient...

> **libraryofbabel**: This is a great point, although I would add that Anthropic has a possible slight advantage, as they can RLVR the Claude LLMs themselves on Claude Code tool calls and Claude Code tasks. Having said...

> **NitpickLawyer**: >  the Charmbracelet people have as much of a shot at building something truly exception as Anthropic does. Yes and no. OpenCode is a great example of yes. But at the same time Anthropic gets to...

>> **tptacek**: Anthropic has obvious advantages and I'm not saying there's a level playing field (they also have the financial resources of a mid-sized industrialized nation). I'm saying that there's an absolute...

> **embedding-shape**: > No matter how much I'd want to try, I have no hope of building a competitive frontier model A single person, probably not. But a group of dedicated FOSS developers who together build a wide...

> **maurycy**: Maybe not necessarily and the Claude model is fine-tuned for `claude`, so no one can really replicate the experience without unlocking some secret mode in the model. The other comments about editing...

**vinhnx**: This reminds me of Amp's article last year[1]. I building my own coding agent [2]. Two goals: understand real-world agent mechanics and validate patterns I'd observed across OpenAI Codex and...

**afarah1**: Reminds me of this 2023 post "re-implementing LangChain in 100 lines of code": https://blog.scottlogic.com/2023/05/04/langchain-mini.html We did just that back then and it worked great, we used it in...

> **prodigycorp**: How was this three years ago ;_;

**armcat**: The new mental model actually is (1) skills based model, i.e. https://agentskills.io/home, and (2) where the LLM agents "see all problems as coding problems". Skills are a bunch of detailed Markdowns...

**thiagowfx**: The blog post starts with: > I’m using OpenAI here, but this works with any LLM provider Have you noticed there’s no OpenAI in the post?

**RagnarD**: This feels like a pretty deceptive article title. At the end, he does say: "What We Built vs. Production Tools This is about 200 lines. Production tools like Claude Code add: Better error handling...

**johnsmith1840**: Here's the bigger question. Why would you? Claude code feels like the first commodity agent. In theory its simple but in practice you'll have to maintain a ton of random crap you get no value in...

> **utopiah**: Because you don't trust Anthropic or you like to learn how the tools you rely on work?

**hazrmard**: This reflects my experience. Yet, I feel that getting reliability out of LLM calls with a while-loop harness is elusive. For example - how can I reliably have a decision block to end the loop (or...

> **nyellin**: Forgot to address the easiest part: > - how can I reliably call tools with the right schema? This is typically done by enabling strict mode for tool calling which is a hermetic solution. Makes llm...

> **nyellin**: Re (1) use a TODOs system like Claude code. Re (2) also fairly easy! It's just a summarization prompt. E.g. this is the one we use in our agent:...

**schmuhblaster**: As an experiment over the holidays I had Opus create a coding agent in a Prolog DSL (more than 200 lines though) [0] and I was surprised how well the agent worked out of the box. So I guess that the...

**sathish316**: Excellent article on the internals of coding CLIs. I learned a similarly powerful way to build DIY coding CLIs from this Martin Fowler post, which uses PydanticAI and MCP-based tools:...

**bjacobso**: https://www.youtube.com/watch?v=aueu9lm2ubo

> **vrosas**: Unless there's context, I'm never clicking on a naked youtube link.

>> **pests**: Are you worried google is going to hack you or something?

>>> **handfuloflight**: He was told they were never gonna give up.

**jackfranklyn**: The benchmark point is interesting but I think it undersells what the complexity buys you in practice. Yes, a minimal loop can score similarly on standardised tasks - but real development work has...

**stevenslade**: I’d been wondering how conversation history actually works in these agent loops — the LLM itself has no memory, so whatever “history” exists is just text you keep feeding back in. At a high level it...

**bilater**: I'm curious how tools like Claude Code or Cursor edit code. Do they regenerate the full file and diff it, or do they just output a diff and apply that directly? The latter feels more efficient, but...

**cmiles8**: A lot of software is like this. You can build a bare bones but functional version for 1x investment or something that addresses every bell and whistle (often with market research saying it’s really...

**loeg**: Would be nice to have a different wrapper around Claude, even something bare bones, as long as it's easy to modify.  Claude code terminal has the jankiest text editor I've ever used -- holding down...

> **thierrydamiba**: What editor are you using?

>> **loeg**: Whatever interface you get running the claude cli.

>>> **thierrydamiba**: Try ghostty, wterm, or kitty as the terminal you run Claude code from. Much better experience.

**emsign**: > The LLM never actually touches your filesystem. But that's not correct. You give them write access to files it then compiles and executes. It could include code that then runs with the rights of...

**duncancarroll**: > "But here’s the thing" This phrase feels like the new em dash...

**lucideer**: This is a really great post, concise & clear & educational. I do find the title slightly ironic though when the code example goes on to immediately do "import anthropic" right up top. (it's just a...

**wrochow**: I always laugh when I see a post that claims some tech is "easy". Sure, if all you're doing is creating a hello world script. But try to do something for which a client would pay you more than 25¢...

**rcarmo**: I think mine have a little more code, but they also have a lot more tools: - https://github.com/rcarmo/bun-steward - https://github.com/rcarmo/python-steward (created with the first one) And they're...

**domlebo70**: I don't code in Python much. Are those type annotations really how people are using them, or is it just for the example?     def list_files_tool(path: str) -> Dict[str, Any]: And it returns     {...

**utopiah**: Why limit it to few tools from a tool registry when running in a full sandbox using QEMU or thinner like Podman/Docker literally takes 10 lines of code? You can still use your real files with a mount...

**cadamsdotcom**: The devil is in the details, so actually, the Emperor in this analogy most definitely does have clothes. For example, post-training / finetuning the model specifically to use the tools it’ll be given...

**pbw**: I have mixed feelings about the "Do X in N lines of code" genre. I applaud people taking the time to boil something down to its very essence, and implement just that, but I feel like the tone is...

> **utopiah**: I do prototyping for a living and ... I definitely do "X in 1/100th lines of code" regularly. It's exciting, liberating... but it's a lie. What I do is to get the CORE of the idea so that I fully...

**ozim**: Magic is not agent, magic is neural network that was trained. Yeah I agree there is bunch of BS tools on top that basically try to coerce people into paying and using their setup so they become...

> **egeozcan**: claude opus 4.5 is much more impressive when used in claude code. I also tried it through antigravity but from a users perspective, claude code is magic.

**akhil08agrawal**: Nice breakdown. Been thinking about this a lot lately - if the core is this simple, what actually becomes the hard part? Feels like we're headed toward a world where everyone can build these loops...

**kirjavascript**: here's my take, in 70 lines of code: https://github.com/kirjavascript/nanoagent/blob/master/nanoa...

> **fragmede**: I mean, if you take out the guard rails, here's codex in 46 lines of bash:     #!/usr/bin/env bash     set -euo pipefail          # Fail fast if OPENAI_API_KEY is unset or empty     :...

>> **dave1010uk**: Impressive! Here's an agent in 24 lines of PHP, written in 2023. But it relies on `llm` to do HTTP and JSON. https://github.com/dave1010/hubcap

**bochoh**: I’ve had decent results with this for context management in large code bases so far https://github.com/GMaN1911/claude-cognitive

**oars**: Can't believe Claude Code was launched less than a year ago. It's certainly a new tool in my kit and allowed me to approach and work on new coding problems in a new way.

**oli5679**: https://github.com/mistralai/mistral-vibe This is a really nice open source coding agent implementation. The use of async is interesting.

**voidhorse**: Wait, did people in the tech world not know this? If this is some shocking revelation to engineers we are in trouble. Any and every "AI" experience is just kiddie level program mg wrapping LLMs.

**kristopolous**: The source code link at the bottom of the article goes to YouTube for some reason

**mephos**: How much Claude could a Claude code code if a Claude code could code Claude

**santiagobasulto**: I'm surprised this post has so many upvotes. This is a gross oversimplification of what Claude Code (and other agents can do). On top of that, it's very poorly engineered.

> **all2**: > Poorly engineered How so? As a pedagogic tool it seems adequate. How would you change this to be better (either from a teaching standpoint or from a SWE standpoint)?

**OsrsNeedsf2P**: Yea.. our startup greatly overestimated how hard it is to make a good agent loop. Handling exit conditions, command timeouts, context management, UI, etc is surprisingly hard to do seamlessly.

> **nvader**: I'm curious which startup, if you wouldn't mind sharing? For reciprocity, I work at Imbue, and we can also attest to the real work complexities of this domain.

>> **OsrsNeedsf2P**: Called Ziva[0], we do AI agents for game development. If you want to jump on a call and discuss strategies, my email is in my bio https://ziva.sh/

> **bjt12345**: Do you mean they underestimated how hard it is?

>> **OsrsNeedsf2P**: No, overestimated. You can make a terrible CC in 200 LoC, but after using it for 3 minutes you'll realize how much more goes into it

>>> **lemontheme**: Gotta admit, the phrasing tripped me up as well. You underestimated the effort that ultimately went into it

**nxobject**: I'll admit that I'm tickled pink by the idea of a coding agent recreating itself. Are we at a point where agents can significantly and autonomously improve themselves?

**__0x01**: These LLM tools appear to have an unprecedented amount of access to the file systems of their users. Is this correct, and if so do we need to be concerned about user privacy and security?

> **fragmede**: We should be absolutely terrified about the amount of access these things have to users systems. Of course there is advice to use a sandbox but there are stupid people out there (I'm one of them) who...

**andai**: from ddgs import DDGS     def web_search(query: str, max_results: int = 8) -> list[dict]:         return DDGS().text(query, max_results=max_results)

**erelong**: Kind of a meta thought but I guess we could just ask a LLM to guide us through creating some of these things ourselves, right? (Tools, agents, etc.)

**mudkipdev**: Is this not using constrained decoding? You should pass the tool schemas to the "tools" parameter to make sure all tool calls are valid

**fb03**: "I'm using OpenAI here" proceeds to show a piece of code importing anthropic was pretty confusing to me

**_def**: Are there useful open source "agents" already ready to use with local LLMs?

**Waterluvian**: How much code could Claude Code code if Claude Code could code Claude?

**dangoodmanUT**: This definitely will handle large files or binary files very poorly

**computerex**: I think some of the commenters are missing the point of this article. Claude Code is a low level harness around the model. Low level thin wrappers are unreasonably effective at code editing. My...

**erichocean**: The tip of the sphere in agentic code harnesses today is to RL train them as dedicated conductor/orchestrator models. Not 200 lines of Python.

> **aszen**: Can you elaborate on this?

>> **erichocean**: Here you go: https://research.nvidia.com/labs/lpr/ToolOrchestra/ Big models (like Claude Opus 4.5) can (and do) just RL-train this into the main model.

>> **8note**: as a comparison, the gemini cli agent with gemini 2 half the time writes its own tool call parameters incorrectly. it didnt quite know when to make a tool call, which tool result was the most...

**d4rkp4ttern**: This is consistent with how I've defined the 3 core elements of an agent: - Intelligence (the LLM) - Autonomy (loop) - Tools to have "external" effects Wrinkles that I haven't seen discussed much...

**hooverd**: Woah now, did you get Anthropic's permission to use Claude outside of Claude Code?

> **wizzard0**: wdym? claude code is just a wrapper you can get yourself an api key at console.anthropic.com and build whatever you want (i use local models where possible but must admit opus45 is good)

**_andrei_**: yes, it's an agent

**m3kw9**: why the pointless exercise? Claude code itself can do all that.
