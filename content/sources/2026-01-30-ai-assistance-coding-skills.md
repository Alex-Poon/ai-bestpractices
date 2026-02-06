---
title: "How AI assistance impacts the formation of coding skills"
source_url: "https://www.anthropic.com/research/AI-assistance-coding-skills"
hn_url: "https://news.ycombinator.com/item?id=46820924"
date: 2026-01-30
hn_points: 481
hn_comment_count: 66
tags: [skill-development, research, anthropic, junior-developers, productivity, code-quality]
tier: 1
weight: 3
---

## Summary

Anthropic published a randomized controlled study examining how AI assistance affects skill acquisition among junior software engineers. The research involved 52 participants divided into AI-assisted and control groups, tasked with learning and using Trio (a Python asynchronous programming library). After completing coding tasks, participants took a comprehension quiz covering debugging, code reading, code writing, and conceptual understanding.

The results revealed a significant trade-off between speed and learning. The AI-assisted group scored 17% lower on the comprehension quiz, a gap the researchers characterized as equivalent to nearly two letter grades, with a large effect size (Cohen's d of 0.738, p=0.01). The largest performance gap appeared on debugging questions, suggesting that AI assistance particularly impairs the development of error identification skills. Meanwhile, AI users finished tasks roughly two minutes faster on average, though this speed advantage was not statistically significant.

Critically, the study found that AI usage was not uniformly harmful to learning. Developers who actively engaged with the AI by asking follow-up questions, requesting explanations, and posing conceptual queries retained significantly better understanding than those who simply delegated work wholesale. This suggests that the manner of AI interaction matters more than whether AI is used at all.

The findings present organizations with a genuine dilemma: the promise of AI-assisted productivity may come at the cost of junior engineers' skill formation. The authors argued that intentional skill development must remain a priority and that workplace policies should be designed to ensure engineers continue learning while leveraging AI tools. The study used GPT-4o as the AI assistant.

## Key Insights

- **17% learning penalty**: AI assistance reduced quiz scores by nearly two letter grades, with debugging skills most affected
- **Speed gains not significant**: The roughly two-minute time savings from AI was not statistically significant, challenging the productivity narrative
- **Engagement style matters**: Asking the AI explanatory questions preserved learning, while pure delegation harmed it
- **Anthropic's transparency**: The community widely praised Anthropic for publishing research that could undermine their commercial interests

## Notable Quotes

> "AI use impairs conceptual understanding, code reading, and debugging" — Anthropic research abstract

## HN Discussion Highlights

*259 comments total*

**siliconc0w**: Good for them to design and publish this - I doubt you'd see anything like this from the other labs. The loss of competency seems pretty obvious but it's good to have data. What is also interesting...

> **shimman**: It's research from a company that gains from selling said tools they researched. Why does it have to be repeated that this is a massive conflict of interests and until this "research" has been veri...

>> **keeda**: I mean, they're literally pointing out the negative effects of AI-assisted coding? > We found that using AI assistance led to a statistically significant decrease in mastery. On a quiz that covered...

>>> **shimman**: Dude you falling for so obvious corpo-psyops is so sad. Tobacco companies literally published research that said cigarettes were dangerous too, that didn't stop them from lying to Congress and sayi...

>> **godelski**: > this is a massive conflict of interests I think everyone is aware of this. But people like that they aren't shying away from negative results and that builds some trust. Though let's not ignore t...

> **brookst**: I wish they had attempted to measure product management skill. My hypothesis is that the AI users gained less in coding skill, but improved in spec/requirement writing skills. But there’s no data, ...

>> **SJMG**: > I wish they had attempted to measure product management skill. We're definitely getting better at writing specs. The issue is the labor bottleneck is competent senior engineers, not juniors, not ...

>> **empath75**: What AI development has done for my team is the following: Dramatically improved Jira usage -- better, more descriptive tickets with actionable user stories and clearly expressed requirements. Dram...

>>> **WD-42**: I'd be willing to bet that your AI written issues, docs, etc look impressive initially but are extremely low signal to noise. You might be checking some boxes (docstrings, etc) but I do not envy an...

>>> **theshrike79**: I keep describing this as the environmental protection meme, "but what if we make the world a better place - for nothing!" Even if AI goes away tomorrow, we'll still have better tooling, documentat...

>>> **Jensson**: > Dramatically improved Jira usage -- better, more descriptive tickets with actionable user stories and clearly expressed requirements. Dramatically improved github PRs. Dramatically improved test ...

> **AstroBen**: Interestingly if you look at the breakdown by years of experience, it shows the 1-3 year junior group being faster, 4+ years no difference I wonder if we're going to have a future where the juniors...

>> **pesus**: I think we're going to see a small minority of juniors who managed to ignore the hype/peer pressure/easy path and actually learned to code have a huge advantage over the others.

>>> **DrewADesign**: Which isn’t saying much if efficiency gains tank the demand for developers, which will then tank everybody’s salary. The actual efficiency gains are debatable, but even if we’re talking about a 20%...

> **cal_dent**: Anthropic's way into regulatory capture seems to be to pretend they're the benevolent adults in the room. It'll probably work too.

> **austin-cheney**: I agree with the Ray Dalio perspective on this. AI is not a creative force. It is only a different form of automation. So, the only value to AI is to get to know your habits. As an example have it ...

>> **psyclobe**: > If you sucked before using AI > you are going to suck with AI This.

>>> **whattheheckheck**: Its 2026 and people still post this. Instead of an upvote?

> **epolanski**: > The loss of competency seems pretty obvious but it's good to have data That's not what the study says. It says that most users reflect your statement while there is a smaller % that benefits and ...

>> **AstroBen**: Relevant quote from their conclusion: > Among participants who use AI, we find a stark divide in skill formation outcomes between high-scoring interaction patterns (65%-86% quiz score) vs low-scori...

>>> **rienbdj**: Yes. I love using AI for the “where do I even start” type questions. The once I’ve had a discussion about various approaches I know what docs to actually look at and I can start thinking about impl...

>>> **ambicapter**: A personal tutor who you remain skeptical of, and constantly try to disprove in order to perfect your understanding.

>> **SJMG**: > there is a smaller % that benefits and learns more and faster That's not what the study says nor it is capable of credibly making that claim. You are reasoning about individuals in an RCT where s...

>>> **epolanski**: So you don't doubt their conclusion that most sucked by using AI, but you doubt that they found that some learned more?

**FitchApps**: This is all wonderful and all but what happens when these tools aren't available - you lose internet connection or the agent is misconfigured or you simply ran out of credits. How would someone sup...

> **esperent**: I've had a fairly long career as a web dev. When I started, I used to be finicky about configuring my dev environment so that if the internet went down I could still do some kind of work. But over ...

>> **nzealand**: > I've worked in many places around the world, developing countries, tropical islands, small huts on remote mountains I am genuinely curious about your work lifestyle. The freedom to travel anywher...

>>> **mikestorrent**: It does sound like a wonderful life... but if you want to have a family, you'll need to put down roots somewhere. I know a nomad who ended up doing this in Mexico - he'd never have guessed it years...

>>> **xeromal**: There's a whole movement that does this. https://digitalnomads.world/

>>> **LtWorf**: It means having no friends.

>> **Retric**: Meanwhile I’ve lost roughly a month from internet issues. My guess is you’re experience was unusual enough you felt the need to component where most developers who where less lucky or just remember...

>>> **rglullis**: > Meanwhile I’ve lost roughly a month from internet issues. If you tell me "I lost internet at home and couldn't work there", it's one thing. But that you simply went about a month without internet...

>>> **esperent**: How much of that was in the last ten years? And do you make any attempt to have a backup system (phone hotspot, for example)?

>> **bheadmaster**: > people use credits? I only use a monthly subscription Those still have limits, no? Or if there's a subscription that provides limitless access, please tell me which one it is.

>>> **embedding-shape**: I've been on ChatGPT Pro plan since introduced, and also used codex-rs since it was made public, never hit a limit. Came close last week, not sure if the limits were recently introduced or there al...

>>> **esperent**: I finally bit the bullet and got a $200 Claude subscription last month. It's been a busy month and I've used it a lot. More than is healthy, more than I sustainably could for more than a few weeks....

>> **Xfx7028**: And here am I thinking that my life depends too much on the internet and the knowledge you can find on it. So if something big/extreme happens like nuclear war, major internet outage etc, I know no...

>>> **cynicalpeace**: That's a very different problem than OP You should keep physical books, food, and medication for a SHTF scenario "Back to Basics", "Where There Is No Doctor" and the Bible are my SHTF books You won...

>> **lmc**: > And over that time I've worked in many places around the world, developing countries, tropical islands, small huts on remote mountains. And I've lost maybe a day of work because of connectivity i...

>>> **esperent**: If it's any consolation, Bavaria is a beautiful part of the world that's up there with any tropical island or rainforest. I hope to visit again sometime.

>> **alt187**: Now I wonder, how has this become infeasible exactly?

>> **zahlman**: I consider it more or less immoral to be expected to use the Internet for anything other than retrieving information from others or voluntarily sharing information with others. The idea that a dev ...

>>> **raw_anon_1111**: Do you know how many times since 1999 I have had my work Internet go down? Definitely not enough to spend time worrying about it. The world didn’t stop. In 2022, funny enough I was at an AWS office...

> **b_t_s**: Same thing you do if AWS goes down. Same thing we used to do back in the desktop days when the power went out. Heck one day before WFH was common we all got the afternoon off 'cause the toilets wer...

>> **pixl97**: Ya, I will say the argument isn't much different than "what happens if there is no gas for your tractor".

>>> **drunkdora**: i think its more like what if ur gps isnt working but you're just supposed to drive down the block

> **jillesvangurp**: Why wouldn't these tools be available suddenly? Once you answer the question, the challenge then becomes mitigating that situation rather than doing things the old way. Like having backup systems, ...

>> **reycharles**: > Why wouldn't these tools be available suddenly? Take a look at how ridiculously much money is invested in these tools and the companies behind them. Those investments expect a return somehow.

>>> **vineyardmike**: The models are already made. They can just run the very useful models they have indefinitely, and they’d be profitable. Or when they go under someone else can buy the rights to the weights. Anthrop...

>>> **jillesvangurp**: I look at this as cost savings waiting to happen. Nvidia extorts companies to the extent of tens of thousands for a GPU. Somebody's going to undercut them. At the same time, people are working on o...

> **i_am_proteus**: I am not convinced of the wonderfulness, because the study implies that AI does not improve task completion time but does reduce programmer's comprehension when using a new library.

>> **raw_anon_1111**: Yes instead I am suppose to understand the library I use the most boto3? https://boto3.amazonaws.com/v1/documentation/api/latest/inde... I don’t need to comprehend “the library”. I need to know wha...

> **DesaiAshu**: On device models (deepseek-coder, etc) are very good // better than the old way of using stack overflow on the internet. I have been quite productive on long haul flights without internet! You're a...

>> **Gallows4574**: I know this gets asked all the time, but what is your preferred workflow when using local models? I was pretty deep into it early on, with Tabby and Continue.dev, but once I started using Claude Co...

>> **Bnjoroge**: on-device models are still a tier or two below most frontier models(really opus 4.5).

> **dham**: The tools are going to ~zero (~ 5 years). The open source LLM's are here. No one can put them back or take them down. No internet, no problem. I don't see a long term future in frontier llm companies.

>> **Sevii**: What I don't get is, how are these free LLMs getting funded? Who is paying $20-100 million to create an open weights LLM? Long term why would they keep doing it?

>>> **dham**: I see what you're saying, but it doesn't matter that much in the long run. If everything stopped right now, the state-of-the-art open source models can still solve a lot of problems. They may never...

>>> **direwolf20**: Billionaires trying to hurt each other. Facebook released LLaMa hoping to hasten OpenAI's bankruptcy.

>> **direwolf20**: Do you mean the open binary LLMs, or did you find the secret training data and the random seed for LLaMa?

> **light_hue_1**: This is the argument that people used to fight against rich customized IDEs like emacs for decades. What if you need to ssh into a machine that only has baseline vi in an emergency? I'll happily op...

>> **1718627440**: > If the Internet is down for a long time, I've got bigger problems anyway. I don't know about you, but I don't connect to the internet most of the time, and it makes more productive, not less.

> **t_mahmood**: Yeah! I use JetBrains AI assistant sometimes, which suddenly showing only blank window, nothing else. So, not getting anything out of it. But I can see my credits are being spent! IF I was totally ...

> **raw_anon_1111**: What good would being able to “build my software” without internet access unless I’m building software for a disconnected desktop? Exactly what am I going to do with it? How am I going to get to my...

>> **zahlman**: > unless I’m building software for a disconnected desktop? ... Why wouldn't you build software that works there? As I understand things, the purpose of computers is to run software. But more import...

>>> **raw_anon_1111**: Because to a first approximation, no one wants desktop software, maintenance is a pain, it’s a pain to distribute across a large organization and people want to use the same app across devices and ...

> **akomtu**: Or your business gets flagged by an automated system for dubious reasons with no way to appeal. It's the old story of big tech: they pretend to be on your side first, but their motives are nefarious.

> **darkhorse222**: People used to and still say the same thing about GPS. As these systems mature they stay up and become incorporated into our workflows. The implication in the case of GPS was that navigating on you...

> **RA_Fisher**: That reminds me of when teachers would say: what if you're without a calculator? And yet we all have smartphones in our pockets today with calculators.

>> **palmotea**: > That reminds me of when teachers would say: what if you're without a calculator? And yet we all have smartphones in our pockets today with calculators. Your teachers had the right goal, but a bad...

>>> **RA_Fisher**: I think learning arithmetic is a good idea, but it’s only a part of computation. I don’t think we should get too hung up on a particular method of computation (bc there’s so many ways).

>> **fatherwavelet**: Certain subjects we treat as if one has to learn woodworking before taking violin lessons. We just really underestimate sentimentality in our society because it doesn't fit our self conception.

>>> **RA_Fisher**: Very fair. I think even more we underestimate our own sentimentalities. eg- the teacher that believes adding or multiplication has to be done a particular way (like the standard algorithm vs. parti...

>> **davidmurdoch**: Having a deep intuition about what the calculator is doing is the skill we were actually being taught. Teachers don't know always understand why things are being taught.

>>> **RA_Fisher**: I’m a fan of using a variety of methods to teach, no issue with that. My issue is with teachers that don’t admit how the world is changing. Dinosaurs.

>>> **1718627440**: > Teachers don't know always understand why things are being taught. Yes, but I don't think that is the actual bottleneck, even when they do, most children probably don't care about abstract goals,...

>> **1718627440**: And yet calculating your shopping expenses to prevent getting screwed by buggy vending machines, or quickly making rough estimations at your work, is as useful as ever. Tell me how you can learn ca...

> **Kiboneu**: It’s like with most programmers today having forgotten assembly. If their compiler breaks, what are they going to do?! (I jest a bit, actually agree since turning assembly->compiled code is a tight...

>> **ambicapter**: What a grossly disingenuous comparison.

>>> **Kiboneu**: Read the second line. If you can't generalize then I can't help you. Have good faith (and obtain a sense of humor).

> **wodenokoto**: The stack overflow era wasn’t that long ago and none of us could write a library call without consulting online sources. You are at least a decade late to post fears about developers reliance on th...

>> **1718627440**: > none of us could write a library call without consulting online sources. I use SO quite often, but it is for questions I would otherwise consult other people, because I can't figure it out short ...

>> **wizzwizz4**: I rely on the internet just as much as the rest of you. When that goes down, I crack out man pages, and the local copy of the documentation I can build from source code comments, and (after a 5-min...

>>> **raw_anon_1111**: Or I can just take a break, go to the gym downstairs, etc … Before you go on about kids these days, my first time coding was on an Apple //e in assembly.

> **bigbuppo**: Well, you're supposed to pay for the Platinum Pro Gold Deluxe package which includes priority support with an SLA so that six months down the road you get a one month credit for the outage that des...

> **seanmcdirmid**: I invested in a beefy laptop that can run Qwen Coder locally and it works pretty good. I really think local models are the future, you don’t have to worry about credits or internet access so much.

>> **jimmaswell**: What are the specs, and how does it compare to Copilot or GPT Codex?

>>> **seanmcdirmid**: You can check out https://www.reddit.com/r/LocalLLaMA/comments/1piq11p/mac_wit... for a sentiment of usefulness and the specs of the machines running it. It will be some variation of Max or Ultra l...

> **cyanydeez**: I think you laid out why so much mobey is being pressed into this: its digital crack and if they can addict enough businesses, they have subscription moats. Oraclification.

> **psyclobe**: It’s kinda scary actually. After getting used to ai doing all the work, doing it yourself again is like using a toilet without a bidet.

> **empath75**: > - you lose internet connection or the agent is misconfigured or you simply ran out of credits. What happens when github goes down. You shrug and take a long lunch.

>> **newsoftheday**: When GitHub goes down? I keep working, that's the point of a distributed version control system.

>>> **1718627440**: Yes, and when you do want to share with your colleagues `git push /media/user/usb` takes a few seconds and plugging an Ethernet cable into both computers and disabling ufw takes a few minutes (when...

> **blub**: Losing connectivity is a non-issue because it will come back soon enough absent some global event. The realistic risks are rather: * all services are run at a loss and they increase price to the po...

> **bathwaterpizza**: Buy a Mac and run a local model that's likely good enough

> **giancarlostoro**: > This is all wonderful and all but what happens when these tools aren't available - you lose internet connection or the agent is misconfigured or you simply ran out of credits. How would someone s...

>> **FitchApps**: I'm seeing things that are seriously alarming though. Claude can now write better documentation and document things 95% there (we're building a set of MCP tools and API end-points for a large enter...

>>> **Bnjoroge**: PMs could have chosen to do this before, though. Sure, LLMs obviously empower them but the main reason you have developers is to have someone to be accountable to, and they thus have to be extra ca...

>>> **giancarlostoro**: Sure Claude can write better docs but if you dont write the documentation yourself you wont fully know the codebase. I would argue write docs and then have Claude critique it. Then adjust.

>>> **beepbooptheory**: This doesn't really seem to be the point? Op is being prescriptive, talking about what we should do, not about what could be done. Apply to anything else: you could eat out at restaurants every nig...

>>> **3371**: Well, if they make the decision to accept the suggestion and it's wrong, that's on them. But if you do, that's on you. LLM? How can your boss blame the LLM? Like yelling at it?

> **luxcem**: At some point it will get treated like infrastructure, what a typical SWE is doing when cloudfare is broken or AWS is down.

>> **newsoftheday**: At most places I've worked, we can still get things done when AWS/GCP/Azure/OCI are down. For my own selfhosted work, I'm more self-reliant. But I'm aware there are some companies who do 100% of th...

> **direwolf20**: How would you answer the same question about water or electricity? Your pizza restaurant is all wonderful and all but what happens when the continual supply of power to the freezer breaks? How will...

> **greenie_beans**: > This is all wonderful and all but what happens when these tools aren't available - you lose internet connection or the agent is misconfigured or you simply ran out of credits. i would work on the...

>> **LtWorf**: Don't rely solely on github actions?

>>> **greenie_beans**: it's only an example for a rhetorical question

**appsoftware**: I think this is where current senior engineers have an advantage, like I felt when I was a junior that the older guys had an advantage in understanding the low level stuff like assembly and hardwar...

> **lelanthran**: > But software keeps moving forward - my lack of time coding assembly by hand has never hindered my career. Well, yeah. You were still (presumably) debugging the code you did write in the higher le...

> **ekidd**: I want to compliment Anthropic for doing this research and publishing it. One of my advantages(?) when it comes to using AI is that I've been the "debugger of last resort" for other people's code f...

> **beej71**: > my lack of time coding assembly by hand has never hindered my career. I'd kinda like to see this measured. It's obviously not the assembly that matters for nine-9s of jobs. (I used assembly langu...

> **direwolf20**: Being able to read assembly has helped me debug. You don't have to write it but you have to be able to write it. The same applies to manual transmissions and pocket calculators.

>> **webdevver**: thats fair enough but reading assembly is such a pain in the ass... it was exciting for the first 10 minutes of my life, but now, if i ever got to that point, i will 100% copy-paste the listing to ...

**omnicognate**: An important aspect of this for professional programmers is that learning is not something that happens as a beginner, student or "junior" and then stops. The job is learning, and after 25 years of...

> **cyclotron3k**: I've reached a steady state where the rate of learning matches the rate of forgetting

>> **sph**: How old are you? At 39 (20 years of professional experience) I've forgotten more things in this field than I'm comfortable with today. I find it a bit sad that I've completely lost my Win32 reverse...

>>> **doix**: > I've forgotten more things in this field than I'm comfortable with today. I find it a bit sad that I've completely lost my Win32 reverse engineering skills I had in my teens I'm a bit younger (33...

>>> **nkrisc**: You can’t keep infinite knowledge in your brain. You forget skills you don’t use. Barring some pathology, if you’re doing something every day you won’t forget it. If you’ve forgotten your Win32 rev...

>>> **thesz**: > When you know half a dozen programming languages or web frameworks, the next one takes you a couple hours to get comfortable with. Learn yourself relational algebra. It invariantly will lead you ...

>>> **steve_adams_86**: > I must admit my appetite in learning new technologies has lessened dramatically in the past decade; I felt like that for a while, but I seem to be finding new challenges again. Lately I've been d...

>> **TeMPOraL**: That's one of several possibilities. I've reached a different steady state - one where the velocity of work exceeds the rate at which I can learn enough to fully understand the task at hand.

>> **everdrive**: But just think, there's a whole new framework that isn't better but is trendy. You can recycle a lot of your knowledge and "learn new things" that won't matter in five years. Isn't that great?

>> **epolanski**: I use spaced repetition for stuff I care for. I use remnote for that. I write cards and quizzes for all kind of stuff, and I tend to retain it for years after having it practiced with the low frict...

>> **bryanrasmussen**: to fix that you basically need to switch specialty or focus. A difficult thing to do if you are employed of course.

> **emil-lp**: I worked as an "advisor" for programmers in a large company. Our mantra there was that programming and development of software is mainly acquiring knowledge (ie learning?). One take-away for us fro...

>> **mlrtime**: >One take-away for us from that viewpoint was that knowledge in fact is more important than the lines of code in the repo. We'd rather lose the source code than the knowledge of our workers, so to ...

>>> **emil-lp**: That might be the case for USA, but this was in a country with practically no firing.

>> **teiferer**: > We'd rather lose the source code than the knowledge of our workers, so to speak. Isn't large amounts of required institutional knowledge typically a problem?

>>> **emil-lp**: It was a "high tech domain", so institutional knowledge was required, problem or not. We had domain specialists with decades of experience and knowledge, and we looked at our developers as the "glu...

>> **1718627440**: Obligatory link: https://pages.cs.wisc.edu/~remzi/Naur.pdf

>>> **emil-lp**: Very cool! Thanks

> **hnthrow0287345**: It can be I guess, but I think it's more about solving problems. You can fix a lot of peoples' problems by shipping different flavors of the same stuff that's been done before. It feels more like a...

> **dude250711**: > The job is learning... I could have sworn I was meant to be shipping all this time...

>> **rTX5CMRXIfFG**: Have you been nothing more than a junior contributor all this time? Because as you mature professionally your knowledge of the system should also be growing

>>> **MyHonestOpinon**: It seems to me that now days software engineers move a lot more. Either within a company or to other companies. Furthermore, companies do not seem to care and they are always stuck on a learning lo...

**postalcoder**: One of the nice things about the "dumber" models (like GPT-4) was that it was good enough to get you really far, but never enough to complete the loop. It gave you maybe 90%. 20% of which you had t...

> **boredemployee**: The big issue I see coming is that leadership will care less and less about people, and more about shipping features faster and faster. In other words, those that are still learning their craft are...

>> **iamflimflam1**: I think this is sadly going to be the case. I also used to get great pleasure from the banging head and then the sudden revelation. But that takes time. I was valuable when there was no other optio...

> **Oras**: You still have the system design skills, and so far, LLMs are not that good in this field. They can give plausible architecture but most of the time it’s not usable if you’re starting from scratch....

>> **Thanemate**: I see this argument all the time, and while it sounds great on paper (you're an architect now, not a developer) people forget (or omit?) that a product needs far fewer architects than developers, m...

>>> **iamflimflam1**: I would also point out that a lot of real world problems don’t need a complex architecture. They just need to follow some well established patterns. It is a pattern matching problem and that seems ...

> **queenkjuul**: Idk i very much feel like Claude Code only ever gets me really far, but never there. I do use it a fair bit, but i still write a lot myself, and almost never use its output unedited. For hobby proj...

> **simianwords**: you can now access similar models for way cheaper prices. grok 4.1 fast is around 10x cheaper but performs slightly better

>> **i_love_retros**: Grok? You're OK giving money to elon musk?

>>> **stray**: Better than Palantir.

> **dude250711**: > The greatest feeling in the world is pounding your head against a problem for a couple of days and waking up the next morning with the solution sketched out in your mind. And then you find out so...

>> **griffzhowl**: Well, this is exactly the problem. This tactic works until you get to a problem that nobody has solved before, even if it's just a relatively minor one that no one has solved because no one has tri...

>> **wesleywt**: But to understand the solution from someone else, you would have to apply your mind to understand the problem yourself. Transferring the hard work of thinking to GPT will rob you of the attention y...

>> **1718627440**: How is that a drawback? You still solved it, you learned a lot, and you can actually discuss approaches with the other one, because you actually understood the problem domain.

> **dataviz1000**: This is what I am thinking about this morning. I just woke up, made a cup of coffee, read the financial news, and started exploring the code I wrote yesterday. My first thought was that I can abstr...

**amelius**: > We find that AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average. Ouch. See also: https://news.ycombinator.c...

**Ronsenshi**: It's good that there's some research into this - to confirm what is generally obvious to anyone who studied anything. You have to think about what you are doing, write things by hand, use the skill...

**dr_dshiv**: Go Anthropic for transparency and commitment to science. Personally, I’ve never been learning software development concepts faster—but that’s because I’ve been offloading actual development to othe...

**jwr**: The title of this submission is misleading, that's not what they're saying. They said it doesn't show productivity gains for inexperienced developers still gaining knowledge.

> **visarga**: The study measures if participants learn the library, but what they should study is if they learn effective coding agent patterns to use the library well. Learning the library is not going to be wh...

>> **2sk21**: You can, most certainly, drive a car without understanding how it works. A pilot of an aircraft on the other hand needs a fairly detailed understanding of the subsystems in order to effectively fly...

>>> **iammjm**: Sure, if you are a pilot then that makes sense. But what if you are a company that uses planes to deliver goods? Like when the focus shifts from the thing itself to its output

>>> **northfield27**: Agreed

>> **discreteevent**: > Many people drive cars without being able to explain how cars work. But the fundamentals all cars behave the same way all the time. Imagine running a courier company where sometimes the vehicles ...

>> **gjadi**: Interesting argument. But isn't the corrections of those errors that are valuable to society and get us a job? People can tell they found a bug or give a description about what they want from a sof...

>>> **another-dave**: I think there's different levels to look at it. If you know that you need O(n) "contains" checks and O(1) retrieval for items, for a given order of magnitude, it feels like you've all the pieces of...

>>> **visarga**: I think the kind of judgement required here is to design ways to test the code without inspecting it manually line by line, that would be walking a motorcycle, and you would be only vibe-testing. T...

> **concats**: I agree. It's very missleading. Here's what the authors actually say: > AI assistance produces significant productivity gains across professional domains, particularly for novice workers. Yet how t...

>> **danbruc**: That itself sounds contradictory to me. I assistance produces significant productivity gains across professional domains, particularly for novice workers. We find that AI use impairs conceptual und...

>>> **mold_aid**: Not seeing the contradiction. The two sentences suggest a distinction between novice task completion and supervisory (ie, mastery) work. "The role of workers often shifts from performing the task t...

>>> **capnrefsmmat**: The first sentence is a reference to prior research work that has found those productivity gains, not a summary of the experiment conducted in this paper.

>>> **torginus**: That doesn't really line up with my experience, I wanted to debug a CMake file recently, having done no such thing before - AI helped me walk through the potential issues, explaining what I got wro...

> **omnicognate**: I agree the title should be changed, but as I commented on the dupe of this submission learning is not something that happens as a beginner, student or "junior" programmer and then stops. The job i...

>> **mold_aid**: The study doesn't argue that you stopped learning.

>>> **omnicognate**: I didn't say it did. I just pointed out that learning effectively isn't only a concern for "inexperienced developers still gaining knowledge".

> **emsign**: > They said it doesn't show productivity gains for inexperienced developers still gaining knowledge. But that's what "impairs learning" means.

**northfield27**: Edit: Changed title Previous title: "Anthropic: AI Coding shows no productivity gains; impairs skill development" The previous title oversimplified the claim to "all" developers. I found the previo...

**suralind**: No surprise, really. You can use AI to explore new horizons or propose an initial sketch, but for anything larger than small changes - you must do a rewrite. Not just a review. An actual rewrite. A...

> **teiferer**: > I automate nearly all my tests with AI How exactly? Do you tell the agent "please write a test for this" or do you also feed it some form of spec to describe what the tested thing is expected to ...

>> **suralind**: I'm not saying my approach is correct, keep that in mind. I care more about the code than the tests. Tests are verification of my work. And yes, there is a risk of AI "navigating around" bugs, but ...

>>> **teiferer**: Thanks for your responses! A follow-up: > I care more about the code than the tests. Why is that? Your (product) code has tests. Your test (code) doesn't. So I often find that I need to pay at leas...

> **james_marks**: This is why the quality of my code has improved since using AI. I can iterate on entire approaches in the same amount of time it would have taken to explore a single concept before. But AI is an am...

>> **acedTrex**: My core uses are 100% racing the model in yolo mode to find a bug. I win most of the time but occasionally it surprises me. Then also switching arch approaches quickly when i find some code strateg...

> **mickeyp**: > No surprise, really. You can use AI to explore new horizons or propose an initial sketch, but for anything larger than small changes - you must do a rewrite. Not just a review. An actual rewrite....

>> **JustSkyfall**: You can definitely vibecode an app, but that doesn't mean that you can necessarily "get smarter"! An example: I vibecoded myself a Toggl Track clone yesterday - it works amazingly but if I had to r...

>>> **suralind**: That's what I meant, it's either, or. Vibe coding definitely has a place for simple utilities or "in-house" tools that solve one problem. You can't vide code and learn (if you do, then it's not vib...

>> **suralind**: Did I say that you can't vibe code an app? I browse reddit and have seen the same apps as you did, I also vibe code myself every now and then and know what happens when you let it loose.

**simonw**: Key snippet from the abstract: > Novice workers who rely heavily on AI to complete unfamiliar tasks may compromise their own skill acquisition in the process. We conduct randomized experiments to s...

**gergo_b**: When I use AI to write code, after a week or 2, if I go back to the written code I have a hard time catching up. When I write code by myself I always just look at it and I understand what I did.

> **jackdoe**: a program is function of the programmer, how you code is how you think. that is why it is really difficult, even after 60 years, for multiple people to work on the same codebase, over the years we ...

> **AstroBen**: Not only do I have a hard time catching up, but it's like I'm looking at a codebase I've never seen before, even though I absolutely reviewed the code before committing

> **northfield27**: ++Hard Agree.

**lelanthran**: I must say I am quite impressed that Anthropic published this, given that they found that: 1. AI help produced a solution only 2m faster, and 2. AI help reduced retention of skill by 17%

**visarga**: Many say generative AI is like a vending machine. But if your vending machine has not 1 button but a keyboard, and you type anything you want in, and it makes it (Star Trek Replicator) and you use ...

> **northfield27**: Instead of "vending machine", I see many people calling generative AI "slot machine", which more aptly describes current genAI tools. Yes, we can use it 10,000 times to refine our recipes, but "did...

> **latexr**: Star Trek replicators were deterministic. They had a library of things they could replicate that your programmed in and that’s the extent of what they could do. They replicated to the molecular lev...

> **hahahahhaah**: 3d printer: you learn something of you make CAD designs yourself and print them yes. It is a skill.

**comrade1234**: Often when I use it I know that there is a way to do something and I know that I could figure it out by going through some api documents and maybe finding some examples on the web... IOW I already ...

> **drooby**: Exactly this. I’m starting to believe that people who think AI-generated code is garbage actually don’t know how to code. I hit about 10 years of coding experience right before AI hit the scene, wh...

**hollowturtle**: > Unsurprisingly, participants in the No AI group encountered more errors. These included errors in syntax and in Trio concepts, the latter of which mapped directly to topics tested on the evaluati...

> **gorbachev**: I've found the AI assisted auto-completion to be very valuable. It's definitely sped up my coding and reduced the number of errors I make. It reduces the context switching between coding and refere...

>> **hollowturtle**: Have you read my comment or are you a bot?

**keeda**: Another study from 2024 with similar findings: https://www.mdpi.com/2076-3417/14/10/4115 -- a bit more preliminary, but conducted with undergrad students still learning to program, so I expect the ...

**jbellis**: Good to see that Anthropic is honest and open enough to publish a result with a mostly negative headline. > Importantly, using AI assistance didn’t guarantee a lower score. How someone used AI infl...

**cleandreams**: I'm anxious about code quality in critical infrastructure in 5 years or so. Also my mastery of code starts with design and implementation that results in deep, intuitive understanding. Then I can d...

**Kiboneu**: When coding agents are unavailable I just continue to code myself or focus on architecture specification / feature descriptions. This really helps me retain my skills, though there is some "skew" (...

**devnonymous**: From the "Discussion" section: > This suggests that as companies transition to more AI code writing with human supervision, humans may not possess the necessary skills to validate and debug AI-writ...

> **Terretta**: > AI is writing code in the cleverest way possible … On the contrary, without mastery guiding, AI writes code in the most boilerplate way possible, even if that means compromising logic or function...

**vessenes**: @dang the title here is bait. I’d suggest the paper title: “Anthropic: How AI Impacts Skill Formation”

> **fragmede**: This isn't Twitter. email hn@ycombinator.com

>> **vessenes**: Have you heard of K I B O?

**baalimago**: I've noticed this as well. I delegate to agentic coders on tasks I need to have done efficiently, which I could do myself and lack time to do. Or on tasks which are in areas I simply don't care muc...

**Wojtkie**: This is interesting. I started teaching myself Polars and used Claude to help me muscle through some documentation in order to meet deadlines on a project. I found that Claude wasn't too great at f...

**i_love_retros**: I don't understand how so many people can be OK with inflicting brain rot on themselves and basically engineering themselves out of a career. I use a web ui to chat with ai and do research, and eve...

**shayonj**: Being able to debug and diagnose difficult problems and distributed systems still remains a key skill, at least until Opus or some other model gets better at it. I think being intentional about lea...

**discreteevent**: The learning loop and LLMs [1] is well worth reading and the anthropic blog post above concurs with it in a number of places. It's fine to use LLMs as an assistant to understanding but your goal as...

**epolanski**: > Importantly, using AI assistance didn’t guarantee a lower score. How someone used AI influenced how much information they retained. The participants who showed stronger mastery used AI assistance...

**grahamlee**: I’ve been making the case (e.g. https://youtu.be/uL8LiUu9M64?si=-XBHFMrz99VZsaAa [1]) that we have to be intentional about using AI to augment our skills, rather than outsourcing understanding: gre...

**crvdgc**: Among the six patterns identified, it's interesting that "Iterative AI Debugging" takes more time (and possibly tokens) but results in worse scores than letting AI do everything. So this part reall...

**MzxgckZtNqX5i**: Duplicate? Submission about the arXiv pre-print: https://news.ycombinator.com/item?id=46821360

**siliconc0w**: It's pretty insidious to think that these AI labs want you become so dependent on them so that once the VC-gravy-train stops they can hike the token price 10x and you'll still pay because you have ...

> **Zababa**: >It's pretty insidious to think that these AI labs want you become so dependent on them so that once the VC-gravy-train stops they can hike the token price 10x and you'll still pay because you have...

**Bnjoroge**: gotta say this is some impressive transparency for something that seems to somehwat intersect with their business objective.

**qweiopqweiop**: It makes sense - juniors are coding faster but not understanding anything. Ironically it'll stop them getting more experienced despite feeling good. What I'm interested in is if the same applies fo...

> **renegade-otter**: It requires discipline. I use LLMs for mind-numbing refactoring and things I don't care learning. If you want to learn something, you do it yourself. It's like the gym. No pain, no gain. I am not s...

>> **bayindirh**: > like a person still proud in 2026 that they are still using Vim for large projects. I remember a small competition where people do a well-defined "share this content to others" routine to showcas...

>> **skydhash**: > like a person still proud in 2026 that they are still using Vim for large projects These large projects are amlmost always in Java, C#, and co. Where the verbosity of the language make it require...

>> **mkehrt**: Vim has been having a moment for a while. I have several coworkers who just use it and it seems to work fine for them.

> **empath75**: I am doing now with AI what I consider more to be engineering management than I am doing software dev, and most technical managers have their coding skills atrophy over time and I don't think that ...

**system2**: I respect Anthoropic for writing an article like this. I can't imagine Sam Altman allowing someone to write something like this that is not a 100% advertisement of their own products or mightiness.

**gezman7**: They lost me in the abstract when said “AI increase productivity especially with novice workers” From my experience, it was the most experienced and fluent in the engineering world who gained the m...

**buredoranna**: Revealing AI is a tool, and like any other tool, its how you use it. If you use it with the express intent to learn, it is an amazing tool. If you use it as a crutch, it results in "learning avoida...

**simonw**: I wonder why these Anthropic researchers chose GPT-4o for their study.

> **segh**: Far far more people use ChatGPT than Claude.ai

> **simianwords**: This is really strange and warrants some skepticism

>> **fragmede**: Anthropic paid a team to do a project, and gave them leeway to do it how they wanted. If anything, it's a good signal that Anthropic didn't lean on the scale to have the results go in their favor.

>>> **hxugufjfjf**: Isn’t it technically in their favor if competition is proven bad, even if it would be equally easy to prove their product likely equally bad or even worse?

**irrelevant1915**: Interesting read. Makes me wonder how often we mistake convenience for competence when using AI tools.

**rkagerer**: Is anyone else concerned about the huge, centralized dependency AI introduces into your workflow? This is one reason I've been resistant to using it. I don't want my work to go to the companies pro...

> **rkagerer**: Is GLM 4.7 still leading in terms of local models?

> **direwolf20**: About as much as they're worried about AWS.

> **AstroBen**: I actually think this research points out why that isn't an issue: used properly, AI can help you learn and act as support. I'd also be fine if my LSP disappeared overnight. Kind of annoying but me...

**yalogin**: Is this the equivalent of cigarette companies putting “smoking kills” on their packaging?

**generalizations**: From Plato's Phaedrus, on the invention of writing: Theuth: "This invention, O king, will make the Egyptians wiser and will improve their memories; for it is an elixir of memory and wisdom that I h...

**mriet**: I'm already having flashbacks of how the tobacco industry faired..

**journal**: AI is OIL for your brain. Imagine being able to do 1000% more.

**jmatthews**: I find this so hard to get my head around. I am wildly more prolific with agentic coding. It's at minimum a 10x for the first several iterations and when you get into the heavy detail part I am sti...

**luxuryballs**: I expect, especially in things like transit or healthcare, that people still need to review the code that is written. Even if we write bots that are good at scanning code for issues, we still can’t...

**replwoacause**: I guess its cool they published this paper, but the cynic in me says this is more a PR/optics move to reinforce the narrative that "we're an AI safety-first company" because "look see, we published...

**roark_howard**: Guilt driven attempt to save jobs?

**kaelandt**: Nice to see an AI coding company allow such studies to come out, and it looks decently designed

> **falloutx**: Dont give them kudos, they are just trying to seem like a "research" company while submitting bogus papers on arXiv (not peer-reviewed)

**oxag3n**: > For novice workers in software engineering or any other industry, our study can be viewed as a small piece of evidence toward the value of intentional skill development with AI tools. TL;DR it's ...

**HPsquared**: High-level languages impact assembly coding skills, which are almost extinct.

**divbzero**: In another half century, will this sound like “How compilers impact the formation of assembly coding skills” sounds today?

> **gordonhart**: Hinges on whether this new high level -> low level transformation becomes reliable enough to build watertight abstractions on top of it. If AI code becomes good enough that you don't have to worry ...

**reedf1**: This is a fancy way of saying that if you invent the calculator, people get worse at sums. I'm not an AI doomer or a boomer - but it's clear to me that some skills will be permanently relegated to AI.

> **lionkor**: Yes, except the calculator is right 100% of the time. LLMs are right ??% of the time, where ?? constantly changes, changes with prompts, etc.

>> **ares623**: For $100/hour I can fill in those gaps for you!

**falloutx**: Can we ban Anthropic research papers to be submitted on HN? This study is so bad, the sample size is n = 52 and then in some conclusions it goes down to n = 2.

> **stuxnet79**: It is sad to see how far Anthropic and OpenAI have strayed from their research roots, that a pitiful manuscript like this can pass muster.

> **raphman**: This seems to be a totally normal sample size for such kinds of studies where you look at quantitative and qualitative aspects. Is this the only reason why you find the study to be bad?

**jerf**: If AIs were to plateau where they are for an extended period of time, I definitely worry about their net effect on software quality. One of the things I worry about is people not even learning what...

**i_am_proteus**: TLDR from the paper (https://arxiv.org/pdf/2601.20245) >We find that AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains ...