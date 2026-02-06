---
title: "Claude Code daily benchmarks for degradation tracking"
source_url: "https://marginlab.ai/trackers/claude-code/"
hn_url: "https://news.ycombinator.com/item?id=46810282"
date: 2026-01-29
hn_points: 759
hn_comment_count: 63
tags: [claude-code, benchmarks, model-degradation, evaluation, swe-bench, reliability]
tier: 1
weight: 1
---

## Summary

MarginLab launched a daily benchmark tracker for Claude Code performance, measuring the CLI tool against a curated subset of SWE-Bench-Pro tasks using the Opus 4.5 model. The tracker was created in response to widespread community concerns about silent model degradation, where users noticed performance fluctuations but had no systematic way to measure or verify them.

The methodology involves running 50 daily evaluations against SWE-Bench-Pro tasks without custom harnesses, then aggregating results over 7-day and 30-day windows for statistical reliability. Statistical significance is determined using Bernoulli modeling with 95% confidence intervals. At the time of the HN discussion, the tracker showed a daily pass rate of 48%, a 7-day aggregate of 53%, and a 30-day aggregate of 53%, compared against a historical baseline of 58%.

The tracker reported statistically significant degradation at both the 7-day (-5.5%) and 30-day (-4.5%) timeframes, while the daily -10% swing was within normal variance. This data provided the first systematic evidence for what many users had been reporting anecdotally.

The discussion generated an unusually high engagement of 759 points and 63 comments, reflecting the community's deep frustration with perceived quality fluctuations in AI coding tools. A member of the Claude Code team (trq_) responded, confirming a harness bug introduced on January 26 that was rolled back on January 28, providing a concrete explanation for at least some of the observed degradation.

## Key Insights

- **Systematic tracking fills a critical gap**: Users have no way to verify day-to-day quality of AI services, creating a trust deficit that benchmarking can address
- **Harness bugs vs model changes**: The Claude Code team confirmed a real harness bug, distinguishing tool-level issues from model-level degradation
- **Statistical rigor is hard**: Multiple commenters noted the methodology needs more samples and better significance testing to draw valid conclusions
- **Vendor incentive misalignment**: As costs rise and competition intensifies, vendors face pressure to quietly reduce service quality

## Notable Quotes

> "detect statistically significant degradations" — MarginLab tracker description

## HN Discussion Highlights

*229 comments total*

**trq_**: Hi everyone, Thariq from the Claude Code team here. Thanks for reporting this. We fixed a Claude Code harness issue that was introduced on 1/26. This was rolled back on 1/28 as soon as we found it....

> **samlinnfer**: Is there compensation for the tokens because Claude wasted all of them?

>> **mathrawka**: You are funny. Anthropic refuses to issue refunds, even when they break things. I had an API token set via an env var on my shell, and claude code changed to read that env var. I had a $10 limit set...

>>> **TOMDM**: Anthropic just reduced the price of the team plan and refunded us on the prior invoice. YMMV

>> **gizmodo59**: Codex seems to give compensation tokens whenever this happens! Hope Claude gives too.

>> **TZubiri**: It is possible that degradation is an unconscious emergent phenomenon that arises from financial incentives, rather than a purposeful degradation to reduce costs.

>> **mvandermeulen**: You’re lucky they have even admitted a problem instead of remaining silent and quietly fixing it. Do not expect ethical behaviour from this company.

>>> **port11**: Why not, can you expand? Asking because I’m considering Claude due to the sandbox feature.

>> **jonplackett**: So quiet…

> **isaacdl**: Anywhere we can read more about what a "harness issue" means? What was the impact of it?

>> **xnorswap**: One thing that could be a strong degradation especially for benchmarks is they switched the default "Exit Plan" mode from:     "Proceed" to    "Clear Context and Proceed" It's rare you'd want to do...

>>> **samusiam**: I disagree that this was the issue, or that it's "rare that you'd want to do that unless you're near the context window". Clearing context after writing a plan, before starting implementation of said...

>>> **plexicle**: "It's rare you'd want to do that unless you're actually near the context window after planning." Highly disagree. It's rare you WOULDN'T want to do this. This was a good change, and a lot of us were...

>>> **rubslopes**: Not disagreeing with you, but FYI you can roll back to the conversation before the 'clear context and proceed' with 'claude --resume'.

>> **airstrike**: Pretty sure they mean the issue is on the agentic loop and related tool calling, not on the model itself In other words, it was the Claude Code _app_ that was busted

> **jonaustin**: How about how Claude 2.1.x is "literally unusable" because it frequently completely hangs (requires kill -9) and uses 100% cpu? https://github.com/anthropics/claude-code/issues/18532

>> **caspar**: Likely a separate issue, but I also have massive slowdowns whenever the agent manages to read a particularly long line from a grep or similar (as in, multiple seconds before characters I type...

>> **someguyiguess**: What OS? Does this happen randomly, after long sessions, after context compression? Do you have any plugins / mcp servers running? I used to have this same issue almost every session that lasted...

>>> **jonaustin**: MacOS; no mcp; clear context; reliably reproducible when asking claude review a pr with a big VCR cassette.

>>> **nikanj**: Windows with no plugins and my Claude is exactly like this

> **cma**: For the models themselves, less so for the scaffolding, considering things like the long running TPU bug that happened, are there not internal quality measures looking at samples of real outputs?...

>> **carterschonwald**: lol i was trying to help someone get claude to help analyze a stufent research get analysis on bio persistence get their notes analyzed the presence of the word / acronym stx with biological subtext...

> **varunsrinivas**: Thanks for the clarification. When you say “harness issue,” does that mean the problem was in the Claude Code wrapper / execution environment rather than the underlying model itself? Curious whether...

> **vmg12**: It happened before 1/26. I noticed when it started modifying plans significantly with "improvements".

> **sixhobbits**: Can you confirm if that caused the same issues I saw here https://dwyer.co.za/static/the-worst-bug-ive-seen-in-claude-... Because that's the worst thing I've ever seen from an agent and I think you...

> **Ekaros**: Why wasn't this change review by infallible AI? How come an AI company that now must be using more advanced AI than anyone else would allow this happen?

> **hu3**: Hi. Do you guys have internal degradation tests?

>> **stbtrax**: I assume so to make sure that they're rendering at 60FPS

>>> **conception**: You joke but having CC open in the terminal hits 10% on my gpu to render the spinning thinking animation for some reason. Switch out of the terminal tab and gpu drops back to zero.

>>> **reissbaker**: Surely you mean 6fps

>> **trq_**: Yes, we do but harnesses are hard to eval, people use them across a huge variety of tasks and sometimes different behaviors tradeoff against each other. We have added some evals to catch this one in...

>>> **amelius**: Can't you keep the model the same, until the user chooses to use a different model?

>>> **hu3**: Thank you. Fair enough

>> **bushbaba**: I’d wager probably not. It’s not like reliability is what will get them marketshare. And the fast pace of industry makes such foundational tech hard to fund

> **macinjosh**: [flagged]

>> **jusgu**: the issue is unrelated to the foundational model but rather the prompts and tool calling that encapsulate the model

**ofirpress**: [SWE-bench co-author here] It seems like they run this test on a subset of 50 tasks, and that they only run the test once per day. So a lot of the movement in accuracy could be attributed to that.  I...

> **Davidzheng**: but degradation from servers being overloaded would be the type of degradation this SHOULD measure no? Unless it's only intended for measuring their quietly distilling models (which they claim not to...

>> **botacode**: Load just makes LLMs behave less deterministically and likely degrade. See: https://thinkingmachines.ai/blog/defeating-nondeterminism-in... They don't have to be malicious operators in this case. It...

>>> **bgirard**: > malicious It doesn't have to be malicious. If my workflow is to send a prompt once and hopefully accept the result, then degradation matters a lot. If degradation is causing me to silently get...

>>> **strongpigeon**: The question I have now after reading this paper (which was really insightful) is do the models really get worse under load, or do they just have a higher variance? It seems like the latter is what...

>>> **altcognito**: Explain this though. The code is deterministic, even if it relies on pseudo random number generation. It doesn't just happen, someone has to make a conscious decision to force a different code path...

>>> **stefan_**: The primary (non malicious, non stupid) explanation given here is batching. But I think you would find looking at large-scale inference the batch sizes being ran on any given rig are fairly static -...

>>> **make3**: It's very clearly a cost tradeoff that they control and that should be measured.

>> **samusiam**: I'd argue that it depends how that degradation manifests whether you want to include it or not. Consider two scenarios: (1) degradation leads to the model being routed behind the scenes to a...

>> **megabless123**: noob question: why would increased demand result in decreased intelligence?

>>> **exitb**: An operator at load capacity can either refuse requests, or move the knobs (quantization, thinking time) so requests process faster. Both of those things make customers unhappy, but only one is...

>>> **awestroke**: I've seen some issues with garbage tokens (seemed to come from a completely different session, mentioned code I've never seen before, repeated lines over and over) during high load, suspect anthropic...

>>> **vidarh**: It would happen if they quietly decide to serve up more aggressively distilled / quantised / smaller models when under load.

>>> **Wheaties466**: from what I understand this can come from the batching of requests.

>> **cmrdporcupine**: I've personally witnessed large variability in behaviour even within a given session -- which makes sense as there's nothing stopping Anthropic from shuttling your context/session around load...

>>> **epolanski**: I've defended opus in the last weeks but the degradation is tangible. It feels like it degraded by a generation tbh.

> **mohsen1**: Hope you don't mind the unrelated question: How do you pay for those SWE-bench runs? I am trying to run a benchmark but it is too expensive to run enough runs to get a fair comparison....

>> **ofirpress**: Benchmarks can get costly to run- you can reach out to frontier model creators to try and get them to give you free credits, but usually they'll only agree to that once your benchmark is pretty...

>>> **Dolores12**: so basically they know requests using your API key should be treated with care?

>>> **epolanski**: The last thing a proper benchmark should do is reveal it's own API key.

>>> **mohsen1**: yes I reached out to them but as you say it's a chicken-and-egg problem. Thanks!

> **nikcub**: > I would run on 300 tasks and I'd run the test suite 5 or 10 times per day and average that score. assume this is because of model costs. anthropic could either throw some credits their way (would...

>> **simsla**: Probably, but with a small sample size like that, they should probably be taking the uncertainty into account, because I wouldn't be surprised if a lot of this variation falls within expected noise....

>> **phist_mcgee**: Then you'd get people claiming that the benchmarks were 'paid for' by anthropic

>>> **nikcub**: one thing you learn from being on the internet is that you're never going to satisfy everybody

> **seunosewa**: The degradation may be more significant within the day than at the same time every day.

>> **GoatInGrey**: Sure, but it's still useful insight to see how it performs over time. Of course, cynically, Anthropic could game the benchmark by routing this benchmark's specific prompts to an unadulterated...

> **rootnod3**: Sorry what? "You can't measure my Cloud Service's performance correctly if my servers are overloaded"? "Oh, you just measured me at bad times each day. On only 50 different queries." So, what does...

>> **johnsmith1840**: This has been happening for years. Tgere's a great paper from microsoft on Deepspeed AI inference. Basically the paper showed methods for how to handle heavy traffic load by changing model...

>> **kuboble**: I wonder if my great experience with claude are partly due to the fact that my working hours don't overlap with the US west coast

>> **swyx**: chill out, ofir does not work for anthropic. he's just saying there's inherent variability in LLMs and you need to at least 30x the samples that OP is doing in order to make any form of statistically...

> **bhk**: According to Anthropic:  "We never reduce model quality due to demand, time of day, or server load." https://www.anthropic.com/engineering/a-postmortem-of-three-...

>> **embedding-shape**: They've had issues before with things like "TPU top-k error - Claude sometimes dropped the best next token" (https://www.anthropic.com/engineering/a-postmortem-of-three-...) so what's going on might...

>>> **mgraczyk**: That issue did not have any time of day dependence

> **epolanski**: Stilll relevant over time.

> **chrisjj**: > Lots of variance in the score can come from random stuff like even Anthropic's servers being overloaded. Are you suggesting result accuracy varies with server load?

> **dana321**: "Lots of variance in the score can come from random stuff like even Anthropic's servers being overloaded" Aha, so the models do degrade under load.

> **cedws**: Agreed, this benchmark would be much more useful ran multiple times a day. That could reveal degredation in line with load patterns.

>> **bredren**: For CC, I suspect it also need to be testing and labeling separate runs against subscription, public API and Bedrock-served models? It’s a terrific idea to provide this. ~Isitdownorisitjustme for...

>> **swyx**: i recall another project here on HN maybe 4-6 months ago that would run tests 4x a day or something. not sure how to find them again

> **sjtgraham**: Why should users care about Anthropic's servers being overloaded?

**antirez**: Why I do not believe this shows Anthropic serves folks a worse model: 1. The percentage drop is too low and oscillating, it goes up and down. 2. The baseline of Sonnet 4.5 (the obvious choice for...

> **levkk**: I believe the science, but I've been using it daily and it's been getting worse, noticeably.

>> **warkdarrior**: Is it possible that your expectations are increasing, not that the model is getting worse?

>>> **GoatInGrey**: Possible, though you eventually run into types of issues that you recall the model just not having before. Like accessing a database or not following the SOP you have it read each time it performs X...

>>> **F7F7F7**: I’ve had Opus struggle on trivial things that Sonnet 3.5 handled with ease. It’s not so much that the implementations are bad because the code is bad (the code is bad).  It’s that it gets extremely...

>> **davidee**: I have to concur. And to the question about understanding what its good and bad at; no, tasks that it could accomplish quickly and easily just a month ago, now require more detailed prompting and...

>>> **conception**: I assume, after any compacting of the context window that the session is more or less useless at that point I’ve never had consistent results after compacting.

>>> **F7F7F7**: Multiple concurrences a choir or a mob? 1pm EST time it’s all down hill until around 8 or 9pm EST time. Late nights and weekends is smooth sailing.

>> **bushbaba**: I’m finding Gemini and chatGPT web terminal to out perform Claude code. The context becomes too much for the LLM, and tries to make up for it by doing more file read ops.

>>> **samusiam**: Sounds like you might want to refactor the code if the individual files are too big and it can't find what it's looking for?

>> **emp17344**: Any chance you’re just learning more about what the model is and is not useful for?

>>> **jerf**: I dunno about everyone else but when I learn more about what a model is and is not useful for, my subjective experience improves, not degrades.

>>> **data-ottawa**: There are some days where it acts staggeringly bad, beyond baselines. But it’s impossible to actually determine if it’s model variance, polluted context (if I scold it, is it now closer in latent...

>>> **acuozzo**: No because switching to the API with the same prompt immediately fixes it. There's little incentive to throttle the API. It's $/token.

> **TIPSIO**: I too suspect the A/B testing is the prime suspect: context window limits, system prompts, MAYBE some other questionable things that should be disclosed. Either way, if true, given the cost I wish I...

>> **F7F7F7**: Whenever I see new behaviors and suspect I’m being tested on I’ll typically see a feedback form at some point in that session.  Well, that and dropping four letter words. I know it’s more random...

>> **samusiam**: If that's the case, then as a benchmark operator you'd want to run the benchmark through multiple different accounts on different machines to average over A/B test noise.

> **make3**: It would be very easy for them to switch the various (compute) cost vs performance knobs down depending on load to maintain a certain latency; you would see oscillations like this, especially if the...

> **littlestymaar**: > 1. The percentage drop is too low and oscillating, it goes up and down. How do you define “too low”, they make sure to communicate about the statistical significance of their measurements, what's...

> **eterm**: 4. The graph starts January 8. Why January 8? Was that an outlier high point? IIRC, Opus 4.5 was released late november.

>> **F7F7F7**: Right after the Holiday double token promotion users felt (perceived) a huge regression in capabilities.   I bet that triggered the idea.

>> **pertymcpert**: People were away for the holidays. What do you want them to do?

>> **littlestymaar**: Or maybe, juste maybe, that's when they started testing…

>>> **eterm**: Wayback machine has nothing for this site before today, and article is "last updated Jan 29". A benchmark like this ought to start fresh from when it is published. I don't entirely doubt the...

**crazygringo**: > We model tests as Bernoulli random variables and compute 95% confidence intervals around daily, weekly, and monthly pass rates. Statistically significant differences in any of those time horizons...

**Dowwie**: Simply search user prompts for curse words and then measure hostility sentiment.  User hostility rises as agents fail to meet expectations.

> **preuceian**: Maybe im overlooking something obvious but how do you 'simply' scan the content of Claude users their prompts?

>> **gordonhart**: GP was making a joke, but Anthropic could implement this if they wanted to. Not a bad metric actually if you can measure it cheaply enough.

> **mrbananagrabber**: I uh might be skewing that as I generally just use a lot of curse words with Claude by default

> **Trufa**: I'm glad I'm not the only one.

>> **sejje**: One time I cussed Claude out so hard that it actually quit his doom-loop and fixed the thing. It's the only time cussing worked, though.

>>> **bn-l**: I don’t know. My gut feeling is it seems to help.

> **ctxc**: I feel bad about it but sometimes it's so daft, I can't even xD It's not my fault, they set high standards!

> **smotched**: there are many times where I just do it myself and it thinks it did well.

> **F7F7F7**: There’s a correlation between getting the “How’s Claude Doing This Session?” (Or whatever) and four letter words. It’s not always then, but it often follows it.

> **mhl47**: Or there are global events that stress people out .. or their expectations change over time. Not that simple ;)

> **nateberkopec**: Good thing expectations are perfectly constant!

> **mbm**: This might be strangely effective.

**silverlight**: There was a moment about a week ago where Claude went down for about an hour. And right after it came back up it was clear a lot of people had given up and were not using it. It was probably 3x...

> **yoavsha1**: I had that exact same feeling during the US holidays where I got to enjoy 2x usage limits and everything just seemed to work well

>> **cmrdporcupine**: I had terrible results during the holidays -- it wasn't slow but it was clear they were dealing with the load by quantizing in spots because there were entire chunks of days when the results from it...

>>> **abathologist**: I find that if I have my rabbit's foot and lucky socks on, I win working code ~1.2x more often.

> **nlh**: Noticed the exact same thing a few days ago. So much so that I went on twitter and HN to search for “claude speed boost” to see if there was a known new release. Felt like the time I upgraded from a...

> **svdr**: I would also regret it if they become that fast; right now I can really take a moment to enjoy the hard work the model is doing for me.

>> **asimovDev**: https://xkcd.com/303/ the evolution of this xkcd

**dajonker**: Wouldn't be surprised if they slowly start quantizing their models over time. Makes it easier to scale and reduce operational cost. Also makes a new release have more impact as it will be more...

> **kilroy123**: It sure feels like they do this. They claim they don't, but using it every day for 5-10 hours a day. You notice when something changes. This last week it seems way dumber than before.

> **9cb14c1ec0**: I don't think so.  There are other knobs they can tweak to reduce load that affect quality less than quantizing.  Like trimming the conversation length without telling you, reducing reasoning effort,...

>> **mgraczyk**: We never do anything that reduce model intelligence like that

>>> **siva7**: You said "like that", ok but there may be some truth to reduced model intelligence. Also how AWS deployed Anthropic models for Amazons Kiro feel much dumber than those controlled entirely by...

> **eli**: I would be surprised tbh. Anthropic does not exactly act like they're constrained by infra costs in other areas, and noticeably degrading a product when you're in tight competition with 1 or 2 other...

> **kristianp**: Open weights models such as GPT-OSS, Kimi K2.x are trained with 4 bit layers.  So it wouldn't come as a surprise if the closed models do similar things. If I compare Kimi K2.5 and Opus 4.5 on...

> **YetAnotherNick**: Benchmarks like ARG AGI are super price correlated and cheap to run. I think it's very easy to prove that the models are degrading.

> **rustyhancock**: Oooff yes I think that is exactly the kind of shenanigans they might pull. Ultimately I can understand if a new model is coming in without as much optimization then it'll add pressure to the older...

> **Roark66**: I haven't noticed much difference in Claude, but I swear gemini 3 pro preview was better in the first week or two and later started feeling like they quantized it down to hell.

**dmos62**: Lack of transparency as regards "thinking power"-consistency is a big gripe of mine with LLM providers. It's even worse with ChatGPT and the like. E.g. I had to learn the hard way that at >45k input...

> **judahmeek**: Sounds like you ran into the Maximum Effective Context Window: https://arxiv.org/abs/2509.21361?context=cs.AI

>> **dmos62**: Interesting article. Not sure it's the same phenomenon. What I experienced was like a day and night difference when you go from 44.5k to 45.5k. Didn't notice any fluctuation to suggest that it's no a...

**jampa**: I am using API mode, and it's clear that there are times when the Claude model just gives up. And it is very noticeable because the model just does the most dumb things possible. "You have a bug in...

> **arcanemachiner**: Robbing Peter to pay Paul. They are probably resource-constrained, and have determined that it's better to supply a worse answer to more people than to supply a good answer to some while refusing...

>> **chrisjj**: > Especially knowing that most people probably don't need the best answer 100% of the time. More: probably don't know if they've got a good answer 100% of the time. It is interesting to note that...

>> **bn-l**: Right. You can launder quantization that way by muddying the waters of discourse about the model.

> **DanielHall**: I encountered the same situation too; Claude has 'become lazy'.

**qwesr123**: FYI the MarginLab Claude Code degradation tracker is showing a statistically significant ~4% drop in SWE-Bench-Pro accuracy over the past month

**goldenarm**: I really like the idea, but a "±14.0% significance threshold" is meaningless here. The larger monthly scale should be the default, or you should get more samples.

> **zacmps**: Could you elaborate what you think the problems are? I guess they should be using some form of multiple comparison correction?

>> **goldenarm**: The daily scale is not statistically significant and is meaningless. You should lower the confidence interval by either increasing the scale or the evaluations.

**account266928**: Please try to make this statistically rigorous. There's lots of advice in this thread (intraday variation, etc) but if Im reading this right it looks like the CI includes the baseline value yet you...

**mrandish**: Benchmark tracking of cloud AI performance is going to be crucial going forward. Vendors are selling a service that by its nature is very difficult for customers to gauge day to day. How will I know...

**drc500free**: What makes the level they chose a “baseline,” against which it would be appropriate to do statistical tests?

**parquor**: Does this use a claude subscription or key, and has the account been used for anything else that day? On HN a few days ago there was a post suggesting that Claude gets dumber throughout the day:...

**steveBK123**: New to me, but I am starting to infer that for those "in the know" it is common knowledge on HN that LLMs are purposely degraded over time to manage capacity/cost or fudge benchmarks... How do you...

**kittikitti**: This is why I run my own models. All the inference providers do sneaky things behind the scenes. They will limit the output tokens, turn off attention layers, lower reasoning, or just use a...

**IshKebab**: > We model tests as Bernoulli random variables and compute 95% confidence intervals around daily, weekly, and monthly pass rates. Statistically significant differences in any of those time horizons...

**devonkelley**: Running agents in production, I've stopped trying to figure out why things degrade. The answer changes weekly. Model drift, provider load, API changes, tool failures - it doesn't matter. What matters...

> **sd9**: LLM generated comments are so obvious, please just talk from your personal experience. Nobody cares about this imagined experience.

**_zachs**: This is super important - even if it's not currently the best measure of degradation yet. Anecdotally, Opus 4.5 has gotten so bad for me it's almost adding time to my workflow instead saving it. It'd...

**pojzon**: Im using Claude daily. Mostly delegating boring stuff I can do myself but its a waste of my time now. I store my prompts, so I know I often run the same task multiple times over weeks span. After...

**sandeepkd**: Totally tangential to article, was browsing through the website UI - https://marginlab.ai/explorers/swe-bench-pro/ , the page gives impression that the  language, category boxes are selectable....

**stared**: Does it benchmark the underlying code (Opus 4.5) or Claude Code harness? If the second, I would love to see CC versions involved. I would be curious to see on how it fares against a constant harness....

> **Jcampuzano2**: Claude Code. They mention they are using claude codes CLI in the benchmark, and claude code changes constantly. I wouldn't be surprised if the thing this is actually testing is benchmarking just...

**mannanj**: I wonder when I experience noticeably degraded model quality, ie opus, is it because my usage falls in the highest buckets and I’m being shadow limited or served worse versions of opus or is it...

**PlatoIsADisease**: Pretty sure someone at Google, OpenAI, and Anthropic met up at a park, leaving their phones in their car, and had a conversation that January 2026, they were all going to silently degrade their...

**macinjosh**: The degradation does not need to be in the inference it can be in how often inference is used. It is closed source but the algorithms that decide what Claude code does when, could behave differently...

**cleifer**: How much influence have you all found prompting to have on output quality? Generally I've been approaching by just describing my problem and assuming that I'll get the machine's optimal output, but...

**threethirtytwo**: Does this even make sense? Clearly anthropic won't release a model unless it passed a benchmark of some sort that proves it's better than the previous model... or else why would they even release it?...

**WhitneyLand**: First off, this is a cool project, look forward to some interesting insights. I would suggest adding some clarification to note that longer measure like 30 pass rate is raw data only while the...

**beardsciences**: Very interesting. I would be curious to understand how granular these updates are being applied to CC + what might be causing things like this. I feel like I can notice a very small degradation but...

> **chrisjj**: > more detailed prompts (which I think, perhaps naively, is offsetting this issue). Is exacerbating this issue ... if the load theory is correct.

**bn-l**: I hope the author sees this: You have to test inter-day variation. Many have noticed a sudden drop off at certain times.

**aorist**: If the confidence interval width is 2 * 14.0%, how are you detecting a statistically significant difference between 58% and 50%? The 95% CIs on both timeseries pretty much always cover the baseline...

**persedes**: What would be cool if this somehow could do a comparison by provider. E.g. in the last outages anthropic models running on vertex were apparently less affected than those deployed elsewhere. (Not...

**motoboi**: I’d love to see, based on the level of non-determinism perfomance on the benchmark how many times you need to run the benchmark for the change to be relevant (or statistically significant if you...

**wendgeabos**: Codex is doing better.  Why is everyone silent on Codex? https://marginlab.ai/trackers/codex/

> **CharlesW**: Benchmark wins don't necessarily translate to "real world" wins vs. Claude Code.

> **bn-l**: Codex writes disgusting shit code.

**foerster**: It definitely felt less capable recently, I thought I was imagining it, but it was noticeably more difficult to get it to help on tasks that usually aren't so hard.

**stergd**: I rarely complain about model performance, but Opus 4.5 behaves as Sonnet 4 at best. Need to start testing alternatives asap

**your_friend**: They should add testing from different ips and account countries, that would be fun too see that Americans are getting different models for example

**sciencejerk**: Why is this happening?

> **observationist**: They're "optimizing" costs wherever possible - reducing compute allocations, quantizing models, doing whatever they can to reduce the cost per token, but vehemently insisting that no such things are...

> **Trufa**: I have absolutely no insight knowledge, but I think it's not a bad assumption to have that, it's costly to run the models, when they release a new model they assume that cost and give per user more...

>> **bn-l**: That is absolutely scummy.

> **Uehreka**: There are frequently claims that Anthropic is somehow diluting or dumbing down models in some subtle way. Unfortunately it’s tough to validate these claims without a body of regularly checked evals....

> **giwook**: https://www.anthropic.com/engineering/a-postmortem-of-three-...

>> **observationist**: >>> We never reduce model quality due to demand, time of day, or server load. The problems our users reported were due to infrastructure bugs alone. Just ignore the continual degradation of service...

>>> **alias_neo**: > We never reduce model quality due to demand, time of day, or server load Forgive me, but as a native English speaker, this sentence says exactly one thing to me; We _do_ reduce model quality, just...

> **emp17344**: It’s entirely possible it’s not happening, and this phenomenon of “model degradation” is just user hype meeting reality.

**hn_user_9876**: Tracking benchmarks for AI-assisted coding tools is crucial. It helps developers understand the trade-offs and stability of the models they rely on.

**elmean**: I KNEW I WASNT CRAZY

**fragebogen**: Would love to see this idea expanded to ever alleged SoTA model currently in production. Any speculation as to why this degradation occurs?

> **embedding-shape**: Anecdote, I don't have any proof and it's just a feeling. But around afternoon in GMT+1 compared to the morning/midday, there seems to be a change in the quality of responses, which seems to line up...

>> **jzig**: It’s the afternoon slump. The AI needs a cup of coffee and to doomscroll for half an hour!

>>> **embedding-shape**: Or a load balancing technique :) Either way, it kicks me off to do other things so maybe it isn't so bad after all.

**jonawesomegreen**: I’ve noticed Claude has been noticeably worse over the last week. For example, it told me I should pass frozen to make my Enum immutable—that’s not a thing. (It is a thing for dataclasses, but not...

**snissn**: they should run their test against a control baseline such as an open source hosted model to see the overall drift in their test

**Topfi**: I have yet to experience any degradation in coding tasks I use to evaluate Opus 4.5, but I did see a rather strange and reproducible worsening in prompt adherence as part of none coding tasks since...

> **dudeinhawaii**: I've noticed a degradation in Opus 4.5, also with Gemini-3-Pro. For me, it was a sudden rapid decline in adherence to specs in Claude Code. On an internal benchmark we developed, Gemini-3-Pro also...

>> **acuozzo**: Write your work order with phases (to a file) and, between each phase, give it a non-negotiable directive to re-read the entire work order file. Claude-Code is terrible with context compaction. This...

> **epolanski**: I definitely noticed a degradation, it feels regressed by a generation.

**ghm2199**: In medicine there is a concept of reporting adverse effects of medication or interventions which are then collectively studied for Public Health [MedWatch][VAERS][EudraVigilance] and in academia.  We...

**rplnt**: The chart would benefit from having weekends highlighted. Or have another chart averaged by a weekday.

**Rastonbury**: would be interesting to see what scores it's get when it is actually degraded via the status page, it gets degraded pretty often, so there's at least something to compare or to know at what point...

**sroerick**: My personal conspiracy theory is that they choose who to serve a degraded model to based on social graph analysis and sentiment analysis, maximizing for persuasion while minimizing compute.

> **arcanemachiner**: Sounds more like a sound business plan than a conspiracy theory.

>> **copilot_king**: It sounds like fraud to me

>>> **arcanemachiner**: Does it say anywhere in their terms of service that they guarantee the quality of the model, or promise not to modify it? https://www.anthropic.com/legal/consumer-terms...

> **copilot_king**: IMO this strategy seems inspired by TikTok's approach for retaining new uploaders. TikTok used to give new uploaders a visibility boost (i.e., an inflated number of likes and comments) on their first...

>> **sroerick**: I would actually assume a little more sophistication. For each user, a measure of "Are they convinced that AI is great". Then, you weaponize your compute to have the maximum social impact. If...

**carterschonwald**: ive seen degraded reasoning levels that feel like they they might be blur from excess quantization. cause thats what you get from the grid changes

**sreekanth850**: Tried Kimi 2.5 and far ahead of claude for coding.

**esafak**: Finally someone did it! We need this for all models.

**sd9**: I’m sure there is not enough data here for this to be statistically significant (it seems to oscillate too much and not show real trends or step changes) - BUT If this measure were hardened up a...

**ed_mercer**: I would pay 300 for a non-degrading Max plan.

**fernvenue**: That will be great if there's RSS support.

**taf2**: any chance we can get something like this for codex cli that'd be cool too compare

**biddit**: Call it what you will. But the experience is like you have a reliable coworker, but he randomly decides to take bong hits. "No no yeah bro no I'm good like really the work's done and all yeah sorry I...

**turnsout**: This is probably entirely down to subtle changes to CC prompts/tools. I've been using CC more or less 8 hrs/day for the past 2 weeks, and if anything it feels like CC is getting better and better at...

> **FfejL**: Honest, good-faith question. Is CC getting better, or are you getting better at using it? And how do you know the difference? I'm an occasional user, and I can definitely see improvements in my...

>> **rob**: I agree with you, it's personally hard to tell. For me I've noticed it getting nothing but better over the past couple months, but I've been working on my workflows and tooling. For example, I used...

>> **turnsout**: Good-faith answer: I can't be certain. But I've been using CC since its release, and Cursor before that (and actually going all the way back to GPT3 to do codegen in the Playground). After getting...

>> **BoorishBears**: I run an LLM based product in a completely different space (consumer) and I think this is kind of an impossible unsolvable part of developing products that rely on LLMs. No matter what, powers users...

> **billylo**: That's why benchmarks are useful. We all suffer from the shortcomings of human perception.

>> **gpm**: Benchmarks shortcomings are no worse... they inevitably measure something that is only close to the thing you actually care about, not the thing you actually care about. It's entirely plausible that...

>>> **billylo**: I wonder how best we can measure the usefulness of models going forward. Thumbs up or down? (could be useful for trends) Usage growth from the same user over time? (as an approximation) Tone of user...

>> **turnsout**: Benchmarks measure what they measure. But your subjective experience also matters.

> **fragebogen**: I was going to ask, are all other variables accounted for? Are we really comparing apples to apples here? Still worth doing obviously, as it serves a good e2e evaluations, just for curiosity's sake.

> **arcanemachiner**: The easiest way would be to quantize the model, and serve different quants based on the current demand. Higher volumes == worse quant == more customers served per GPU

> **gpm**: I upvoted, but > Edit: Before you downvote, can you explain how the model could degrade WITHOUT changes to the prompts? The article actually links to this fine postmortem by anthropic that...

**willturman**: Could this be (partially?) explained by Model Collapse [1], i.e. iteratively training on data that includes an ever increasing amount of AI slop? [1]...

**copilot_king**: This strategy seems inspired by TikTok's approach for retaining new uploaders. TikTok used to give new uploaders a visibility boost (i.e., an inflated number of likes and comments) on their first...

> **chrisjj**: Yes, but the difference is TikTok didn't sell a particular service version. Anthropic did sell a particular model version.
