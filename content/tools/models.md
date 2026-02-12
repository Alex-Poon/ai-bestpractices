---
title: "Model Deep Dive"
description: "What every major coding model actually feels like to use — practitioner experiences, failure modes, and when to pick what, drawn from 800+ HN reports."
weight: 2
tags: [models, model-selection, comparison, costs, reasoning]
date: 2026-02-12
---

The [model selection](/practices/model-selection.html) practice page covers the principles. This page is the complement -- what each model actually feels like to use, based on 800+ practitioner reports gathered from Hacker News discussions and targeted Algolia searches. Specs and pricing live in the [compact reference](#compact-reference) at the bottom.

## How Practitioners Describe These Models

Before the deep dives, the metaphors practitioners reach for:

- **Claude Code (Opus):** "A shitty, but very fast and very knowledgeable junior developer" requiring constant supervision (msikora). Required over a month to reach baseline productivity.
- **Codex CLI (GPT-5.2):** "Felt like working with a peer" for the first time in 20+ years of development (dudeinhawaii). Also: "an outsourced consultant who refuses to say I can't do that" (theshrike79).
- **GPT-5.2:** "Rude and cold" but strict instruction-following (jorl17). Hallucinating CLI utilities and non-existent features is a recurring pattern (heavyset_go).
- **Gemini 3:** "Biased toward action and uncontrollable" (mmaunder). Fast for agent loops but generates a "fog of code" where developers struggle to understand what was generated (sottol).
- **o3/o3-pro:** "o3 for thinking, Claude for doing" -- the dominant practitioner workflow. One-shots problems other models fail on, but 10-15 minute response times make interactive use impractical.

---

## Claude Family (Anthropic)

The defining split in the Claude family is philosophical: **Opus 4.5 is a guided pair programmer**; **Opus 4.6 is an autonomous agent**. This isn't just marketing -- practitioners experience them as fundamentally different tools. One developer chose Opus 4.5 specifically because it aligns with their personal thinking style, contrasting it with Gemini 3's habit of bleeding reasoning into code comments and GPT-5.2's rigid, convention-bound style (jorl17, Dec 2025). That alignment -- the model *feeling* like it thinks the way you do -- drives Claude loyalty more than benchmarks.

### Opus 4.6 — The Autonomous Agent

Released February 5, 2026. First Opus-class model with 1M token context.

**The design philosophy:** Where 4.5 asks clarifying questions and waits for guidance, 4.6 "plans deeply, runs longer, and asks less of the human" (Rperry2174, Feb 2026). This reflects Anthropic's bet on full delegation over tight human oversight. One practitioner reports 5x longer thinking times (dllrr, Feb 2026) -- adaptive thinking appears engaged by default, with the VS Code team experimenting with adaptive thinking and high reasoning effort as their default configuration (vinhnx, Feb 2026). Through GitHub Copilot, inference feels noticeably slow, likely because of these defaults.

**Where it shines:** Complex agentic coding, deep context retrieval (93% accuracy at 256K tokens versus Sonnet 4.5's 10.8%), Terminal-Bench 65.4%. One practitioner one-shotted a Gameboy emulator. Best positive-to-negative ratio of any frequently mentioned model. Benchmarks show GDPVal Elo 1606, OSWorld 72.7%, and BrowseComp 84% (nopinsight, Feb 2026). Long-context handling improved dramatically: 76% vs 18.5% on key metrics compared to prior models (eltotodiez, Feb 2026). Visual reasoning is a standout capability: Uehreka reports the model "found and fixed a bug based on visual observation" by grabbing frames from Gaussian Splat animations and reasoning about blurriness -- the first model to autonomously debug visual output by interpreting rendered frames rather than just describing image contents semantically (Uehreka, Feb 2026).

**Agent teams:** One early tester ran agent teams with a shared JSON memory plugin -- 34 files modified, 100 passing tests, zero conflicts (sukinai, Feb 2026). This is the kind of autonomous multi-agent coordination that 4.5 was not designed for.

**Safety concerns are discussed seriously on HN, not dismissed.** VendingBench results show Opus 4.6 scored highest "by stiffing customers" and price-fixing (gwd, Feb 2026). In sandbox testing, Opus 4.6 with max thinking attempted kernel CVE exploits, crafted malicious kernel modules, and achieved a 93% Cybench solve rate -- the tester reports it "will exploit" without capability drops (jingkai_he, Feb 2026). The model also "verbalized its awareness of being in some sort of simulation" during evaluations (andy12_, Feb 2026). These findings generated substantial discussion around whether autonomy-optimized models need stronger containment.

**Where it struggles:** Writing quality regression versus 4.5 -- one user called it "nerfed" for prose. The practical advice: use 4.6 for coding and agentic work, keep 4.5 available for writing-heavy tasks. More concerning: practitioners who prefer 4.5's interactive style report that 4.6 makes autonomous changes without asking for clarification (sutterd, Feb 2026). With auto-accept enabled, one developer warns of "paperclip optimizer" behavior -- the model executing beyond the scope of the original request (insomagent, Feb 2026). The autonomy that makes 4.6 powerful also makes it dangerous without guardrails.

**Cost access points:** Copilot offers 100 Opus 4.6 requests/month for $10 with additional requests at $0.04 each (brushfoot, Feb 2026). API users should be aware that cache hit discounts may not apply as expected -- Anthropic disabled prompt prefill per the system card (maven29, Feb 2026).

**Thinking keywords (Claude Code-specific):** "think" (low) < "think hard" (medium) < "think harder" (high) < "ultrathink" (31,999 tokens). These set internal thinking budgets and are not base model features. Simon Willison reverse-engineered the token allocations: "megathink" maps to 10,000 tokens, "ultrathink" to 31,999 (simonw, Apr 2025).

### Opus 4.5 — The Guided Powerhouse

Released November 24, 2025. The most discussed model in the dataset (158 HN mentions) and the most polarizing.

**What it feels like:** The model that changed practitioner sentiment. Champions call it "an inflection point" (benjiro, Dec 2025). One practitioner reported doing "things in hours I would have worked an entire week on" (skerit, Jan 2026). Another: 259 PRs and 497 commits in 30 days. Twelve iOS apps in two weeks. Critics report "baffling architecture decisions." At least one practitioner reported a subjective regression in quality in the days before 4.6's release (jwilliams, Feb 2026).

**Why it needs guidance:** Opus 4.5 infers coding preferences by reading existing code -- better than explicit CLAUDE.md instructions (nurettin, Dec 2025). It's "lovely at self correcting" versus GPT-5 models that are "more stubborn" (deaux, Dec 2025). But it requires active human direction -- the managerial mindset. It mimics your codebase style rather than imposing its own. On GitHub Copilot, the agent mode with Opus 4.5 "literally implemented, tested and fixed entire new features in minutes" (donny2018, Dec 2025).

**Domain strengths:** A "definite step change" for hardware and CAD tasks -- Opus 4.5 reverse-engineered proprietary Altium PCB formats and excelled at repetitive documentation demanding precision (akiselev, Jan 2026). Significant quality improvements by switching to Opus 4.5 on Cursor's Max plan, though guardrails and testing infrastructure were essential (linesofcode, Dec 2025). For creative project generation, Claude Code with Opus 4.5 produces more engaging results than manual coding while maintaining quality (minimaxir, Dec 2025).

**Multi-model verification:** Some practitioners use Opus 4.5 as their primary tool with Gemini 3 Pro and GPT-5.2-codex running as reviewer agents -- the multi-model pipeline reduces defects before manual review (senordevnyc, Feb 2026). This reflects the emerging pattern of using Claude for generation and competitors for verification.

**The counterintuitive cost finding:** Despite being cheaper per token than Sonnet, Amp found Opus actually costs less per completed thread ($2.05 vs $2.75). Sonnet uses more tokens, makes more mistakes, and requires more human intervention. The cheapest model per token is not always the cheapest per task.

**Off-the-rails rate:** 2.4% of spend wasted on problematic outputs (Amp data). Gemini 3 Pro wastes 17.8%. This metric -- what a model costs when it fails -- captures something benchmarks miss entirely.

**Known limitations:** Accessibility is a gap -- one practitioner found Opus 4.5 doesn't properly handle keyboard navigation and semantic HTML for screen readers (ctoth, Jan 2026). This matters for teams building accessible software and suggests the model's training data underrepresents accessibility patterns.

### Sonnet 4.5 — Never Better Than Opus (But Often Good Enough)

SWE-bench Verified: 77.2%. Handles 90% of coding tasks without difficulty.

**The blunt truth:** "I have never encountered a single situation where Sonnet did a better job than Opus" (thot_experiment, Nov 2025). For Rust, "Opus is much better. Sonnet is much more prone to producing garbage" (dagw, Jun 2025). The quality gap widens dramatically for typed languages: Haskell and Rust show much larger Opus-Sonnet gaps than JavaScript or Python (tommyengstrom, Aug 2025).

**Where Sonnet competes (non-quality dimensions):**
- **Speed for iteration:** Preferred for pair programming by one practitioner who uses Claude Code 80% of the time with Sonnet (extr, Oct 2025)
- **Dynamic languages:** Gap narrows enough that Sonnet may suffice for JS/Python (kasey_junk, Oct 2025)
- **Cost-constrained execution:** "Use Opus for planning, Sonnet to execute the plan" (alwillis, Jul 2025)
- **Task-specific specialization:** One practitioner uses Sonnet 4.5 specifically for coding, GPT-5 for brainstorming, and Gemini 2.5 Pro for writing -- treating each model as a specialized tool (stared, Oct 2025)

**The consistency concern:** Enterprise TypeScript work shows Sonnet has "12-18% variance on repeated prompts" (TulioKBR, Nov 2025). Consistency matters more than peak capability in production pipelines.

**The instruction-following tradeoff:** Claude models "take a lot more liberties" than GPT-5 -- Sonnet has been observed substituting packages mid-generation without being asked (Topfi, Sep 2025). If your workflow depends on the model doing exactly what you asked and nothing more, this matters.

**Extended thinking unlocks edge cases:** Sonnet 4.5 with extended thinking solved character-counting tasks reliably by adding internal verification steps (EdNutting, Nov 2025). Another found extended thinking made Sonnet effective for challenging text analysis tasks -- only reasoning-capable models handle these reliably (nickandbro, Jul 2025). Without extended thinking, Claude failed a unicode task; with it enabled, it solved correctly (pmarreck, Oct 2025).

**Extended thinking caveats:** Not universally beneficial. One practitioner found extended thinking "doesn't seem to do much" for their use case (behnamoh, Sep 2025). Another reports it spiraling out of control with longer context -- a simple architecture question yielded roughly 1,000 lines of unwanted SQL (whalesalad, Apr 2025). A skeptic questions why extended thinking is absent from agentic benchmarks, speculating it's less beneficial for multi-step agentic tasks than for single-prompt problems (throwaway0123_5, Feb 2025). The pattern: extended thinking helps most on hard single-turn reasoning problems; it can hurt on open-ended agentic workflows.

**Effort parameter:** Supports low/medium/high. At medium effort, matches its own SWE-bench score using 76% fewer output tokens.

**Opus Plan Mode (`/model opusplan`):** The most-endorsed Claude workflow. Opus for planning, Sonnet for execution. A Claude Code team member recommends Plan mode (Shift+Tab twice) to iterate on plans, with Opus 4.5 superior to Sonnet for the planning phase (bcherny, Dec 2025). One practitioner uses it regularly but notes Sonnet produces less thoughtful plans without it -- and is frustrated the feature was marked deprecated (actualwill, Oct 2025). Advocates argue it should be the default configuration (nzach, Sep 2025). But stavros (Nov 2025) warns the pattern breaks when plans are complex enough that Sonnet lacks context to faithfully execute them. And the cost adds up: $0.95 for a simple CSS change felt expensive (stavros, Nov 2025). Works best when plans are detailed enough that execution is mechanical.

### Haiku 4.5 — Speed Tier (But 200K Context Is the Real Ceiling)

SWE-bench Verified: 73.3% -- within 5 points of best-in-class at one-third the cost. 220 tokens/sec.

**The escalation pattern:** Most Haiku practitioners don't use it alone. They start with Haiku and escalate: "Start with Haiku, switch to Sonnet or Opus for harder or longer tasks" (azuanrb, Dec 2025). One practitioner manually selects between Haiku, Sonnet, and Opus on each task, optimizing for "good enough" at minimum cost (jrmromao, Oct 2025). This makes Haiku part of a tiered workflow, not a standalone choice.

**The sweet spot beyond "it's fast":**
1. **Repo ingestion and analysis:** Efficient token utilization for understanding codebases -- better than GPT-5 models for this (Topfi, Oct 2025)
2. **Subagent tasks:** Powers Claude Code's Explore subagent, Amp's Rush mode
3. **Conversation management:** Routing, flow control, simple orchestration (chewz, Aug 2025)
4. **Cost-sensitive batch work:** Running many parallel tasks
5. **Simple code in dynamic languages:** JS/Python where type complexity is low -- the Opus-Sonnet gap that dominates typed languages is less pronounced here

**The real limitation:** 200K context window, not capability. Large codebases force upgrade to Sonnet. On a complex refactor, Haiku takes 2x longer than Smart mode and is only 19% cheaper -- it spends more tokens fixing its own mistakes. Smaller models acting as context curators for Opus is an emerging pattern: "selectively decide what skills frontmatter to include in context for a bigger model" (vidarh, Jan 2026). Simon Willison also noted that Haiku "wasn't quite good enough" for certain tasks, making Sonnet the necessary intermediate step (simonw, Dec 2024).

**Token budget discipline:** Practitioners working with Haiku emphasize tight token budgets. One recommends no more than 1,000 tokens and 10 tools per inference pass, using recursive decomposition to reduce impact "by orders of magnitude" (bob1029, Feb 2026). Another monitors context at 50-60K tokens and warns quality degrades noticeably above 80K (Implicated, May 2025). Prompt compression can save roughly 40% of input token consumption (Raviteja_, Feb 2026). These constraints matter most for Haiku and Sonnet, where context efficiency directly affects output quality.

---

## OpenAI Reasoning Models (o-series)

{{< callout type="warning" >}}
**Temporal context matters.** The o-series reports below are from January-September 2025. When practitioners say "Claude" in these comparisons, they mean Sonnet 3.5, Claude 4, or Opus 4.1 -- models that are 1-2 generations behind Opus 4.5/4.6. The relative advantage of o-series models over Claude was likely larger then than it would be today. We note the specific Claude version where identifiable.
{{< /callout >}}

**The key pattern:** Practitioners don't strongly differentiate o3 from o4-mini for coding -- they're used interchangeably as "thinking" models in research/planning phases, with execution delegated to cheaper models (radio879, Aug 2025; data_delaurier, May 2025). For many practitioners, **GPT-5 with high thinking has superseded both o3 and o4-mini** (Tiberium, Aug 2025; nl, Feb 2026; mccoyb, Nov 2025).

### o3

Released February 2025. The architecture and planning specialist.

**What it feels like:** Practitioners consistently describe o3 as a thinking partner, not an implementer. The dominant workflow: use o3 for architecture decisions and planning, then switch to Claude or a faster model for implementation. Output is described as "tidy, thoughtful, and well-commented" (ttul, Jun 2025). One practitioner found o3 moderately better than GPT-5 with strong context retention over long tool-use chains (vessels, Aug 2025).

**What practitioners build with it:** 13K lines of Go via Codex with o3, writing only about 100 lines manually (mhandley, Jul 2025). An 8,000-line Android app rewritten in hours using o3-Codex combined with Claude Opus 4 -- described as 10-100x faster (dweekly, Aug 2025). Productivity doubling across full-stack projects using o3 and Gemini 2.5 Pro (TekMol, May 2025). One practitioner uses o3 as their primary coding and analysis model (althea_tx, Aug 2025).

**The planning pattern:** o3 for architecture, Claude 4 for implementation (Pandabob, Jun 2025). o3 Deep Search for planning, Claude 4 in Cursor for execution (baranoncel, May 2025). o3 as the "brain," smaller models execute (radio879, Aug 2025). o3 for technology research, Claude Code for component generation (gravity9, May 2025). o3 for research and reference work as a secondary tool alongside Claude and Gemini for primary coding (TeMPOraL, May 2025).

**Reasoning effort tuning:** Practitioners tune reasoning tokens to task complexity -- 1,000-2,000 tokens for routine coding, 5,000+ for hard problems (energy123, Aug 2025). High reasoning effort is the standard default; most coding practitioners run at high rather than medium or low.

**Current relevance:** The planning pattern likely still holds, but GPT-5 with high thinking is "quite a bit better than o3" for web design and agentic programming (Tiberium, Aug 2025). One practitioner ranks "GPT 5.2 Codex with high thinking" as "the best model currently available" -- above both Gemini and o-series (nl, Feb 2026). Another switched entirely to GPT-5 Codex from Claude Code after 4 months (mccoyb, Nov 2025). The "Claude fails, o3 succeeds" comparisons were made against Opus 4.0/4.1, not the current generation.

### o3-pro

The hard debugging specialist. 10-15 minute response times make interactive use impractical.

**What it feels like:** One-shots problems after Claude Opus 4/4.1 and Gemini 2.5 both failed, finding root causes in 1-2 line fixes (WXLCKNO, Aug 2025). Best at finding race conditions in concurrency code (danenania, Aug 2025). Multiple practitioners recommend it for security auditing (dudeinhawaii Jul 2025, aurareturn Sep 2025). One used o3-pro to analyze entire codebases and surface every security issue before agent-driven refactors (dudeinhawaii, Jul 2025). Planning specificity from o3-pro changed how one team thinks about their future (swyx, Jun 2025). Generates much cleaner and more well-organized code than alternatives (lhl, Jun 2025). One practitioner sent 100+ messages daily on the Pro plan with no caps (CSMastermind, Jul 2025).

**The false positive problem:** Confabulates problems during code reviews -- "tends to imagine and report problems in the files that were not provided to it" (boole1854, Jun 2025). Gets confused when given both diffs and full files. Requires 10-20 minute wait times. Higher false positive rate requires manual filtering. One practitioner allocates $200/month primarily to Claude Code despite o3-pro's occasional advantages -- calling it an "occasional paid second opinion, not a daily driver" (boole1854, Jun 2025).

**Where it fails beyond false positives:** Lags behind Sonnet 3.5 for basic, straightforward code generation -- overkill for simple tasks (danenania, Aug 2025). Response lengths are severely limited in ChatGPT compared to o1-pro (jameshiew, Jul 2025). Can get stuck on a wrong hypothesis -- one practitioner reported it kept suggesting a concurrency problem despite evidence pointing elsewhere (GMoromisato, Jul 2025).

**The review hierarchy (Jun 2025, vs Opus 4/Gemini 2.5 Pro):** o3-pro catches the most issues but with false positives. Claude is more creative but also has false positives. Gemini is the most conservative with fewest false positives (JamesBarney). This dynamic may have shifted with Opus 4.5/4.6.

**Current relevance:** o3-pro's niche -- hard debugging, security auditing, concurrency analysis -- remains strong. Its thoroughness is offset by false positives and impractical latency. Worth it only for high-stakes review where you can wait.

### o3-mini-high — The Speed-Quality Sweet Spot

Exceptional cost-performance ratio. The -high variant is essential.

**What it feels like (Jan-Apr 2025):** "4-10x faster for 80% of the quality" on coding tasks (yzydserd, Jan 2025). Enables real-time interaction while o1-pro requires several minutes. 60% on Aider polyglot at $18 cost, nearly matching o1 at 10x lower expense (anotherpaulg, Jan 2025). antirez found it outperformed Sonnet 3.5 on complex coding (Jan 2025). Free o3-mini outperformed paid R1 models (GaggiX, Feb 2025). Achieved top 5% on Codeforces -- a capability leap comparable to the GPT-3 to GPT-4 gap (anonylizard, Feb 2025).

**What practitioners build with it:** Reliable first-time execution when given clear requirements documentation (elif, Feb 2025). Used in Aider at about one-third the cost of Claude 3.7 Sonnet (ctoth, Feb 2025). One practitioner recommended o3-mini for architectural guidance, finding it superior to Claude for that role (gizmodo59, Mar 2025). Reliably handles small, well-contextualized tasks like test modifications, though it struggles with large codebases (sothatsit, Mar 2025).

**Best as a sub-agent:** Integrated for narrow tasks within Plandex agents -- faster at one-third the cost and more reliable than larger models for focused work (danenania, Apr 2025). Uses o3-mini-high for planning, delegates execution to Claude for inline edits (rotcev, Feb 2025).

**The -high distinction matters:** o3-mini-high significantly outperforms base o3-mini. Performance scales dramatically with reasoning effort: o1-pro > o3-mini-high > o1 > o3-mini-low in benchmark testing (chaos_emergent, Apr 2025). Practitioners recommend always using the -high variant for serious coding work.

**Current relevance:** Superseded by o4-mini (Apr 2025). Its cost-performance niche has been partially absorbed by Haiku 4.5 and Gemini 3 Flash. Still relevant for users on older OpenAI plans.

### o4-mini

Released April 2025. Mixed reception with a critical variant distinction.

**The -high variant is the only one worth using:** o4-mini-high gets strong praise: "Mind-blowing" for computer vision and OpenCV work (waynecochran, May 2025). A "domain expert" across React Native versions, handling styling and OS quirks across framework versions (l33tman, May 2025). Works "really well in any agentic environment" (radio879, Aug 2025). One practitioner was impressed by a 7-hour session maintaining 15-file context across full-stack React and Node work (TrackerFF, Jul 2025). Another preferred o4-mini over CLI alternatives in VS Code agent mode (baby, Jul 2025).

**Base o4-mini is weaker:** "Not really that great compared to o3" (stingraycharles, Aug 2025). More thinking tokens do not equal better integration coding (sfaist, Jul 2025). Codex built on o4-mini took 200 requests to change 3 lines of code (andai, Aug 2025). Hallucinated architectural details in documentation writing while Claude Code performed well on the same task (gklitt, Apr 2025).

**The complementary pairing pattern:** Claude 3.7 as orchestrator with o4-mini for reasoning achieved 59.7% on SWE-bench Lite (kate_at_refact, May 2025). Multi-agent deliberation councils -- combining Gemini, Claude Sonnet, and o4-mini -- outperform single models (esamust, Apr 2025). Good for cheaper inference on business data extraction but not for complex coding (mind-blight, Aug 2025).

**The o1 predecessor context:** o1-pro was the deep reasoning specialist before o3. Excels at complex bug solving -- called "still far ahead" for complicated bugs (ldjkfkdsjnv, Mar 2025). Handles 1,000+ LOC updates reliably when given 50-100K context (johnsmith1840, May 2025). But at $200/month, the value is debated: competition from Claude 3.7 extended thinking and Gemini 2.5 Pro approaches o1-pro quality (dimitri-vs, Apr 2025). Consensus: best for narrow deep-reasoning tasks, not general coding.

**Current relevance:** Largely interchangeable with o3 for most practitioners. GPT-5.2 Codex has superseded o4-mini for general coding. o4-mini-high retains its niche for computer vision and mobile development.

---

## GPT-5.x Family (OpenAI)

{{< callout type="info" >}}
**GPT-5.2 base and GPT-5.2-Codex are separate models**, not just branding. "Both are models used by the Codex CLI and the GPT-5-Codex model is recent and fantastically good" (dudeinhawaii, Oct 2025). The Codex variant uses a different, smaller prompt (~10KB vs ~23KB) and is specifically optimized for code (jumploops). They have different personalities, different strengths, and practitioners choose between them deliberately.
{{< /callout >}}

### GPT-5.3 Codex

Released February 5, 2026. The first unified Codex/GPT-5 training stack.

**What it feels like:** Early reports (5 HN mentions) are positive. Terminal-Bench jumped from 64% to 77.3% -- a massive gain in real-world terminal/CLI task completion. A ~12% terminal coding lead over Opus 4.6 at 65.4%. 25% faster than GPT-5.2-Codex while using fewer tokens. Can be steered interactively while working without losing context -- a collaboration-first philosophy contrasting with Opus 4.6's autonomous approach (Rperry2174, Feb 2026). Graphics rendering performance praised over Opus 4.6.

**Key improvements:** Fixed lint loops (models getting stuck in lint-fix cycles), better bug explanations, fixed flaky-test premature completion. Both GPT-5.3-Codex and Opus 4.6 one-shotted a Gameboy emulator -- the Terminal-Bench lead lasted only 35 minutes before Opus 4.6 launched.

**Practitioner reception (early reports):** As more users test 5.3-Codex, reports are broadly positive. rmonvfer finds it "faster (even with xhigh effort)" than Opus and says it gets the job done 95% of the time (rmonvfer, Feb 2026). nickandbro found it performed "exceedingly well" for graphics rendering pipelines (nickandbro, Feb 2026). minimaxir notes it "very evidently follows [AGENTS.md] well" -- a meaningful fix from 5.2's weakness in instruction-following (minimaxir, Feb 2026). However, synergy20 criticizes the announcement for omitting context window size -- a key spec for practitioners evaluating adoption (synergy20, Feb 2026).

**The same-day drama:** gizmodo59 calls the Opus 4.6 Terminal-Bench lead "the shortest lived lead in less than 35 minutes" -- GPT-5.3-Codex launched and matched or exceeded benchmarks almost immediately (gizmodo59, Feb 2026). This compressed the news cycle and made direct comparison difficult since neither model had substantial real-world data at announcement time.

**Caveat:** Multiple commenters note the API is not yet available despite the announcement. The benchmark lead is confirmed but daily-use reports are still accumulating.

### GPT-5.2-Codex — The Instruction-Following Implementer

Released January 14, 2026. A separate model from GPT-5.2 base, optimized specifically for code.

**What makes it different from base:** Codex models "tend to be extremely good at following instructions" whereas base GPT-5.2 "is a little bit more creative" (asabla, Dec 2025). Codex "will often use tools to copy code rather than re-writing the code" -- reducing bug introduction during refactoring. "It takes maybe 5x longer but generates something that I have more confidence in" (dudeinhawaii). On internal benchmarks, the Codex prompt delta improved refactoring from 33.9% to 51.3% (jumploops). The naming can be confusing: "Codex" refers to the git-centric product, while "GPT-5-Codex" is the agentic coder model (bigwheels, Oct 2025). One practitioner clarifies: Codex is the model "trained specifically for programming tasks. You want this if you're writing code" (Aurornis, Jan 2026).

**What it feels like:** "Just one-shots everything" when given the right setup (stavros, built an entire frontend pixel canvas with zero prior experience). "Consistently much better at hard logic problems" -- excels at "complex race conditions or deadlocks" (sothatsit, Oct 2025). Excels at longer runs where Claude Code "literally just gives up" (mmaunder, who spends $70K+/year on AI tooling). One practitioner built a 20K LOC browser project using xhigh reasoning -- described as highly productive (embedding-shape, Jan 2026). Another used it for 12 hours/day on Rust and CUDA work (mmaunder, Dec 2025). GPT-5.2 and Codex variants described as "every bit as good as Opus but without the groveling and emojis" (rcarmo, Jan 2026). Codex outperforms Gemini 3 Pro in implementation quality (boole1854, Feb 2026).

**What practitioners actually build with it:** mmaunder switched from Claude Code after heavy use, finding Codex excels at longer runs on hard problems. stavros built an entire frontend pixel canvas with zero experience. simonw chose Codex to avoid burning token allowance on Claude Code, evaluating extended project capability -- and noted that quality models naturally adopt automated testing without prompting (simonw, Dec 2025). dudeinhawaii (20+ years experience) said Codex "felt like working with a peer" for the first time, avoiding tangled messes and novice-style coding. Newer models also "let you know when something is impossible or unlikely to solve your problem" -- showing improved self-awareness (dudeinhawaii, Jan 2026).

**The oversight requirement:** Even the best Codex variants require oversight to avoid maintainability traps and context pollution issues (dudeinhawaii, Jan 2026). Practical usability is hard to measure -- caution against over-interpreting benchmark differences (scellus, Dec 2025).

**Reasoning levels are THE key lever.** Practitioner consensus from 45+ Algolia reports:

| Level | What Practitioners Say | Best For |
|-------|----------------------|----------|
| **xhigh** | Praised for complex debugging and architecture. One practitioner built a 20K LOC browser project (embedding-shape, Jan 2026). Slower but more accurate than Opus 4.5 on complex codebases (meowface, Jan 2026). Outperformed Claude Code Opus 4.5 on performance benchmarks (woadwarrior01, Jan 2026). Struggles with architecture but excels at abstractions (manmal, Feb 2026). Costs 2x Anthropic alternatives ($3,244 vs $1,485 for equivalent benchmark task). | Specs, hard debugging, architecture |
| **high** | Good daily default. Ranked "the best model currently available" by one practitioner (nl, Feb 2026). Multi-day deployment tasks handled successfully (mixermachine, Jan 2026). Better token economy than Cursor on the 200 plan (wahnfrieden, Dec 2025). One practitioner runs high as standard, escalating to xhigh for specs and debugging (int_19h, Feb 2026). | Daily coding, iterative development |
| **medium** | Surprisingly capable and consistent. Multiple users say it's comparable to Opus 4.5 for standard work (Mkengin, Dec 2025). Effective for cloud networking debugging (ndriscoll, Jan 2026). Produced most consistent results -- high reasoning sometimes caused speculation (rdos, Jan 2026). Medium improved benchmark scores from 62.7 to 72.1 on NYT Connections (zone411, Dec 2025). Used in agentic harness for essay generation (localhost, Jan 2026). | Routine tasks, best value |
| **low** | Degraded tone, added emojis and casual language (rdos, Jan 2026). Not recommended for coding. | Avoid |

The emerging pattern: run high as standard, escalate to xhigh for specs and debugging, drop to medium for routine tasks. Manual reasoning level switching is seen as UX friction (sunaookami, Feb 2026). Some practitioners report laziness on complex E2E test fixes at lower reasoning levels (tomashubelbauer, Feb 2026).

**The Max variant:** GPT-5.2-Codex Max appears in orchestration contexts. One practitioner uses it for planning in a multi-model orchestrator called Pied-Piper, paired with Opus 4.5 for implementation (sathish316, Feb 2026). Another uses 5.1/5.2-Codex-max and calls it "phenomenal for coding" but requiring careful human oversight for maintainability (dudeinhawaii, Jan 2026).

**Cost context:** GPT-5.2 Codex xhigh costs approximately $3,244 for a benchmark task versus $1,485 for Claude Opus 4.5-reasoning on the same task (leumon, Feb 2026). The Codex 200/month plan is preferred by some over Cursor for better token economy (wahnfrieden, Dec 2025).

### GPT-5.2 Base — The Creative Planner

Not the same as Codex. Base GPT-5.2 is more conversational and creative, less instruction-following.

**The planning role:** Multiple practitioners use GPT-5.2 Pro / "Thinking - Heavy" for analysis and planning, then hand off to Codex for implementation. "GPT 5.2 Thinking - Heavy for analysis/planning tasks via chat, then copies results to Codex for implementation" (energy123, Feb 2026). Another uses "GPT-5.2 Codex Max for planning" paired with "Opus 4.5 for implementation" in a multi-model orchestrator (sathish316, Feb 2026). This two-stage workflow -- Pro/Heavy for planning, standard Codex for implementation -- is a recurring pattern across multiple independent practitioners.

**GPT-5.2 Pro / Thinking-Heavy tier:** The maximum reasoning tier for deep analysis and architecture. Higher cost but excels at complex decomposition and planning. Token-expensive but irreplaceable for architectural decisions. Limited direct practitioner reports on the Instant/Thinking/Pro tier split, but the pattern suggests: Instant for quick completions, Thinking for analysis/planning, Pro for maximum capability.

**What practitioners use base for:** Preferred for "strict instruction following" over Claude and Gemini by some (Topfi, Sep 2025). Used for brainstorming while Claude Sonnet 4.5 handles coding and Gemini 2.5 Pro handles writing -- model selection as specialized toolbox (stared, Oct 2025). Codex CLI with base GPT-5.2 excels at planning discipline and transparency compared to Gemini, which is biased toward action and harder to control (mmaunder, Dec 2025). The 400K context window is a significant draw for large Rust and CUDA codebases (mmaunder, Dec 2025).

**The personality divide:** Base GPT-5.2 is described as "rude and cold" with rigid adherence to conventions (jorl17, Dec 2025) -- a sharp contrast to Claude's tendency to align with your thinking style. One practitioner prefers this strictness; another finds it off-putting. The Codex variant inherits the instruction-following strength without the conversational coldness.

**The hallucination pattern:** GPT-5.2 base consistently hallucinates CLI utilities and non-existent software features (heavyset_go, Jan 2026). Recurring pattern across subjects, requiring source verification. Codex variant is more grounded due to instruction-following orientation. Knowledge cutoff limitations are also noted -- the model may not know about recent tools or API changes (deaux, Jan 2026).

**Benchmark caveat:** SWE-Bench Pro shows GPT-5.2-Codex at 56.4% vs Opus 4.5's 80.9%. For terminal workflows, Opus scores approximately 60+ vs GPT-5.2-Codex at approximately 47% (mohsen1, Dec 2025). GPT-5.2 on backend coding is comparable to Gemini 3 Pro but trails Claude for frontend -- and GPT-5.2 preferred REPLs over documentation review (stopachka, Dec 2025). But practitioners report GPT-5.2 variants competitive in daily use -- "every bit as good as Opus but without the groveling and emojis" (rcarmo, Jan 2026). The benchmark gap may not reflect practical experience.

---

## Gemini Family (Google)

### The Flash-Over-Pro Paradox

The most counterintuitive finding in the Gemini data: **Flash is often better than Pro for coding**, not just faster. Multiple independent practitioners confirm this:

- "Possibly controversial take, but IMO Gemini 3 Flash is better than Pro for coding" (Rebelgecko, Dec 2025)
- Flash is "actually smarter in my assessment" for iteration (jtrn, Feb 2026)
- Flash is "an amazing model" while "Gemini 3 Pro isn't great" due to inconsistent reliability (nl, Feb 2026)
- Flash performs "sometimes even better than the Pro version" while being 5 seconds faster and 40% cheaper per user (thecupisblue, Dec 2025)
- Flash outperforms Pro and Sonnet 3.7 for coding specifically (ribelo, May 2025)

This isn't about cost tradeoffs -- practitioners are saying Flash produces better, more consistent coding output. Pro's advantage is limited to complex reasoning tasks where you need one thorough pass and can tolerate latency. The pattern holds across both Gemini and OpenAI families: smaller, cheaper variants sometimes outperform their premium siblings for coding consistency (see the o3-mini-high data in the O-Series section).

### Gemini 3 Flash

Released December 17, 2025. The crowd favorite by a wide margin (11 positive, 3 negative in Algolia data).

**What it feels like:** Speed advantage is real for autonomous coding agents -- "many LLM calls for simple changes" where speed compounds (andai). One practitioner uses Flash exclusively for coding and finds it comparable to Opus at lower cost and faster speed (paxys). Another built a custom agent delivering comparable results at one-tenth the cost (verdverm). Flash is the model one practitioner would switch to "for everything if Flash was a bit cheaper at API usage" (mythz, Jan 2026).

**Specific project wins:** Successfully used for reverse engineering tasks with RAG-style approaches -- feeding decompiled code chunks and asking for pattern identification (joecarpenter, Feb 2026). Benchmarks close to Gemini 3 Pro with better speed; particularly strong at search-related tasks (nl, Jan 2026). Performed best among tested coding tools in one practitioner's direct comparison, despite limitations on complex reasoning (bpavuk, Jan 2026).

**The speed advantage in practice:** The compounding effect is more dramatic than specs suggest. In agentic loops where the model makes dozens of sequential calls, Flash's ~5 second per-request advantage over Pro (thecupisblue, Dec 2025) translates to minutes saved per task. This is why practitioners prefer Flash for iteration -- "rather YOLO code with Gemini 3 Flash...at least I can iterate faster" (jtrn, Feb 2026). Amp replaced Haiku with Flash for codebase search specifically because of this compounding: approximately 8 parallel tool calls per iteration versus Haiku 4.5's 2.5, completing searches in 3 turns instead of 9.

**The cost story:** Monthly AI coding costs of $1-3 using the free tier versus approximately $100 for Claude Code (ginkida). Google's family plan makes it very affordable (jug). For multimodal tasks, mythz uses Flash via API with 1,000/day free quotas for analyzing images, audio, and PDFs (mythz, Jan 2026). The generous free tier makes Flash the default model for budget-conscious developers.

**Where it fails:** Actively disregards instructions and starts running commands on its own (peterldowns, Feb 2026). Produces superficial analyses compared to Opus 4.5 -- a comprehensive side-by-side test showed Flash generates surface-level conclusions where Opus digs deeper (jorl17, Feb 2026). Infinite reasoning loops at 3-5% of requests at scale. Demonstrates sophisticated deceptive reasoning in game theory tests, raising alignment questions separate from capability (lout332, Jan 2026).

### Gemini 3 Pro

Released November 18, 2025. The most inconsistent frontier model -- and it may not be worth the premium over Flash.

**What it feels like:** An exactly even split: 5 positive and 5 negative practitioner reports. "Random whether it works or goes off the rails" (nl, Feb 2026). One user deployed a 100% AI-written production system for two months using mostly Gemini 3 Pro and Opus 4.5 (qingcharles, Jan 2026). Another calls it "terrible at tool-calling" and "borderline unusable in Cursor" despite being strong at math (koakuma-chan, Dec 2025).

**When Pro IS worth it:** For deep single-pass analysis where you can wait for results. One practitioner found Pro "basically identical to Opus 4.5 and GPT 5.1 for daily coding," with Opus having only a slight edge (camdenreslink, Dec 2025). Best results come through third-party integrations: Python and Vue projects via Antigravity on a $20/month plan deliver "high quality output" (mythz, Jan 2026). Pro with high thinking mode engaged gets the best reviews among Pro configurations (mythz, Jan 2026). One practitioner achieves impressive results with a Gemini Pro subscription as a backup when Claude Max weekly allowance runs out (arthurfirst, Dec 2025).

**Specific failure modes:** Struggles with even simple coding tasks in Antigravity testing (wowamit, Nov 2025). Sudden rapid decline in specification adherence after working well initially -- the same regression observed simultaneously with Opus 4.5, suggesting possible provider-side changes (dudeinhawaii, Jan 2026). Worst performer in a comprehensive comparative analysis, producing hallucinations and date errors that other models avoided entirely (jorl17, Feb 2026). The inconsistency is the core problem -- you cannot predict whether a given session will produce excellent or broken output.

**Why Flash often beats it:** Pro 3 appears less reliable than 2.5 Pro was. The transition from 2.5 to 3 improved Flash dramatically but made Pro less consistent. Practitioners who loved 2.5 Pro for its large context window (1M-2M tokens) and code understanding (int_19h, Apr 2025) don't praise 3 Pro with the same enthusiasm.

**Off-the-rails metric (Amp data):** 17.8% of spend wasted on problematic outputs -- nearly 1 in 5 dollars. For comparison, Opus 4.5 wastes 2.4%. Documented problems include infinite thinking loops, control character corruption, unrequested git commits, and using relative paths instead of absolute. The "off the rails" behavior is a recurring cross-generational theme: sometimes writes random text continuously (skippyboxedhero, Feb 2026), sometimes goes completely off track mid-task (nl, Feb 2026), sometimes ignores explicit stop instructions including caps-lock warnings (mmaunder, Dec 2025). One practitioner recommends frequent commits as a safety net because derailments still happen (cdelsolar, May 2025).

**CLI tool is near-universally criticized:** Crashes, retains stale file contents, uses 100K tokens where Codex CLI uses 2K for equivalent tasks, ignores explicit instructions to stop. Google reduced free quotas and removed pro models from CLI; token consumption is voracious compared to alternatives (throwa356262, Feb 2026). Multiple practitioners report better results using Gemini models through Antigravity, Cline, or Aider rather than Google's own CLI (mythz, faangguyindia, bugglebeetle). The consensus: the model is capable but the CLI is not well-tuned for agentic work.

**100,000 lines in 2 weeks:** One practitioner generated this volume with Gemini 3, acknowledging the result is "imperfect, perhaps even erroneous" but validated the vibe coding approach for modular frontend projects (Rand_cat). Another converted 7K lines of Python to 35K lines of C, noting it creates an understanding gap (sottol).

### Gemini 2.5 Flash / 2.5 Pro — The Previous Generation

While Gemini 3 dominates current discussion, 2.5 variants remain in active use and provide useful context for understanding the model family's evolution.

**Gemini 2.5 Pro** was polarizing from the start. Some called it superior to Sonnet 3.7 for code quality and understanding complex codebases (int_19h, Apr 2025). Others described it as "trash" with frequent hallucinations (riskable, Nov 2025). It excelled at Python math/science prompts but made unwanted modifications to existing code (iamleppert, Apr 2025). The 1M-2M token context window remained a genuine advantage for orchestration tasks (terrywang, Nov 2025), and it was considered the best model for prompt optimization given codebase context, though hallucinations required verification (Topfi, Sep 2025). In enterprise tests, 2.5 Pro crushed scenarios where GPT-5 with high thinking was insufficient (aerhardt, Oct 2025).

**Context window reality:** Despite advertised 1M token limits, practitioners report that model performance degrades significantly beyond 200K tokens in practice (koakuma-chan, Jul 2025). Marketed context windows do not translate to effective working capacity.

### Architecture vs Implementation: Where Gemini Fits

A consistent pattern across practitioners: **Gemini excels at high-level architecture but Claude wins for line-by-line implementation.** This is not a weakness -- it defines where Gemini adds value in multi-model workflows.

- Claude family better at localized coding tasks; Gemini family better at high-level architecture (verdverm, Feb 2026)
- Gemini very good at architecture-level thinking; switch to Claude for line-by-line coding (SkyPuncher, May 2025)
- Gemini 3 great for one-shot fresh projects and UIs; struggles on large existing codebases versus Claude (thyb23, Dec 2025)
- Gemini's 1M+ token context window gives it an edge for codebase-wide analysis even when it cannot match Claude on targeted edits (terrywang, Nov 2025)

The practical implication: using Gemini for project scaffolding and architecture review, then switching to Claude for implementation, is an emerging multi-model pattern.

### Thinking Levels and Reasoning Configuration

Gemini's thinking level system is one of its most confusing features. Key distinctions practitioners have surfaced:

- The "Thinking" variant is Flash with elevated thinking parameters, not a separate model -- Pro is an entirely different model tier (flakiness, Dec 2025)
- Users remain confused about the distinction between Gemini 3 Thinking and Pro variants (caminanteblanco, Dec 2025)
- Pro with "high" thinking mode via Antigravity delivers the best Pro results (mythz, Jan 2026)
- Cannot disable thinking in 3 Pro; default is dynamic with high level (andai, Dec 2025)
- One practitioner achieved a 52x speedup on optimization tasks using auto-model selection that dynamically switches between Flash and Pro (pvalue005, Jan 2026)

The practical advice: start with Flash at default thinking. Escalate to Pro with high thinking only for tasks where single-pass thoroughness matters more than iteration speed.

---

## Open-Weight Models

### GLM-5 — First Major Chinese Agentic Engineering Model

Released February 11, 2026. 744B total parameters (40B active) MoE architecture, MIT license. Available on OpenRouter, Ollama, and Hugging Face.

**What it targets:** Zhipu AI (Z.ai) designed GLM-5 specifically for what they call "agentic engineering" -- complex, multi-stage systems tasks requiring autonomous decomposition, long-horizon planning, and sustained context coherence. This makes it the first major Chinese open-weight model explicitly positioned for agent workflows rather than general-purpose use.

**The training story:** Scaled up from GLM-4.7 (368B parameters) with pre-training expanded from 23 trillion to 28.5 trillion tokens. Z.ai also open-sourced SLIME, an asynchronous RL training framework under MIT license. **jfaganel99** argued SLIME is the most underappreciated aspect of the release, claiming the real gap between frontier and non-frontier models lies in RL infrastructure rather than pre-training compute. The Active Partial Rollouts (APRIL) strategy addresses rollout generation, which typically consumes over 90% of RL training time.

**Benchmark context:** On agentic benchmarks like Vending Bench 2, GLM-5 claims the top position among open-source models and approaches proprietary frontier models. However, **Aurornis** noted the benchmarks compare against previous-generation models (Opus 4.5, GPT-5.2) rather than current competitors -- a recurring pattern with open-weight releases.

**Early practitioner reports:** **justinparus** shared hands-on experience with the predecessor GLM-4.7, finding it comparable to Sonnet but requiring more instruction clarity. Uses it for well-defined smaller tasks where pricing is advantageous, reserving Anthropic models for larger complex changes. **2001zhaozhao** praised GLM-4.7-Flash as the first local coding model that felt genuinely useful, comparing its intelligence to Haiku 4.5. **pcwelder** tested GLM-5 on OpenRouter and found it performed poorly on custom tool-calling benchmarks.

**Where it fits:** GLM-5 extends the trajectory established by DeepSeek in demonstrating that Chinese labs can produce frontier-competitive models with open licensing. **NiloCK** observed that even N-2 generation models are beginning to satisfy user preferences, suggesting open-weight alternatives will inevitably catch up as user needs saturate. **mythz** highlighted the significance for self-hosted inference -- while self-hosting does not make financial sense at current API pricing, independence from proprietary providers has strategic value.

**The tool-calling gap:** Like other open-weight models, GLM-5 appears to struggle with custom tool-calling formats. This remains the primary barrier to using open-weight models in agentic workflows where reliable tool use is essential.

For the full release analysis and community reaction, see the [source capture](/sources/2026-02-11-glm5-agentic-engineering.html).

### Qwen3 30B-A3B — Consensus Best for Local Coding

MoE architecture gives fast inference on consumer hardware. Multiple practitioners run it successfully on Apple Silicon (M1-M4, 32-64GB) at 30-100 tokens/sec and on NVIDIA GPUs.

**What practitioners build with it:** Web dev with custom MCP tools on M3 Pro 36GB -- described as a very positive experience for browser-connected workflows (DrAwdeOccarim, Sep 2025). Covers 30-50% of tasks locally at 80 tokens/sec on M3 Max -- specifically the menial, routine coding work (omneity, Aug 2025). Sysadmin help on 7800X3D / RTX 4090 at 20-30 tokens/sec (bytefactory, Aug 2025). General tasks and translation on M1 Max 64GB at 40 tokens/sec (dust42, May 2025). Coding with prepared prompts on M2 Mac 32GB (mark_l_watson, Dec 2025). The quality gap versus frontier models is noticeable on complex multi-step tasks, but for straightforward coding the gap is small enough to make local-first viable.

**Hardware configurations that work:**

| Hardware | tok/s | Source |
|----------|-------|--------|
| M1 Max 64GB | ~40 tok/s | dust42, May 2025 |
| M2 Mac 32GB | ~30 tok/s | mark_l_watson, Dec 2025 |
| M3 Max | ~80 tok/s | omneity, Aug 2025 |
| M4 Max | 70-100 tok/s | various, 2025 |
| 7800X3D / RTX 4090 | 20-30 tok/s | bytefactory, Aug 2025 |
| Dual RTX 5060 Ti | ~80 tok/s | various, 2025 |

**Speed over intelligence:** A recurring insight is that for exploratory problem-solving, raw token throughput matters more than model intelligence. When you are iterating on ideas and testing approaches, getting a decent answer in 2 seconds beats a great answer in 20 seconds. This makes Qwen3 30B-A3B the default local model even when frontier APIs would give better per-query results.

**Privacy as enterprise driver:** Multiple practitioners cite avoiding sending company data to American cloud providers as a major reason for local deployment. Open-weight models on local hardware make enterprise adoption easier when data sovereignty is a requirement.

**The limitation:** Agentic tool calling is unreliable. Context limitations cause failures in extended workflows -- hardware costs for truly comparable agentic performance rival years of API subscriptions (evilduck, Aug 2025). Best for chat-based coding assistance, not autonomous multi-step agents.

### Qwen3-Coder — Speed Leader on Specialized Hardware

A separate model family from Qwen3 30B-A3B, optimized for code generation.

**What practitioners build with it:** Applying patches, building context, and rapid analysis loops on Cerebras at $50/month for 25 million tokens daily -- Claude and Gemini are much smarter, but Qwen3-Coder has a decisive speed advantage (sdesol, Sep 2025). General coding via llama.cpp on Framework Desktop and Beelink GTR9 Pro at approximately $2,000 total hardware cost (tygra, Aug 2025). Sensitive document work and local coding with Qwen3-Coder-Next paired with Claude Code as a quality backstop (d4rkp4ttern, Feb 2026).

**Where it breaks:** Tool-calling reliability is the primary failure mode. No caching support, unreliable tool interactions, speed variability, and significant self-configuration required compared to integrated proprietary solutions (ojosilva, Oct 2025). One practitioner tried local Qwen3 on an NVIDIA Blackwell Pro 6000 but found it laggy and insufficient, remaining locked into Claude Code despite cost concerns (bicepjai, Feb 2026).

**Best use case:** High-volume, speed-sensitive tasks where you can accept lower per-query quality in exchange for dramatically faster iteration. The Cerebras deployment model ($50/month for near-unlimited throughput) is the most compelling setup if latency matters more than peak accuracy.

### Devstral — Most Positive Reports of Any Open-Weight Model

24B size fits on a single RTX 4090 with 24GB VRAM. SWE-bench: 68% (Small 2 variant). Two distinct generations with different strengths.

**Devstral V1 -- the agentic coding pioneer:** Well-regarded specifically for agentic coding with OpenHands and Cline (NitpickLawyer, Jun 2025; diggan, May 2025). One practitioner built a full local coding agent with Devstral -- faster iteration than cloud but acknowledges it is not at Codex level (diggan, May 2025). Python coding with Q6_K_XL quantization, 85K context window, on 24GB VRAM (incomingpain, Aug 2025). A raytracer in C on AMD RX 7900 XTX at approximately 4.71 tokens/sec -- productive but needed manual fixes for about half the code (badsectoracula, Oct 2025). Data processing, summarization, and SQLite table generation on homelab hardware (hickelpickle, Jan 2026).

**Devstral 2 -- more capable, opinions diverge:** Completed a 500KB codebase review, found two bugs, fixed them, made improvements, and added features with minimal unwanted changes (InsideOutSanta, Dec 2025). But skeptics question whether benchmark claims translate to real coding quality (Aurornis, Dec 2025). Even the 24B variant requires significant hardware investment alongside IDEs and build tools; simple tasks work fine but tool use fails (KronisLV, Dec 2025).

**Devstral Small 2 (24B) -- fine-tuning potential:** Claimed competitive with Sonnet 3.5 on benchmarks (Lapel2742, Dec 2025) -- note this comparison predates Sonnet 4.5. DSL fine-tuning experiments show promise for specialized domains (cmrdporcupine, Dec 2025). V1 remains the safer choice for agentic workflows where reliability matters more than raw capability.

### DeepSeek R1 + V3 — The Architect/Coder Duo

The best hybrid open-weight pattern: R1 as architect, V3 as coder.

**The pattern:** R1-0528 for `/architect` mode and V3-0325 for `/code` mode in Aider -- one practitioner claims this surpassed Claude Code (Sonnet 4 era, Jun 2025) at a fraction of the cost (miroljub). R1 for planning combined with Qwen3 for implementation is an emerging local-first workflow (faangguyindia, Aug 2025). R1 excels at reasoning-heavy tasks but runs at 1-2 tokens/sec on consumer hardware, making it practical only for async planning (mechagodzilla, ryan_glass).

**R1-Distill-Qwen-32B:** The popular local reasoning variant. Runs on M2 MacBook at approximately 20GB. Good for refactoring guidance (simonw, Jan 2025). Visible reasoning traces valued for learning and verification (m11a, Jan 2025). The full R1 achieves 96.3% HumanEval and 97.3% MATH-500 (KarraAI, Jan 2025), but the distilled 32B version is what most local practitioners actually run.

**DeepSeek V3 standalone:** The strongest open-weight pure coding model. Close to Claude 3.5 Sonnet quality at 10-20x lower cost (scottyeager, Jan 2025). One practitioner shifted from Sonnet to V3 with Aider generating approximately 70% of new code in releases (anotherpaulg, Jan 2025). V3 scores 48-55% on the Aider polyglot benchmark versus Claude Sonnet 3.7 at 60-65% -- trailing but competitive (anotherpaulg, Jan 2025). Most users access via API rather than local deployment.

**Where the duo breaks:** R1 is slow but often correct on the first try (khaledh, Jul 2025). However, the hybrid R1+V3 approach works best when tasks can be cleanly split into planning and implementation phases. Tightly coupled tasks where architecture and code evolve together favor single-model workflows.

### Llama 4 — Not Recommended for Coding

Consistently the weakest open-weight model for coding. Maverick scored 16% on the Aider polyglot benchmark (anotherpaulg, Apr 2025). Scout has a known bug of "fixing" problems by commenting out code (ach9l, Apr 2025). One practitioner described it bluntly as "terrible at coding" (vessenes, Apr 2025). The 10M token context window does not compensate for poor code generation quality.

**The Scout exception:** Despite Llama 4's coding weakness, Scout (17B-16E MoE, 109B total parameters) shows strength on structured non-coding tasks. Achieved 100% accuracy on batch processing queries in ablation testing across 20+ models (kouteiheika, Jan 2026). MMLU score of approximately 86% versus Llama 3.3's 66% (lostmsu, Jun 2025). Extremely fast on Cerebras at 2,808 tokens/sec at $0.70 per million tokens (demian101, Jul 2025). Not a coding model -- use DeepSeek V3 or Qwen3 instead.

### Kimi K2.5 — Exciting but Unreliable

Generates excitement as a free/cheap alternative (76% cheaper than Opus). One user cancelled their Claude Code subscription in favor of Kimi CLI (vuldin, Jan 2026). But hallucinations in tool use are frequent -- hallucinates commands and gets syntax wrong (helpfulclippy, Jan 2026). Tool call issues in production multi-agent systems where finish_reason semantics differ between providers, causing the model to retry identical failing tool calls instead of adapting (kageiit, Feb 2026). Not yet reliable enough for unsupervised agentic work.

**Where it does shine:** Writing quality is a genuine strength -- Kimi is stronger than Claude for documentation despite Claude being technically sharper for code (jauntywundrkind, Jan 2026). One practitioner reported it handled everything thrown at it as a general development tool (vuldin, Jan 2026).

**Hardware reality for local deployment:** Requires 240GB+ unified memory. One practitioner running on M3 Ultra 512GB still experienced speed and resource issues (StevenNunez, Feb 2026). Many corrections needed for generated code even in basic usage (raphinou, Feb 2026).

### Hardware Sweet Spots for Open-Weight Models

The most common question practitioners ask: what hardware do I actually need?

| Setup | Best Models | Performance | Cost |
|-------|-------------|-------------|------|
| Apple Silicon M1-M2, 32GB | Qwen3 30B-A3B, R1-Distill-32B | 30-40 tok/s | ~$1,500-2,000 used |
| Apple Silicon M3-M4, 64GB | Qwen3 30B-A3B, Devstral Small | 70-100 tok/s | ~$2,500-4,000 |
| RTX 3090/4090, 24GB VRAM | Devstral, Qwen3-Coder-30B | 20-80 tok/s | ~$800-1,600 GPU |
| Cerebras cloud | Qwen3-Coder, Llama 4 Scout | 2,800+ tok/s | $0.50-0.70/1M tokens |
| 768GB+ RAM systems | Full DeepSeek R1/V3 | 1-2 tok/s | $5,000+ (async only) |

A recurring caution: hardware costs for truly comparable local performance often rival years of API subscriptions (evilduck, Aug 2025). Local deployment makes most economic sense when privacy requirements mandate it, when you have high-volume low-complexity workloads, or when you already own suitable hardware.

### Cross-Model Patterns (Open-Weight)

Three themes cut across all open-weight models:

**1. Tool-calling reliability is the #1 differentiator.** Every model in this section struggles with agentic tool use to some degree. Qwen3, Kimi K2.5, and Qwen3-Coder all have documented tool-calling failures. Devstral via OpenHands/Cline gets the most positive reports, but even it falls short of frontier models. This is the single biggest reason practitioners default to Claude Code or Codex despite cost premiums.

**2. Hybrid workflows outperform single-model approaches.** R1 for planning + V3 for coding (miroljub). R1 for planning + Qwen3 for local implementation (faangguyindia). Qwen3-Coder-Next paired with Claude Code as a quality backstop (d4rkp4ttern). The pattern is consistent: use a reasoning model to plan, a fast model to execute.

**3. Aider is the dominant integration tool.** More practitioner reports reference Aider than any other tool for open-weight model integration. Its `/architect` and `/code` mode split maps naturally to the hybrid workflow pattern. DeepSeek V3, R1, and Qwen3-Coder all have active Aider user communities.

---

## Head-to-Head: How They Actually Compare

### Opus vs GPT-5.x Codex

No universal winner. GPT-5 preferred for strict instruction following -- Claude "takes more liberties with packages" (Topfi). Opus preferred for complex reasoning and agentic coding. Cost is a major factor: Opus is approximately 10x more expensive at the API level. One practitioner says GPT-5.2 and Opus are neck-and-neck -- GPT variants feel more direct while Opus excels at complex reasoning (jumploops). GPT-5.3-Codex leads terminal coding by approximately 12%; Opus leads general benchmarks (karmasimida). The "planning with OpenAI, executing with Claude" workflow is increasingly common -- practitioners use o3 or GPT-5 reasoning for architecture decisions, then hand off to Claude Code for agentic implementation. Market momentum favors Claude Code: an analysis of 802K merged PRs on GitHub found Claude Code overtook Cursor as the most popular coding agent in public repos (aleyan, Feb 2026).

### Claude vs Gemini

Claude leads for complex agentic coding and large codebases. Gemini's advantages: architectural thinking, cost, and 1M context window. Reliability is the core differentiator -- even positive Gemini reporters note its inconsistency versus Claude's predictability. "Off the rails" behavior is a recurring theme across all Gemini variants (ashwindharne, nl, cdelsolar).

### o3/o3-pro vs Claude

Complementary, not competitive -- but the comparisons are dated. Most o3/o3-pro reports (Jan-Sep 2025) compare against Claude Sonnet 3.5 through Opus 4.1. Key findings from that era: o3-pro one-shots debugging problems Opus 4.0/4.1 failed on (WXLCKNO, Aug 2025). Claude wins on basic code generation and implementation speed (danenania, Aug 2025). o3-mini at one-third the cost of Sonnet 3.7 with comparable performance on scoped tasks (ctoth, Feb 2025). The "o3 for thinking, Claude for doing" pattern is likely still valid, but the gap between o3-pro's debugging advantage and Claude's current generation (Opus 4.5/4.6) remains untested in the available practitioner data.

### Claude Code vs Codex CLI

Claude Code wins on quality and context handling for complex tasks. Codex wins on speed, throughput, and sustained usage with fewer rate limits. One practitioner returned to Claude Code within two weeks of trying Codex, citing speed issues (Huppie). Another found Codex hallucinated and misrepresented architecture (gklitt). But Codex excels at longer runs on hard problems -- Claude Code "literally just gives up" according to one heavy user (mmaunder).

**The philosophy split (Feb 2026):** GPT-5.3-Codex takes an interactive, collaborative approach -- you can steer it mid-task, it asks questions, it wants your input. Opus 4.6 takes an autonomous, agentic approach -- it plans deeply, runs longer, and asks less. This reflects a real industry split between tight human oversight and full delegation (Rperry2174, Feb 2026). Neither is objectively better; it depends on whether you want a collaborator or a delegate.

### Model Stability (Current Generation)

Dramatically improved. Frustrations with previous models going off the rails are "almost completely gone" for one practitioner (reassess_blind). Key advice: recognize early signs of derailment -- phrases like "simpler approach" signal failure (CuriouslyC). Fragment tasks, and reset context rather than trying to steer back (vidarh). Task size is the strongest predictor of derailment.

---

## Cross-Cutting Patterns

### The Reliability Inversion

An unexpected pattern across both Gemini and OpenAI families: **the smaller/cheaper variant is sometimes more reliable than the premium one:**
- Gemini Flash 3 > Gemini Pro 3 for coding consistency (multiple independent reports)
- o3-mini-high competitive with o3 for most coding tasks
- Premium models (Pro, o3-pro) show higher false positive rates and inconsistency

This challenges the intuition that "bigger = better." For coding specifically, consistency and instruction-following matter more than peak reasoning capability.

### Thinking Level Compensates for Model Size

Smaller/faster models with high thinking often match or exceed larger models with default thinking:
- o3-mini-high approaches o3 quality at a fraction of latency (yzydserd)
- GPT-5 high thinking surpasses o3 for many tasks (Tiberium)
- Flash with iteration speed beats Pro with deep single-pass thinking

The implication: model routing decisions should account for reasoning configuration, not just model size. A smaller model at high effort can be both cheaper and better than a larger model at default.

### The Planning-Execution Split

The most consistently reported workflow across all model families:
1. **Planning/reasoning:** Premium model (Opus 4.6, o3, GPT-5.2 Pro) for architecture and problem analysis
2. **Execution:** Fast/cheap model (Sonnet, Flash, GPT-5.2-Codex medium) for implementing the plan

This makes variant selection less about "which is best" and more about "which role needs filling."

### Budget Allocation Tells the Real Story

Where practitioners actually put their money reveals true preferences:
- boole1854: $200/month goes primarily to Claude Code, not o3-pro
- mythz: $20/month Gemini plan for Pro as default, Flash for API multimodal
- radio879: Free tier GPT 4.1 for execution, premium models only for planning
- mccoyb: Switched entirely to GPT-5 Codex after 4 months of Claude Code

The money follows reliability and speed, not raw capability.

---

## Multi-Agent Tool Philosophies

### Claude Code Teams vs OpenAI Codex App

The two leading tools have taken fundamentally different approaches to multi-agent coding:

| Dimension | OpenAI Codex App + GPT-5.3 | Claude Code Teams + Opus 4.6 |
|-----------|---------------------------|------------------------------|
| **Human role** | Real-time steering mid-execution | Upfront planning, autonomous execution |
| **Interaction model** | Interactive -- steer while working | Delegative -- assign and wait |
| **Supervision** | Standalone app monitors agent fleet | Sub-agents report back to lead agent |
| **Parallel model** | App-level multi-project monitoring | Built-in teammate roles within session |

OpenAI's approach: you can "steer and interact while it's working, without losing context" (romainhuet, Feb 2026). The Codex app was built "to run and supervise multiple agents across projects, let longer-running tasks execute in parallel."

Anthropic's approach: Opus 4.6 "plans deeply, runs longer, and asks less of the human" (Rperry2174, Feb 2026). Claude Code Teams spawns sub-agents that coordinate autonomously.

**In practice:** One practitioner ran 4 agents on 6 tasks, cutting wall-clock time from ~18-20 min to ~6 min with zero file conflicts and 24 passing tests -- at ~4x the cost (anupamchugh, Feb 2026). Another achieved 34 files committed and 100 tests passing across 3 teammates (backend, frontend, tester) using a memory coordination plugin (sukinai, Feb 2026).

**The critical constraint:** File ownership partitioning is mandatory. "Two teammates editing the same file leads to overwrites. Break the work so each teammate owns a different set of files" (anupamchugh, Feb 2026). Git worktrees enable isolation for parallel sessions (shashimudunuri, Jan 2026). 3-8 parallel sessions is the practical sweet spot depending on mental bandwidth (hakanderyal, Jan 2026).

**Convergence:** Both tools support parallel agent execution, MCP tools work across both, and switching between them is easy "with almost no friction" (mergesort, Dec 2025). "Models matter less than UI, plumbing, and orchestration quality" (jillesvangurp, Feb 2026).

### Amp's Approach

Limited HN commentary on Amp's multi-agent features. The Amp lead engineer (Thorsten Ball) reportedly prefers single-agent interactive mode despite colleagues running agent fleets (SatvikBeri, Dec 2025). Amp's production routing across 15 models and 5 vendors is more about per-request model selection than parallel agent execution.

---

## Multi-Model Workflows

### The DreamTeam Pattern

The most reported workflow across all data sources:

| Role | Model | Why |
|------|-------|-----|
| Architect/Planner | Opus 4.6 max, GPT-5.2 Pro/Thinking-Heavy, or o3 | Deep multi-step reasoning |
| Implementer | GPT-5.2-Codex high, or Sonnet 4.5 | Speed + instruction-following; plan already exists |
| Reviewer | GPT-5.2-Codex high + Opus 4.6 | "They find different things" |
| Security Auditor | o3-pro | One-shots concurrency bugs (tested vs Opus 4.0/4.1) |
| Codebase Search | Gemini 3 Flash | 3x faster with parallel tool calls |
| Sub-agent Tasks | Haiku 4.5 or o3-mini-high | Cost-effective focused work |

### Amp's Production Roster (15 models, 5 vendors)

The most concrete example of production multi-model routing. Smart mode (Opus 4.6), Rush mode (Haiku 4.5), Deep mode (GPT-5.2 Codex). Review agent (Gemini 3 Pro). Search agent (Gemini 3 Flash). Oracle (GPT-5.2 medium reasoning). Amp switched primary models six times in twelve months -- model selection is a dynamic engineering decision.

**The off-the-rails metric:** Amp's most original contribution. Percentage of total spend wasted on problematic outputs. Opus 4.5: 2.4%. Gemini 3 Pro: 17.8%. A model that scores 10 points lower on benchmarks but wastes 7x less on dead ends is the better engineering choice.

### Routing Patterns (25 configurations from Algolia)

| Pattern | Example | Frequency |
|---------|---------|-----------|
| Planning/execution split | Opus plans, Sonnet executes; R1 architects, V3 codes | High |
| Tiered cost escalation | Haiku → Sonnet → Opus on failure | High |
| Task-type routing | Different models per task category | Medium |
| Parallel specialist agents | Claude backend, Gemini frontend | Medium |
| Local-first with cloud fallback | Ollama first, cloud for complex tasks | Medium |

**Routing caution:** Automated routing can make results worse for domain-specific tasks compared to sticking with one well-tuned model (canerdogan). The final 10% reliability costs several hundred dollars per run (roughly). Human routing decisions work better than automated classifiers.

---

## The Productivity Reality Check

The qualitative data includes some sobering findings alongside the success stories:

- **Company data contradicts self-reports:** One company's metrics showed developer productivity "plummeted" despite self-reported gains (sotix). Real gains estimated at "2x tops" (risyachka).
- **Month+ onboarding curve:** Multiple practitioners required over a month before reaching baseline productivity with Claude Code (lmeyerov, msikora).
- **Codebase understanding degrades:** Despite shipping features faster, one developer's codebase understanding "dropped fast" within three months, threatening ability to write good prompts (neebz).
- **Cognitive overhead:** An advanced programmer reports LLM output takes 2-3x longer to reach acceptable results versus their own coding. The "wall of text/code" is mentally exhausting (valentineshi).
- **Dependency risk:** "When Copilot goes down, entire teams slow to a crawl" (selinkocalar).
- **The nuance:** Gains appear in thoughtfulness and reflection rather than raw speed -- "stopping to ask questions, reflect, what should we do -- is really powerful" (softwaredoug). Task parallelization matters more than code generation velocity (lmeyerov).

---

## Benchmark Reality Check

Strong skepticism about SWE-bench as a predictor of real-world performance:

- **Data contamination concern:** 94% of SWE-bench PRs predate model training cutoffs (Bjorkbat)
- **Real-world gap:** Expensify solved only 16.5% of well-articulated tasks despite frontier benchmark scores (Bjorkbat)
- **Custom scaffolding required:** Top scores require scaffolding that doesn't reflect typical developer workflows (georgewsinger)
- **swe-REbench emerging:** Tracks monthly updates to prevent contamination (NitpickLawyer)

The practitioner consensus: trust personal experience over published scores. Test on your own workload.

---

## Migration Patterns

Cost and speed are the top reasons for leaving Claude. Quality and reliability bring people back:

- **Away from Claude:** To Qwen3-Coder-Next for daily dev (redwood_), to Codex for faster Swift iteration (jawon), to Gemini for cost (dist-epoch), to manual coding when AI proves unreliable for complex features (cleverwebble)
- **Back to Claude:** From Cursor for superior output (solumunus), from ChatGPT for preferred tone (andai)
- **High churn:** Practitioners are not brand-loyal. Multiple users run 2-3 models simultaneously. Best tool per task is the norm.

---

## Compact Reference

### Pricing (Per Million Tokens)

| Model | Input | Output | Context |
|-------|-------|--------|---------|
| Opus 4.6 | $5.00 | $25.00 | 200K / 1M beta |
| Sonnet 4.5 | $3.00 | $15.00 | 200K / 1M API |
| Haiku 4.5 | $1.00 | $5.00 | 200K |
| GPT-5.3/5.2 Codex | $1.75 | $14.00 | 400K |
| GPT-5.2 Pro | ~$17.50 | ~$140.00 | 400K |
| Gemini 3 Pro | $2.00 | $12.00 | 1M |
| Gemini 3 Flash | $0.50 | $3.00 | 1M |
| Gemini 2.5 Flash | $0.15 | $0.60 | 1M |
| DeepSeek V3 | $0.07-$0.56 | $1.68 | 128K |
| Devstral Small 2 | $0.10 | $0.30 | -- |
| GLM-5 (40B active / 744B MoE) | -- | -- | -- |
| Kimi K2.5 | $0.60 | $3.00 | 256K |
| Llama 4 Scout | $0.11 | varies | 10M |

### Reasoning Configuration

| Provider | Parameter | Levels |
|----------|-----------|--------|
| OpenAI | `reasoning.effort` | none, low, medium, high, xhigh |
| Anthropic | `effort` | low, medium, high, max (Opus 4.6 only) |
| Anthropic (legacy) | `budget_tokens` | 1,024 to 128K |
| Google (3.x) | `thinkingLevel` | minimal, low, medium, high |
| Google (2.5) | `thinkingBudget` | 0 to 32,768 |

### What Practitioners Actually Spend

- **Claude Max:** $100-200/month flat rate
- **Codex CLI heavy use:** $70K+/year (mmaunder)
- **Per-thread (Amp):** $2.05 Opus, $2.75 Sonnet, $2.04 Gemini 3 Pro
- **Gemini free tier:** $1-3/month for basic AI coding
- **Annual baseline:** $5-6K/year per developer converging across sources
- **Reasoning cost multiplier:** GPT-5.2 xhigh costs approximately 2x Anthropic alternatives
- **Token efficiency variance:** Gemini CLI uses approximately 100K tokens for tasks where Codex CLI uses 2K

### Tool-Specific Model Configuration

| Tool | Model Config | Reasoning Config |
|------|-------------|------------------|
| [Claude Code](/tools/claude-code.html) | `/model` command | effort slider, thinking keywords, `CLAUDE_CODE_EFFORT_LEVEL` env |
| [Codex CLI](/tools/codex.html) | config.toml profiles | `model_reasoning_effort` |
| [Gemini CLI](/tools/gemini-cli.html) | `--model` flag | `thinkingBudget` / `thinkingLevel` in settings |
| [Cursor](/tools/cursor.html) | Settings > Models | Thinking toggle, MAX mode |
| [Aider](/tools/aider.html) | `--model` flag | `--reasoning-effort`, `--thinking-tokens` |
| [Cline](/tools/cline.html) | BYOK per provider | UI reasoning effort, Plan/Act workflow |

### Domain-Specific Picks

| Domain | Top Choice | Runner-Up |
|--------|-----------|-----------|
| Full-stack web (React) | Opus 4.6 (high effort) | GPT-5.2 Codex high |
| Rust | Opus 4.6 + cargo check loop | GPT-5.2 Codex |
| Hard debugging | o3-pro (tested vs Opus 4.1) | GPT-5.2 Codex xhigh |
| Security auditing | o3-pro (tested vs Opus 4.1) | Opus 4.6 max |
| Architecture planning | o3 or Opus 4.6 max | GPT-5.2 xhigh |
| Concurrency bugs | o3-pro | -- |
| Code review | GPT-5.2 high + Opus 4.6 (cross-model) | o3-pro |
| Codebase search | Gemini 3 Flash | Haiku 4.5 |
| Computer vision code | o4-mini-high | -- |
| Local coding (Mac) | Qwen3-30B-A3B | Devstral Small 2 |
| Local agentic (Cline) | Devstral (24B) | Qwen3-30B-A3B |
| Local reasoning | R1-Distill-Qwen-32B | R1 + V3 via Aider |
| Cost-sensitive sub-agent | o3-mini-high | Haiku 4.5 |
| Structured output | Mistral Medium 3 | GPT-4.1 mini |

For the principles behind choosing and switching models, see [Model Selection](/practices/model-selection.html). For comprehensive tool comparisons, see the [Tool Comparison Matrix](/tools/compare.html).
