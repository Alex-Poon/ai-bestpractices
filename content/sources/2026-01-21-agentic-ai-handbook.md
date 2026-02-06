---
title: "The Agentic AI Handbook: Production-Ready Patterns"
source_url: "https://www.nibzard.com/agentic-handbook"
hn_url: "https://news.ycombinator.com/item?id=46701969"
date: 2026-01-21
hn_points: 210
hn_comment_count: 20
tags: [agent-workflows, agentic-patterns, production-engineering, multi-agent, security]
tier: 1
weight: 6
---

## Summary

The Agentic AI Handbook provides a comprehensive taxonomy of production-ready patterns for building agentic AI systems. Its core definition frames an agent as an LLM wrapped in a loop that can observe state, call tools, record results, and decide when it is done. The handbook organizes patterns into eight categories covering orchestration and control, tool use, context and memory, feedback loops, UX and collaboration, reliability and evaluation, learning and adaptation, and security and safety.

Four foundational patterns anchor the framework. Plan-Then-Execute splits work into a planning phase, controlled execution, and replan gates with human review and policy controls. Inversion of Control provides clear goals and constraints while letting agents choose their own execution paths. The Reflection Loop anchors iterations to objective signals like tests, lints, or validation rather than subjective self-assessment. Action Trace Monitoring tracks observable behaviors such as tool calls, diffs, and test output with explicit kill switches for safety.

The handbook emphasizes practical production realities: adopt diff-first workflows, keep tasks small and bounded, create persistent project rules documents (covering test commands, constraints, and style guidelines), and avoid what it calls the "Ralph Wiggum drift trap" through tight scope and explicit checks. On security, it recommends removing at least one element from the "lethal trifecta" of private data access, untrusted input exposure, and external exfiltration capability. Multi-agent systems should be reserved for cleanly decomposable work with deterministic merging.

The overarching message is that agents multiply both output and mistakes. The bottleneck remains human judgment, and success requires deterministic checks, architectural oversight, and small PR sizes to prevent what the handbook terms "slop gravity."

## Key Insights

- **Plan-Then-Execute prevents mid-execution drift**: Splitting work into planning, execution, and replan gates with human review improves reliability
- **Reflection loops need objective anchors**: Self-assessment is unreliable; anchor iterations to tests, lints, and validation
- **The lethal trifecta for security**: Remove at least one of private data access, untrusted input exposure, or external exfiltration capability
- **Small PRs prevent slop gravity**: Agents produce volume; keeping changes small and reviewable prevents accumulated low-quality code
- **Diff-first workflow**: Focusing on diffs rather than complete file outputs keeps changes auditable and manageable
- **Multi-agent systems require clean decomposition**: Only use multiple agents when work decomposes cleanly with deterministic merging

## Notable Quotes

> "An LLM wrapped in a loop that can observe state, call tools, and decide when it's done." — Nibzard

## HN Discussion Highlights

*122 comments total*

**alkonaut**: All of this might as well be greek to me. I use ChatGPT and copy paste code snippets. Which was bleeding edge a year or two ago, and now it feels like banging rocks together when reading these type...

> **prettygood**: I'm so happy someone else says this, because I'm doing exactly the same. I tried to use agent mode in vs code and the output was still bad. You read simple things like: "We use it to write tests". ...

>> **kace91**: I’m not particularly proAI but I struggle with the mentality some engineers seem to apply to trying. If you read someone say “I don’t know what’s the big deal with vim, I ran it and pressed some ke...

>>> **Macha**: There isn't a bunch of managers metaphorically asking people if they're using vim enough, and not so many blog posts proclaiming vim as the only future for building software

>>> **alkonaut**: I don't understand how to get even bad results. Or any results at all. I'm at a level where I'm going "This can't just be me not having read the manual". I get the same change applied multiple time...

>>> **neumann**: I agree to a degree, but I am in that camp. I subscribe to alphasignal, and every morning there are 3 new agent tools, and two new features, and a new agentic approach, and I am left wondering, whe...

>>> **galaxyLogic**: Well one could say that since it's AI, AI should be able to tell us what we're doing wrong. No? AI is supposed to make our work easier.

>>> **chewz**: Some people shouldn't just be engineers in the first place, I guess.

>> **embedding-shape**: You didn't actually just say "write tests" though right? What was the actual prompt you used? I feel like that matters more than the tooling at this point. I can't really understand letting LLMs de...

>>> **Balinares**: There are a lot of comments on HN and other places breathlessly gushing about agents totally doing everything end to end, so I couldn't blame someone new to this space for naively assuming that age...

>>> **prettygood**: No, that was an exaggeration. The prompt was decent. I explained the point of the repository, that I wanted full coverage with tests, that it could keep going until it worked. Maybe that was still ...

>> **threecheese**: “Write tests“ may not be enough; provide it with a test harness, and instruct it to “write tests until they pass “. Next would be “your feature isn’t complete without N% coverage”. These require th...

>> **tasuki**: > I gave it a very simple repository, said to write tests, and the result wasn't usable at all. Really wonder if I'm doing it wrong. I think so. The humans should be writing the spec. The AI can th...

>> **sixtyj**: No, you have similar experience as a lot of people have. LLMs just fail (hallucinate) in less known fields of expertise. Funny: Today I have asked Claude to give me syntax how to run Claude Code. A...

>> **agumonkey**: you need to write a test suite to check his test generation (soft /s)

> **CurleighBraces**: Yeah if you've not used codex/agent tooling yet it's a paradigm shift in the way of working, and once you get it it's very very difficult to go back to the copy-pasta technique. There's obviously a...

>> **Bewelge**: - We narrowed it down to the tool we used to flash the code. - I downloaded the repository, jumped into codex, explained the symptoms and it found and fixed the bug in less than ten minutes. Change...

>>> **CurleighBraces**: I agree with your statement and perhaps my example is bad/too specific in this case. Once I started working this way however, I found myself starting to adapt to it. It's not unusual now to find my...

>>> **theshrike79**: Why would you copy files anywhere? My daily process is like this: Claude plans (Opus 4.5) Claude implements (Opus at work, Sonnet at home - I only have the $20 plan personally :P ) After implementa...

> **embedding-shape**: > I never had any luck integrating agents What exactly do you mean with "integrating agents" and what did you try? The simplest (and what I do) is not "integrating them" anywhere, but just replace ...

>> **alkonaut**: I installed the copilot extension in my IDE, and switched on Agent mode. I don't really get how the workflow is supposed to work, but I think it's mostly due to how the tool is made. It has like so...

>>> **kaycey2022**: Copilot in vs code is definitely trash. That aside the workflow is simple. If you are familiar with the code base then make sure to refer the files where a newb has to look if you were assigning th...

>>> **embedding-shape**: Hm, yeah maybe. I've tried Cursor once, but the entire experience was so horrible, and it was really hard to know what's going on. The workflow I have right now, is something like what I put before...

>>> **songodongo**: Make sure you’re clicking “Keep” to “approve” the changes. It’s annoying but I don’t think there is a way around having to do that. Then if you manually edit something, you can mention it in your n...

>>> **ctmnt**: Correct. Of the various ways to work, I find the in-IDE chat to be the worst. I rarely use it for anything other than “help me understand this line”. Try one of the CLIs. That’s the good stuff righ...

>>> **ikidd**: Copilot is a dumpster fire and I can understand why you're down on agents from that experience. Splurge on the $20 for Cursor, and install their IDE. Start with a simple project, more because it he...

> **hahahahhaah**: I feel like just use claude code. That is it. Use it you get the feel for it. Everyone is over complicating. It is like learning to code itself. You need flight hours.

>> **cobolexpert**: This is something that continues to surprise me. LLMs are extremely flexible and already come prepackaged with a lot of "knowledge", you don't need to dump hundreds of lines of text to explain to i...

>>> **vidarh**: You get to 80% there (numbers pulled out of the air) by just telling it to do things. You do need more to get from 80% there to 90%+ there. How much more depends on what you're trying to do and in ...

>>> **TeMPOraL**: There's no such thing as universal "good software development practices". There's only lots of opinions. Some are more popular, some less; some are language, domain or company-specific (or even too...

>>> **raesene9**: I think avoiding filling context up with too much pattern information, is partially where agent skills are coming from, with the idea there being that each skill has a set of triggers, and the main...

>>> **epolanski**: > I suspect these frameworks/patterns just fill up the context with unecessary junk. That's exactly the point. Agents have their own context. Thus, you try to leverage them by combining ad-hoc inst...

>>> **Macha**: If I don't instruct it to in some way, the agent will not write tests, will not conform with the linter standard, will not correctly figure out the command to run a subset of tests, etc.

>> **alkonaut**: I'm stuck with the Copilot tools. Again, I don't think this is a problem with the models but with the tooling. I can't switch to claude code (for work, that is) and while I don't mind using more co...

>> **_zoltan_**: It's not that simple. That's how I started as well but now I have hooked up Gemini and GPT 5.2 to review code and plans and then to do consensus on design questions. And then there's Ralph with cro...

> **tmountain**: I used to do it the way you were doing it. A friend went to a hackathon and everyone was using Cursor and insisted that I try it. It lets you set project level "rules" that are basically prompts fo...

> **jonathanstrange**: I'm doing the same. My reason is not the IDE, I just can't let AI agent software onto my machine. I have no trust at all in it and the companies who make this software. I neither trust them in term...

> **ramraj07**: I recently pasted an error I found into claude code and asked who broke this. It found the commit and also found that someone else had fixed it in their branch. You should use claude code.

>> **JeremyNT**: If your org has a relationship with MS/OpenAI (many do!) you can also use OpenCode with GPT-5.2 for some pretty impressive results. Once you see what is currently possible with this technique you w...

>> **ctmnt**: You don’t even need to paste. Connect it to your IDE (which should be as easy as installing the Claude plugin in your IDE and typing `ide` in `code`) and it’ll automatically pull in whatever you ha...

>> **bojan**: There's no reason this should not be possible in other IDEs, except for the vendor lock-in.

> **dude250711**: The idea is to produce such articles, not read them. Do not even read them as the agent is spitting them out - simply feed straight into another agent to verify.

>> **63stack**: Present it at the next team/management meeting to seem in the loop and hope nobody asks any questions

>>> **chrz**: No questions. It will be pasted into their AI tool. And things will be great. For few weeks at least until something break a nobody will know what

> **breppp**: I also sympathize with that approach, and found it sometimes better than agents. I believe some of the agentic IDEs are missing a "contained mode". Let me select lines in my code which you are allo...

>> **alkonaut**: Yes. And some way of using an instructions file. Because interacting with an agent in a tiny plugin window without use of "agents.md" or some sort of persistent prompt you can adjust retry etc is h...

> **rustyhancock**: I don't think so it seems the aspiration of these tools is it'll be agents all the way down. A high level task is given and outpops a working solution. A) If you can't program and you're just happy...

> **wiseowise**: You just didn't drink enough cool-aid and have intact brain.

> **franze**: I am on the other side, I have given the complete control of my computer to Claude Code - Yolo Mode. Sudo. It just works. My servers run the same. I SSH into Claude Code there and let them do whate...

>> **vidarh**: > end of 2026 we will not use computer the way we use them now. I think it will take much longer than that for most people, but I disagree with the timeline, not where we're headed. I have a projec...

>>> **theshrike79**: Depending on your threat model, I'd lean more into building permanent tooling that's not dependent on an external AI API provider. The more you can offload to deterministic tools (script), the easi...

>> **darkwater**: Claude Code and agents are the hot new hammer, and they are cool, I use CC and like it for many things, but currently they suffer from the "hot new hammer" hype so people tend to think everything i...

>>> **TeMPOraL**: That "hot new hammer" hype is a good thing given general enough tool, and LLMs very much are that. We did the same with smartphones, the Internet, personal computers, and even electricity. Some 150...

>> **jangxx**: Don't say "we" when talking about yourself.

>>> **franze**: I already do. And yes, it is a hypothesis about the future. Claude Code was just a first step. It will happen to the rest of computer use as well.

> **photios**: Copilot's agent mode is a disaster. Use better tools: try Claude Code or OpenCode (my favorite). It's a new ecosystem with its own (atrocious!) jargon that you need to learn. The good news is that ...

>> **darkwater**: Yep, basically this. In the end it helps having the mental model that (almost) everything related to agents is just a way to send the upstream LLM a better and more specific context for the task yo...

>>> **theshrike79**: Skills can (and IMO should) also contain scripts custom made for that skill. Like a code review skill would have scripts that read the actual code.

>> **alkonaut**: Sadly we have some partnership meaning it's Copilot or nothing.

>>> **ryanhecht**: Give Copilot CLI a try if you haven't in a while! The team's been working really hard to improve the harness, and we're taking as much community feedback as we can get! Let me know if you run into ...

>>> **photios**: I feel your pain. I used to work for a bank and the security team only approved Copilot use. OpenCode can use Copilot natively: https://opencode.ai/docs/providers/#github-copilot I got Claude Code ...

>>> **JeremyNT**: If you can use the Copilot CLI, it's highly likely you can use OpenCode with the same API key. It's worth doing a little research. The CLI tool matters. If you're not using opencode/claude you're m...

> **kaycey2022**: I’m not as behind as that. But i cant figure out this loop thing. We have engineers here saying they are reviewing 100k lines of code a day, slinging 10 agents simultaneously. I just cannot figure ...

**Bukhmanizer**: I’d rather just read the prompt that this article was generated from.

> **straydusk**: I finally found the perfect way to describe what I feel when I read stuff like this.

>> **aj_g**: I remember some proto-memes about translation of some text between English and Chinese 100 times and the results being hilarious...modern parallel would be to ask a LLM to read the article, and gen...

>> **iwrrtp69**: I Would Rather Read The Prompt (IWRRTP)

>>> **alex_suzuki**: JTPP - just the prompt, please

>>> **a_victorp**: I laughed when I noticed the username

>>> **sebastiennight**: I hereby second the motion to get this acronym widely adopted

>> **ares623**: Tempted to copy the content and launder it through another LLM and post a comment linking to my own version

> **0xbadcafebee**: That's like saying you'd rather listen to someone ask a question than read a chapter of a textbook. About 99% of the blogs [written by humans] that reach HN's front page are fundamentally incorrect...

>> **Balinares**: > If it's AI-written, it actually comes close to factual. I am ceaselessly fascinated by how we can all live in the same world yet seemingly inhabit such vastly different realities.

> **aitchnyu**: Donate me the tokens, dont donate me slop PRs - open source maintainer

**zuInnp**: Not only is the website layout horrible to read, it also smells like the article was written by AI. My brain just screams "no" when I try to read that.

> **wiseowise**: Don't worry, it's not supposed to be read. The idea is to induce FOMO and subscribe to authors newsletter to get more "insights".

> **wesselbindt**: Seems like a reasonable feeling to have. Anything that's not worth writing is not worth reading imo.

>> **ffsm8**: Eh, you're going too far with that IMO. The other day we were discussing a new core architecture for a Microservice we were meant to split out of a "larger" Microservice so that separate teams coul...

> **gbnwl**: It’s also just fluff and straight up wrong at parts. This wasn’t checked by a human or at least a human who understands enough to catch inaccuracies. For example for “Plan-then-execute” (which is p...

**Bishonen88**: AI written article about AI usage, building things with AI that others will use to build their own AI with. The future is now indeed.

> **jbstack**: I feel like HN should have a policy of discouraging comments which accuse articles and other comments of being written by AI. We all know this happens, we all know it's a possibility, and often suc...

>> **simianparrot**: No. Public shaming for sharing AI written slop is what we need more of.

>>> **jbstack**: Such public shaming loses its value when it's overused though (see: boy who cried wolf). The "written by AI" accusation is thrown around so much, when it often isn't even true, that it just trigger...

**wiseowise**: So it begins, Design Patterns and Agile/Scrum snake oil of modern times.

> **63stack**: No dude, you just don't get it, if you shout at the ai that YOU HAVE SUPERPOWERS GO READ YOUR SUPERPOWERS AT ..., then give it skills to write new skills, and then sprinkle anti grader reward hacki...

>> **wiseowise**: Curing cancer is H2 2030, once my options have vested. :cool-eyeglasses-emoji:

>> **a_victorp**: Yeah the (updated) tag on all patterns was a bit much

> **bandrami**: No no. We promise this solution has a totally different name.

>> **throwaway_0236**: In the spirit of the article, I asked chatgpt to suggest names. One of the better ones were "Unified LLM Interaction Model (ULIM)". You read it here first...

**mellosouls**: Not wanting to be a gatekeeper, but the author appears to be a "AI Growth Innovator" or some-such-I-don't-know-what rather than an actual engineer who has been ramping up on AI use to see what work...

> **embedding-shape**: That's so trite, what makes people write such sentences and not feel embarrassed? I remember when bragging so callously about arbitrary stuff would make you seem off-putting, what happened with tha...

>> **somebehemoth**: the sell outs took over.

> **ozim**: I was hoping that's some sitting in the basement playing hard with LLMs dude post. But that's a dead give away he is just scaling GitHub stars not doing actual research.

**N_Lens**: I sometimes feel like the cognitive cost of agentic coding is so much higher than a skilled human. There is so much more bootstrap and handling process around making sure agents don't go off the ra...

> **nulone**: Cognitive overhead is real. Spent the first few weeks fixing agent mess more than actually shipping. One thing that helped: force the agent to explain confidence before anything irreversible. Delet...

> **aaronrobinson**: It can definitely feel like that right now but I think a big part of that is us learning to harness it. That’s why resources like this are so valuable. There’s always going to be pain at the start.

>> **a_victorp**: I've seen this "we're still learning" argument for at least 6 months now and I get it and even agree with it. However at which point do we start to question how much is it part of a learning curve ...

**embedding-shape**: > The Real Bottleneck: Time Already a "no", the bottleneck is "drowning under your own slop". Ever noticed how fast agents seems to be able to do their work in the beginning of the project, but the...

> **catlifeonmars**: > Moving slower is usually faster long-term granted you think about the design, but obviously slower short-term, which makes it kind of counter-intuitive. Like an old mentor of mine used to say: “S...

**comboy**: Here's a pattern I noticed - you notice some pattern that is working (let's say planning or TODO management) - if the pattern is indeed solid then it gets integrated into the black box and your age...

**_pdp_**: If you are interested here is a list of actual agentic patterns - https://go.cbk.ai/patterns

> **epolanski**: You could also disclose you work there. Because as soon as I started reading the patterns I realized this was bogus and one could only recommend this because of personal stakes.

>> **_pdp_**: Bogus in what way?

**at__**: The emergence of this kind of thing has been so surprising to me. The exact same sort of person that managed to bottleneck themselves and obliterate signal-to-noise ratios at every company they wor...

**kstenerud**: It's unbelievable how productive AI has made me. With the release of the latest Claude, I'm now able to achieve 100x more than I could have without it. In one week, I fine-tuned https://github.com/...

> **vivzkestrel**: thats all? I made an emulator for every single console in the planet called Universal Emulator in one week, I have not published it because that would be illegal /s

**MrOrelliOReilly**: This is a great consolidation of various techniques and patterns for agentic coding. It’s valuable just to standardize our vocabulary in this new world of AI led or assisted programming. I’ve seen ...

> **Kerrick**: I recognized the need for this recently and started by documenting one [1]... then I dropped the ball because I, too, spent my winter holiday engrossed in agentic development. (Instead of documenti...

>> **MrOrelliOReilly**: I will ruefully admit that I had also planned a similar blog post! I am hoping I can still add some value to the conversation, but it does seem like _everyone_ is writing about agentic development ...

**bluehat974**: Agentic Patterns website https://agentic-patterns.com/ Github https://github.com/nibzard/awesome-agentic-patterns

> **63stack**: I can imagine all the middle managers are just salivating at the idea of presenting this webpage to higher ups as part of their "AI Strategy" at the next shareholder meeting. Bullet point lists! Co...

> **epolanski**: So it doesn't include the only useful thing: the actual agent "code".

> **wiseowise**: > Star History How you know something is done either by a grifter or a starving student looking for work.

**0xbadcafebee**: You should definitely read the whole thing, but tl;dr - Generate a stable sequence of steps (a plan), then carry it out. Prevents malicious or unintended tool actions from altering the strategy mid...

> **galaxyLogic**: Could I ask the AI to create me a set of template-files as described by you above? Or if there is an example set of template files somewhere then ask the AI to do its thing based on those? Or ask t...

>> **0xbadcafebee**: Yeah absolutely. But you'll need to modify it until it works better for your use case. It's all still highly flawed, but also highly capable. Like a very fast janitor that occasionally uses chocola...

>>> **galaxyLogic**: LOL

**vemv**: Why is this at the top? I've flagged it, that's what we should be doing with AI content.

**laborcontract**: If you're remotely interested in this type of stuff then scan papers arxiv[0] and you'll start to see patterns emerge. This article is awful from a readability standpoint and from an "does this aut...

**dist-epoch**: Am I the only one with scrolling issues in Firefox on this website? It literally gets "stuck" and becomes un-scrollable.

**drdrek**: The word cost is mentioned only twice in the entire article, lol

**verdverm**: looks to be a good resource with lots of links thanks for the share!
