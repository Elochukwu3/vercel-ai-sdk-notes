# Lesson 01 — What Is Vercel's AI SDK?

## The Problem It Solves
Every LLM provider [OpenAI, Anthropic, Gemini] has a different API.
Switching providers means rewriting streaming, tool calling, structured outputs — all of it.
The AI SDK gives you ONE unified API for all of them.

## The 3 Parts
- **AI SDK Core** — backend, Node.js/Deno/Bun — THIS is what we learn
- **AI SDK UI** — frontend hooks for React, Svelte etc.
- **AI SDK RSC** — React Server Components

## Key Installs
```bash
npm install ai                    # core SDK
npm install @ai-sdk/openai        # OpenAI provider
npm install @ai-sdk/anthropic     # Anthropic (Claude) provider
```

## Core Functions (preview of what's coming)
- `generateText` — one-shot text response
- `streamText` — stream response token by token
- `generateObject` — structured JSON output
- `streamObject` — stream structured output

## Key Insight
> You don't need to learn a new SDK for every provider.
> Learn the AI SDK once — swap models freely forever.