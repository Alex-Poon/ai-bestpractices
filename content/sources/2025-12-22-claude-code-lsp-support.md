---
title: "Claude Code gets native LSP support"
source_url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
hn_url: "https://news.ycombinator.com/item?id=46355165"
date: 2025-12-22
hn_points: 511
hn_comment_count: 59
tags: [claude-code, lsp, developer-tools, ide, plugins, code-intelligence]
tier: 2
weight: 5
---

## Summary

Anthropic added native Language Server Protocol (LSP) support to Claude Code, enabling the CLI-based agent to integrate with language servers for improved code understanding, navigation, and analysis. The feature was announced through Claude Code's changelog and surfaced via a plugin system where users can discover and install LSP integrations.

LSP support represents a significant step in making CLI-based AI coding agents competitive with IDE-based tools like Cursor. Language servers provide structured information about code: type definitions, references, diagnostics, and refactoring capabilities. By connecting Claude Code to these servers, the agent gains access to the same code intelligence that powers IDE features, without requiring a full IDE environment.

The release included a plugin manager accessible via the `/plugin` command, with a Discover tab for searching and installing LSP integrations. However, the initial rollout had notable limitations: the TypeScript LSP and others were missing diagnostics for real-time errors and warnings, still requiring separate linter or compiler runs. A subsequent version (2.0.76) introduced a regression that broke LSP functionality entirely due to a missing function call in the initialization code.

Other features released around the same time included PDF reading enhancements with page-range parameters, MCP OAuth support, a debug command, expanded git operations in read-only mode, and a 68% memory reduction for the resume feature.

The HN discussion largely debated whether CLI-based agents should be building IDE features from scratch or whether IDE-based agents already solve this problem more naturally.

## Key Insights

- **Bridging the CLI-IDE gap**: LSP support gives CLI agents access to the same code intelligence IDEs have, reducing a major competitive disadvantage
- **Deterministic tools complement probabilistic reasoning**: Combining LSP's precise code analysis with LLM reasoning produces better results than either alone
- **Plugin ecosystem emerging**: Claude Code's plugin system enables community-contributed integrations, though quality and stability vary

## Notable Quotes

> "LSP support is a good start but without mutation functions it is still lackluster" — spullara

> "They moved coding AIs from the IDE into a CLI and now are building an IDE around it" — paxys

## HN Discussion Highlights

*259 comments total*

**spullara**: I really can't understand why JetBrains hasn't integrated its refactoring tools into the AI system. Really missed the boat on making their platform transformational for AI coding. Imagine how much...

> **conradfr**: Jetbrains seems a bit lost these days. Look at that very recent screw up [0]. I thought about moving after 10+ years when they abandoned the commit modal, and jacked up the plan prices, but I barely...

>> **_virtu**: The commit workflow was what kept me locked in to the ecosystem for so long. LazyGit was so good that it convinced me I didn’t need JetBrains anymore. If you love the workflow with JB for commits...

>>> **KptMarchewa**: I'm kinda reading this with disbelief. Are there people whose primary use case for IDE is... git gui?

>>> **notpushkin**: Or if you prefer a GUI (still separate app, so works anywhere, too): https://git-cola.github.io/

>>> **gizzlon**: Just found LazyGit as well. it's amazing! Also like Sublime Merge, if you want a GUI (paid though)

>>> **nikanj**: Fortunately JB broke that addiction for my by first moving the commit dialog behind an option, and then removing it completely. If I have to learn a new workfrow, I might as well learn a new tool

>> **tracker1**: I mostly rely on the CLI for my git operations anyway.  It does make it hard to support others who are using the tools (VS/code/jetbrains, etc) though, since I don't really "get" the workflows in the...

>> **thiht**: > I barely understand how to commit things in Vscode anyway Yeah that’s on you not even trying. Source control panel, add files or chunks, write message, commit.

>>> **mzhaase**: You can put it all on a hotkey.

>> **sesm**: Did they abandon the commit modal? In 2024 line it's disabled by default (in favor of tool window) but you can enable it back.

>>> **jghn**: They have a plugin for the old behavior

>> **krzyk**: Doesn't Jetbrains MCP (it is built on n, you need just to enable it) provide tool for refactoring?

>> **taytus**: I've been a paying user for years. I don't see the point anymore since claude code.

>> **giancarlostoro**: I have been leaning towards Zed.

> **parpfish**: Jetbrainz needs to give up on Junie and their in house ai and focus on integrating with the established tools. If they don’t, VS code will consume them.

>> **atombender**: They've already done that. After the Junie fiasco, they pivoted to "AI Assistant", where Junie is just another provider alongside Anthropic and OpenAI. In theory, you have Claude Code inside...

>>> **mirzap**: Yeah, it's quite odd that they can't get AI tools to work, especially considering so many OSS tools available that work surprisingly well (cline, opencode, etc.).

>> **dvtkrlbs**: They already kinda did. They brough ACP support which allows you to somewhat integrate Claude Code, Gemini CLI or OpenCode they also recently brought BYOK support so you can use an existing provider...

>>> **CuriouslyC**: ACP seems super under the radar. It has some support, but it got merged into A2A, which I don't hear anyone talking about, so it seems like it's going to die on the vine.

>> **octopoc**: I really enjoy Junie, I find it working better out of the box than Claude code. I do wish they integrated their amazing refactoring tools into it though.

>> **bikelang**: Is there something with the Claude code plugin for JB IDEs you don’t like? Is there something the VSCode Claude Code plugin does better?

>>> **wiseowise**: I can’t speak for Claude, but Gemini is laughably bad. Like, does someone who develop this shit ever tried to use it? Is it all crab hands that only use mouse? It’s a single line change to switch...

>> **cedws**: If not VSCode then Zed. It feels like Zed is what they wanted Fleet to be.

> **reactordev**: When you become complacent and your ego isn’t checked, you think you have the hottest thing. Hubris is hard. They had a pretty big moat that they let vscode eat away at. I don’t think they saw any of...

>> **dist-epoch**: They are trying now to create an agent-first IDE. I think they are too big to move on this. https://blog.jetbrains.com/fleet/2025/12/the-future-of-fleet...

>>> **reactordev**: >Over time, we learned that having two general-purpose IDE families created confusion and diluted our focus. And not the dozens of others you have? Do you not consider them also separate families?...

>>> **edelhans**: They just announced the end of their fleet editor

>>> **wiseowise**: So many salty fools who bought into “professional|enterprise  grade ide” cool aid. Glad to see upstarts eating their lunch, they’ve been complacent for far too long.

>> **stusmall**: I've been a massive JetBrains fanboy for a bit over a decade.  I finally let my subscription lapse this month.  It isn't so much about AI integrations but overall competitors have caught up.  The...

>> **jayd16**: Where are you getting the concept of ego and hubris from?  I don't really see much personification of JB's public facing identity.

> **wiseowise**: They’ve also dropped a huge ball with resisting LSP for Kotlin, thinking that they could lock developers into their ecosystem. Well, now (hopefully) it is too late, karma is a b*tch.

> **eterm**: I completely agree. Likewise I'm amazed Microsoft hasn't done it themselves for Roslyn and Copilot. Roslyn analyzers are so incredibly powerful, and it's being ignored. An explainer for others: Not...

>> **remus**: In a similar vein, I really struggle to understand why copilot is so crap when writing SQL and I'm connected to the database. The database has so much context (schema names, column names, constraints...

>>> **csomar**: No one is interested to solve hard problems. The broad industry got lucky with LLMs and everyone is now blindly burning capital at this. If you think they can't be that stupid remember the covid...

>>> **joseda-hg**: I dunno, SQL Server Management Studio regularly drops the ball on autocomplete ever since I've started using it It was one of the things that brought me to DataGrid in the first place

>> **cog-flex**: I hope your current boss appreciates who they have.

>> **neutronicus**: Same shit, but Microsoft and Visual Studio. Like, the AI can't jump to definition! What are we fucking doing!?

>>> **xnorswap**: Exactly! This is why LSP support should be huge, and I'm surprised it's just a line-item in a changelog.

>> **atmosx**: Is Roslyn available only for .NET?

>>> **eterm**: Yes it's the name of the .NET compiler API. It was code-named to disambiguate it from the old compiler. But Roslyn is almost 15 years old now, so I can't call it new, but it's newer than the really...

> **WahyuS002**: It really does feel like the Innovator's Dilemma playing out for JetBrains. They have the best semantic understanding of code (PSI) locked away in their proprietary engine, but they seem too attached...

> **kachapopopow**: I am trying my damn hardest to drop jetbrains, the only thing they have a stronglehold over is their amazing rust analyzer in rustrover. And yah I agree that they are dropping the ball on providing...

>> **cherryteastain**: What does rustrover do that rust-analyzer itself cannot?

>>> **bravit**: Hi! I’m from the RustRover team. RustRover is a full-blown IDE, not just a code analysis engine like rust-analyzer. In addition to Rust code analysis, RustRover provides many features, including code...

>>> **kachapopopow**: rust analyzer fails 13 lines into my main.rs file because I use something rust analyzer just doesn't work with that well, also it's much faster

> **ch2026**: They wanted to, but they’re still waiting for the IDE itself to simply load.

>> **clintonb**: You joke and folks downvote, but this is my biggest issue with WebStorm. I'm seriously considering switching for the first time in 16 years. Zed is quite snappy. The Claude Code integration in VS...

>>> **Dayshine**: Zed is snappy in the same way that notepad ++ is snappy: If you don't support 10% of language features you can avoid the hard work. Unfortunately this means that non trivial projects have false...

> **johnebgd**: I bought the JetBrains AI last year to support them even though it wasn’t good. It never improved. I didn’t renew. Now, I’m questioning if their tooling is something I’ll even renew at all. All of...

>> **rkomorn**: Being a JetBrains customer lately feels like watching everybody else race by in their cars while your horse is trying to eat the carrot in a grocery store ad on the side of a bus stop I get it,...

> **MischaPanch**: Fortunately, Serena has recently been extended to use JetBrains instead of LSP (via a plugin), solving exactly this issue. LSP will never be as good as JetBrains' parsers....

> **vb-8448**: I think they are completely screwing up the AI integration. After years of JetBrains PyCharm pro I'm seriously considering switch to cursor.  Before supermaven being acquired, pycharm+supermaven was...

>> **cyberax**: JetBrains has AI support. It's a bit janky right now, but it is definitely getting better. They have an MCP server, but it doesn't provide easy access to their code metadata model. Things like "jump...

>>> **Numerlor**: The polish is what they seem to have trouble with lately. I much prefer their ides to say vscode, but their development has been a mess for a while with half-assed implementations and long standing...

>> **pqn**: I'm biased (work at Cognition) but I think it's worth giving the Windsurf JetBrains plugin a try. We're working harder on polish these days, so happy to hear any feedback.

>> **spullara**: augmentcode has a great plugin for pycharm (and all jetbrains products) if you don't want to throw the baby out with the bathwater.

>>> **vb-8448**: Actually currently I'm using augment, it's good, but still subpar when compared to old supervmaven or cursor. One thing that I'm really missing is the automatic cursor move.

> **exceptione**: Yes. It is so easy and cheap to refactor in a strongly typed language--no AI needed. And such a waste of electricity, chips, water and money to let some AI model give it a shot. This   something we...

> **dfaiv**: Shameless repost - I'm so sad that JetBrains seems to be floundering. VS Code still doesn't match it in little "oh my gosh, how did it know I wanted that" moments, but the whole JB experience is now...

> **raincole**: It's interesting that everyone is saying "please don't shove AI down our throat!". But when a company actually takes this approach (JetBrains IDEs treat AI just as a tool at the sidebar), everyone is...

>> **unfunco**: JetBrains are shoving it down our throats though, I have to uninstall their AI plugin after every IDE update, CoPilot suddenly stopped working? Oh, it's because JetBrains has enabled their AI...

>> **coder543**: Your logical fallacy is assuming two different groups of people are the same people, which never leads to productive conversation.

>> **wiseowise**: > It's interesting that everyone is saying "please don't shove AI down our throat!". Ever thought that two vocal minorities might not overlap, or even represent opinion of a bigger group?

>> **jayd16**: Yeah, I really appreciate that JB has not made an utter mess of my IDE and has not forced anything on me.

>> **lowsong**: They've tried to play it both ways. Not AI enough for the AI fanboys, but want to keep a toe in there for everyone else. They'd be better placed rejecting AI entirely, and then when the bubble pops...

> **arm7**: One thing you can still do is use Windsurf's agent, Cascade, inside Jetbrains: https://windsurf.com/plugins/jetbrains

> **dostick**: Jetbrains+refactoring - don’t get your hopes up. In Android Studio refactoring was broken for 5+ years and ticket is one of most voted. And nothing happened.

> **anthonypasq**: there is a jetbrains MCP server that gives Claude Code access to this sort of thing, but I think its still fairly jank and bloats context.

>> **shermantanktop**: I never got it to work, but in the process of trying it became obvious that it’s an under-resourced feature.

>>> **derfurth**: I had issues in the beginning, now it works fine, Claude is using it all the time to find things in my codebase.

>>> **dionian**: it would hang for me half the time , the last  time i tried it (3-4months ago?). when it worked, it seemed really good. but it hung often. time to try again

> **whatever1**: Jetbrains is unforgivable for missing the remote development train. People have been developing on remote huge machines for decades. It’s just the ones who did either were terminal wizards, or they...

> **troupo**: > I really can't understand why JetBrains hasn't integrated its refactoring tools into the AI system. Because their refactoring tools are not a "slap on a couple of commands and delegate actual work...

> **_virtu**: I’ve been a JetBrains toolbox subscriber for over a decade. I used to run trainings for new hires to get them up to speed on the eco system as our team would provide licenses. I say all of this...

>> **porker**: > They’ve dropped the ball over the past five years. Part of me thinks it was the war in Ukraine that did them in. I'm also a subsciber for over a decade, and came here to say the same thing. I don't...

> **insane_dreamer**: can't speak for other languages, but the python LSP in PyCharm is miles ahead of any other lsp out there (and I've tried them all). I give `ty` the best chance of catching up to them, but they're...

> **rurban**: Just customize emacs. Their refactoring and AI packages are good, and it's faster.

> **0x696C6961**: LSP supports refactoring commands

>> **joshribakoff**: But Claude Code does not, which is the point you have missed

> **dist-epoch**: People keep saying how amazing IntelliJ is at refactoring, but then you realize the talk about "rename thing" and "extract function". This is 5% of what refactoring is, the rest is big scale...

>> **Tarean**: Intellij also has structural search and replace, where you can do full subgraph isomorphism search in the code and with patterns like     $x$.foo($args$) Where you add filters like x's type is a...

>> **spullara**: I think that the commonly used refactoring functions would make a big difference and right now most IDEs are pretty bad at them (especially across all the languages jetbrains supports):   - rename...

>>> **marwamc**: Agentic refactoring was such a chore I ended up building this for my refactoring workflows. https://gitlab.com/rhobimd-oss/shebe/-/blob/main/docs/guides......

>> **jtms**: You’re missing the point, it’s about those tools drastically improving context window management. When you want to tackle large refactors, Claude Code will blow tens of thousands of tokens just...

**CharlesW**: It's strangely difficult to find official information about this, but here's what I've learned: • Use `/plugin` to open Claude Code's plug-in manager • In the Discover tab, enter `lsp` in the search...

> **JamesSwift**: Yeah, I posted here because I was completely blindsided when my claude asked if I wanted to install a go lsp. I didnt even know that was a thing. A little googling led to this changelog from 3 days...

>> **bredren**: I got an unexpected offer to install the LSP plugin for swift-lsp at 6:30pm pst on 12/19pm and again yesterday afternoon the text reads: LSP Plugin Recommendation LSP provides code intelligence like...

>> **ako**: I had a conversation with Claude code 2 weeks ago where it mentioned early support for LSP had been added into Claude code. Have been working on a LSP for a custom language since then.

> **tomashubelbauer**: I am on the latest version of Claude Code and nothing comes up when I follow this and search for "mcp". Looks like this feature is quite undercooked at the moment. I'm hoping for a more...

>> **anamexis**: Perhaps because you are searching for "mcp" and not "lsp"?

>>> **tomashubelbauer**: LOL yeah that would be a solid guess but I just sanity checked and I messed it up only in the comment, in Claude Code when I search for "lsp" I still get no matches.

> **Maxious**: If you want to add custom lsps, they need to be wrapped in a Claude code plugin which is where the little bit of actual documentation can be found https://code.claude.com/docs/en/plugins-reference

> **bicx**: Thanks! I saw typescript-lsp in the plugins list, but I wasn't sure if that was related.

> **xnorswap**: That works, but even after installing the plugin, it doesn't seem to run the language server itself, so it doesn't seem to do anything in the terminal version of claude-code. I'd be disappointed if...

> **kasey_junk**: Have you figured out what triggers it?

>> **CharlesW**: No, and it looks like this functionality was released/announced prematurely: https://github.com/anthropics/claude-code/issues/14803#issue... https://github.com/anthropics/claude-code/issues/13952#issu...

>>> **JamesSwift**: My permissions prompt isnt quite working right with it either. It pops up but isnt blocking, so claude continues editing and asking for other permissions which replaces this prompt. Then when you...

>> **monkpit**: Go to /plugins, then marketplaces, then select official and update marketplace. This did it for me.

>>> **harmath**: this!

**brianyu8**: I am super bullish on claude code / codex cli + LSP and other deterministic codemod and code intelligence tools. I was playing around with codex this weekend and honestly having a great time (my...

> **lionkor**: OpenAI engineer fails to rename references because his F2 key has been replaced with the Copilot button? No LSP support is wild.

>> **shimman**: This is something I notice often when using these tools (if this is what you are referring too). Like they will grep entire code bases to search for a word rather than search by symbol. I suppose...

>>> **nvarsj**: Only if they are not told how to search the codebase efficiently. All you need is an MCP server for code search. There's even LSP backed MCP servers now.

>>> **qiine**: > grep is one of the worse ways to refactor Hum? care to explain this?

> **shepherdjerred**: Are you having a positive experience with Codex compared to Claude Code? Codex in my brief experience was... not good w/ 5.1

>> **cube2222**: Just to provide another datapoint - tried codex September / October after seeing the glowing reviews here, and it was, all in all, a huge letdown. It seems to be very efficient context-wise, but at...

>>> **linsomniac**: I was luke-warm about codex when I tried it 2-3 months ago, but just recently tried it again last week, running it against claude code, both of them running against the same todo list to build a...

>>> **fluidcruft**: Similar experience and timeline with codex, but tried it last week and it's gotten much better in the interim. Codex with 5.2 does a good job at catching (numerical) bugs that Opus misses. I've been...

>>> **allisdust**: Another anecdote/datapoint. Same experience. It seem to mask a lot of bad model issues by not talking much and overthinking stuff. The experience turns sour the more one works with it. And yes +1 for...

>>> **HarHarVeryFunny**: What are some of the use cases for Claude Code + LSP ? What does LSP support let you do, or do better, that Claude Code couldn't do by itself ?

>>> **kohlerm**: I checked the codex source code  a few months ago and the implementation was very basic compared to opencode

>> **theshrike79**: It goes like this: Codex is an outsourcing company, you give specs, they give you results. No communication in between. It's very good at larger analysis tasks (code coverage, health etc). Whatever...

>> **aschobel**: I’m basically only using the Codex CLI now. I switched around the GPT-5 timeframe because it was reliably solving some gnarly OpenTelemetry problems that Claude Code kept getting stuck on. They feel...

>> **__mharrison__**: I've gone it works wonderful for 5.2. I think chatgpt plus is at the top of the weekly AI rolling wars. Most bang for the buck.

> **frays**: Interesting to see that you work at OpenAI but had to build a skill like this yourself. Surprised that you don't have internal tools or skills that could do this already! Shows how much more work...

>> **voiper1**: My theory is that even if the models are frozen here, we'll still spend a decade building out all the tooling, connections, skills, etc and getting it into each industry. There's so much _around_ the...

>>> **nonethewiser**: Agree completely. It's already been like this for 1-2 years even. Things are finally starting to get baked in but its still early. For example, AI summaries of product reviews, gemini youtube video...

>> **NitpickLawyer**: > Shows how much more work there is still to be done in this space. This is why I roll my eyes every time I read doomer content that mentions an AI bubble followed by an AI winter. Even if (and...

>>> **agumonkey**: One thing though, if the slowdown is too abrupt, it might forbid openai, anthropic etc to keep financially running datacenters for us to use.

>>> **imiric**: The idea that this technology isn't useful is as ignorant as thinking that there is no "AI" bubble. Of course there is a bubble. We can see it whenever these companies tell us this tech is going to...

>>> **jameslk**: Useful technology can still create a bubble. The internet is useful but the dotcom bubble still occurred. There’s expectations around how much the invested capital will see a return and growing...

>> **shermantanktop**: Cobbler’s children…

> **rglynn**: I've had a number of occasions where claude (et al.) have incorrectly carried out a task involving existing code (e.g. create a widget for foo, following bar's example). In these cases the way I...

**dvtkrlbs**: What boggles my mind is. I've been using OpenCode [1] which had this future for at least 6 months. I sometimes baffled by the slow progress of closed source software. Also highly recommend OpenCode...

> **jwr**: I must be doing something wrong, because I can't get OpenCode to actually do anything useful, and not for lack of trying. Claude code gets me great results instantly, opencode (if I can't make it...

>> **richardgill88**: > Is it the prompt that Anthropic has been polishing in Claude code for so long? I think so. The opencode TUI is very good, but whenever I try it again the results are subjectively worse than Claude...

>> **ako**: There’s a ton of difference provided on top of the LLMs, especially the tools that allow LLMs to engineer their own context, validate generated code, test generate code, research code bases,...

>> **dvtkrlbs**: I only played with Claude Code briefly but my experience with OpenCode was amazing. My experience it works the best with Claude especially Sonnet models (I use it with Claude Sonnet 4.5 with my...

>> **rhodysurf**: Claude models in opencode use the Claude code system prompt, are you comparing Claude code to opencode with non anthropic models?

>>> **jwr**: Yes.

> **linkage**: You can move quite fast when you don't have to spend half a week persuading 7 stakeholders that something is worth doing, then spend a week arguing about sprint capacity and roadmap disruptions.

> **khimaros**: preferring open source and provider agnostic tools, i really want to like OpenCode. i used it exclusively for months, but sadly it has major usability issues which switching to Claude Code solved: -...

> **resize2996**: tbf, OpenCode's development cycle seems pretty fast. If someone announced AGI in the morning, I'd bet they have it integrated by EOD. I also use OpenCode extensively, but bounce around to test out...

>> **troyvit**: I just started playing with OpenCode over the weekend after working with aider and aider-ce, and I like a lot of things about it, though I miss some aider features. What other code helpers have you...

>>> **resize2996**: The big players (Gemini, Claude Code, Codex) and then aider and opencode for open source. I keep my setup modular/composable so I can swap pieces and keep it usable by anyone (agent, human, time...

> **SamDc73**: I do like OpenCode, but I get small bugs here and there like flickering, freezing and sometimes just crash all together. But their configuration setup is the easiest and best out of all the other CLI...

> **mgraczyk**: One answer to questions like this is that Claude Code has orders of magnitude more paying users, so it's more important to get things right and ship carefully

> **kbar13**: i'm not sure i agree with the assessment that claude code has been moving slowly... but it is cool that opencode has had this for a while. will def check it out

**ed_blackburn**: I literally said this three days ago: https://hachyderm.io/@ed_blackburn/115747527216812176 But in all seriousness, LLMs have their strengths but we’re all wasting tokens and burning the planet...

> **grimgrin**: it's likely been on their mind for _a while_ those wanting lsp support in the loop have been using things such as: https://github.com/oraios/serena

> **dcreater**: I hope in a couple of years the industry would have outgrown this adolescene and we'll all collectively look back at this horribly inefficient and poorly engineered tooling with disdain. We need to...

**anthonypasq**: I find it so weird that people are so bullish on the CLI form factor when they are literally just adding functionality that IDE based agents get for free. Stuff like improved diff tools and LSP...

> **zingar**: IDEs have LSP support because they have a plugin that connects to an LSP server. The plugin is a very small piece of code compared to the language server. Creating a new client is not reinventing the...

> **blitz_skull**: I have not yet had an IDE-based agent give anything close to the CLI Claude Code experience. So until it manages to do that, I’ll keep being bullish on what works.

>> **dustypotato**: Google Antigravity is pretty much close to Claude Code imo

>> **Jgrubb**: Including the Claude Code v2 experience in VSCode. Thank you, whoever added the setting to revert back to the terminal experience.

>> **anthonypasq**: nothing about that is because its a cli app

> **ramoz**: I just saw a video of non-technical person describing how they use claude code to automate various workflows. They actually tried vscode and then the desktop gui. Yet they preferred the CLI because...

>> **scottyah**: There are plenty of GUIs for managing kubernetes, from k9s to redhat's Openshift gui, rancher, Lens, etc

>>> **ramoz**: big reach

>> **JamesSwift**: Curious if you have a link to that video. Im trying to bridge the gap of claude code to non technical users and am trying to consume all prior art.

>>> **ramoz**: This is also what I’ve been doing. I can’t find the exact video but this is another good example: https://www.tiktok.com/@thinkwithv/video/7580186972208024863 The comments are usually insightful....

> **nextaccountic**: What IDE agent gets access to LSP? I use Zed and unless there is some MCP server that provides the same thing as the LSP server, the Zed agent won't have access, even though it's in an IDE that...

>> **joshuacc**: Cursor, Copilot, Roo Code, Cline, among others.

>>> **nextaccountic**: Hi, I just looked up and two weeks ago someone made this suggestion in Cursor forum https://forum.cursor.com/t/support-of-lsp-language-server-pr... > Feature request for product/service > > Cursor...

>> **anthonypasq**: cursor

> **bakies**: Well my editor is in the terminal, so is my chatbot. I dont really want to change to an IDE to use a desktop app and a chatbot that both have half-baked UIs trying to complement each other.

> **BeetleB**: For many of us, the plus of the CLI form factor is it doesn't tie us to a particular IDE.

**vorticalbox**: My favourite agent crush[0] has lsp support for a while. I’ve not noticed the agent deciding to use it all that much. [0] https://github.com/charmbracelet/crush

> **esafak**: Did it make no difference when you mentioned in your AGENT.md which LSP servers are installed?

>> **tonyhart7**: I guess supporting tool call natively would improve read token efficiency since they can just run the tool directly

**ramoz**: I haven't come across a case where it has used the LSP yet. Opus 4.5 is fairly consistent in running QA at proper times. Lint checks and all are already incorporated into a standard & native...

**vexna**: Just a heads up that this is completely broken as of 2.0.76. Dug through their obfuscated JS and it looks like they forgot to re-add a function call in the LSP manager initialize function that...

**paxys**: So they moved coding AIs from the IDE into a standalone CLI and now are building an IDE around the CLI?

**zby**: LSPs should expose their api through shell commands - then integrating it with any LLM would be trivial. And it would also be very useful for humans.

> **anamexis**: You could use a CLI frontend for LSP, e.g. https://github.com/valentjn/lsp-cli But why would that be better than LLMs using the LSP with a dedicated tool rather than a shell command tool?

>> **wild_egg**: CLIs don't use context space when unused. I find them almost universally preferable just because of that. Models get stupid after the first 80-100k tokens are used so keeping bloated tools out of the...

>>> **anamexis**: Well you need to use context space somehow, to tell Claude that the LSP CLI exists and how to use it.

**hexsprite**: The typescript-lsp (and others?) is missing a critical part of LSPs whcih is the diagnostics for real-time errors and warnings. So you still need to run a linter, tsc, etc. to generate those sadly.

**PrimalPower**: I've been a JetBrains suscriber for a while, because at the time I saw that I preferred the UI experience over Jetbrains to VSCode. The IDE is well built, they have a better product/user experience...

**stared**: If you want to explore the ecosystem of Claude Code plugins, see https://claude-plugins.dev/ With a fair disclaimer, that it is very easy to vibe-code a skill oneself, with both pros (you can create...

**ttoinou**: Added gift tag pictogram for year-end promotion message What's that? We all want a promotion on Claude Code!

**nextworddev**: It’s breathtaking how fast Anthropic / Claude Code team ships. They are definitely coding in a LLM maximalist way, in a good way.

> **reilly3000**: I came here just to say that. The commit history on that changelog blew me away.

**mmaunder**: Amazing how long this took. Serena has been doing a not bad job of helping solve this issue. But this has been an obvious built in for agents for some time now. https://github.com/oraios/serena

**mrinterweb**: I was hoping LSP support would be implemented. I know there are existing MCP servers that can do something kind of similar, but I doubt the agent would be smart enough to consistently utilize the LSP...

**carterschonwald**: Claude code has some hard coded system prompting that materially opposes my working preferences.  I work on things that need full context/ at least 50+ percent usage ish reasoning to do stuff...

**jonas21**: The cadence of the Claude Code team is pretty impressive. I count 57 releases since 2.0 (which was less than 3 months ago), and most of these had significant new features.

**liampulles**: What I've wondered about is whether there is a use in having an LLM that operates on AST symbols (or some IR representation) as input and/or output. It would be language specific of course (though...

**jwr**: I've been using https://github.com/isaacphi/mcp-language-server to do pretty much the same thing for quite a while now in Claude code. And it works with clojure-lsp unlike the limited set of plugins...

**desireco42**: OpenCode had this for a while and overall has better and nicer TUI. Having said that, for same models, especially with LSP, some fancy MCPs, mgrep, has been doing really bad job lately for me. Not...

**arianvanp**: I hate everything about the Claude code plugin system. They saw GitHub Actions supply chain Fiasco and said: great let's add hallucinations on top. It's that bad. It's embarrassingly bad. No lock...

> **pnt12**: Yeah uvx gets abused out of its convenience. uv has many useful features like dev dependencies and inline dependencies, that are much more reliable than uvx. One tip for in-line dependencies: set a...

> **JamesSwift**: Nix plus flakes (and optionally devenv) is such a great baseline to operate agents in. So much less thinking about dependencies on various runtime platforms, and you get pinning out of the box....

> **throw-12-16**: and then it runs out of home directory and slurps up your secrets. its completely asinine to install npm globals these days, especially one that is such a juicy supply chain attack target

**CameronBanga**: Maybe I'm the only one, but does anyone else have an issue on macOS where Claude Code never updates itself automatically and you always have an error? I guess it's in times when I leave the CLI tool...

> **Arubis**: Depends on your installation method. I have CC installed on macOS with `bun install` and it self-updates. But you could have different results with, oh, npm or yarn or homebrew or nix or probably...

> **fahrradflucht**: I have the same issue since for ever (and update by hand because of it). I always assumed it is because it gets confused by me using Volta for node/npm version management and Volta‘s shim masking...

> **cube2222**: Yeah, I uninstalled and reinstalled with homebrew, and it’s working well now.

> **fabbbbb**: Always have a lot of sessions running locally and don’t recall this

> **mokkol**: Uninstall it and install it via home brew fixed it for me.

> **pigeonhole123**: I removed the locks directory which fixed it

**oofbey**: I should know this, but what's LSP?  Language Server Protocol - I can read.  But what's that?

> **3836293648**: It's the protocol that VSC made to speak to programs that do code analysis and is the basis of goto definition, autocomplete, refactorings etc. It's used by most smaller editors so they can backpack...

>> **jasonjmcghee**: Also diagnostics (errors, warnings), inlay hints like types and parameters, code lens (tiny embedded buttons), symbols, notifications like “document changed”, and more

**terminal512**: Just discovered https://plugins.jetbrains.com/plugin/29174-ide-index-mcp-ser.... Its MCP, but still better than nothing.

**m_rcin**: How to configure it? I have LSP running in neovim, but Claude Code writes: ● LSP(operation: "goToDefinition", symbol: "mtz", in: "src/mtz.cpp")   ⎿  No LSP server available for file type: .cpp ● No...

**nurettin**: Interesting. I develop two projects and maintain a few. I haven't opened an IDE within the past two weeks. What do you do with an IDE? Stare as code is written, refactored, tested and debugged...

> **swader999**: Same here, I'm a bit apprehensive admitting it. Thanks for going first.

**odie5533**: Is there a way to automatically run tests every file change, like post tool somehow, so that it returns a concise test run back to the LLM every tool use? That seems like it would be useful.

> **rane**: You don't want to run tests after every file change, because that will distract Claude from finishing whatever it's doing and add noise to the context window. Of course the tests will be broken if...

>> **odie5533**: Won't the LSP distract Claude too? I am trying to think of ways to make Claude faster at iterating by reducing tool calls. That always seems to be a bottleneck when it's doing tons of back-and-forth...

>>> **rane**: Depends on Anthropic has implemented it I guess. I haven't had it activate yet despite the prompt to install an LSP.

> **spellboots**: Yes, you can do this with hooks: https://code.claude.com/docs/en/hooks

>> **kristianp**: Back when I was using CC, I had a "mandatory" development workflow that checks if the corresponding test file exists for the changed file, runs tests and runs the test coverage tool for the changed...

**trq_**: Hi, work on Claude Code here! Let me know if you have any feedback!

> **swader999**: How do I get Claude to start using the LSP? I've got go, kotlin, swift and typescript projects that might benefit.

> **Jgrubb**: That tool search tool y'all announced recently - huge upvote for getting that into Claude code.

**behnamoh**: No Python LSPs yet!

> **guessmyname**: 1. https://docs.astral.sh/ty/ 2. https://github.com/microsoft/pyright 3. https://github.com/python-lsp/python-lsp-server 4. https://github.com/palantir/python-language-server

> **simlevesque**: There's pyright-lsp. Isn't this a Python LSP ? or is it lacking important features ?

**throw-12-16**: still distributed as an npm global that runs out of your home directory. insane way to distribute a core product considering the state of npm.

**colonCapitalDee**: Great news. I was just starting to explore creating a goto-definition skill for CC, glad I don't have to figure that out now :)

**sathish316**: Can you do @ and refer to a method or variable in a file with lsp support? Otherwise, how can lsp context be used in Terminal chat?

> **teaearlgraycold**: A big use case will be to tell the LLM what the type of an expression is.

**kristo**: LLMs should operate on the code's AST when possible, and should be trained on code's AST as well

**dfaiv**: it doesn't seem to mention anything on using the LSP for linting/typechecking? That's what I really want, instead of my unholy combo of post edit hooks and claude.md "PLEASE PLEASE PLEASE run type...

**sixothree**: Serious question, does this mean it will support Roslyn? Or will they "bake their own" version?

**helsinki**: It has been in the source code for like two months. I've been using it for a while now.

**octopoc**: Seems like SCIP would be a better fit, although not as widely supported by languages I suppose.

> **0xdeafbeef**: It takse long to regen on big codebases, but yes

**brikym**: As far as I know Claude models in VSCode + GitHub Copilot have had this for months now.

**behnamoh**: I mean, OpenCode has had this feature for a while: https://opencode.ai/docs/lsp/

> **jarjoura**: It's a shame that my company tied itself to claude-code way too fast. It was like a single week last summer of, "oh what's everyone's favorite? claude? okay, let's go!" OpenCode has been truely...

> **gempir**: OpenCode is so underrated. One of my favorite features is that you can run it as a server, and then it has a API and SDKs to manage sessions etc. Great to build a centrally managed agent for your...

**dejw**: How do I integrate it with Helix Editor?

**Lerc**: Does this mean Claude Code can be a consumer of this information or a provider? Maybe whynotboth.gif?

**tdfirth**: No rename symbol? What am I missing? It seems like a no brainer.

> **fueledbyzaatar**: References + a few extra steps will give you rename symbol. Anthropic is seemingly wanting to experiment with this - so it makes sense to limit the integration points.

**endorphine**: Any idea if this is planned for Codex as well?

**Havoc**: What does the terminal integration mentioned do?

> **sevg**: I believe it’s to do with supporting shift+enter (to do multiline prompts). https://github.com/anthropics/claude-code/issues/1259#issuec...

>> **Havoc**: Oh that’s neat. Thanks for highlighting

> **speed_spread**: Every once in a while it runs 'sudo rm -rf /'.

>> **catoc**: Every once —

**jedisct1**: Doesn't seem to work with Zig?

**steven_j24**: i think Kiro CLI added while ago and it does support diagnostics and rename symbol

**synergy20**: dumb question,how to use it? claude is a cli tool,not an editor,why is lsp relevant?

**mparis**: Seems like a great feature but am I the only one that still regularly sees the totally broken scrolling bug in CC? I have churned from CC in favor of codex until the scrolling bug is fixed. There is...

**esafak**: How to use this new feature?

**jama211**: I’m curious what the benefit of this is over running away, cursor ide with the Claude agent?

**1123581321**: This is an ignorant question, but, what is the benefit of this if you also have your project open in an editor or IDE (presuming they integrate language server?) If you're vibe coding without an...

> **BeetleB**: As part of a bigger refactor, you want to rename some variables. With an LSP hook, the LLM can make the change (more) reliably. The LLM wants to see the definition of a function. More reliable than...

> **ascorbic**: The same reason you want an LSP in your editor: so you get inline docs and error messages, autocomplete, jump to definition, refactoring actions etc.

>> **sunaookami**: But what is the benefit for Claude Code? You don't write code in Claude Code so why would I need autocomplete or jump to definition? Does Claude itself use them instead of e.g. grepping? Struggling...

>>> **HarHarVeryFunny**: I'd like to know what more of the use cases are too, but one would be for doing renaming operations where the LSP understands the code and will tell the caller exactly what edits to make to which...

>>> **kaibee**: > Does Claude itself use them instead of e.g. grepping? Struggling to understand how it helps. That would be the idea.

>>> **ascorbic**: Yes, it's for Claude itself.

> **esafak**: Your test suite and linter don't code. They don't help your agent look up definitions of variables, etc.

>> **1123581321**: Ah, it's about making language documentation available, and making crawling the app  for understanding cheaper/more direct?

>>> **esafak**: It's like making your IDE available to them.

**saagarjha**: Has anyone checked that it actually works before posting it here? lol

**Razengan**: Anthropic/Clause has the absolute worst UX among all the major AI products. Just try copy-pasting text, say a prompt from a notes app or a text file. and they completely ignore all complaints. Why...

> **aurbxyajwur**: Hard disagree. They have the best UX in the industry

>> **Razengan**: These comments sound like paid PR. I literally just gave an example. I keep AI prompts in Notes for using with different chatbots. You can paste them normally into ChatGPT etc but Claude mangles them...

>>> **nineteen999**: What language are you using with it for Godot? I'm using C++ with Unreal5 and Claude seems pretty good at it TBH. I don't disagree that it has some rough edges.

**exac**: The only reason I paid my yearly JetBrains subscription this year was to keep my lower price locked-in. I've been using VS Code all year. I won't renew my JetBrains subscription that I've had since...

> **throwaway314155**: How is that relevant?
