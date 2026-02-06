---
title: "Model Deep Dive"
description: "What every major coding model actually feels like to use — practitioner experiences, failure modes, and when to pick what, drawn from 800+ HN reports."
weight: 2
tags: [models, model-selection, comparison, costs, reasoning]
date: 2026-02-06
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

The defining split in the Claude family is philosophical: **Opus 4.5 is a guided pair programmer**; **Opus 4.6 is an autonomous agent**. This isn't just marketing -- practitioners experience them as fundamentally different tools.

### Opus 4.6 — The Autonomous Agent

Released February 5, 2026. First Opus-class model with 1M token context.

**The design philosophy:** Where 4.5 asks clarifying questions and waits for guidance, 4.6 "plans deeply, runs longer, and asks less of the human" (Rperry2174, Feb 2026). This reflects Anthropic's bet on full delegation over tight human oversight. One practitioner reports 5x longer thinking times -- adaptive thinking appears engaged by default. Another warns that with auto-accept enabled, 4.6 executes beyond instructions.

**Where it shines:** Complex agentic coding, deep context retrieval (93% accuracy at 256K tokens versus Sonnet 4.5's 10.8%), Terminal-Bench 65.4%. One practitioner one-shotted a Gameboy emulator. Best positive-to-negative ratio of any frequently mentioned model.

**Where it struggles:** Writing quality regression versus 4.5 -- one user called it "nerfed" for prose. The practical advice: use 4.6 for coding and agentic work, keep 4.5 available for writing-heavy tasks.

**Thinking keywords (Claude Code-specific):** "think" (low) < "think hard" (medium) < "think harder" (high) < "ultrathink" (31,999 tokens). These set internal thinking budgets and are not base model features.

### Opus 4.5 — The Guided Powerhouse

Released November 24, 2025. The most discussed model in the dataset (158 HN mentions) and the most polarizing.

**What it feels like:** The model that changed practitioner sentiment. Champions call it "an inflection point" (benjiro, Dec 2025). One practitioner reported doing "things in hours I would have worked an entire week on" (skerit, Jan 2026). Another: 259 PRs and 497 commits in 30 days. Twelve iOS apps in two weeks. Critics report "baffling architecture decisions."

**Why it needs guidance:** Opus 4.5 infers coding preferences by reading existing code -- better than explicit CLAUDE.md instructions (nurettin, Dec 2025). It's "lovely at self correcting" versus GPT-5 models that are "more stubborn" (deaux, Dec 2025). But it requires active human direction -- the managerial mindset. It mimics your codebase style rather than imposing its own.

**The counterintuitive cost finding:** Despite being cheaper per token than Sonnet, Amp found Opus actually costs less per completed thread ($2.05 vs $2.75). Sonnet uses more tokens, makes more mistakes, and requires more human intervention. The cheapest model per token is not always the cheapest per task.

**Off-the-rails rate:** 2.4% of spend wasted on problematic outputs (Amp data). Gemini 3 Pro wastes 17.8%. This metric -- what a model costs when it fails -- captures something benchmarks miss entirely.

### Sonnet 4.5 — Never Better Than Opus (But Often Good Enough)

SWE-bench Verified: 77.2%. Handles 90% of coding tasks without difficulty.

**The blunt truth:** "I have never encountered a single situation where Sonnet did a better job than Opus" (thot_experiment, Nov 2025). For Rust, "Opus is much better. Sonnet is much more prone to producing garbage" (dagw, Jun 2025). The quality gap widens dramatically for typed languages: Haskell and Rust show much larger Opus-Sonnet gaps than JavaScript or Python (tommyengstrom, Aug 2025).

**Where Sonnet competes (non-quality dimensions):**
- **Speed for iteration:** Preferred for pair programming by one practitioner who uses Claude Code 80% of the time with Sonnet (extr, Oct 2025)
- **Dynamic languages:** Gap narrows enough that Sonnet may suffice for JS/Python (kasey_junk, Oct 2025)
- **Cost-constrained execution:** "Use Opus for planning, Sonnet to execute the plan" (alwillis, Jul 2025)

**The consistency concern:** Enterprise TypeScript work shows Sonnet has "12-18% variance on repeated prompts" (TulioKBR, Nov 2025). Consistency matters more than peak capability in production pipelines.

**Effort parameter:** Supports low/medium/high. At medium effort, matches its own SWE-bench score using 76% fewer output tokens.

**Opus Plan Mode (`/model opusplan`):** The most-endorsed Claude workflow. Opus for planning, Sonnet for execution. Multiple practitioners confirm this as the ideal cost/quality tradeoff -- but stavros (Nov 2025) warns the pattern breaks when plans are complex enough that Sonnet lacks context to faithfully execute them. Works best when plans are detailed enough that execution is mechanical.

### Haiku 4.5 — Speed Tier (But 200K Context Is the Real Ceiling)

SWE-bench Verified: 73.3% -- within 5 points of best-in-class at one-third the cost. 220 tokens/sec.

**The escalation pattern:** Most Haiku practitioners don't use it alone. They start with Haiku and escalate: "Start with Haiku, switch to Sonnet or Opus for harder or longer tasks" (azuanrb, Dec 2025). This makes Haiku part of a tiered workflow, not a standalone choice.

**The sweet spot beyond "it's fast":**
1. **Repo ingestion and analysis:** Efficient token utilization for understanding codebases -- better than GPT-5 models for this (Topfi, Oct 2025)
2. **Subagent tasks:** Powers Claude Code's Explore subagent, Amp's Rush mode
3. **Conversation management:** Routing, flow control, simple orchestration (chewz, Aug 2025)
4. **Cost-sensitive batch work:** Running many parallel tasks

**The real limitation:** 200K context window, not capability. Large codebases force upgrade to Sonnet. On a complex refactor, Haiku takes 2x longer than Smart mode and is only 19% cheaper -- it spends more tokens fixing its own mistakes. Smaller models acting as context curators for Opus is an emerging pattern: "selectively decide what skills frontmatter to include in context for a bigger model" (vidarh, Jan 2026).

---

## OpenAI Reasoning Models (o-series)

{{< callout type="warning" >}}
**Temporal context matters.** The o-series reports below are from January-September 2025. When practitioners say "Claude" in these comparisons, they mean Sonnet 3.5, Claude 4, or Opus 4.1 -- models that are 1-2 generations behind Opus 4.5/4.6. The relative advantage of o-series models over Claude was likely larger then than it would be today. We note the specific Claude version where identifiable.
{{< /callout >}}

**The key pattern:** Practitioners don't strongly differentiate o3 from o4-mini for coding -- they're used interchangeably as "thinking" models in research/planning phases, with execution delegated to cheaper models (radio879, Aug 2025; data_delaurier, May 2025). For many practitioners, **GPT-5 with high thinking has superseded both o3 and o4-mini** (Tiberium, Aug 2025; nl, Feb 2026; mccoyb, Nov 2025).

### o3

Released February 2025. The architecture and planning specialist.

**What it feels like:** Practitioners consistently describe o3 as a thinking partner, not an implementer. The dominant workflow: use o3 for architecture decisions and planning, then switch to Claude or a faster model for implementation. Output is described as "tidy, thoughtful, and well-commented" (ttul, Jun 2025).

**What practitioners build with it:** 13K lines of Go via Codex with o3, writing only about 100 lines manually (mhandley, Jul 2025). An 8,000-line Android app rewritten in hours using o3-Codex combined with Claude Opus 4 -- described as 10-100x faster (dweekly, Aug 2025).

**The planning pattern:** o3 for architecture, Claude 4 for implementation (Pandabob, Jun 2025). o3 Deep Search for planning, Claude 4 in Cursor for execution (baranoncel, May 2025). o3 as the "brain," smaller models execute (radio879, Aug 2025).

**Current relevance:** The planning pattern likely still holds, but GPT-5 with high thinking is "quite a bit better than o3" for web design and agentic programming (Tiberium, Aug 2025). One practitioner ranks "GPT 5.2 Codex with high thinking" as "the best model currently available" -- above both Gemini and o-series (nl, Feb 2026). Another switched entirely to GPT-5 Codex from Claude Code after 4 months (mccoyb, Nov 2025). The "Claude fails, o3 succeeds" comparisons were made against Opus 4.0/4.1, not the current generation.

### o3-pro

The hard debugging specialist. 10-15 minute response times make interactive use impractical.

**What it feels like:** One-shots problems after Claude Opus 4/4.1 and Gemini 2.5 both failed, finding root causes in 1-2 line fixes (WXLCKNO, Aug 2025). Best at finding race conditions in concurrency code (danenania, Aug 2025). Multiple practitioners recommend it for security auditing (dudeinhawaii Jul 2025, aurareturn Sep 2025).

**The false positive problem:** Confabulates problems during code reviews -- "tends to imagine and report problems in the files that were not provided to it" (boole1854, Jun 2025). Gets confused when given both diffs and full files. Requires 10-20 minute wait times. Higher false positive rate requires manual filtering. One practitioner allocates $200/month primarily to Claude Code despite o3-pro's occasional advantages -- calling it an "occasional paid second opinion, not a daily driver" (boole1854, Jun 2025).

**The review hierarchy (Jun 2025, vs Opus 4/Gemini 2.5 Pro):** o3-pro catches the most issues but with false positives. Claude is more creative but also has false positives. Gemini is the most conservative with fewest false positives (JamesBarney). This dynamic may have shifted with Opus 4.5/4.6.

**Current relevance:** o3-pro's niche -- hard debugging, security auditing, concurrency analysis -- remains strong. Its thoroughness is offset by false positives and impractical latency. Worth it only for high-stakes review where you can wait.

### o3-mini-high — The Speed-Quality Sweet Spot

Exceptional cost-performance ratio. The -high variant is essential.

**What it feels like (Jan-Apr 2025):** "4-10x faster for 80% of the quality" on coding tasks (yzydserd, Jan 2025). Enables real-time interaction while o1-pro requires several minutes. 60% on Aider polyglot at $18 cost (anotherpaulg, Jan 2025). antirez found it outperformed Sonnet 3.5 on complex coding (Jan 2025). Free o3-mini outperformed paid R1 models (GaggiX, Feb 2025).

**Best as a sub-agent:** Integrated for narrow tasks within Plandex agents -- faster at one-third the cost and more reliable than larger models for focused work (danenania, Apr 2025).

**The -high distinction matters:** o3-mini-high significantly outperforms base o3-mini. Practitioners recommend always using the -high variant for serious coding work (chaos_emergent).

**Current relevance:** Superseded by o4-mini (Apr 2025). Its cost-performance niche has been partially absorbed by Haiku 4.5 and Gemini 3 Flash. Still relevant for users on older OpenAI plans.

### o4-mini

Released April 2025. Mixed reception with a critical variant distinction.

**The -high variant is the only one worth using:** o4-mini-high gets strong praise: "Mind-blowing" for computer vision (waynecochran, May 2025). A "domain expert" across React Native versions (l33tman, May 2025). Works "really well in any agentic environment" (radio879, Aug 2025).

**Base o4-mini is weaker:** "Not really that great compared to o3" (stingraycharles, Aug 2025). More thinking tokens do not equal better integration coding (sfaist, Jul 2025). Codex built on o4-mini took 200 requests to change 3 lines of code (andai, Aug 2025).

**Current relevance:** Largely interchangeable with o3 for most practitioners. GPT-5.2 Codex has superseded o4-mini for general coding. o4-mini-high retains its niche for computer vision and mobile development.

---

## GPT-5.x Family (OpenAI)

{{< callout type="info" >}}
**GPT-5.2 base and GPT-5.2-Codex are separate models**, not just branding. "Both are models used by the Codex CLI and the GPT-5-Codex model is recent and fantastically good" (dudeinhawaii, Oct 2025). The Codex variant uses a different, smaller prompt (~10KB vs ~23KB) and is specifically optimized for code (jumploops). They have different personalities, different strengths, and practitioners choose between them deliberately.
{{< /callout >}}

### GPT-5.3 Codex

Released February 5, 2026. The first unified Codex/GPT-5 training stack.

**What it feels like:** Early reports (5 HN mentions) are positive. Terminal-Bench jumped from 64% to 77.3% -- a massive gain in real-world terminal/CLI task completion. 25% faster than GPT-5.2-Codex while using fewer tokens. Can be steered interactively while working without losing context -- a collaboration-first philosophy contrasting with Opus 4.6's autonomous approach (Rperry2174, Feb 2026).

**Key improvements:** Fixed lint loops (models getting stuck in lint-fix cycles), better bug explanations, fixed flaky-test premature completion. Both GPT-5.3-Codex and Opus 4.6 one-shotted a Gameboy emulator -- the Terminal-Bench lead lasted only 35 minutes before Opus 4.6 launched.

### GPT-5.2-Codex — The Instruction-Following Implementer

Released January 14, 2026. A separate model from GPT-5.2 base, optimized specifically for code.

**What makes it different from base:** Codex models "tend to be extremely good at following instructions" whereas base GPT-5.2 "is a little bit more creative" (asabla, Dec 2025). Codex "will often use tools to copy code rather than re-writing the code" -- reducing bug introduction during refactoring. "It takes maybe 5x longer but generates something that I have more confidence in" (dudeinhawaii). On internal benchmarks, the Codex prompt delta improved refactoring from 33.9% to 51.3% (jumploops).

**What it feels like:** "Just one-shots everything" when given the right setup (stavros, built an entire frontend pixel canvas with zero prior experience). "Consistently much better at hard logic problems" -- excels at "complex race conditions or deadlocks" (sothatsit, Oct 2025). Excels at longer runs where Claude Code "literally just gives up" (mmaunder, who spends $70K+/year on AI tooling).

**Reasoning levels are THE key lever.** Practitioner consensus from 45+ Algolia reports:

| Level | What Practitioners Say | Best For |
|-------|----------------------|----------|
| **xhigh** | Praised for complex debugging and architecture. One practitioner built a 20K LOC browser project. Costs 2x Anthropic alternatives ($3,244 vs $1,485 for equivalent benchmark task). | Specs, hard debugging, architecture |
| **high** | Good daily default. Ranked "the best model currently available" by one practitioner (nl, Feb 2026). Multi-day deployment tasks handled successfully. | Daily coding, iterative development |
| **medium** | Surprisingly capable and consistent. Multiple users say it's comparable to Opus 4.5 for standard work. | Routine tasks, best value |
| **low** | Degraded tone, added emojis. Not recommended for coding. | Avoid |

The emerging pattern: run high as standard, escalate to xhigh for specs and debugging, drop to medium for routine tasks. Manual switching is seen as UX friction.

### GPT-5.2 Base — The Creative Planner

Not the same as Codex. Base GPT-5.2 is more conversational and creative, less instruction-following.

**The planning role:** Multiple practitioners use GPT-5.2 Pro / "Thinking - Heavy" for analysis and planning, then hand off to Codex for implementation. "GPT 5.2 Thinking - Heavy for analysis/planning tasks via chat, then copies results to Codex for implementation" (energy123, Feb 2026). Another uses "GPT-5.2 Codex Max for planning" paired with "Opus 4.5 for implementation" in a multi-model orchestrator (sathish316, Feb 2026).

**GPT-5.2 Pro / Thinking-Heavy tier:** The maximum reasoning tier for deep analysis and architecture. Higher cost but excels at complex decomposition and planning. Token-expensive but irreplaceable for architectural decisions. Limited direct practitioner reports on the Instant/Thinking/Pro tier split, but the pattern suggests: Instant for quick completions, Thinking for analysis/planning, Pro for maximum capability.

**The hallucination pattern:** GPT-5.2 base consistently hallucinates CLI utilities and non-existent software features (heavyset_go). Source verification required. Codex variant is more grounded due to instruction-following orientation.

**Benchmark caveat:** SWE-Bench Pro shows GPT-5.2-Codex at 56.4% vs Opus 4.5's 80.9% (mohsen1, Dec 2025). But practitioners report GPT-5.2 variants competitive in daily use -- "every bit as good as Opus but without the groveling and emojis" (rcarmo, Jan 2026). The benchmark gap may not reflect practical experience.

---

## Gemini Family (Google)

### The Flash-Over-Pro Paradox

The most counterintuitive finding in the Gemini data: **Flash is often better than Pro for coding**, not just faster. Multiple independent practitioners confirm this:

- "Possibly controversial take, but IMO Gemini 3 Flash is better than Pro for coding" (Rebelgecko, Dec 2025)
- Flash is "actually smarter in my assessment" for iteration (jtrn, Feb 2026)
- Flash is "an amazing model" while "Gemini 3 Pro isn't great" due to inconsistent reliability (nl, Feb 2026)
- Flash performs "sometimes even better than the Pro version" while being 5 seconds faster and 40% cheaper per user (thecupisblue, Dec 2025)

This isn't about cost tradeoffs -- practitioners are saying Flash produces better, more consistent coding output. Pro's advantage is limited to complex reasoning tasks where you need one thorough pass and can tolerate latency.

### Gemini 3 Flash

Released December 17, 2025. The crowd favorite by a wide margin (11 positive, 3 negative in Algolia data).

**What it feels like:** Speed advantage is real for autonomous coding agents -- "many LLM calls for simple changes" where speed compounds (andai). One practitioner uses Flash exclusively for coding and finds it comparable to Opus at lower cost and faster speed (paxys). Another built a custom agent delivering comparable results at one-tenth the cost (verdverm). Flash is the model one practitioner would switch to "for everything if Flash was a bit cheaper at API usage" (mythz, Jan 2026).

**The cost story:** Monthly AI coding costs of $1-3 using the free tier versus approximately $100 for Claude Code (ginkida). Google's family plan makes it very affordable (jug).

**Where it fails:** Actively disregards instructions and starts running commands on its own (peterldowns). Produces superficial analyses compared to Opus 4.5 (jorl17). Infinite reasoning loops at 3-5% of requests at scale.

**3x faster at codebase search:** Achieves approximately 8 parallel tool calls per iteration versus Haiku 4.5's 2.5 -- completing searches in 3 turns instead of 9. This is why Amp replaced Haiku with Flash for codebase search in December 2025.

### Gemini 3 Pro

Released November 18, 2025. The most inconsistent frontier model -- and it may not be worth the premium over Flash.

**What it feels like:** An exactly even split: 5 positive and 5 negative practitioner reports. "Random whether it works or goes off the rails" (nl, Feb 2026). One user deployed a 100% AI-written production system for two months (qingcharles). Another calls it "terrible at tool-calling" and "borderline unusable in Cursor" (koakuma-chan).

**Why Flash often beats it:** Pro 3 appears less reliable than 2.5 Pro was. The transition from 2.5 to 3 improved Flash dramatically but made Pro less consistent. Practitioners who loved 2.5 Pro for its large context window (1M-2M tokens) and code understanding (int_19h, Apr 2025) don't praise 3 Pro with the same enthusiasm.

**Off-the-rails metric (Amp data):** 17.8% of spend wasted on problematic outputs -- nearly 1 in 5 dollars. For comparison, Opus 4.5 wastes 2.4%. Documented problems include infinite thinking loops, control character corruption, unrequested git commits, and using relative paths instead of absolute.

**CLI tool is near-universally criticized:** Crashes, retains stale file contents, uses 100K tokens where Codex CLI uses 2K for equivalent tasks, ignores explicit instructions to stop. Multiple practitioners report better results using Gemini models through Antigravity, Cline, or Aider rather than Google's own CLI.

**100,000 lines in 2 weeks:** One practitioner generated this volume with Gemini 3, acknowledging the result is "imperfect, perhaps even erroneous" but validated the vibe coding approach for modular frontend projects (Rand_cat). Another converted 7K lines of Python to 35K lines of C, noting it creates an understanding gap (sottol).

---

## Open-Weight Models

### Qwen3 30B-A3B — Consensus Best for Local Coding

MoE architecture gives fast inference on consumer hardware. Multiple practitioners run it successfully on Apple Silicon (M1-M3, 32-64GB) at 30-80 tokens/sec and on RTX 4090.

**What practitioners build with it:** Web dev with custom MCP tools on M3 Pro 36GB (DrAwdeOccarim). Covers 30-50% of tasks locally at 80 tokens/sec on M3 Max (omneity). Sysadmin help on RTX 4090 at 20-30 tokens/sec (bytefactory). The quality gap versus frontier models is noticeable on complex multi-step tasks, but for straightforward coding the gap is small enough to make local-first viable.

**The limitation:** Agentic tool calling is unreliable. Context limitations cause failures in extended workflows (evilduck). Best for chat-based coding assistance, not autonomous multi-step agents.

### Devstral — Most Positive Reports of Any Open-Weight Model

24B size fits on a single RTX 4090 with 24GB VRAM. SWE-bench: 68% (Small 2 variant).

**What practitioners build with it:** Agentic coding via Cline and OpenHands (NitpickLawyer, diggan, incomingpain). A raytracer in C on AMD RX 7900 XTX (badsectoracula). Data processing and summarization on approximately 24GB VRAM (hickelpickle). Described as competitive with Sonnet 3.5 on benchmarks (Lapel2742, Dec 2025) -- note this comparison predates Sonnet 4.5.

**The limitation:** Slow inference speed on consumer GPUs makes interactive daily use impractical for some configurations. Fine-tuning potential noted (cmrdporcupine).

### DeepSeek R1 + V3 — The Architect/Coder Duo

The best hybrid open-weight pattern: R1 as architect, V3 as coder.

**The pattern:** R1-0528 for `/architect` mode and V3-0325 for `/code` mode in Aider -- one practitioner claims this surpassed Claude Code (Sonnet 4 era, Jun 2025) at a fraction of the cost (miroljub). R1 for planning combined with Qwen3 for implementation is an emerging local-first workflow (faangguyindia). R1 excels at reasoning-heavy tasks but runs at 1-2 tokens/sec on consumer hardware, making it practical only for async planning (mechagodzilla, ryan_glass).

**R1-Distill-Qwen-32B:** The popular local reasoning variant. Runs on M2 MacBook at approximately 20GB. Good for refactoring guidance (simonw). Visible reasoning traces valued for learning and verification (m11a).

### Llama 4 — Not Recommended for Coding

Consistently the weakest open-weight model for coding. Maverick scored 16% on the Aider polyglot benchmark (anotherpaulg). Scout has a known bug of "fixing" problems by commenting out code (ach9l). One practitioner described it bluntly as "terrible at coding" (vessenes). The 10M token context window does not compensate for poor code generation quality.

### Kimi K2.5 — Exciting but Unreliable

Generates excitement as a free/cheap alternative (76% cheaper than Opus). One user cancelled their Claude Code subscription in favor of Kimi CLI (vuldin). But hallucinations in tool use are frequent -- hallucinates commands and gets syntax wrong (helpfulclippy). Tool call issues in production multi-agent systems (kageiit). Not yet reliable enough for unsupervised agentic work.

---

## Head-to-Head: How They Actually Compare

### Opus vs GPT-5.x Codex

No universal winner. GPT-5 preferred for strict instruction following -- Claude "takes more liberties with packages" (Topfi). Opus preferred for complex reasoning and agentic coding. Cost is a major factor: Opus is approximately 10x more expensive at the API level. One practitioner says GPT-5.2 and Opus are neck-and-neck -- GPT variants feel more direct while Opus excels at complex reasoning (jumploops). GPT-5.3-Codex leads terminal coding by approximately 12%; Opus leads general benchmarks (karmasimida).

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
