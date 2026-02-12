---
title: "GLM-5: Targeting complex systems engineering and long-horizon agentic tasks"
source_url: "https://z.ai/blog/glm-5"
hn_url: "https://news.ycombinator.com/item?id=46974853"
date: 2026-02-11
hn_points: 407
hn_comment_count: 483
tags: [model-release, china-ai, agentic-vision, benchmarks, open-source-ai]
tier: 2
weight: 1
---

## Summary

Zhipu AI (Z.ai) released GLM-5, an open-weight mixture-of-experts model with 744 billion total parameters and 40 billion active parameters, licensed under MIT. The model targets what Z.ai calls "agentic engineering" — complex, multi-stage systems tasks that require autonomous decomposition of requirements, long-horizon planning, and sustained context coherence across extended workflows.

GLM-5 scales up from its predecessor GLM-4.7 (368B parameters) with pre-training expanded from 23 trillion to 28.5 trillion tokens. On agentic benchmarks like Vending Bench 2, it claims the top position among open-source models and approaches the performance of proprietary frontier models like Claude Opus 4.5 and GPT-5.2 on reasoning, coding, and long-horizon task execution.

A notable technical contribution is SLIME, an open-source asynchronous reinforcement learning training framework that Z.ai also released under MIT license. SLIME addresses a key bottleneck in RL training: rollout generation, which typically consumes over 90% of training time. Their Active Partial Rollouts (APRIL) strategy tackles the long-tail efficiency problem, significantly accelerating the iteration cycle for complex agentic tasks. This framework was also used behind GLM-4.5, 4.6, and 4.7.

The model is available through OpenRouter, Ollama, and Hugging Face. The release positions Z.ai as a leading force in open-weight AI, continuing the trajectory established by DeepSeek in demonstrating that Chinese labs can produce frontier-competitive models with open licensing. Early user reports suggest the model performs well for focused coding tasks at competitive pricing, though some users note it still requires more instruction clarity compared to proprietary alternatives and may lag in custom tool-calling scenarios.

## Key Insights

- **Open-weight models closing the gap**: GLM-5 demonstrates that the performance delta between open-source and proprietary frontier models continues to narrow, particularly on agentic and coding benchmarks
- **RL infrastructure matters more than compute**: The open-sourcing of SLIME suggests that reinforcement learning training infrastructure, not just pre-training scale, is becoming the key differentiator in model quality
- **Benchmark skepticism persists**: HN commenters noted that GLM-5 benchmarks compare against previous-generation models (Opus 4.5, GPT-5.2) and that open-weight models consistently show benchmark-to-practice gaps
- **Self-hosting independence**: The MIT license and availability on Ollama make GLM-5 attractive for teams wanting to run AI locally without dependence on proprietary API providers
- **User preferences approaching saturation**: Some commenters observed diminishing perceptual returns between model generations, suggesting user needs may be plateauing

## Notable Quotes

> "Training infrastructure compounds" — jfaganel99 on why open-sourcing SLIME matters more than benchmarks

> "Benchmarks are temporary" — jfaganel99

## HN Discussion Highlights

**jfaganel99** argued that the most underappreciated aspect of the release is SLIME, the open-source RL training framework. Claimed the real gap between frontier and non-frontier models lies in RL infrastructure rather than pre-training compute. Noted that the APRIL strategy for rollout efficiency is a genuine systems contribution, and that both the model and training infra being MIT-licensed matters more than benchmark margins.

**simonw** tested GLM-5 via OpenRouter with an SVG generation task, getting mixed results — a well-rendered pelican but a poor bicycle frame. Shared results via GitHub gist.

**NiloCK** reflected on the trajectory of open-weight models, observing that even N-2 generation models are beginning to satisfy user preferences. Noted that Opus 4.6 was not a perceptible leap over 4.5 in their workflows, despite being objectively better. Suggested open-weight alternatives benefiting from distillation will inevitably catch up as user needs saturate.

**mythz** highlighted the significance of Chinese open-source AI for self-hosted inference, noting that while self-hosting does not make financial sense given current API pricing, the independence from proprietary providers has value. Observed macOS is currently the best consumer platform for running large local models.

> **mythz** (separate comment): Also flagged MiniMax M2.5 as a strong general-purpose alternative, noting GLM-5 is better at coding but MiniMax wins on speed and tool-calling support.

**Aurornis** expressed benchmark skepticism, noting GLM-5 compares against last-generation models (Opus 4.5, GPT-5.2) rather than current competitors. Observed a pattern of open-weight models showing impressive benchmarks but underperforming in actual use.

**justinparus** shared hands-on experience with GLM-4.7, finding it comparable to Sonnet but requiring more instruction clarity. Uses it for well-defined smaller tasks where pricing is advantageous, while reserving Anthropic models for larger complex changes.

**2001zhaozhao** praised GLM-4.7-Flash as the first local coding model that felt genuinely useful, comparing its intelligence to Claude 4.5 Haiku at a similar parameter size. Found its reasoning traces clear and interpretable, and reported it outperforms Devstral 2 Small and Qwen-Coder-Next locally.

**pcwelder** tested GLM-5 on OpenRouter and found it performed poorly on their custom tool-calling benchmark, noting it could not follow a custom tool-calling format at all.

**tosh** revealed that the "pony-alpha" model previously available on OpenRouter was actually GLM-5 in disguise, linking to confirmation from Z.ai.

**knbknb** tested factual accuracy, finding GLM-4.7 confidently gave a wrong answer about a jq function name and persisted even when corrected. GLM-5 answered correctly in the chat interface but the API returned rate-limiting errors.

**dev_l1x_be** asked about practical usage, noting that previous GLM models restricted basic system engineering tasks like SSH.
