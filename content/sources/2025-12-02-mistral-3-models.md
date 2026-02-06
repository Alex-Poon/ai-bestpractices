---
title: "Mistral 3 family of models released"
source_url: "https://mistral.ai/news/mistral-3"
hn_url: "https://news.ycombinator.com/item?id=46121889"
date: 2025-12-02
hn_points: 826
hn_comment_count: 38
tags: [open-source-models, model-releases, multimodal, benchmarks, mistral]
tier: 2
weight: 20
---

## Summary

Mistral AI released the Mistral 3 family, a new generation of open-source multimodal models under the Apache 2.0 license. The lineup includes three dense models at 3B, 8B, and 14B parameters (the Ministral variants), plus Mistral Large 3, a sparse mixture-of-experts model with 41B active parameters drawn from a 675B total pool.

All models feature native multimodal and multilingual capabilities, handling both text and images across more than 40 languages. The smaller Ministral variants target cost-efficiency, with the 14B reasoning variant achieving strong accuracy on math benchmarks. Mistral Large 3 ranks highly among open-source non-reasoning models on the LMArena leaderboard and demonstrates parity with leading instruction-tuned open-weight models for general tasks. A notable efficiency claim is that the Ministral family produces far fewer tokens than competitors while achieving comparable performance, significantly reducing computational costs.

The models were trained on NVIDIA Hopper GPUs with support for TensorRT-LLM and SGLang. Deployment targets range from data center systems to edge devices such as RTX PCs and Jetson hardware. The 3B vision model can even run in the browser after a 3GB download. Models are available through Mistral AI Studio, Amazon Bedrock, Azure, Hugging Face, and multiple third-party platforms.

The release was overshadowed somewhat by DeepSeek 3.2 launching around the same time. Technically, the Mistral Large 3 model uses a DeepSeek V2-style architecture, which some commenters noted Mistral did not prominently acknowledge. Regardless, the release represents a significant contribution to the open-source model ecosystem from one of Europe's leading AI companies.

## Key Insights

- **Open-source MoE at scale**: Mistral Large 3 uses a 675B-parameter mixture-of-experts architecture with 41B active parameters, released under Apache 2.0, making it one of the most capable openly-licensed MoE models available.
- **Efficiency gains through fewer tokens**: The Ministral family claims dramatically fewer output tokens than competitors for equivalent performance, translating to major cost savings for inference workloads.
- **Multimodal and multilingual from the start**: All models in the family natively support vision and 40+ languages, addressing a common gap in open-weight models for non-English language support.
- **Browser-runnable small models**: The 3B model can run entirely in a web browser via WebGPU, lowering the barrier to experimentation significantly.

## Notable Quotes

> "insanely fast, cheap, reliable, and follows formatting instructions to the letter" — barrell (HN)

> "Europe's bright star has been quiet for a while" — mythz (HN)

## HN Discussion Highlights

*177 comments total*

**barrell**: I use large language models in http://phrasing.app to format data I can retrieve in a consistent skimmable manner. I switched to mistral-3-medium-0525 a few months back after struggling to get gpt-...

> **mrtksn**: Some time ago I canceled all my paid subscriptions to chatbots because they are interchangeable so I just rotate between Grok, ChatGPT, Gemini, Deepseek and Mistral. On the API side of things my ex...

>> **barrell**: Yep I spent 3 days optimizing my prompt trying to get gpt-5 to work. Tried a bunch of different models (some Azure some OpenRouter) and got a better success rate with several others without any tai...

>>> **distalx**: What tools or process do you use to optimize your prompts?

>> **barbazoo**: > I guess they hope I forget to cancel. Business model of most subscription based services.

>>> **viking123**: For me it's just that I am too lazy to start switching from my GPT subscription, I use it with codex and it's very good for my use-case. And the price at least here in Asia is not expensive at all ...

>>> **b3ing**: I estimate at 10% of meetup runs like that

>> **acuozzo**: > because they are interchangeable What is your use-case? Mine is: I use "Pro"/"Max"/"DeepThink" models to iterate on novel cross-domain applications of existing mathematics. My interaction is: I c...

>>> **mrtksn**: my use case is Google replacement, things that I can do by myself so I can verify and things that are not important so I don’t have to verify. Sure, they produce different output so sometimes I wil...

>> **giancarlostoro**: Maybe give Perplexity a shot? It has Grok, ChatGPT, Gemini, Kimi K2, I dont think it has Mistral unfortunately.

>>> **mrtksn**: I like perplexity actually but haven’t been using it since some time. Maybe I should give it a go :)

>>> **VHRanger**: Kagi has Mistral as well

> **druskacik**: This is my experience as well. Mistral models may not be the best according to benchmarks and I don't use them for personal chats or coding, but for simple tasks with pre-defined scope (such as cat...

>> **leobg**: Did you compare it to gemini-2.0-flash-lite?

>>> **leobg**: Answering my own question: Artificial Analysis ranks them close in terms of price (both 0.3 USD/1M tokens) and intelligence (27 / 29 for gemini/mistral), but ranks gemini-2.0-flash-lite higher in t...

>>> **druskacik**: I did some vibe-evals only and it seemed slightly worse for my use case, so I didn't change it.

> **mbowcut2**: It makes me wonder about the gaps in evaluating LLMs by benchmarks. There almost certainly is overfitting happening which could degrade other use cases. "In practice" evaluation is what inspired th...

>> **pants2**: The best benchmark is one that you build for your use-case. I finally did that for a project and I was not expecting the results. Frontier models are generally "good enough" for most use-cases but ...

>>> **airstrike**: If you and others have any insights to share on structuring that benchmark, I'm all ears. There a new model seemingly every week so finding a way to evaluate them repeatedly would be nice. The answ...

>>> **dotancohen**: How do you find and decide which obscure models to test? Do you manually review the model card for each new model on Hugging Face? Is there a better resource?

>> **Legend2440**: I don’t think benchmark overfitting is as common as people think. Benchmark scores are highly correlated with the subjective “intelligence” of the model. So is pretraining loss. The only exception ...

>> **pembrook**: If the models from the big US labs are being overfit to benchmarks, than we also need to account for HN commenters overfitting positive evaluations to Chinese or European models based on their poli...

>>> **astrange**: Americans have an opposing bias via the phenomenon of "safe edgy", where for obvious reasons they're uncomfortable with being biased towards anyone who looks like a US minority, and redirect all th...

> **mentalgear**: Thanks for sharing your use case of the mistral models, which are indeed top-notch ! I had a look at phrasing.app, and while a nice website, I found the copy of "Hand-crafted. Phrasing was designed...

>> **barrell**: I don't see the contention. I do not use llms in the design, development, copywriting, marketing, blogging, or any other aspect of the crafting of the application. I labor over every word, every bu...

>>> **willlma**: It's interesting. I've been tinkering with an article summarizing/highlighting browser extension, and realized that I don't want the end-user to have read AI-generated content because it's not as h...

>>> **basilgohar**: I admire and respect this stance. I have been very AI-hesitant and while I'm using it more and more, I have spaces that I want to definitely keep human-only, as this is my preference. I'm glad to h...

> **metadat**: Are you saying gpt-5 produces gibberish 15% of the time? Or are you comparing Mistral gibberish production rate to gpt-5.1's complex task failure rate? Does Mistral even have a Tool Use model? That...

>> **barrell**: Yes. I spent about 3 days trying to optimize the prompt to get gpt-5 to not produce gibberish, to no avail. Completions took several minutes, had an above 50% timeout rate (with a 6 minute timeout ...

>>> **data-ottawa**: With gpt5 did you try adjusting the reasoning level to "minimal"? I tried using it for a very small and quick summarization task that needed low latency and any level above that took several second...

>>> **barbazoo**: Hard to gauge what gibberish is without an example of the data and what you prompted the LLM with.

> **acuozzo**: I have a need to remove loose "signature" lines from the last 10% of a tremendous e-mail dataset. Based on your experience, how do you think mistral-3-medium-0525 would do?

>> **barrell**: What's your acceptable error rate? Honestly ministral would probably be sufficient if you can tolerate a small failure rate. I feel like medium would be overkill. But I'm no expert. I can't say I'v...

>>> **acuozzo**: I'd prefer for the error rate to be as close to 0% as possible under the strict requirement of having to use a local model. I have access to nodes with 8xH200, but I'd prefer to not tie those up wi...

> **mackross**: Cool app. I couldn’t see a way to report an error in one of the default expressions.

**msp26**: The new large model uses DeepseekV2 architecture. 0 mention on the page lol. It's a good thing that open source models use the best arch available. K2 does the same but at least mentions "Kimi K2 w...

> **Jackson__**: So they spent all of their R&D to copy deepseek, leaving none for the singular novel added feature: vision. To quote the hf page: >Behind vision-first models in multimodal tasks: Mistral Large 3 ca...

>> **Ey7NFZ3P0nzAe**: Well, behind "models" not "langual models". Of course models purely made for image stuff will completely wipe it out. The vision language models are useful for their generalist capabilities

> **make3**: Architecture difference wrt vanilla transformers and between modern transformers are a tiny part of what makes a model nowadays

> **halJordan**: I don't think it's fair to demand everything be open and then get mad when they open-ness is used. It's an obsessive and harmful double standard.

**simonw**: The 3B vision model runs in the browser (after a 3GB model download). There's a very cool demo of that here: https://huggingface.co/spaces/mistralai/Ministral_3B_WebGPU Pelicans are OK but not eart...

> **troyvit**: I'm reading this post and wondering what kind of crazy accessibility tools one could make. I think it's a little off the rails but imagine a tool that describes a web video for a blind user as it h...

>> **GaggiX**: This is not local but Gemini models can process very long videos and provide description with timestamps if asked for. https://ai.google.dev/gemini-api/docs/video-understanding#tr...

>>> **embedding-shape**: Nor would it be describing things as they happen, but instead needing pre-processing, so in the end, very different :)

> **user_of_the_wek**: > The image depicts and older man... Ouch

**mythz**: Europe's bright star has been quiet for a while, great to see them back and good to see them come back to Open Source light with Apache 2.0 licenses - they're too far from the SOTA pack that exclus...

> **rvz**: All thanks to the US VCs that acutally have money to fund Mistral's entire business. Had they gone to the EU, Mistral would have gotten a miniscule grant from the EU to train their AI models.

>> **amarcheschi**: Mistral biggest investor is asml, although it became so later than other vcs

>> **crimsoneer**: I mean, one is a government, the other are VCs (also, I would be shocked if there isn't some French gov funding somewhere in the massive mistral pile).

>>> **kergonath**: > I would be shocked if there isn't some French gov funding somewhere in the massive mistral pile There is a bit of it, yes, although how much exactly is difficult to know. It’s not all tax breaks ...

>> **whiplash451**: 1. so what 2. asml

>>> **rvz**: 1. It matters. 2. Did ASML invest in Mistral in their first round of venture funding or was it US VCs all along that took that early risk and backed them from the very start? Risk aversion is in th...

>>> **apexalpha**: 1. Big problem 2. ASML was propped up by ASM and Philips, stepping in as "VCs"

**timpera**: Extremely cool! I just wish they would also include comparisons to SOTA models from OpenAI, Google, and Anthropic in the press release, so it's easier to know how it fares in the grand scheme of th...

> **Youden**: They mentioned LMArena, you can get the results for that here: https://lmarena.ai/leaderboard/text Mistral Large 3 is ranked 28, behind all the other major SOTA models. The delta between Mistral an...

>> **jampekka**: 1491 vs 1418 ELO means the stronger model wins about 60% of the time.

>>> **supermatt**: Probably naive questions: Does that also mean that Gemini-3 (the top ranked model) loses to mistral 3 40% of the time? Does that make Gemini 1.5x better, or mistral 2/3rd as good as Gemini, or can ...

> **qznc**: I guess that could be considered comparative advertising then and companies generally try to avoid that scrutiny.

> **constantcrying**: The lack of the comparison (which absolutely was done), tells you exactly what you need to know.

>> **bildung**: I think people from the US often aren't aware how many companies from the EU simply won't risk losing their data to the providers you have in mind, OpenAI, Anthropic and Google. They simply are no ...

>>> **adam_patarino**: We're seeing the same thing for many companies, even in the US. Exposing your entire codebase to an unreliable third party is not exactly SOC / ISO compliant. This is one of the core things that mo...

>>> **leobg**: Does your company use Microsoft Teams?

>>> **BoorishBears**: Mistral is founded by multiple Meta engineers, no? Funded mostly by US VCs? Hosted primarily on Azure? Do you really have to go out of your way to start calling their competition "data leeches" for...

>> **popinman322**: They're comparing against open weights models that are roughly a month away from the frontier. Likely there's an implicit open-weights political stance here. There are also plenty of reasons not to...

>>> **kalkin**: Scale AI wrote a paper a year ago comparing various models performance on benchmarks to performance on similar but held-out questions. Generally the closed source models performed better, and Mistr...

>>> **extr**: ??? Closed US frontier models are vastly more effective than anything OSS right now, the reason they didn’t compare is because they’re a different weight class (and therefore product) and it’s a bi...

>> **crimsoneer**: If someone is using these models, they probably can't or won't use the existing SOTA models, so not sure how useful those comparisons actually are. "Here is a benchmark that makes us look bad from ...

>>> **constantcrying**: Completely agree, that there are legitimate reasons to prefer comparison to e.g. deepeek models. But that doesn't change my point, we both agree that the comparisons would be extremely unfavorable.

>> **tarruda**: Here's what I understood from the blog post: - Mistral Large 3 is comparable with the previous Deepseek release. - Ministral 3 LLMs are comparable with older open LLMs of similar sizes.

>>> **constantcrying**: And implicit in this is that it compares very poorly to SOTA models. Do you disagree with that? Do you think these Models are beating SOTA and they did not include the benchmarks, because they forgot?

> **rvz**: > I just wish they would also include comparisons to SOTA models from OpenAI, Google, and Anthropic in the press release, Why would they? They know they can't compete against the heavily closed-sou...

**yvoschaap**: Upvoting for Europe's best efforts.

> **sebzim4500**: That's unfair to Europe. A bunch of AI work is done in London (Deepmind is based here for a start)

>> **p2detar**: That's ok. How could they know that there are companies like Aleph Alpha, Helsing or the famous DeepL. European companies are not that vocal, but that doesn't mean they aren't making progress in th...

>> **Glemkloksdjf**: Thats not the point. Deepmind is not an UK company, its google aka US. Mistral is a real EU based company.

>>> **gishh**: Using US VC dollars. Where their desks are isn’t really important.

>> **GaggiX**: London is not part of Europe anymore since Brexit /s

>>> **ot**: Is it so hard for people to understand that Europe is a continent, EU is a federation of European countries, and the two are not the same?

>>> **tmoravec**: Drifted to the Caribbean.

>> **colesantiago**: Deepmind doesn't exist anymore. Google DeepMind does exist.

> **LunaSea**: Upvoting Windows 11 as the US's best effort at Operating Systems development.

>> **DarmokJalad1701**: Wouldn't that be macOS? Or BSD? Or Unix? CentOS?

>>> **LunaSea**: What's the market share of those compared to Windows and Linux?

**mrinterweb**: I don't like being this guy, but I think Deepseek 3.2 stole all the thunder yesterday. Notice that these comparisons are to Deepseek 3.1. Deepseek 3.2 is a big step up over 3.1, if benchmarks are t...

> **hiddencost**: Idk. They look like they're ahead on the saturated benchmarks and behind on the unsaturated ones. Looks more like that over fit to the benchmarks.

**simgt**: I still don't understand what the incentive is for releasing genuinely good model weights. What makes sense however is OpenAI releasing a somewhat generic model like gpt-oss that games the benchmar...

> **mirekrusin**: Because there is no money in making them closed. Open weight means secondary sales channels like their fine tuning service for enterprises [0]. They can't compete with large proprietary providers b...

> **talliman**: Until there is a sustainable, profitable and moat-building business model for generative AI, the competition is not to have the best proprietary model, but rather to raise the most VC money to be w...

>> **mirekrusin**: Explained well in this documentary [0]. [0] https://www.youtube.com/watch?v=BzAdXyPYKQo

>>> **simgt**: I was fully expecting that but it doesn't get old ;)

>> **memming**: It’s funny how future money drive the world. Fortunately it’s fueling progress this time around.

> **NitpickLawyer**: > gpt-oss that games the benchmarks just for PR. gpt-oss is killing the ongoing AIME3 competition on kaggle. They're using a hidden, new set of problems, IMO level, handcrafted to be "AI hardened"....

>> **lostmsu**: Are they ahead of all other recent open models? Is there a leaderboard?

>>> **NitpickLawyer**: There is a leaderboard [1] but we'll have to wait till april for the competition to end to know what models they're using. The current number 3 on there (34/50) has mentioned in discussions that th...

> **prodigycorp**: gpt-oss are really solid models. by far the best at tool calling, and performant.

> **nullbio**: Google games benchmarks more than anyone, hence Gemini's strong bench lead. In reality though, it's still garbage for general usage.

**tucnak**: If the claims on multilingual and pretraining performance are accurate, this is huge! This may be the best-in-class multilingual stuff since the more recent Gemma's, where they used to be unmatched...

> **NitpickLawyer**: > I wonder why scores on TriviaQA vis-a-vis 14b model lags behind Gemma 12b so much; that one is not a formatting-heavy benchmark. My guess is the vast scale of google data. They've been hoovering ...

**nullbio**: Anyone else find that despite Gemini performing best on benches, it's actually still far worse than ChatGPT and Claude? It seems to hallucinate nonsense far more frequently than any of the others. ...

> **apexalpha**: No, I've been using Gemini for help while learning / building my onprem k8s cluster and it has been almost spotless. Granted, this is a subject that is very well present in the training data but st...

>> **Synthetic7346**: I found gemini 3 to be pretty lackluster for setting up an onprem k8s cluster - sonnet 4.5 was more accurate from the get go, required less handholding

> **mvkel**: Open weight LLMs aren't supposed to "beat" closed models, and they never will. That isn’t their purpose. Their value is as a structural check on the power of proprietary systems; they guarantee a c...

>> **cmrdporcupine**: This may be the case, but DeepSeek 3.2 is "good enough" that it competes well with Sonnet 4 -- maybe 4.5 -- for about 80% of my use cases, at a fraction of the cost. I feel we're only a year or two...

>>> **troyvit**: I think you're right, and I feel the same about Mistral. It's "good enough", super cheap, privacy friendly, and doesn't burn coal by the shovel-full. No need to pay through the nose for the SOTA mo...

>> **barrell**: I can attest to Mistral beating OpenAI in my use cases pretty definitively :)

>>> **theshrike79**: In my use cases mistral has been next to useless. Granted my uses have been programming related. Mistral prints the answer almost immediately and is also completely and utterly hallucinating everyt...

>> **re-thc**: > Open weight LLMs aren't supposed to "beat" closed models, and they never will. That isn’t their purpose. Do things ever work that way? What if Google did Open source Gemini. Would you say the sam...

>>> **lowkey_**: Not the above poster, but: OpenAI went closed (despite open literally being in the name) once they had the advantage. Meta also is going closed now that they've caught up. Open-source makes sense t...

>> **pants2**: > Their value is as a structural check on the power of proprietary systems Unfortunately that doesn't pay the electricity bill

>>> **array_key_first**: It kind of does, because the proprietary systems are unacceptable for many usecases because they are proprietary. There's a lot of businesses who do not want to hand over their sensitive data to ha...

> **dchest**: Nope, Gemini 3 is hallucinating less than GPT-5.1 for my questions.

> **mrtksn**: Yep, Gemini is my least favorite and I’m convinced that the hype around it isn’t organic because I don’t see the claimed “superiority”, quite the opposite.

>> **cmrdporcupine**: I think a lot of the hype around Gemini comes down to people who aren't using it for coding but for other things maybe. Frankly, I don't actually care about or want "general intelligence" -- I want...

>>> **erichocean**: I exclusively use Gemini Pro for coding, and it's been writing ~100% of the code I produce since July. It's great.

> **tootie**: No? My recent experience with Gemini was terrific. The last big test I gave of Claude it spun an immaculate web of lies before I forced it to confess.

> **llm_nerd**: What does your comment have to do with the submission? What a weird non-sequitur. I even went looking at the linked article to see if it somehow compares with Gemini. It doesn't, and only relates t...

> **cmrdporcupine**: I also had bad luck when I finally tried Gemini 3 in the gemini CLI coding tool. I am unclear if it's the model or their bad tooling/prompting. It had, as you said, hallucination problems, and it a...

> **bluecalm**: My experience is the opposite although I don't use it to write code but to explore/learn about algorithms and various programming ideas. It's amazing. I am close to cancelling my ChatGPT subscripti...

> **minimaxir**: For noncoding tasks, Gemini atleast allows for easier grounding with Google Search.

> **alfalfasprout**: If anything it's a testament to human intelligence that benchmarks haven't really been a good measure of a model's competence for some time now. They provide a relative sorting to some degree, with...

> **gunalx**: Have used gemini3 to GEW shot a few problems GPT5 struggled on.

> **moffkalast**: Yes, and likewise with Kimi K2. Despite being on the top of open source benches it makes up more batshit nonsense than even Llama 3. Trust no one, test your use case yourself is pretty much the onl...

> **VeejayRampay**: no, I find Gemini to be the best

**arnaudsm**: Geometric mean of MMMLU + GPQA-Diamond + SimpleQA + LiveCodeBench : - Gemini 3.0 Pro : 84.8 - DeepSeek 3.2 : 83.6 - GPT-5.1 : 69.2 - Claude Opus 4.5 : 67.4 - Kimi-K2 (1.2T) : 42.0 - Mistral Large 3...

> **jasonjmcghee**: How is there such a gap between Gemini 3 vs GPT 5.1/Opus 4.5? What is Gemini 3 crushing the others on?

>> **arnaudsm**: Could be optimized for benchmarks, but Gemini 3 has been stellar for my tasks so far. Maybe an architectural leap?

>>> **netdur**: I believe it is the system instructions that make the difference for Gemini, as I use Gemini on AI Studio with my system prompts to get it to do what I need it to do, which is not possible with gem...

>> **gishh**: Gamed tests?

>>> **rdtsc**: I always joke that Google pays for a dedicated developer to spend their full time just to make pelicans on bicycles look good. They certainly have the cash to do it.

**tootyskooty**: Since no one has mentioned it yet: note that the benchmarks for large are for the base model, not for the instruct model available in the API. Most likely reason is that the instruct model underper...

**esafak**: Well done to the France's Mistral team for closing the gap. If the benchmarks are to be believed, this is a viable model, especially at the edge.

> **nullbio**: Benchmarks are never to be believed, and that has been the case since day 1.

**hnuser123456**: Looks like their own HF link is broken or the collection hasn't been made public yet. The 14B instruct model is here: https://huggingface.co/mistralai/Ministral-3-14B-Instruct-25... The unsloth qua...

> **janpio**: Seems fixed now: https://huggingface.co/collections/mistralai/mistral-large-3 https://huggingface.co/collections/mistralai/ministral-3

**andhuman**: This is big. The first really big open weights model that understands images.

> **yoavm**: How is this different from Llama 3.2 "vision capabilities"? https://www.llama.com/docs/how-to-guides/vision-capabilities...

>> **Havoc**: Guessing GP commenter considers Apache more "open" than Meta's license. Which to be fair isn't terrible but also not quite as clean as straight apache

>>> **mesebrec**: Llama's license explicitly disallows its usage in the EU. If that doesn't even meet the threshold for "terrible", then what does?

**trvz**: Sad to see they've apparently fully given up on releasing their models via torrent magnet URLs shared on Twitter; those will stay around long after Hugging Face is dead.

> **ThrowawayTestr**: How does HF manage to serve such big files?

>> **nikcub**: s3 + cloudfront https://huggingface.co/blog/rearchitecting-uploads-and-downl...

>>> **ThrowawayTestr**: I meant more how do they pay for all that bandwidth. I can download a 20gb model in like 2 minutes

**accrual**: Congrats on the release, Mistral team! I haven't used Mistral much until today but am impressed. I normally use Gemma 3 27B locally, but after regenerating some responses with Mistral 3 14B, the ou...

**Tiberium**: A bit interesting that they used Deepseek 3's architecture for their Large model :)

**RandyOrion**: Thank you Mistral for releasing new small parameter-efficient (aka dense) models.

**lalassu**: It's sad that they only compare to open weight models. I feel most users don't care much about OSS/not OSS. The value proposition is the quality of the generation for some use case. I guess it says...

> **para_parolu**: It’s not for users but for businesses. There is demand for inhouse use with data privacy. Regular users can’t even run large model due to lack of compute.

> **troyvit**: Glad I'm not most users. I'm down for 80% of the quality for an open weight model. Hell I've been using Linux for 25 years so I suppose I'm used to not-the-greatest-but-free.

> **hopelite**: It seems to be a reasonable comparison since that is the primary/differentiating characteristic of the model. It’s really common to also and seemingly only ever see the comparison of closed weight/...

**mortsnort**: I use a small model as a chatbot of sorts in a game I'm making. I was hoping the 3b could replace qwen 4b, but it's far worse at following instructions and providing entertaining content. I suppose...

**dmezzetti**: Looking forward to trying them out. Great to see they are Apache 2.0...always good to have easy-to-understand licensing.

**jasonjmcghee**: I wish they showed how they compared to models larger/better and what the gap is, rather than only models they're better than. Like how does 14B compare to Qwen30B-A3B? (Which I think is a lot of p...

**GaggiX**: The small dense model seems particularly good for their small sizes, I can't wait to test them out.

**codybontecou**: Do all of these models, regardless of parameters, support tool use and structured output?

> **Y_Y**: In principle any model can do these. Tool use is just detecting something like "I should run a db query for pattern X" and structured output is even easier, just reject output tokens that don't mat...

> **Ey7NFZ3P0nzAe**: Yes they all support tool use at least.

**domoritz**: Urg, the bar charts to not start at 0. It's making it impossible to compare across model sizes. That's a pretty basic chart design principle. I hope they can fix it. At least give me consistent y s...

**Frannky**: I haven't tried a Mistral model in ages. Llama and Mistral feel like something I was using in another era. Are they good?

**RYJOX**: I find that there are too many paid sub models at the minute with non legitimate progress to warrant the money spent. Recently cancelled GPT.

**tmaly**: I see several 3.x versions on Openrouter.ai, any idea which of those are the new models?

> **PhilippGille**: https://openrouter.ai/mistralai/mistral-large-2512

**Aissen**: Anyone succeed in running it with vLLM?

> **Patrick_Devine**: The instruct models are available on Ollama (e.g. `ollama run ministral-3:8b`), however the reasoning models still are a wip. I was trying to get them to work last night and it works for single tur...

> **dloss**: Yes, the 3B variant, with vLLM 0.11.2. Parameters are given on the HF page. Had to override the temperature to 0.15 though (as suggested on HF) to avoid random looking syllables.

> **Aissen**: It now seems to work with the latest vLLM git.

**pixel_popping**: fyi Mistral admins, there is no dates showing on your article.

**s_dev**: I was subscribing to these guys purely to support the EU tech scene. So I was on Pro for about 2 years while using ChatGPT and Claude. Went to actually use it, got a message saying that I missed a ...

> **cycomanic**: I'm not sure I understand you correctly, but it seems you had a subscription missed one payment some time ago, but now expect that your subscription works because the missed month was in the past a...

>> **s_dev**: >This sounds like the you expect your subscription to work as an on-demand service? That's exactly what it is. >I'm not sure I understand you correctly, I understand perfectly well, I don't agree w...

> **shlomo_z**: This seems like a legitimate complaint... I wonder why it's downvoted

>> **s_dev**: My critique is more levelled at Mistral and not specifically what they've just released so it could be that some see what I have to say as off topic. Also a lot of Europeans are upset at US tech do...

**ThrowawayTestr**: Awesome! Can't wait till someone abliterates them.

**RomanPushkin**: Mistral presented DeepSeek 3.2

**another_twist**: I am not sure why Meta paid 13B+ to hire some kid vs just hiring back or acquiring these folks. They'll easily catch up.

> **Rastonbury**: Age aside, not sure what Zuck was thinking, seeing as Scale AI was in data labelling and not training models, perhaps he thought he was a good operator? Then again the talent scarcity is in scienti...

> **vintagedave**: What is this referring to? I googled and the company was founded in 2016. No one involved can to a “kid”?

>> **another_twist**: True no one involved in Scale AI right now is a kid. But, their expertise is in data labelling not cutting edge AI. Compare that to the Mistral team. They launched a new LLM within 6months of found...
