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

### Opus 4.6

The current Anthropic frontier. Released February 5, 2026. First Opus-class model with 1M token context.

**What it feels like:** More autonomous than its predecessor. Where Opus 4.5 would ask clarifying questions, 4.6 makes changes and moves forward. One practitioner reports 5x longer thinking times -- adaptive thinking appears engaged by default. Another warns that with auto-accept enabled, 4.6 executes beyond instructions. The VS Code team is experimenting with high thinking plus adaptive thinking as default settings.

**Where it shines:** Complex agentic coding, deep context retrieval (93% accuracy at 256K tokens versus Sonnet 4.5's 10.8%), Terminal-Bench 65.4%. One practitioner one-shotted a Gameboy emulator. Another sent 900 Portuguese poems and got an impeccable analysis. Best positive-to-negative ratio of any frequently mentioned model (38 mentions, 9 positive, 4 negative).

**Where it struggles:** Writing quality regression versus 4.5 -- one user called it "nerfed" for prose. The practical advice: use 4.6 for coding and agentic work, keep 4.5 available for writing-heavy tasks.

**Thinking keywords (Claude Code-specific):** "think" (low) < "think hard" (medium) < "think harder" (high) < "ultrathink" (31,999 tokens). These set internal thinking budgets and are not base model features.

### Opus 4.5

Released November 24, 2025. The most discussed model in the dataset (158 HN mentions) and the most polarizing.

**What it feels like:** The model that changed practitioner sentiment. Champions call it "an inflection point" and describe a visible step change from previous models. One practitioner reported 259 PRs and 497 commits in 30 days. Another built twelve iOS apps in two weeks. Critics report "baffling architecture decisions" and say it's "not much different than any previous models."

**The domain split:** The positive/negative divide correlates with domain. React, Rust, and C# developers skew positive. Those working with legacy codebases, data science, or novel domains report more frustration.

**The counterintuitive cost finding:** Despite being cheaper per token than Sonnet, Amp found Opus actually costs less per completed thread ($2.05 vs $2.75). Sonnet uses more tokens, makes more mistakes, and requires more human intervention. The cheapest model per token is not always the cheapest per task.

**Off-the-rails rate:** 2.4% of spend wasted on problematic outputs (Amp data). Gemini 3 Pro wastes 17.8%. This metric -- what a model costs when it fails -- captures something benchmarks miss entirely.

### Sonnet 4.5

The workhorse. Handles 90% of coding tasks without difficulty, per Claude Code documentation. SWE-bench Verified: 77.2%.

**What it feels like:** Reliable, predictable, fast. The default execution model in `opusplan` mode (Opus plans, Sonnet executes). Claude Code falls back to Sonnet when Opus quota is hit. Not where you go for peak capability, but where you go for steady throughput.

**Effort parameter:** Supports low/medium/high. At medium effort, matches its own SWE-bench score using 76% fewer output tokens. Effort levels are behavioral signals, not strict budgets -- even at low, it will still think on hard problems.

**Opus Plan Mode (`/model opusplan`):** Multiple practitioners endorse this as the ideal cost/quality tradeoff. Opus for planning, Sonnet for execution. One describes the plans as "more predictable." Without it, Sonnet produces less thought-out plans.

### Haiku 4.5

The speed tier. SWE-bench Verified: 73.3% -- within 5 points of best-in-class at one-third the cost.

**What it feels like:** 220 tokens/sec. One practitioner prefers Haiku 4.5 for most coding tasks over Sonnet, reserving Sonnet for tasks that specifically require deeper reasoning. The value proposition is compelling: near-frontier quality at dramatically lower cost and faster response.

**Where practitioners use it:** Subagent tasks, codebase exploration (powers Claude Code's Explore subagent), background token operations. Amp uses it for Rush mode (small, well-defined tasks) and titling.

**The catch:** On a complex refactor, Haiku takes 2x longer than Smart mode and is only 19% cheaper -- it spends more tokens fixing its own mistakes. Best for straightforward, well-scoped work.

---

## OpenAI Reasoning Models (o-series)

{{< callout type="warning" >}}
**Temporal context matters.** The o-series reports below are from January-September 2025. When practitioners say "Claude" in these comparisons, they mean Sonnet 3.5, Claude 4, or Opus 4.1 -- models that are 1-2 generations behind Opus 4.5/4.6. The relative advantage of o-series models over Claude was likely larger then than it would be today. We note the specific Claude version where identifiable.
{{< /callout >}}

### o3

Released February 2025. The architecture and planning specialist.

**What it feels like:** Practitioners consistently describe o3 as a thinking partner, not an implementer. The dominant workflow pattern: use o3 for architecture decisions and planning, then switch to Claude or a faster model for implementation. The output is described as "tidy, thoughtful, and well-commented" (ttul, Jun 2025). Moderately better than GPT-5 at context retention over long tool-use chains (vessels, Aug 2025).

**What practitioners build with it:** 13K lines of Go via Codex with o3, writing only about 100 lines manually (mhandley, Jul 2025). An 8,000-line Android app rewritten in hours using o3-Codex combined with Claude Opus 4 -- described as 10-100x faster (dweekly, Aug 2025). Full-stack productivity doubling reported across projects (TekMol, May 2025).

**The planning pattern:** o3 for architecture, Claude 4 for implementation (Pandabob, Jun 2025). o3 Deep Search for planning, Claude 4 in Cursor for execution (baranoncel, May 2025). o3 for technology research, Claude Code for component generation (gravity9, May 2025). o3 as the "brain," smaller models execute (radio879, Aug 2025).

**Reasoning effort:** Most coding practitioners default to high. 1,000-2,000 reasoning tokens for routine coding, 5,000+ for hard problems (energy123).

**Current relevance:** The planning pattern likely still holds -- o3's architectural thinking is a distinct capability. But the "Claude fails, o3 succeeds" comparisons were made against Opus 4.0/4.1, not the current 4.5/4.6 generation. The gap has likely narrowed.

### o3-pro

The hard debugging specialist. 10-15 minute response times make interactive use impractical, but for the right task, nothing else comes close.

**What it feels like:** One-shots problems after Claude Opus 4/4.1 and Gemini 2.5 both failed, finding root causes in 1-2 line fixes (WXLCKNO, Aug 2025). Best at finding race conditions in concurrency code (danenania, Aug 2025). Multiple practitioners recommend it as the top choice for security auditing and bug detection (dudeinhawaii Jul 2025, aurareturn Sep 2025). Planning specificity from o3-pro "changed how a team thinks about their future" (swyx, Jun 2025).

**Where it fails:** Confabulates problems during code reviews -- gets confused seeing code twice (boole1854, Jun 2025). Can fixate on a wrong hypothesis despite contrary evidence (GMoromisato, Jul 2025). Lags behind Sonnet 3.5 for basic code generation -- but this comparison predates Sonnet 4.5 (danenania, Aug 2025). Output lengths severely limited in the ChatGPT interface versus API (jameshiew, Jul 2025).

**The review hierarchy (Jun 2025, vs Opus 4/Gemini 2.5 Pro):** o3-pro catches the most issues but with false positives. Claude is more creative but also has false positives. Gemini is the most conservative with fewest false positives (JamesBarney). Using multiple models for review catches different things. This dynamic may have shifted with Opus 4.5/4.6.

**Current relevance:** o3-pro's niche -- hard debugging, security auditing, concurrency analysis -- remains strong. These are reasoning-intensive tasks where extended thinking time genuinely helps. Whether Opus 4.6 at max effort has closed the gap is untested in the practitioner data.

### o3-mini

Exceptional cost-performance ratio. The best value in the o-series family.

**What it feels like (Jan-Apr 2025):** 60% on the Aider polyglot benchmark at $18 cost -- nearly matching o1 at 10x lower expense (anotherpaulg, Jan 2025). antirez found it outperformed Sonnet 3.5 on complex coding (Jan 2025) -- notably, Sonnet 3.5 was the frontier Claude model at the time. Top 5% Codeforces ranking (anonylizard, Feb 2025). Free o3-mini outperformed paid R1 models (GaggiX, Feb 2025).

**Best as a sub-agent:** Integrated for narrow tasks within Plandex agents -- faster at one-third the cost and more reliable than larger models for focused work (danenania, Apr 2025). Uses o3-mini-high for planning, delegates execution to Claude for inline edits (rotcev, Feb 2025).

**The -high distinction matters:** o3-mini-high significantly outperforms base o3-mini. Performance varies greatly by reasoning effort level (chaos_emergent). Practitioners recommend always using the -high variant for serious coding work.

**Current relevance:** o3-mini was superseded by o4-mini (Apr 2025). Its cost-performance niche has been partially absorbed by Haiku 4.5 (Oct 2025) and Gemini 3 Flash (Dec 2025). Still relevant for users on older OpenAI plans or local deployments.

### o4-mini

Released April 2025. Mixed reception with a critical variant distinction.

**What it feels like (Apr-Aug 2025, vs Claude Sonnet 4/Opus 4.1):** The o4-mini-high variant gets strong praise. "Mind-blowing" for computer vision and OpenCV (waynecochran, May 2025). Called a "domain expert" across React Native framework versions (l33tman, May 2025). A 7-hour session maintaining 15-file context impressed one user (TrackerFF, Jul 2025). Works "really well in any agentic environment" (radio879, Aug 2025).

**Base o4-mini is weaker:** Described as "not really that great compared to o3" (stingraycharles, Aug 2025). More thinking tokens do not equal better integration coding (sfaist, Jul 2025). Codex built on o4-mini took 200 requests to change 3 lines of code (andai, Aug 2025). Hallucinated architectural details where Claude Code (Sonnet 4) performed well (gklitt, Apr 2025).

**Complementary pairing:** Claude 3.7 as orchestrator plus o4-mini for reasoning achieved 59.7% on SWE-bench Lite (kate_at_refact, May 2025). Multi-agent deliberation with o4-mini in a council outperforms single models (esamust, Apr 2025). Good for cheaper inference on business use cases, not for complex coding (mind-blight, Aug 2025).

**Current relevance:** o4-mini-high's domain expertise (computer vision, React Native) is a genuine strength that likely persists. GPT-5.2 Codex (Jan 2026) has largely superseded o4-mini for general coding tasks, but o4-mini-high may still be the best choice for specific vision and mobile development workflows.

---

## GPT-5.x Codex (OpenAI)

### GPT-5.3 Codex

Released February 5, 2026. The first unified Codex/GPT-5 training stack.

**What it feels like:** Early reports (5 HN mentions) are positive. Terminal-Bench jumped from 64% to 77.3% -- a massive gain in real-world terminal/CLI task completion. 25% faster than GPT-5.2-Codex while using fewer tokens. Can be steered interactively while working without losing context.

**Key improvements:** Fixed lint loops (models getting stuck in lint-fix cycles), better bug explanations, fixed flaky-test premature completion. One practitioner noted both GPT-5.3-Codex and Opus 4.6 one-shotted a Gameboy emulator -- the Terminal-Bench lead lasted only 35 minutes before Opus 4.6 launched.

### GPT-5.2 Codex

Released January 14, 2026. The model that made Codex CLI competitive again.

**What it feels like:** "Just one-shots everything" when given the right setup (stavros, who built an entire frontend pixel canvas with zero prior experience). "Reliably good" -- earning the default position for daily use by multiple practitioners. Excels at longer runs on hard problems where Claude Code "literally just gives up" (mmaunder, who spends $70K+/year on AI tooling).

**Reasoning levels are THE key lever.** Practitioner consensus from 45+ Algolia reports:

| Level | What Practitioners Say | Best For |
|-------|----------------------|----------|
| **xhigh** | Praised for complex debugging and architecture. One practitioner built a 20K LOC browser project. Costs 2x Anthropic alternatives ($3,244 vs $1,485 for equivalent benchmark task). | Specs, hard debugging, architecture |
| **high** | Good daily default. Balances thinking time effectively. Multi-day deployment tasks handled successfully. | Daily coding, iterative development |
| **medium** | Surprisingly capable and consistent. Multiple users say it's comparable to Opus 4.5 for standard work. | Routine tasks, best value |
| **low** | Degraded tone, added emojis. Not recommended for coding. | Avoid |

The emerging pattern: run high as standard, escalate to xhigh for specs and debugging, drop to medium for routine tasks. Manual switching is seen as UX friction.

**The hallucination pattern:** GPT-5.2 consistently hallucinating CLI utilities and non-existent software features is a recurring theme (heavyset_go). Source verification required.

---

## Gemini Family (Google)

### Gemini 3 Flash

Released December 17, 2025. The crowd favorite by a wide margin (11 positive, 3 negative in Algolia data).

**What it feels like:** Speed advantage is real for autonomous coding agents -- "many LLM calls for simple changes" where speed compounds (andai). One practitioner uses Flash exclusively for coding and finds it comparable to Opus at lower cost and faster speed (paxys). Another built a custom agent delivering comparable results at one-tenth the cost (verdverm).

**The cost story:** Monthly AI coding costs of $1-3 using the free tier versus approximately $100 for Claude Code (ginkida). Google's family plan makes it very affordable (jug). Self-described "controversial take" from one user: Flash is better than Pro for coding (Rebelgecko).

**Where it fails:** Actively disregards instructions and starts running commands on its own (peterldowns). Produces superficial analyses compared to Opus 4.5 (jorl17). Infinite reasoning loops at 3-5% of requests at scale.

**3x faster at codebase search:** Achieves approximately 8 parallel tool calls per iteration versus Haiku 4.5's 2.5 -- completing searches in 3 turns instead of 9. This is why Amp replaced Haiku with Flash for codebase search in December 2025.

### Gemini 3 Pro

Released November 18, 2025. The most inconsistent frontier model.

**What it feels like:** An exactly even split: 5 positive and 5 negative practitioner reports. One user deployed a 100% AI-written production system for two months using mostly Gemini 3 Pro and Opus 4.5 (qingcharles). Another calls it "terrible at tool-calling" and "borderline unusable in Cursor" (koakuma-chan). One user sums it up: "random whether it works or goes off the rails" (nl).

**The architecture vs implementation split:** Gemini excels at high-level architecture and fresh project scaffolding. Claude is preferred for detailed implementation and instruction-following. This pattern appears in multiple independent reports (verdverm, SkyPuncher, thyb23).

**Off-the-rails metric (Amp data):** 17.8% of spend wasted on problematic outputs -- nearly 1 in 5 dollars. For comparison, Opus 4.5 wastes 2.4%. Documented problems include infinite thinking loops, control character corruption, thinking prose leaking into outputs, unrequested git commits, and using relative paths instead of absolute.

**CLI tool is near-universally criticized:** Crashes, retains stale file contents, uses 100K tokens where Codex CLI uses 2K for equivalent tasks, ignores explicit instructions to stop. Multiple practitioners report better results using Gemini models through Antigravity, Cline, or Aider rather than Google's own CLI.

**100,000 lines in 2 weeks:** One practitioner generated this volume with Gemini 3, acknowledging the result is "imperfect, perhaps even erroneous" but validated the vibe coding approach for modular frontend projects (Rand_cat). Another converted 7K lines of Python to 35K lines of C, noting it "lowers the initial mental burden" but creates an understanding gap (sottol).

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

### Model Stability (Current Generation)

Dramatically improved. Frustrations with previous models going off the rails are "almost completely gone" for one practitioner (reassess_blind). Key advice: recognize early signs of derailment -- phrases like "simpler approach" signal failure (CuriouslyC). Fragment tasks, and reset context rather than trying to steer back (vidarh). Task size is the strongest predictor of derailment.

---

## Multi-Model Workflows

### The DreamTeam Pattern

The most reported workflow across all data sources:

| Role | Model | Why |
|------|-------|-----|
| Architect/Planner | Opus 4.6, o3, or GPT-5.2 xhigh | Deep multi-step reasoning |
| Implementer | Sonnet 4.5 or GPT-5.2 medium | Speed; plan already exists |
| Reviewer | GPT-5.2 high + Opus 4.6 | "They find different things" |
| Security Auditor | o3-pro | One-shots concurrency bugs and security issues (tested vs Opus 4.0/4.1) |
| Codebase Search | Gemini 3 Flash | 3x faster with parallel tool calls |
| Sub-agent Tasks | Haiku 4.5 or o3-mini | Cost-effective focused work |

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
