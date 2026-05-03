# Lesson 05 — Hot-Swap AI Models With Vercel's AI SDK

## What This Lesson Covers
Using the `LanguageModel` type to decouple your AI functions
from any specific provider or model.

## The Core Idea — Dependency Injection

Instead of hardcoding the model inside your function:
```typescript
// ❌ Tightly coupled — function is locked to Groq forever
export const ask = async (prompt: string) => {
  const { text } = await generateText({
    model: groq("llama-3.1-8b-instant"), // hardcoded
    prompt,
  });
  return text;
};
```

You inject it as a parameter:
```typescript
//  Decoupled — works with ANY provider
export const ask = async (
  prompt: string,
  model: LanguageModel  // injected from outside
) => {
  const { text } = await generateText({ model, prompt });
  return text;
};
```

## Why LanguageModel Type?
- Exported directly from the `ai` package
- Accepts any provider — Groq, Gemini, Anthropic, OpenAI
- TypeScript will catch it if you pass something invalid

## Real World Value
```typescript
// Same function, different models for different use cases
await ask("Summarize this", groq("llama-3.1-8b-instant"));     // fast & free
await ask("Write a contract", anthropic("claude-opus-4"));     // powerful
await ask("Translate this", google("gemini-1.5-flash"));       // cheap
```

## Personal Notes
> This is one of the most practical lessons in the whole series.
> In Finverta AI, this pattern means you can switch the model
> powering the bank statement parser without touching any
> other part of the codebase — just swap the injected model.
> That's production-grade architecture right there.