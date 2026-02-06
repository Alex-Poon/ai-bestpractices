---
title: "Claude Code's New Hidden Feature: Swarms"
source_url: "https://twitter.com/NicerInPerson/status/2014989679796347375"
hn_url: "https://news.ycombinator.com/item?id=46743908"
date: 2026-01-24
hn_points: 521
hn_comment_count: 47
tags: [claude-code, multi-agent, swarms, agent-workflows, harness-engineering]
tier: 1
weight: 3
---

## Summary

A tweet by @NicerInPerson revealed that Claude Code contains hidden multi-agent orchestration capabilities, colloquially referred to as "swarms." The discovery, corroborated by a GitHub repository (claude-sneakpeek by mikekelly), showed that Anthropic had built native sub-agent coordination features including a TeammateTool, delegate mode for spawning background agents, and a team coordination system with messaging and task ownership. Rather than relying on third-party orchestration frameworks, these capabilities are built directly into Claude Code but gated behind feature flags not yet available in general release.

The swarm architecture positions Claude Code not as a single agent but as a potential "team lead" that can plan work, delegate tasks to specialized sub-agents, and synthesize results. Each sub-agent operates with its own context window, enabling parallel execution of independent tasks. The sneakpeek repository provides an installation method to access these features through an isolated instance that does not interfere with a user's primary Claude Code installation.

This revelation sparked significant discussion about whether multi-agent coordination represents a genuine productivity improvement or simply a mechanism for increased token consumption. The discovery also highlighted the growing trend of AI tool providers building orchestration layers directly into their products rather than leaving it to external frameworks.

## Key Insights

- **Native multi-agent orchestration**: Claude Code has built-in TeammateTool, delegate mode, and team coordination with messaging and task ownership — no external frameworks needed
- **Team lead architecture**: The swarm model positions the primary agent as a coordinator that plans, delegates, and synthesizes rather than writing code directly
- **Feature-flagged release strategy**: Anthropic is developing these capabilities internally before public release, suggesting careful testing of multi-agent reliability
- **Context isolation**: Each sub-agent gets its own context window, preventing degradation that comes from overloading a single agent's memory

## Notable Quotes

> "You're not talking to an AI coder anymore. You're talking to a team lead." — @NicerInPerson

> "Native multi-agent orchestration with TeammateTool" — claude-sneakpeek docs

## HN Discussion Highlights

*260 comments total*

**mafriese**: Ok it might sound crazy but I actually got the best quality of code (completely ignoring that the cost is likely 10x more) by having a full “project team” using opencode with multiple sub agents wh...

> **alphazard**: Every time I read something like this, it strikes me as an attempt to convince people that various people-management memes are still going to be relevant moving forward. Or even that they currently...

>> **rlayton2**: My understanding is that the main reason splitting up work is effective is context management. For instance, if an agent only has to be concerned with one task, its context can be massively reduced...

>>> **fphhotchips**: Which, ultimately, is not such a big difference to the reason we split up work for humans, either. Human job specialization is just context management over the course of 30 years.

>>> **purplepatrick**: I’ve found that task isolation, rather than preserving your current session’s context budget, is where subagents shine. In other words, when I have a task that specifically should not have project ...

>>> **XenophileJKO**: So two things.. Yes this helps with context and is a primary reason to break out the sub-agents. However one of the bigger things is by having a focus on a specific task or a role, you force the LL...

>> **simondotau**: I suppose it’s could end up being an LLM variant of Conway’s Law. “Organizations are constrained to produce designs which are copies of the communication structures of these organizations.” https:/...

>>> **_kb**: If so, one benefit is you can quickly and safely mix up your set of agents (a la Inverse Conway Manoeuvre) without the downsides that normally entails (people being forced to move teams or change h...

>> **miki123211**: I think it's just the opposite, as LLMs feed on human language. "You are a scrum master." Automatically encodes most of what the LLM needs to know. Trying to describe the same role in a prompt woul...

>>> **joshuaisaact**: This has been pretty comprehensively disproven: https://arxiv.org/abs/2311.10054 Key findings: -Tested 162 personas across 6 types of interpersonal relationships and 8 domains of expertise, with 4 ...

>> **ttoinou**: Developers do want managers actually, to simplify their daily lives. Otherwise they would self manage themselves better and keep more of the share of revenues for them

>>> **shermantanktop**: Unfortunately some managers get lonely and want a friendly face in their org meetings, or can’t answer any technical questions, or aren’t actually tracking what their team is doing. And so they pul...

>> **ljm**: It shows me that there doesn’t appear to be an escape from Conway’s Law, even when you replace the people in an organisation with machines. Fundamentally, the problem is still being explored from t...

>> **generallyjosh**: I do think there is some actual value in telling an LLM "you are an expert code reviewer". You really do tend to get better results in the output When you think about what an LLM is, it makes more ...

>> **zhenyakovalyov**: i guess, as a human it’s easier to reason about a multi-agent system when the roles are split intuitively, as we all have mental models. but i agree - it’s a bit redundant/unnecessary

> **AlexErrant**: For those ignorant, CAB is Change-advisory board https://en.wikipedia.org/wiki/Change-advisory_board

>> **rafaelmdec**: Thank you for the link and the compliment.

> **sathish316**: Subagent orchestration without the overhead of frameworks like Gastown is genuinely exciting to see. I’ve recorded several long-running demos of Pied-Piper, which is a Subagents orchestration syste...

>> **vercaemert**: Personally, I'm fascinated by the opening for protocol languages to become relevant. The previous generations of AI (AI in the academic sense) like JASON, when combined with a protocol language lik...

> **juanre**: I have been using a simpler version of this pattern, with a coordinator and several more or less specialized agents (eg, backend, frontend, db expert). It really works, but I think that the key is ...

> **big-guy23**: Share your code of the “actual best quality “ or this is just another meaningless and suspicious attempt to get users to put the already expensive AI in a for-loop to make it even more expensive

> **kaspermarstal**: Can you share technical details please? How is this implemented? Is it pure prompt-based, plugins, or do you have like script that repeatedly calls the agents? Where does the kanban live?

>> **mogili1**: Not the OP, but this is how I manage my coding agent loops: I built a drag and drop UI tool that sets up a sequence of agent steps (Claude code or codex) and have created different workflows based ...

>>> **kaspermarstal**: Cool, thanks for sharing!

> **taspeotis**: This sounds like BMAD? https://github.com/bmad-code-org/BMAD-METHOD

> **paulnovacovici**: I’ve been messing around with the BMAD process as well which seems like a simpler workflow than you described. My only concern is that it’s able to get 90% of the way there for productionized ready...

> **JasperBekkers**: This is genuinely cool, the CAB rejecting implementations must be hilarious to watch in action. The Kanban + Git worktree isolation is smart for keeping agents from stepping on each other. I've bee...

> **DanOpcode**: Very cool! A couple of questions: 1. Are you using a Claude Code subscription? Or are you using the Claude API? I'm a bit scared to use the subscription in OpenCode due to Anthropic's ToS change. 2...

>> **porker**: > due to Anthropic's ToS change. Not a change, but enforcing terms that have been there all the time.

> **ComplexSystems**: How much does this setup cost? I don't think a regular Claude Max subscription makes this possible.

>> **amelius**: Can't you just use time-sharing and let the entire task run over night?

> **potamic**: Could you share some details? How many lines of code? How much time did it take, and how much did it cost?

> **karmasimida**: You might as well just have planner and workers, or your architecture essentially echos to such structure. It is difficult to discern how semantics can drive to different behavior amongst those rol...

> **alexwrboulter**: This now makes me think that the only way to get AI to work well enough to actually actually replace programmers will probably be paying so much for compute that it's less expensive to just have a ...

> **RestartKernel**: What are the costs looking like to run this? I wonder whether you would be able to use this approach within a mixture-of-experts model trained end-to-end in ensemble. That might take out some guess...

> **fortedoesnthack**: I was getting good results with a similar flow but was using claude max with ChatGPT. unfortunately not an option available to me anymore unless either I or my company wants to foot the bill.

> **ceroxylon**: What are you building with the code you are generating?

> **_alex_**: Interesting that your impl agents are not opus. I guess having the more rigorous spec pipeline helps scope it to something sonnet can knock out.

> **tommica**: Is it just multiple opencode instances inside tmux panels or how do you run your setup?

> **5Qn8mNbc2FNCiVV**: Do you mind sharing the prompts? Would be greatly appreciated

> **ggoo**: Is this satire?

>> **mafriese**: Nope it isn’t. I did it as a joke initially (I also had a version where every 2 stories there was a meeting and if a someone underperformed it would get fired). I think there are multiple reasons w...

>>> **ggoo**: Thanks for clarifying - I think some of the wording was throwing me off. What a wild time we are in!

>>> **stavros**: What OpenCode primitive did you use to implement this? I'd quite like a "senior" Opus agent that lays out a plan, a "junior" Sonnet that does the work, and a senior Opus reviewer to check that it a...

>>> **overfeed**: > [...]coding agents only get the information they actually need and nothing more Extrapolating from this concept led me to a hot-take I haven't had time to blog about: Agentic AI will revive the p...

>>> **imiric**: Isn't all this a manual implementation of prompt routing, and, to a lesser extent, Mixture of Experts? These tools and services are already expected to do the best job for specific prompts. The wor...

>>> **nobody_r_knows**: I'm confused when you say you have a manager, scrum master, archetech, all supposdely sharing the same memory, do each of those "employees" "know" what they are? And if so, based on what are their ...

>>> **simultsop**: quite a storyteller

>> **GoatInGrey**: It's not satire but I see where you're coming from. Applying distributed human team concepts to a porting task squeezes extra performance from LLMs much further up the diminishing returns curve. Th...

>>> **vidarh**: I don't know about something this complex, but right this moment I have something similar running in Claude Code in another window, and it is very helpful even with a much simpler setup: If you hav...

>> **SkyPuncher**: Doubt it. I use a similar setup from time to time. You need to have different skills at different times. This type of setup helps break those skills out.

>> **hereme888**: why would it be? It's a creative setup.

>>> **ggoo**: I just actually can't tell, it reads like satire to me.

>> **thaynt**: I think many people really like the gamification and complex role playing. That is how GitHub got popular, that is how Rube Goldberg agent/swarm/cult setups get popular. It attracts the gamers and ...

>>> **krackers**: I've heard some people say that "vibe coding" with chatbots is like slot machines, you just keep "propmting" until you hit the jackpot. And there was some earlier study that people _felt_ more prod...

>> **theonething**: I don't think so.

> **tehlike**: You probably implemented gastown.

> **raffraffraff**: The next stage in all of this shit is to turn what you have into a service. What's the phrase? I don't want to talk to the monkey, I want to talk to the organ grinder. So when you kick things off i...

> **justmedep**: Scrum masters typically do not assign tickets.

> **heliumtera**: Congratulations on coming up with the cringiest thing I have ever seen. Nothing will top this, ever. Corporate has to die

**joshribakoff**: This is just sub agents, built into Claude. You don’t need 300,000 line tmux abstractions written in go. You just tell Claude to do work in parallel with background sub agents. It helps to have a f...

> **skippyboxedhero**: It isn't sub agents. The gap with existing tooling is that the abstraction is over a task rather than a conversation (due to the issue with third-party apps, Claude Code has been inherently limited...

>> **vidarh**: It isn't "just" sub agents, but you can achieve most of this just with a few agents that take on generic roles, and a skill or command that just tells claude to orchestrate those agents, and a CLAU...

>>> **skippyboxedhero**: Right, but the model is still: you tell the AI what to do, this is the AI tells other AIs what to do. The context makes a huge difference because it has to be able to run autonomously. It is possib...

>> **adastra22**: > Claude Code has been inherently limited to conversations How so? I’ve been using “claude -p” for a while now. But even within an interactive session, an agent call out is non-interactive. It oper...

>>> **skippyboxedhero**: Because of OAuth. If they gave people API keys then no-one buys their ludicrously priced API product (I assume their strategy is to subsidise their consumer product with the business product). You ...

> **stingraycharles**: It’s even less of a feature, Claude Code already has subagents; this new feature just ensures Claude Code actually uses this for implementation. imho the plans of Claude Code are not detailed enoug...

>> **ctoth**: I agree with this. Any time I make a plan I have to go back and fill it in, fill it in, what did we miss, tdd, yada yada. And yes, I have all this stuff in CLAUDE.md. You start to get a sense for w...

>> **tobyjsullivan**: It’s moving fast. Just today I noticed Claude Code now ends plans with a reference to the entire prior conversation (as a .jsonl file on disk) with instructions to check that for more details. Not ...

>> **dceddia**: Interesting about the level of detail. I’ve noticed that myself but I haven’t done much to address it yet. I can imagine some ideas (ask it for more detail, ask it to make a smaller plan and add de...

>>> **stingraycharles**: I’m trying to solve this myself by implementing a whole planner workflow at https://github.com/solatis/claude-config Effectively it tries to resolve all ambiguities by making all decisions explicit...

>>> **colelyman**: I have had good success with the plans generated by https://github.com/obra/superpowers I also really like the Socratic method it uses to create the plans.

>>> **vardalab**: I iterate around issues. I have a skill to launch a new tmux window for worktree with Claude in one pane and Codex in another pane with instructions on which issue to work on, Claude has instructio...

>> **chickensong**: > the plans of Claude Code are not detailed enough You can make a template and tell Claude to make a plan that follows the template.

> **AffableSpatula**: Claude already had subagents. This is a new mode for the main agent to be in (bespoke context oriented to delegation), combined with a team-oriented task system and a mailbox system for subagents t...

>> **theturtletalks**: Wow there goes a lot of harnesses out the window. The main limitation of subagents was they couldn’t communicate back and forth with the main agent. How do we invoke swarm mode in Claude Code?

> **apsurd**: OT: Your visual on "stacked PRs" instantly made me understand what a stacked PR is. Thank you! I had read about them before but for whatever reason it never clicked. Turns out I already work like t...

>> **abhinavg**: If you’re interested in exploring tooling around stacked PRs, I wrote git-spice (https://abhinav.github.io/git-spice/) a while ago. It’s free and open-source, no strings attached.

>> **Griffinsauce**: If you're rebasing a lot, definitely set up rerere (reuse recorded solution) - it improves things enormously. Do make sure you know how to reset the cache, in case you did a bad conflict resolution...

>> **byproxy**: Isn’t this just “Gitflow”? https://www.atlassian.com/git/tutorials/comparing-workflows/...

>>> **apsurd**: After a quick read it seems like gitflow is intended to model a release cycle. It uses branches to coordinate and log releases. Stacking is meant to make development of non-trivial features more ma...

>>> **withinboredom**: Please don’t use git-flow. Every time I see it, it looks like an over-engineer’s wet dream.

> **mkw5053**: Yeah, since they introduced (possibly async) subagents, I've had my main claude instance act as a manager overseeing implementation agents, keeping it's context clean, and ensuring everything goes ...

>> **AffableSpatula**: yep this is exactly how I use the main agent too, I explicitly instruct to only ever use background async subagents. Not enough people understand that the claude code harness is event driven now an...

> **bradgessler**: Any recommendations on sandboxing agents? Last time I asked folks recommended docker.

>> **ahstilde**: https://github.com/finbarr/yolobox/

>> **skybrian**: I like running remotely using exe.dev with SyncThing to sync files to my laptop. I use Shelley (their web-based agent) but they have Claude Code installed too.

**daxfohl**: I want it to generate better code but less of it, and be more proactive about getting human feedback before it starts going off the rails. This sounds like an inexorable push in the opposite direct...

> **mtalantikite**: Agreed, I'm constantly coming back to a Claude tmux pane just to see it's decided to do something completely ridiculous. Just the other day I was having it add some test coverage stats to CI runs a...

>> **spondyl**: > it was basically trying to reinvent Istanbul in a bash script because the nyc tool wasn't installed in CI For the first part of this comment, I thought "trying to reinvent Istanbul in a bash scri...

>> **xyzsparetimexyz**: If only Rome could be built in a day..

> **sothatsit**: They haven’t released this feature, so maybe they know the models aren’t good enough yet. I also think it’s interesting to see Anthropic continue to experiment at the edge of what models are capabl...

>> **daxfohl**: True, though even then I kind of wonder what's the point. Once they build an AI that's as good as a human coder but 1000x faster, parallelization no longer buys you anything. Writing and deploying ...

>>> **sothatsit**: Each agent having their own fresh context window for each task is probably alone a good way to improve quality. And then I can imagine agents reviewing each others work might work to improve qualit...

>>> **nojs**: It’s more about context management, not speed

> **lupire**: All you have to do is set up an MCP that routes to a human on the backend, and you d got an AI that asks for human feedback. Antigravity and others already ask for human feedback on their plans.

**birken**: I'd really like to see a regular poll on HN that keeps track of which AI coding agents are the most popular among this community, like the TIOBE Index for programming languages. Hard to keep up wit...

> **samsolomon**: Not this community's opinion on agents, but I've found it helpful to check the lmarena leaderboards occasionally. Your comment prompted me to take a look for the first time in a while. Kind of surp...

> **7777777phil**: I just started something like that, haven’t shared it widely yet, but here we go - happy if you participate: https://agentic-coding-survey.pages.dev/

>> **danjl**: Add vscode. Add a list of models, since many tools allow you to select which model you use.

>>> **7777777phil**: Thanks for the feedback. I thought there are just too many models and versions to list them all. For now, if you select "other" you get a text field to add any model not listed, hope this helps.

>> **hmottestad**: You should add OpenAI Codex CLI.

>>> **7777777phil**: Thanks for the feedback, I'll do that. For now, if you select "other" you get a text field to add any model not listed..

>> **Kerrick**: Any chance you'll add Antigravity and Jetbrains Junie? I've been using almost nothing but those for the last month. Antigravity at home, Junie at work.

>>> **7777777phil**: Done, upon popular demand I added Antigravity, Codex CLI, and Junie

> **mudkipdev**: Just pick your favorite one and stick with it. There is no point in keeping up, since we're in an endless cycle of hype where is one ranked higher than the other, with them eventually catching up t...

> **simoncion**: > ...like the TIOBE Index for programming languages. Why would you want a list with such godawful methodology? Here's [0] what the TIOBE folks have to say about their data analysis process: Since t...

> **nikcub**: I have an agent skill that is currently in the top 10 or so of the skills.sh directory - in terms of that audience, it's about 80% claude code. Also 75% darwin-arm64

> **morley**: I personally don't want to trawl through Twitter to find the current state-of-the-art, so I read Zvi Mowshowitz's newsletter: https://thezvi.substack.com/ His newsletter put me onto using Opus 4.5 ...

>> **xyzsparetimexyz**: Christ, the latest post is about dating and uses an ai generated wojak meme..

> **ramoz**: When all of industry is trying to catch up with the features of one coding agent - it may be a signal to just use that one.

>> **anhner**: Sure, let's all ditch linux and macOS as well since they're not the most popular...

> **fragmede**: Question is, are people on HN procrastinating and commenting here because the agent isn't very good and they're avoiding having to write the code themselves, or is the agent so good that it's off w...

>> **thevinter**: You're making it sound like before agents existed HN was a ghost town because everyone was too busy building ImportantThingTM by hand

>>> **fragmede**: Oh. Surely you know this forum didn't exist pre-ChatGPT. Everything in the archives was generated so it just looks that way.

>> **nonethewiser**: >Question is, are people on HN procrastinating and commenting here because the agent isn't very good and they're avoiding having to write the code themselves Can you help me envision what you're sa...

>>> **fragmede**: I'm saying if it's that bad, then it's pure procrastination

>> **g947o**: People have been procrastinating on HN since the beginning of time, before coding agents existed.

>>> **fragmede**: Correct me if I'm wrong, but before ChatGPT, there was fewer comments about vibecoding.

**coldtea**: >You're not talking to an AI coder anymore. You're talking to a team lead. The lead doesn't write code - it plans, delegates, and synthesizes. They couldn't even be bothered to write the Tweet them...

> **mrtesthah**: isn’t it interesting how often this rhetorical construction is overused by AI?

>> **TeMPOraL**: Partly because it's a good construct. Most people's writing is garbage compared to what LLMs output by default. But the other part of it is, each conversation you have, and each piece of AI output ...

>>> **mrtesthah**: >But the other part of it is, each conversation you have, and each piece of AI output you read online, is written by LLM instance that has no memory of prior conversations, so it doesn't know that,...

>> **bangaladore**: Very much so. It feels like it can't have been that common in the original training corpus. Probably more common now given that we are training slop generators with slop.

**replwoacause**: I've done plenty of vibe coding even though I know how to program but I mostly work with a single agent through its CLI. The progress is really good and more importantly, I can follow it. I can rea...

> **mythrwy**: Ya I saw a comment a few weeks ago about "leaving productivity on the table!". I'm generating 3 long files at a prompt now, how much more productivity do I need? Any more and I'll have zero idea wh...

> **baby**: My understanding is that this system just produces much better result (it’s all about clean context windows) so you just don’t have a choice. What they could improve on is logs where you can easily...

> **asimeqi**: I can barely keep up with one instance of Claude Code. In fact even that one sits iddle half the time as I test its output and try to explain what it did wrong. What are people programming that nee...

>> **chickensong**: I think the highly parallel setups make more sense if you fully embrace vibe coding, but there's value to be had outside of that as well. Delegating tasks to sub-agents to help with context managem...

**czhu12**: The problem I’ve been having is that when Claude generates copious amounts of code, it makes it way harder to review than small snippets one at a time. Some would argue there’s no point reviewing t...

> **serial_dev**: In a professional setting where you still have coding standards, and people will review your code, and the code actually reaches hundreds of thousands of real users, handling one agent at a time is...

>> **pron**: This is my problem with the whole "can LLMs code?" discussion. Obviously, LLMs can produce code, well even, much like a champion golfer can get a hole in one. But can they code in the sense of "the...

>>> **lupire**: That's a funny analogy. You should look into how modern planes are flown. Hint: it's a computer.

>> **Sateeshm**: Exactly my experience too. I also heard "I see the issue now" so many times because it missed or misunderstood something very simple.

>> **KaiserPro**: > people will review your code, I mean you'd think. But it depends on the motivations. At meta, we had league tables for reviewing code. Even then people only really looked at it if a) they were a ...

>>> **serial_dev**: Well, it certainly depends on the culture of the team and organization. Where you have shared ownership, meaning once I approved your PR, I am just as responsible of something goes wrong as you are...

>> **prmoustache**: > people will review your code, People will ask LLM to review some slop made by LLM and they will be absolutely right! There is no limit to lazyness.

>>> **flemhans**: Soon you'll be seen as irresponsible and wasteful if you don't let the smarter LLM do it.

> **idontwantthis**: I just can’t get with this. There is so much beyond “works” in software. There are requirements that you didn’t know about and breaking scenarios that you didn’t plan for and if you don’t know how ...

>> **zmmmmm**: Yes this is one of my concerns. Usually about 50% of my understanding of the domain comes from the process of building the code. I can see a scenario where large scale automated code works for a wh...

>> **atonse**: I don’t know what your stack is, but at least with elixir and especially typescript/nextJS projects, and properly documenting all those pieces you mentioned, it goes a long way. You’d be amazed.

>>> **mrtesthah**: I would never use, let alone pay for, a fully vibe-coded app whose implementation no human understands. Whether you’re reading a book or using an app, you’re communicating with the author by way of...

>>> **idontwantthis**: If it involves Nextjs then we aren’t talking about the same category of software. Yes it can make a website pretty darn well. Can it debug and fix excessive database connection creation in a way th...

> **gen220**: In my (admittedly conflict-of-interest, I work for graphite/cursor) opinion, asking CC to stack changes, and then having an automated reviewer agent help a lot with digesting and building convictio...

> **squirrellous**: Not a direct answer to your question, but I’m recently trying to adopt the mindset of letting Claude “prove” to me with very high confidence that what they did works. The bar for this would be much...

> **AstroBen**: I think we'll start to see the results of that late this year, but it's a little early yet. Plenty of people are diving headfirst into it To me it feels like building your project on sand. Not a go...

> **linsomniac**: I have Claude Code author changes, and then I use this "codex-review" skill I wrote that does a review of the last commit. You might try asking Codex (or whatever) to review the change to give you ...

> **yencabulator**: > when Claude generates copious amounts of code, it makes it way harder to review than small snippets one at a time. I find Claude Code to be very steerable. Ask it to make small atomic commits and...

> **chasing**: Yeah, it's not just my job to generate the code: It's my job to know the code. I can't let code out into the wild that I'm not 100% willing to vouch for.

>> **zmmmmm**: At a higher level, it goes beyond that. It's my job to take responsibility for code. At some fundamental level that puts a limit on how productive AI can be. Because we can only produce code as fas...

**bakugo**: > You're not talking to an AI coder anymore. You're talking to a team lead. The lead doesn't write code - it plans, delegates, and synthesizes. Even 90 word tweets are now too long for these people...

> **jen729w**: I wonder how much 'listening' to an LLM all day affects one's own prose? Mimicry is in the genes…

>> **flkiwi**: I accidentally gave my wife a prompt the other day. Everything was hellishly busy and I said something along the lines of “I need to ask you a question. Please answer the question. Please don’t ans...

>> **Jweb_Guru**: It affects it very heavily IME. People need to make sure they are getting a good mix of writing from other sources.

> **AffableSpatula**: You're absolutely right! I apologise — hopefully you can forgive me.

> **wiseowise**: Them words be hard, man! We builders, changing da world!

**joshuaisaact**: This feels like massively overengineering something very simple. Agents are stateless functions with a limited heap (context window) that degrades in quality as it fills. Once you see it that way, ...

> **baby**: I basically always handled claude code in this way, by asking it to spawn subagents as much as possible to handle self contained tasks (heard there are hacks to make subagents work with codex). But...

> **ryanjshaw**: I don’t follow. You said it’s over engineering and then proposed what appears to be functionally the exact same thing? Isn’t a “role” just a compact way to configure well-known systems of constrain...

>> **joshuaisaact**: Fair push back. The distinction I'm drawing is between: A. Using a role prompt to configure a single function's scope ("you are a code reviewer, focus on X") - totally reasonable, leverages trainin...

>>> **ryanjshaw**: Thanks for clarifying. I’ve queued up that paper. I’m building an agentic solution to a problem (monitoring social media and news sources, then building world views of different participants). A si...

**Androider**: Looks like agent orchestrators provided by the foundation model providers will become a big theme in 2026. By wrapping it in terms that are already used in software development today like team lead...

> **bloppe**: Respectfully disagree. I think polecats are a reasonable antidote to overanthropomorphization.

>> **qdot76367**: Furries would like to have a word.

> **MrOrelliOReilly**: Totally agreed. Most the weird concepts of Gas Town are just workarounds for bad behavior in Claude or the underlying models. Anthropic is in the best position to get their own model to adhere to o...

**wild_pointer**: Listen team lead and the whole team, make this button red.

> **brookst**: Principal engineers! We need architecture! Marketing team, we need ads with celebrities! Product team, we need a roadmap to build on this for the next year! ML experts, get this into the training a...

> **simultsop**: We have to reject claude can do it simply by a prompt, then everyone can do it. As SWE's we are not going to pragmatically accept we are done. https://www.youtube.com/watch?v=g_Bvo0tsD9s

> **AffableSpatula**: ha! The default system prompt appears to give the main agent appropriate guidance about only using swarm mode when appropriate (same as entering itself into plan mode). You can further prompt it in...

>> **vorticalbox**: I like opencode for the fact I can switch between build and plan mode just by pressing tab.

>>> **thevinter**: Isn't it the same in base claude-code?

>>> **Shebanator**: Its shift-tab in Claude Code, fyi

> **stevenwilkin**: Don't make mistakes.

**flurdy**: This smells like Claude's own version of Gas Town by Steve Yegge. Probably more constrained and less of a crazy bull ride. But seems we are heading this way, from initially: - a Senior Dev pairing ...

**hirako2000**: I didn't sleep enough, or slept for 10 years. This thread seems surreal, I see multiple flow repositories mentioned with 10k+ stars. Comprehensive doc. genAI image as a logo. Can anyone show me one...

> **baby**: You are clearly behind, no offense but what do you do on HN

>> **Biganon**: I usually try to stay polite here, but what a deeply stupid comment This person is on HN for the same reasons as I am, presumably: reading about hacker stuff. Entering prompts in black boxes and wa...

>>> **hirako2000**: Exactly my thought. I wasn't sure but I came across a wit comment the other day: that hackernews is a ycombinator forum that happens to be public. I then went to see the latest batches. Cohorts are...

>> **hirako2000**: Time traveling.

**nehalem**: Answering the question how to sell more tokens per customer while maintaining ~~mediocre~~ breakthrough results.

> **AffableSpatula**: Delegation patterns like swarm lead to less token usage because: 1. Subagents doing work have a fresh context (ie. focused and not working on the top of a larger monolithic context) 2. Subagents en...

>> **nulone**: Merge cost kills this. Does the harness enforce file/ownership boundaries per worker, and run tests before folding changes back into the lead context?

>>> **AffableSpatula**: I don't know what you're referring to but I can say with confidence that I see more efficient token usage from a delegated approach, for the reasons I stated, provided that the tasks are correctly ...

**lysace**: I'm already burning through enough tokens and producing more code than can be maintained - with just one claude worker. Feel like I need to move into the other direction, more personal hands-on "ma...

> **AffableSpatula**: I've seen more efficient use of tokens by using delegation. Unless you continually compact or summarise and clear a single main agent - you end up doing work on top of a large context; burning toke...

>> **storystarling**: I've found the opposite to be true when building this out with LangGraph. While the subagent contexts are cleaner, the orchestration overhead usually ends up costing more. You burn a surprising amo...

>>> **AffableSpatula**: Task sizing is important. You can address this by including guidance in the CLAUDE.md around that ie. give it heuristics to use to figure out how to size tasks. Mine includes some heuristics and T ...

> **stuaxo**: If there's any kind of management some of it could use small local models - e.g. to see when it looks like its stuck.

**neom**: Claude Code in the desktop app seems to do this? It's crazy to watch. It sets of these huge swarms of worker readers under master task headings, that go off and explore the code base and compile hu...

> **jswny**: That’s just spawning multiple parallel explore agents instructed to look at different things, and then compiling results That’s a pretty basic functionality in Claude code

>> **neom**: Sounds like I should probably switch to claude code cli. Thanks for the info. :)

>>> **esperent**: I added tests to an old project a few days ago. I spent a while to carefully spec everything out, and there was a lot of tedious work. Aiming for 70% coverage meant that a few thousand unit tests w...

> **deaux**: Sounds very similar to oh-my-opencode.

**bigiain**: So this is Gas Town, just without the "Steve Yegge makes a quarter of a million on a memecoin pump-n-dump" step (yet)?

> **hmokiguess**: Am I the only one who’s been so late to crypto? I still have not touched a single cryptocurrency, even somewhat stable/legit ones. It always gives me a bit of FOMO hearing these stories

**basedrum**: How is this different from GSD: https://github.com/glittercowboy/get-shit-done I've been using that and it's excellent

> **nonethewiser**: GSD was the first project management framework I used. Initially I loved it because it felt like I was so much better organized. As time went on I felt like the organization was kind of an illusion...

> **djfdat**: Really boils down to the benefits of first party software from a company that has billions of dollars of funding vs similar third party software from an individual with no funding. GSD might be bet...

> **ramoz**: I dont understand these questions/references. It's different because it's a capability baked into the actual tool and maintained by the originators of the tool.

> **AffableSpatula**: a similar question was asked elsewhere in the thread; the difference is that this is tightly integrated into the harness

**tiberriver256**: We call it Shawarma where I come from

**svara**: I'm a fan of AI coding tools but the trend of adding ever more autonomy to agents confuses me. The rate at which a person running these tools can review and comprehend the output properly is basica...

> **nilamo**: It works for me, in that I don't care about all the intermediate babble ai generates. What matters is the final changelist before hitting commit... going through that, editing it, fixing comments, ...

>> **vorticalbox**: After I have wrote a feature and I’m in the ironing out bug stage this is where I like the agents do a lot of the grunt work, I don’t want to write jsdocs, or fix this lint issue. I have also start...

> **plagiarist**: Based on Gas Town, the people doing this agree that they are well beyond an amount of code they can review and comprehend. The difference seems to be they have decided on a system that makes it not...

> **gedy**: > running these tools can review and comprehend the output properly You have to realize this is targeting manager and team lead types who already mostly ignore the details and quality frankly. "Jus...

> **aschla**: It likely is acceptable for business-focused code. Compared to a lot of code written by humans, even if the AI code is less than optimal, it's probably better quality than what many humans will wri...

> **IAmGraydon**: No, it doesn't work in practice because they make far too many mistakes.

> **ttul**: Yes, this actually works. In 2026, software engineering is going to change a great deal as a result, and if you're not at least experimenting with this stuff to learn what it's capable of, that's a...

>> **xyzsparetimexyz**: The FOMO nonsense is really uncalled for. If everything is going to be vibecoded in the future then either theres going to be a million code-unfucking jobs or no jobs at all. Attitudes like that, w...

>>> **alehlopeh**: The comment you’re replying to is actually very sensible and non-hypey. I wouldn’t even categorize it as particularly pro-AI, considering how ridiculous some of the frothing pro-AI stuff can get.

>> **wiseowise**: Uhuh, heard the same thing about IDEs, Machine Learning in your tools and others. Yet the most impressive people that I’ve met, actual wizards who could achieve what no one else could, were using E...

> **pton_xd**: > The rate at which a person running these tools can review and comprehend the output properly is basically reached with just a single thread with a human in the loop. That's what you're missing --...

>> **zmmmmm**: It's a bit like the argument with self driving cars though. They may be safer overall, but there's a big difference in how responsibility for errors is attributed. If a human is not a decision make...

>> **vunderba**: I've commented on this before, but issuing a prompt like "Fix X" makes so many assumptions (like a "behaviorism" approach to coding) including that the bug manifests in both an externally and consi...

**MetaMonk**: A guy who worked at docker on docker swarm now works at Anthropic so makes sense

> **mohsen1**: Swarm is actually OpenAI's terminology https://github.com/openai/swarm

>> **ecto**: Swarm is actually bee terminology

>>> **Razengan**: Swarm is actually human terminology I believe bees call it "bzz bzzt *clockwise dance* *wiggle*"

>>> **nonethewiser**: I think we can all agree Swarm is a proprietary term coined by LargeCorpB for a project that never really got off the ground but definitely can't share the name with any other commercial venture.

>> **MetaMonk**: The first pre-release for Docker Swarm came out a decade ago, the first release of OpenAI swarm came out only a year ago, I guess I'm not sure what you're trying to say. https://github.com/docker-a...

>> **nevir**: https://gist.github.com/kieranklaassen/d2b35569be2c7f1412c64... Looks like claude calls it just "teams" under the covers

> **brookst**: Probably a beekeeper in spare time

>> **MetaMonk**: He's really into APIary things

**dlojudice**: It feels like Auto-GPT, BabyAGI, and the like were simply ahead of their time

> **woeirua**: Had to wait for the models to catch up...

**hereme888**: So apparently all swarm features are controlled by a single gate function in Claude Code: --- function i8() { if (Yz(process.env.CLAUDE_CODE_AGENT_SWARMS)) return !1; return xK("tengu_brass_pebble"...

**VivaTechnics**: OPINION: This will only compound wasted time on Claude.ai, which exploits that time to train its own models. Why time wasted? Claude’s accuracy for shell, Bash, regex, Perl, text manipulation/scrip...

**engates**: Isn't this pretty much what Ruv has been building for like two years? https://github.com/ruvnet/claude-flow

> **dratopher**: His latest editions are a bit alarming...The telemetry system explicitly captures: "Claude session JSONL files (when accessible)" Those session files contain complete conversation histories - every...

> **AffableSpatula**: The difference is that this is tightly integrated into the harness. There's a "delegation mode" (akin to plan mode) that appears to clear out the context for the team lead. The harness appears to b...

>> **estearum**: It's insane to me that people choose to build anything in the perimeter of Claude Code (et al). The combination of the fairly primitive current state of them and the pace at which they're advancing...

>>> **AffableSpatula**: yeah I tend to agree. They're must be reaching the point where they can automate the analysis of claude code prompts to extract techniques and build them directly into the harness. Going up against...

**skippyboxedhero**: Also created my own version of this. Seems like this is an idea whose time has come. My implementation was slightly different as there is no shared state between tasks, and I don't run them concurr...

**threecheese**: Did they release this already? With version 2.1.9 the behavior is vastly different, all of a sudden the main loop is orchestrating subagents in a way I’ve not seen before. “FTSChunkManager agent is...

**iwasbirchyfirst**: And, in a few months, this will all be under the hood, with summary reports and checkins. We won't care how the swarms split up the work. We'll just watch the results come together and answer quest...

**rco8786**: Is this significantly different that the subagents that are already in CC?

**RockRobotRock**: https://x.com/nayshins/status/2014473343542706392

**kordlessagain**: It's agents all the way down.

**mohsen1**: Everyone is wrapping Claude Code in Tmux and claiming they are a magician. I am not so good at marketing but I've done this here https://github.com/mohsen1/claude-code-orchestrator Mine also rotate...

> **AffableSpatula**: I think you've misunderstood what this is.

>> **mohsen1**: Sorry, you're right. went through the code and understood now. I'm going to try the patch. Claude Code doing team work natively would be amazing! Honestly if people in AI coding write less hype-dri...

> **bicx**: Well good sir, I _am_ a tmux magician.

**timwis**: Hasn't cursor been doing this with it's Plan mode for a while? Or is this different?

> **markstos**: With plan mode, I would hope there's an approval step. With Swarm mode, it seems there's a new option for an entire team of agents to be working in the wrong direction before they check back in to ...

**bpavuk**: hey that's exactly how I made Gemini 2.5 Flash give useful results in Opencode! a few specialized "Merc" subagents and a "Master" agent that can do nothing but send "Mercs" into the codebase

**vatsachak**: Cursor browser all over again

**sfortis**: I'm not going to try this. Anthropic will probably ban me again.

**reilly3000**: This no doubt takes some inspiration from mcp_agent_mail https://github.com/Dicklesworthstone/mcp_agent_mail

**ZuzuDuck**: Amazing, I need to check it out in my projects

**donniedice**: You guys have been intentionally milking clocks and gate keeping information. Keep crying that you're losing your jobs. It's funny.

**wiseowise**: I seriously hate this timeline. Is this madness going to become the reality of our jobs? The only way I’m going to be okay with it if they put a simulation GUI à la OpenTTD/GameDev tycoon so I can ...

**mempko**: Am I the only one still looking at different and correcting the AI abiyt design and algorithms so it stays on the path I want, or do you just YOLO at this point?

**tom2948329494**: And… how?

> **AffableSpatula**: The feature is shipped in the latest builds of claude code, but it's turned off by a feature flag check that phones home to the backend to see if the user's account is meant to have it on. You can ...

>> **bonsai_spool**: Do you know what patch to apply? The Github link from the OP seems to have a lot of other things included.

>>> **mohsen1**: https://github.com/numman-ali/cc-mirror/commit/0408f60bd7c75... Way too much code for such a small patch

>>> **AffableSpatula**: it's my repo - it's a fork of cc-mirror which is an established project for parallel claude installs. I wanted to take the least disruptive approach for the sake of using working code and not spelu...

**codethief**: https://xcancel.com/NicerInPerson/status/2014989679796347375 In his second post he included a link to GitHub: https://github.com/mikekelly/claude-sneakpeek

> **dang**: Thanks! We'll put those links in the toptext.
