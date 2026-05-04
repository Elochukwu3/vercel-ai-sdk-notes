# Lesson 08 — Structured Outputs With Vercel's AI SDK

## What This Lesson Covers
Using `generateObject` + Zod to get typed, structured data
from an LLM instead of raw text.

## generateText vs generateObject

| | `generateText` | `generateObject` |
|---|---|---|
| **Returns** | Raw string | Typed object matching your schema |
| **Use case** | Chat, summaries | Data extraction, forms, APIs |
| **Type safety** |  None |  Full TypeScript types |
| **Parsing needed** | Yes — manual | No — SDK handles it |

## How It Works