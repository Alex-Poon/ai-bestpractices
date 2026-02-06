---
title: "How Vibe Coding Is Killing Open Source"
source_url: "https://hackaday.com/2026/02/02/how-vibe-coding-is-killing-open-source/"
hn_url: "https://news.ycombinator.com/item?id=46876455"
date: 2026-02-02
hn_points: 81
hn_comment_count: 62
tags: [vibe-coding, open-source, community, ai-impact, developer-experience]
tier: 1
weight: 10
---

## Summary

This Hackaday article reports on research examining how vibe coding — using LLM chatbots to generate code — creates systemic problems for open source projects. The core argument is that AI-mediated coding disrupts the traditional feedback loops between developers and open source communities in several damaging ways.

First, developer engagement shifts away from open source communities entirely. Instead of visiting project websites, consulting documentation, or participating in forums, users interact exclusively with chatbots, eliminating opportunities for sponsorships, bug reports, and community building. Second, LLMs introduce library selection bias by favoring dependencies most prevalent in their training data rather than promoting merit-based adoption, concentrating usage around already-popular projects while marginalizing smaller initiatives. Third, a quality control crisis emerges because LLMs will not interact with library developers, submit usable bug reports, or be aware of potential issues.

The article cites research showing vibe coding reduces experienced developer productivity by 19% and increases bugs by 41%, challenging the narrative that AI universally improves development speed. It draws parallels to Stack Overflow's declining usage as a concrete example of community knowledge-sharing being displaced by isolated AI interactions.

As potential solutions, the researchers suggest AI companies could compensate open source projects when their code is used in training or generation, though the article compares this unfavorably to Spotify's revenue model where the vast majority of creators earn negligible income. The broader concern is that starving community platforms of fresh human-written content may degrade the quality of future LLM training data, creating a vicious cycle.

## Key Insights

- **Community feedback loops disrupted**: AI-mediated coding eliminates the developer-to-maintainer interactions that sustain open source projects
- **Training data bias creates selection bias**: LLMs favor libraries prevalent in training data rather than the best available options
- **Productivity claims challenged**: Research shows 19% productivity decrease and 41% more bugs for experienced developers using vibe coding
- **Quality control void**: LLMs cannot submit bug reports or participate in issue discussions, creating a feedback vacuum
- **Potential vicious cycle**: Less community content leads to worse training data leads to worse AI output
- **Compensation models are insufficient**: Following the Spotify model would leave most open source maintainers with negligible income

## Notable Quotes

> "The LLM will not interact with the developers of a library or tool" — Hackaday (paraphrased from cited research)

## HN Discussion Highlights

*59 comments total*

**dang**: Referenced a recent thread about the paper this article reports on, linking to an earlier discussion with 285 comments.

**observationist**: Argued the barrier to entry decreased, meaning more things will get created and more people will participate. Communities will need to create hierarchies of curation and the web of trust will need to adapt...

> **LaurensBER**: Concurred that open-source will become more reputation-based. Noted Opus 4.5 and Kimi 2.5 give quants excellent architecture guidance, producing results miles better than without LLMs.

>> **blibble**: Countered with anecdote: quants' LLM-assisted work is roughly the same quality (bad), but now there's much more of it. "Not an improvement."

> **pjjpo**: Noted it is much harder to market new projects now — ShowHN is flooded, subreddits have high spam filters, so quality projects struggle to get eyes without significant social activity...

> **reaperducer**: Quipped "57 Channels and Nothin' On" in response to the claim that lower barriers mean more creation.

> **tayo42**: Argued lowering the barrier to entry generally ruins things — the internet is worse off, sports cultures degraded. Asked what has actually gotten better.

>> **PKop**: Agreed this is one of the most underrated facts of modern society. Quality is in tension with quantity — no club, park, or forum is improved by adding more people beyond some threshold...

> **robocat**: Countered that AI won't teach collaboration and that open source is more about learning norms of working together than the underlying software.

> **ozim**: Argued the barrier actually went up — why use a library when you can ask an LLM to make one? The "left-pad" kind of dependency won't happen because LLMs can generate it...

>> **sublinear**: Countered that the main benefit of a library has always been standardization, not reducing effort. Writing code was never the hard part. People depending on LLMs are making the same naive mistake...

> **tobyjsullivan**: Noted the quality problem affects the entire industry, not just FOSS. Compared the current situation to when projects didn't need pull requests — new tools will be discovered and applied...

>> **charcircuit**: Pointed out that pull requests are a concept created by GitHub, not an inherent part of development.

>>> **tobyjsullivan**: Apologized, noting FOSS projects didn't always have Fagan inspections and linked to the Wikipedia article.

>>> **em-bee**: Noted the original pull request was an email to run "git pull your-repo your-branch" — the concept is at least as old as git itself; GitHub just created a web interface.

> **phatfish**: Suggested it could be a good thing — raising barriers against AI slop will also filter out demanding non-AI slop, giving real contributors breathing space.

**arjie**: Listed concrete harms: no upstream contribution pressure, no need to use libraries, verbose resume-padding PRs, and false issues from unsophisticated LLM users. Noted the baseline for a worthwhile OSS project has increased...

> **umvi**: As someone working on medical device software, saw fewer dependencies as a huge plus — smaller cybersecurity and regulatory burden. Suggested 90%+ of npm packages could probably go...

>> **no_wizard**: Defended npm, arguing it gets held to an unreasonable standard as the registry for the most popular language in the world. Noted most PyPI packages are also low quality but nobody brings that up...

>>> **rpodraza**: Countered that a typical frontend project introduces hundreds or thousands of small packages with daily security holes, often maintained by single people, subject to supply chain attacks...

>>> **int_19h**: Said it's a matter of community culture — in Node.js, tiny packages actually get widely used. Python has been npm-ified but people are still more suspicious of small packages.

>> **macleginn**: Noted that since code-generating AIs were likely trained on these libraries, they won't go too far.

>> **dayjaby**: Expressed confusion at how rewriting entire libraries would have fewer security holes than battle-hardened libraries used by thousands.

>>> **umvi**: Explained that generating your own code means fewer items on your SBOM, fewer CVEs to triage, and less SOUP testing — reducing the regulatory burden even if not making code more secure...

> **OGEnthusiast**: Noted it's now a lot easier to fork an open source project and tweak the last 10% to work exactly as you want.

>> **gingerlime**: Agreed that while vibe-coded contributions lower signal-to-noise ratio, forking is now much more viable. AI is democratizing open-source in many senses.

> **cosmic_cheese**: Suggested LLM impact is exacerbated by friction in the contribution process. Many projects require bureaucracy and persistence to get changes merged, so people elect to vibe-customize private forks...

> **chrneu**: Compared AI coding to Ninite for Windows — you tell it what you want and it generates it. Thinks AI coding will hit a ceiling but become essential for getting things done quickly.

**Flavius**: Argued open source is an ideology about free sharing of knowledge, not a specific way of typing syntax — you cannot kill an idea regardless of how the code is produced.

> **AlexandrB**: Countered that the LLMs used to create code are highly centralized. Suspected content industries will eventually try restricting what LLMs can produce to prevent DRM bypassing...

>> **georgemcbay**: Disagreed — open models already exist and that genie can't go back in the bottle. Also noted big tech companies behind LLMs are now more politically powerful than traditional content industries...

>>> **AlexandrB**: Hoped they were right but noted the content industry is politically savvy and persistent.

>> **charcircuit**: Pointed out there are competent open source LLMs today that are not highly centralized.

>>> **pocksuppet**: Noted Qwen3-Coder-Next was at the top of HN right now as an example.

**Lerc**: Disliked the "X is killing Y" narrative. Suggested adapting is rational. Proposed AI branches/forks where AI-produced PRs go to a separate branch with curators sending upstream. Also noted resume-padding via AI will lose value...

> **milowata**: Agreed open source isn't dying soon but predicted SDKs and utility-focused libraries will mostly go away. Linked their own essay on the topic.

>> **Lerc**: Agreed somewhat about libraries, noting they may change form rather than disappear. Introduced the idea of "skills as libraries" where code templates are embedded in AI skills...

>>> **milowata**: Found it interesting — libraries don't necessarily go away, they just change shape into skills.

**jph**: As an open source maintainer, reported an uptick in both AI-forgery attacks (with forged photos and fake social pages) and legitimate contributions from people with zero followers. Sees this as good news for focusing on actual code...

**dom96**: Asked how many others are reluctant to open source code because they don't want it in LLM training data.

> **dmarcos**: Said it feels less fun — harder to get attribution, build reputation, build community.

> **honestduane**: Stopped contributing to open source. Was fine with code as a gift for humanity, but not as a gift to for-profit companies that won't follow the spirit of the license...

> **pelasaco**: Noted startups are avoiding the open source route — you publish code, then two weeks later there are dozens of rewrites from people who never wrote a single line of OSS.

> **lenkite**: Questioned the point of open sourcing code unless for government or public standards. No attribution, no bugfixes, your work used to make billionaires richer...

> **paodealho**: Said their contributions are now exactly zero, though they were never a big project maintainer.

> **kennethrc**: Said they couldn't care less and don't use any LLM for coding.

**RcouF1uZ4gsC**: Argued open source was the largest transfer of wealth from craftspeople to business people. LLMs are the expected endpoint of developers voluntarily moving down the value chain...

> **makerdiety**: Appreciated the displacement of human labor framing.

> **cudgy**: Compared it to the emergence of "script kiddies" in the early 2000s — promoting the combination of libraries not understood by amateurish developers. Web development was most affected initially and now most impacted by LLMs...

**charcircuit**: Called out the article's claim about training data bias, noting Claude literally searches for current libraries rather than relying solely on training data.

> **embedding-shape**: Agreed the CLI agents don't suffer from that issue — how good the model is at using tools matters more than what APIs they remember from training data.

**Stevvo**: Said the article has nothing new to add — just links to previous anti-AI articles the author has written on stories we've all read before.

**jauntywundrkind**: Argued vibe coding may de-emphasize software as an end product but the general-purpose substrait/platform is hugely open source and will continue. Getting traction has been hard for a while regardless of LLMs...

**waynesonfire**: Didn't understand the article — found it a stretch from "ChatGPT made search and SO irrelevant" to "vibe coding is killing open source." Argued LLMs make open source tech accessible to more people...

**pelasaco**: Predicted GitHub/GitLab will stop offering free services if the flood of low-quality vibe-coded projects continues. Developers will increasingly close-source and black-box their work...

**ivan_gammel**: Doubted it's killing open source. The "too big to fail" software will be maintained regardless. Small libraries will be eliminated as viable solutions, but that's good — they are supply chain risk...

**AtlasBarfed**: Noted LLMs should be massively helping one-person open source projects and enabling easy porting between architectures and languages, but isn't really seeing that yet.

**dmarcos**: Said AI mediation between developers and open source reduces incentives for maintainers looking to build community, visibility, and reputation.

**nberkman**: Argued there's a flip side — experienced developers with years of bottled-up ideas now have bandwidth. Built Clippy from scratch, hit 200 stars and Homebrew core in seven months. Neither would exist without AI-assisted development...
