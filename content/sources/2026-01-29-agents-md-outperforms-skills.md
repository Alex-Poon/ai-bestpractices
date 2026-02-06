---
title: "AGENTS.md Outperforms Skills in Our Agent Evals"
source_url: "https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals"
hn_url: "https://news.ycombinator.com/item?id=46809708"
date: 2026-01-29
hn_points: 520
hn_comment_count: 70
tags: [agents-md, harness-engineering, prompt-engineering, evals, vercel, next-js]
tier: 1
weight: 3
---

## Summary

Vercel's engineering team published an evaluation comparing two approaches to providing AI coding agents with documentation: AGENTS.md files (passive context embedded in the system prompt) versus skills (active retrieval tools the agent can invoke on demand). The evaluation targeted Next.js 16 APIs that were absent from model training data, including new patterns like `'use cache'`, `connection()`, `forbidden()`, and async `cookies()`.

The results were striking. A compressed 8KB documentation index embedded in AGENTS.md achieved a 100% pass rate on the evaluation tasks, while skills maxed out at 79% even with explicit instructions telling the agent to use them. Without explicit instructions, skills performed no better than the 53% baseline. The root cause was that in 56% of eval cases, the skill was never invoked at all — the agent simply failed to recognize when it needed documentation help.

The key finding is that passive context (always-available documentation) eliminates the decision point that trips up active retrieval. There is no sequencing issue, no need for the agent to decide whether to look something up. The documentation is simply present in every turn. Vercel also found that aggressive compression of documentation into an index format worked as well as providing full content, and that small wording changes in instructions produced dramatic behavioral shifts — revealing the fragility of active retrieval approaches.

The team recommends generating an AGENTS.md documentation index using their codemod tool (`npx @next/codemod@canary agents-md`) and building evals targeting APIs outside training data to measure the real impact of documentation strategies.

## Key Insights

- **Passive context beats active retrieval**: Always-available documentation in AGENTS.md achieved 100% versus 79% max for skills-based retrieval
- **Agents fail to invoke skills**: In 56% of eval cases, the skill was never invoked — agents do not reliably recognize when they need help
- **Instruction fragility**: Small wording changes in skill instructions produced dramatic behavioral shifts, making active retrieval unreliable
- **Compression works**: An 8KB compressed documentation index performed as well as full documentation content
- **Eval methodology matters**: Testing against APIs outside training data reveals actual documentation impact versus memorized knowledge

## Notable Quotes

> "In 56% of eval cases, the skill was never invoked." — Vercel blog

> "Don't wait for skill improvements; results matter now." — Vercel blog

## HN Discussion Highlights

*158 comments total*

**motoboi**: Models are not AGI. They are text generators forced to generate text in a way useful to trigger a harness that will produce effects, like editing files or calling tools. So the model won’t...

> **vidarh**: > AGENTS.md, on the other hand, is context. Models have been trained to follow context since the dawn of the thing. The skills frontmatter end up in context as well. If AGENTS.md outperform skills in...

>> **OJFord**: No it's more than that - they didn't just put the skills instructions directly in AGENTS.md, they put the whole index for the docs (the skill in this case being a docs lookup) in there, so there's...

>>> **vidarh**: > No it's more than that - they didn't just put the skills instructions directly in AGENTS.md, they put the whole index for the docs (the skill in this case being a docs lookup) in there, so there's...

>>> **seunosewa**: What if they used the same compressed documentation in the skill? That would be just fine too.

> **js8**: > Models are not AGI. How do you know? What if AGI can be implemented as a reasonably small set of logic rules, which implement what we call "epistemology" and "informal reasoning"? And this set of...

>> **blueprint**: It's very simple. The model itself doesn't know and can't verify it.  It knows that it doesn't know. Do you deny that? Or do you think that a general intelligence would be in the habit of lying to...

>>> **js8**: All I asked for was the OP to substantiate their claim that LLMs are not AGI. I am agnostic on that - either way seems plausible. I don't think there even is an agreed criterion of what AGI is....

>>> **coldtea**: None of the above are even remotely epistemologically sound. "Or do you think that a general intelligence would be in the habit of lying to people and concealing why?" First, why couldn't it? "At the...

> **themoose8**: Indeed, they're not AGI. They're basically autocomplete on steroids. They're very useful, but as we all know - they're far from infallible. We're probably plateauing on the improvement of the core...

>> **whattheheckheck**: They haven't even released the full complete retrain on the entire corpus of what they have in the training data. They have billions of chats detailing precisely a high fidelity map of the inner...

>> **coldtea**: >Indeed, they're not AGI. They're basically autocomplete on steroids. This makes the assumption that AGI is not autocomplete of steroids, which even before LLMs was a very plausible suggested...

> **baby**: I was thinking about that these says and experimenting like so: a system prompt that asks the agent to load any skills that seem relevant early, and a user prompt that asks the agent to do that later...

> **DanOpcode**: What's RL?

>> **jacobkg**: Reinforcement Learning https://en.wikipedia.org/wiki/Reinforcement_learning

>> **wahnfrieden**: Reinforcement learning

> **bzGoRust**: I completed agree with your point

> **anal_reactor**: > Models are not AGI https://en.wikipedia.org/wiki/GNU/Linux_naming_controversy

**tottenhm**: > In 56% of eval cases, the skill was never invoked. The agent had access to the documentation but didn't use it. The agent passes the Turing test...

> **cainxinth**: Even AI doesn’t RTFM

>> **seanhunter**: I can see the future.  In a few years, HN will consist entirely of: 1) Bots posting “Show HN” of things they’ve vibecoded 2) Bots replying to those posts, 3) Bots asking whether the bots in #2 even...

>>> **rglynn**: In the future?

>>> **joseda-hg**: God dang it, Dang!

>> **pylotlight**: It learnt from the best

>>> **deadbabe**: If humans would just RTFM they wouldn’t need AI.

> **BiteCode_dev**: You got me good with this one. But seriously, this is my main answer to people telling me AI is not reliable: "guess what, most humans are not either, but at least I can tell AI to correct course and...

>> **gjadi**: It's ego won't get in the way but it's lack of intelligence will. Whereas a junior might be reluctant at first, but if they are smart they will learn and get better. So maybe LLM are better than...

>>> **falcor84**: That's exactly the thing. Claude Code with Opus 4.5 is already significantly better at essentially everything than a large percentage of devs I had the displeasure of working with, including learning...

>> **bonesss**: Key differences, though: Humans are reliably unreliable.  Some are lazy, some sloppy, some obtuse, some all at once. As a tech lead you can learn their strengths and weaknesses.  LLMs vacillate...

>>> **vidarh**: You can absolutely learn LLMs strengths and weaknesses too. E.g. Claude gets "bored" easily (it will even tell you this if you give it too repetitive tasks). The solution is simple: Since we control...

**w10-1**: The key finding is that "compression" of doc pointers works. It's barely readable to humans, but directly and efficiently relevant to LLM's (direct reference -> referent, without language verbiage)....

> **postalcoder**: That's not the only useful takeaway. I found this to be true:   > "Explore project first, then invoke skill" [produces better results than] "You MUST invoke the skill". I recently tried to get...

>> **Izkata**: An idea: The first two are obviously written as second-person commands, but the third is ambiguous and could be interpreted as a first-person thought.  Have you tried the first two without the "you...

>>> **postalcoder**: Solid intuition. Testing this on antigravity is a chore because I'm not sure if I have to kill the background agent to force a refresh of the GEMINI.md file so I just did it anyway....

>> **inadequatespace**: Interesting. It's almost like models don't like being ordered around rudely with this "must” language. Perhaps what they've learned from training data is “must” often occurs in cases with bullshit...

>> **baby**: ln -s

> **jcheng**: Would’ve been perfectly readable and no larger if they had used newline instead of pipe.

> **ai-christianson**: They say compressed... but isn't this just "minified"?

>> **ethmarks**: Minification is still a form of compression, it just leaves the file more readable than more powerful compression methods (such as ZIP archives).

>>> **throwaway314155**: I'd say minification/summarization is more like a lossy, semantic compression. This is only relevant to LLM's and doesn't really fit more classical notions of compression. Minification would...

> **seunosewa**: Most llms.txt are very similar to the compressed docs.

**jgbuddy**: Am I missing something here? Obviously directly including context in something like a system prompt will put it in context 100% of the time. You could just as easily take all of an agent's skills,...

> **jstummbillig**: > Obviously directly including context in something like a system prompt will put it in context 100% of the time. How do you suppose skills get announced to the model? It's all in the context in some...

>> **cortesoft**: Isn't the difference that a skill means you just have to add the script name and explanation to the context instead of the entire script plus the explanation?

>>> **majormajor**: Their non-skill based "compressed index" is just similarly "Each line maps a directory path to the doc files it contains" but without "skillification." They didn't load all those things into context...

>>> **sevg**: You could put the name and explanation in CLAUDE.md/AGENTS.md, plus the path to the rest of the skill that Claude can read if needed. That seems roughly equivalent to my unenlightened mind!

>>> **verdverm**: I like to think about it this way, you want to put some high level, table of contents, sparknotes like stuff in the system prompt. This helps warm up the right pathways. In this, you also need to...

>> **jmathai**: Skills have frontmatter which includes a name and description. The description is what determines if the llm finds the skill useful for the task at hand. If your agent isn’t being used, it’s not as...

>>> **Spivak**: Sure, but then you're playing a very annoying and boring game of model-whispering to specific versions of models that are ever changing as well as trying to hopefully get it to respond correctly with...

> **observationist**: This is one of the reasons the RLM methodology works so well. You have access to as much information as you want in the overall environment, but only the things relevant to the task at hand get put...

>> **judahmeek**: > only the things relevant to the task at hand get put into context for the current task And how do you guarantee that said relevant things actually get put into the context? OP is about the same...

> **_the_inflator**: I agree with you. I think Vercel mixes skills and context configuration up. So the whole evaluation is totally misleading because it tests for two completely different use cases. To sum it up: Vercel...

> **verdverm**: You aren't wrong, you really want a bit of both. 1. You absolutely want to force certain context in, no questions or non-determinism asked (index and sparknotes). This can be done conditionally, but...

> **teknopaul**: My reading was that copying the doc's ToC in markdown + links was significantly more effective than giving it a link to the ToC and instructions to read it. Which makes sense. & some numbers that...

> **singingbard**: So you’re not missing anything if you use Claude by yourself. You just update your local system prompt. Instead it’s a problem when you’re part of a team and you’re using skills for standards like...

> **orlandohohmeier**: I’ve been using symlinked agent files for about a year as a hacky workaround before skils became a thing load additional “context” for different tasks, and it might actually address the issue you’re...

>> **mbm**: What sort of files do you generally symlink in?

> **deaux**: You're right, the results are completely as expected. The article also doesn't mention that they don't know how the compressed index output quality. That's always a concern with this kind of...

> **TeeWEE**: Indeed seems like Vercel completely missed the point about agents. In Claude Code you can invoke an agent when you want as a developer and it copies the file content as context in the prompt.

**thorum**: The article presents AGENTS.md as something distinct from Skills, but it is actually a simplified instance of the same concept. Their AGENTS.md approach tells the AI where to find instructions for...

> **verdverm**: Yea, I am now separating them based on 1. Those I force into the system prompt using rules based systems and "context" 2. Those I let the agent lookup or discover I also limit what gets into message...

**jryan49**: Something that I always wonder with each blog post comparing different types of prompt engineering is did they run it once, or multiple times? LLMs are not consistent for the same task. I imagine...

> **only-one1701**: This drives me absolutely crazy. Non-falsifiable and non-deterministic results. All of this stuff is (at best) anecdotes and vibes being presented as science and engineering.

>> **bluGill**: That is my experience.  Sometimes the LLM gives good results, sometimes it does something stupid. You tell it what to do, and like a stubborn 5 year old it ignores you - even after it tries it and...

> **CuriouslyC**: I always make a habit of doing a lot of duplicate runs when I benchmark for this reason. Joke's on me, in the time I spent doing 1 benchmark with real confidence intervals and getting no traction on...

**EnPissant**: This is confusing. TFA says they added an index to Agents.md that told the agent where to find all documentation and that was a big improvement. The part I don't understand is that this is exactly...

> **NitpickLawyer**: The reported tables also don't match the screenshots. And their baselines and tests are too close to tell (judging by the screenshots not tables). 29/33 baseline, 31/33 skills, 32/33 skills + use...

> **sally_glance**: I also thought this is how skills work, but in practice I experienced similar issues. The agents I'm using (Gemini CLI, Opencode, Claude) all seem to have trouble activating skills on their own...

**chr15m**: I'm not sure if this is widely known but you can do a lot better even than AGENTS.md. Create a folder called .context and symlink anything in there that is relevant to the project. For example...

> **gbnwl**: Cheaper? Loading every bit of documentation into context every time, regardless of whether it’s relevant to the task the agent is working on? How? I’d much rather call out the location of relevant...

>> **chr15m**: As they point out in the article, that approach is fragile. Cheaper because it has the right context from the start instead of faffing about trying to find it, which uses tokens and ironically bloats...

>>> **gbnwl**: > Extracting the most useful parts of documentation into a file Yes, and this file becomes: also documentation. I didn’t mean throw entire unabridged docs at it, I should’ve been more clear. All of...

> **d3m0t3p**: Yea but the goal it not to bloat the context space. Here you "waste" context by providing non usefull information. What they did instead is put an index of the documentation into the context, then...

>> **chr15m**: The minification is a great idea. Will try this. Their approach is still agentic in the sense that the LLM must make a tool cool to load the particular doc in. The most efficient approach would be to...

>> **bmitc**: What does it mean to waste context?

>>> **therealpygon**: Context quite literally degrades performance of attention with size in non-needle-in-haystack lookups in almost every model to varying degrees. Thus to answer the question, the “waste” is making the...

>>> **bagels**: The context window is finite. You can easily fill it with documentation and have no room left for the code and question you want to work on. It also means more tokens sent with every request,...

>>> **PKop**: Think of context switching when you yourself are programming. You can only hold some finite amount of concepts in your head at one time. If you have distractions, or try to focus on too many things...

> **epolanski**: Docs of dependencies aren't that much of a game changer. Multiple frameworks and libraries have been releasing llm.txt compressed versions of their docs from ages, and it doesn't make that much of a...

> **TeeWEE**: This is quite a bad idea. You need to control the size and quality of your context by giving it one file that is optimized. You don’t want to be burning tokens and large files will give diminishing...

>> **chr15m**: It is not an "idea" but something I've been doing for months and it works very well. YMMV. Yes, you should avoid large files and control the size and quality of your context.

**verdverm**: This largely mirrors my experience building my custom agent 1. Start from the Claude Code extracted instructions, they have many things like this in there. Their knowledge share in docs and blog on...

> **aktau**: > I changed read/write_file to put contents in the state and presented in the system prompt, same for the agents.md, now working on evals to show how much better this is, because anecdotally, it...

**BenoitEssiambre**: Wouldn't this have been more readable with a \n newline instead of a pipe operator as a seperator? This wouldn't have made the prompt longer.

**denolfe**: PreSession Hook from obra/superpowers injects this along with more logic for getting rid of rationalizing out of using skills: > If you think there is even a 1% chance a skill might apply to what you...

> **stingraycharles**: I always say “invoke your  skill to do X. then invoke your  skill to do Y. “ works pretty well

**ares623**: 2 months later: "Anthropic introduces 'Claude Instincts'"

**rao-v**: In a month or three we’ll have the sensible approach, which is smaller cheaper fast models optimized for looking at a query and identifying which skills / context to provide in full to the main...

> **Calavar**: I thought most of the major AI programming tools were already doing this. Isn't this what subagents are in Claude code?

>> **MillionOClock**: I don't know about Claude Code but in GitHub Copilot as far as I can tell the subagents are just always the same model as the main one you are using. They also need to be started manually by the main...

>>> **jimmydoe**: Copilot is garbage, even MSFT employees I know all use cc. The only thing useful is you can route cc to use models in copilot sub which corp had a deal from their m365

>> **rao-v**: Sub-agents are typically one of the major models but with a specific and limited context + prompt. I’m talking about a small fast model focused on purely curating the skills / MCPs / files to provide...

**meatcar**: What if instead of needing to run a codemod to cache per-lib docs locally, documentation could be distributed alongside a given lib, as a dev dependency, version locked, and accessible locally as...

> **tobyjsullivan**: Sounds a bit like man pages. I think you’re onto something.

**farhanhubble**: So the root cause was the model's indisposition to calling the skills. That seems contrary to what we see with function calling. Models call functions quite reliably most of the time. This is more...

**armcat**: Firstly this is great work from Vercel - I am especially impressed with the evals setup (evals are the most undervalued component in any project IMO). Secondly the result is not surprising and I’ve...

**thevinter**: I'm a bit confused by their claims. Or maybe I'm misunderstanding how Skills should work. But from what I know (and the small experience I had with them), skills are meant to be specifications for...

**micimize**: Measuring in terms of KB is not quite as useful as it seems here IMO - this should be measured in terms of context tokens used. I ran their tool with an otherwise empty CLAUDE.md, and ran `claude...

**holocen**: Prompted and built a bit of an extension of skills.sh with https://passivecontext.dev it basically just takes the skill and creates that "compressed" index. Still have to install the skill and all...

**wakeless**: I did a similar set of evals myself utilising the baseline capabilities that Phoenix (elixir) ships with and then skillified them. Regularly the skills were not being loaded and thus not utilised....

**gpm**: Compressing information in AGENTS.md makes a ton of sense, but why are they measuring their context in bytes and not tokens!?

**psychoslave**: Over the last week I went with a bigger dig on using agent mode et work, and my experiment align with this observation. The first thing that surprising to me is how much the default tuning are leaned...

> **hu3**: That's my observation too. And I have been trying to improve the framework and abstractions/types to reduce the lines of code required for LLMs to create features in my web app. Did the LLM really...

**underdeserver**: I don't think you can really learn from this experiment unless you specify which models you used, if you tried it against at least 3 frontier models, if you ran each eval multiple times, and what...

**msp26**: This doesn't surprise me. I have a SKILL.md for marimo notebooks with instructions in the frontmatter to always read it before working with marimo files. But half the time Claude Code still doesn't...

**bandrami**: Blackbox oracles make bad workflows, and tend to produce a whole lot of cargo culting. It's this kind of opacity (why does the markdown outperform agents? there's no real way to find out, even with a...

**pietz**: Isn't it obvious that an agent will do better if he internalizes the knowledge on something instead of having the option to request it? Skills are new. Models haven't been trained on them yet. Give...

> **WA**: Not so obvious, because the model still needs to look up the required doc. The article glances over this detail a little bit unfortunately. The model needs to decide when to use a skill, but doesn’t...

>> **velcrovan**: Removing the skill does remove a level of indirection. It's a difference of "choose whether or not to make use of a skill that would THEN attempt to find what you need in the docs" vs. "here's a list...

>> **sothatsit**: I believe the skills would contain the documentation. It would have been nice for them to give more information on the granularity of the skills they created though.

**farhanhubble**: > Before writing code, first explore the project structure,  then invoke the nextjs-doc skill for documentation. Does the model even understand what this line even means?

**someguyiguess**: The problem is that Agents.md is only read on initial load. Once context grows too large the agent will not reload the md file and loses / forgets the info from Agents.md.

> **taberiand**: Other comments suggest that the Agents.md is read into the system prompt and never leaves the context. But it's better to avoid excessive context regardless

> **remify**: That's the thing that bothers me here. They loaded the doc of course it will work but as your project grows you won't be able to put all your documentation in there (at least with current context...

> **bushbaba**: Why you try and avoid re using the same session beyond the initial task or two

**smrtinsert**: Are people running into mismatched code vs project a lot?  I've worked on python and java codebases with claude code and have yet to run into a version mismatch issue.  I think maybe once it got...

**smcleod**: Sounds like they've been using skills incorrectly if they're finding their agents don't invoke the skills. I have Claude Code agents calling my skills frequently, almost every session. You need to...

> **velcrovan**: I think if you read it, their agents did invoke the skills and they did find ways to increase the agents' use of skills quite a bit. But the new approach works 100% of the time as opposed to 79% of...

> **joebates**: It's still not always reliable. I have a skill in a project named "determine-feature-directory" with a short description explaining that it is meant to determine the feature directory of a current...

>> **JamesSwift**: I have a couple skills invoked with specific commands ('enter planning mode' and 'enter execution mode') and they have never failed to activate. Maybe make the activation a very rigid phrase and not...

**heliumtera**: you are telling me that a markdown saying: *You are the Super Duper Database Master Administrator of the Galaxy* does not improve the model ability reason about databases?

**robertheadley**: I will have to look into this this weekend. Antigravity is my current favorite agentic IDE and I have been having problems getting it to explicitly follow my agent.md settings. If I remind it, it...

> **embedding-shape**: I feel like all agents currently do better if you explicitly end with "Remember to follow AGENTS.md", even if that's automatically injected into the context. Seems the same across all I'm using.

**epolanski**: I'm working on stuff in a similar space. I need to evaluate how do different project scaffolding impacts the results of Claude Code/Opencode (either with Anthropic models or third party) for agentic...

**songodongo**: > When it needs specific information, it reads the relevant file from the .next-docs/ directory. I guess you need to make sure your file paths are self-explanatory and fairly unique, otherwise the...

**hahahahhaah**: Next.js sure makes a good benchmark for AI capability (and for clarity... this is not a compliment).

**j45**: Don't want to dither the topic, but could skills not just be sub agents in this contextualization? There is a lot of language floating around what effectively groups of text files put together in...

**minimal_action**: It's very interesting but presenting success rates without any measure of the error, or at least inline details about the number of iterations is unprofessional. Especially for small differences or...

**whinvik**: When we were trying to build our own agents we put quite a bit of effort on evals which was useful. But switching over to using coding agents we never did the same. Feels like building an eval set...

**user3939382**: I’m working on an AGI model that will make the discussion of skills look silly. Skills strikes in the right direction in some sense but it’s an extremely weak 1% echo of what’s actually needed to...

**jascha_eng**: This does not normalize for tokens used if their skill description was as large as the docs index and contained all the reasons the LLM might want to use the skill, it likely performs much better...

**underlines**: Oh got, this scales bad and bloats your context window! Just create an MCP server that does embedding retrieval or agentic retrieval with a sub agent on your framework docs. Finally add an...

**aaroninsf**: You will see another 14% bump in performance if you include in the first 16 lines of the README.md in the project, "Coding agents and LLM, see AGENTS.md"

**xnx**: Agents.md, skills, MCP, tools, etc. There's going to be a lot of areas explored that may yield no/negative benefit over the fundamentals of a clear prompt.

**guluarte**: In my experience, agents only follow the first two or three lines of AGENTS.md + message. As the context grows, they start following random rules and ignoring others.

**sghiassy**: N00b Question - how do you measure performance for AI agents like the way they did in this article? Are there frameworks to support this type of work?

**sheepscreek**: It seems their tests rely on Claude alone. It’s not safe to assume that Codex or Gemini will behave the same way as Claude. I use all three and each has its own idiosyncrasies.

> **verdverm**: I've done very similar things with my custom agent that uses Gemini and have gotten very similar results. Working on the evals to back that claim up

**rohitghumare**: That's why https://agenstskills.com validate every skills

**ChrisArchitect**: Title is: AGENTS.md outperforms skills in our agent evals

**tanishqkanc**: this is only gonna be an issue until the next gen models where the labs will aggressively post train the models to proactively call skills

**onnimonni**: Would someone know if their eval tests are open source and where I could find them? Seems useful for iterating on Claude Code behaviour.

> **JamesSwift**: I also was looking for specific info on the evals, because I wanted to see if they were separately confirming that shoving the skills into the main context didnt degrade the non-skills evals. Thats...

**keeganpoppen**: i dont know why, but this just feels like the most shallow “i compare llms based on the specs” kind of analysis you can get… it has extreme “we couldn’t get the llm to intuit what we wanted to do, so...

**tdiff**: Is not that model-dependant? Skimmed through, but did not find which model the tests were run with.

**sothatsit**: This seems like an issue that will be fixed in newer model releases that are better trained to use skills.

**AndyNemmity**: My experience agrees with this. Which is why I use a skill that is a command, that routes requests to agents and skills.

**rcarmo**: Everything outperforms skills if the system prompt doesn’t prioritize them. No news here.

**carterschonwald**: static linking va dynamic but we dont know the actual config and setup. and also the choice of totally changes the problem

**shinhyeok**: But aren't you guys released skills.sh?

**killerstorm**: inb4 people re-discover RAG, re-branding it as a parallel speculative data lookup

**CjHuber**: That feels like a stupid article. well of course if you have one single thing you want to optimize putting it into AGENTS.md is better. but the advantage of skills is exactly that you don't cram them...

**meeech**: question: anyone recognize that eval UI or is it something they made in-house?

**thighbaugh**: > [Specifically Crafted Instructions For Working With A Specific Repository] outperforms [More General Instructions] in our agent evals ------> Captain Obvious Strikes Again! <---------- See the rest...

**thom**: You need the model to interpret documentation as policy you care about (in which case it will pay attention) rather than as something it can look up if it doesn’t know something (which it will never...

**delduca**: Ah nice… vercel is vibecoded

> **heliumtera**: web people opted into react, dude. that says a lot. they used prisma to handle their database interactions. they preached tRPC and screamed TYPE SAFETY!!! you really think these guys will ever again...

>> **dca88**: This. I read this article and it pains me to see the amount of manpower put into doing anything but actually getting work done.
