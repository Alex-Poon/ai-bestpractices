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

The discussion generated 826 points and 38 comments. Key themes:

**Architecture and Attribution**
- **msp26**: Pointed out that Mistral Large 3 uses the DeepSeek V2 architecture but makes no mention of it in the announcement, noting the irony given Mistral's emphasis on openness.
- **simonw**: Shared a demo of the 3B model running in the browser via WebGPU and tested its vision capabilities, finding them decent but not extraordinary.

**Competitive Landscape**
- **mrinterweb**: Noted that DeepSeek 3.2 released the same day and stole much of the thunder, observing that Mistral's benchmarks compared against DeepSeek 3.1 rather than the newer version.
- **nullbio**: Observed that despite Gemini performing best on benchmarks, it still hallucinates more frequently than ChatGPT and Claude in practice, suggesting benchmark performance doesn't tell the full story.

**European AI and Open Source**
- **mythz**: Welcomed Mistral's return to Apache 2.0 licensing after a period of more restrictive releases, noting they're too far from state-of-the-art for proprietary approaches to work.
- **yvoschaap**: Simple but widely-agreed sentiment of support for European AI efforts.
- **simgt**: Questioned the business incentive for releasing genuinely good open-weight models.

**Practical Value**
- **barrell**: Shared positive experience using Mistral models in production, finding them more reliable and cost-effective than GPT-5 for formatting tasks.
- **tucnak**: Highlighted the multilingual capabilities as potentially significant, especially for underrepresented languages like Ukrainian.
