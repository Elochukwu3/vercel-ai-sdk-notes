# Lesson 10 — Generate Enums With Vercel's AI SDK

## What This Lesson Covers
Using `Output.choice()` to get a single constrained string
(enum value) from an LLM — perfect for classification tasks.

## The Core Pattern

```typescript
const result = await generateText({
  model,
  output: Output.choice({
    options: ["positive", "negative", "neutral"] as const,
  }),
  prompt: text,
  system: "Classify the sentiment...",
});

return result.output; // always "positive" | "negative" | "neutral"
```

## Why Output.choice() over plain text?

```typescript
//  generateText returns raw string — could return anything
// "The sentiment is positive" or "Positive!" or "I think it's positive"
const { text } = await generateText({ model, prompt });

//  Output.choice() constrains the output to exactly one of your options
// Always returns "positive", "negative", or "neutral" — nothing else
const result = await generateText({
  output: Output.choice({ options: ["positive", "negative", "neutral"] as const }),
  ...
});
```

## TypeScript Bonus
Using `as const` gives you full type safety:

```typescript
// result.output is typed as "positive" | "negative" | "neutral"
// not just `string`
const sentiment = result.output; //  fully typed
```

## Real World Use Cases

| Task | Options |
|---|---|
| Sentiment analysis | `["positive", "negative", "neutral"]` |
| Email priority | `["low", "medium", "high", "urgent"]` |
| Support ticket routing | `["billing", "technical", "general"]` |
| Content moderation | `["safe", "unsafe", "review"]` |
| Language detection | `["english", "french", "spanish", ...]` |

## API Change Note — AI SDK v5+
Matt's tutorial uses `generateObject` with `output: "enum"`.
In AI SDK v5+ the pattern changed:

```typescript
//  Old (deprecated)
const { object } = await generateObject({
  output: "enum",
  enum: ["positive", "negative", "neutral"],
});

//  New
const result = await generateText({
  output: Output.choice({
    options: ["positive", "negative", "neutral"] as const,
  }),
});
const value = result.output;
```

## Personal Notes
> This is one of the most underrated features in the AI SDK.
> Classification is everywhere in real apps:
> - Fincerta AI: classify transactions as "income", "expense", "transfer"
> - Support bots: route tickets to the right team
> - Content tools: flag inappropriate content before saving
> One LLM call, one constrained string back — clean and reliable.