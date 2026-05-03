# Lesson 03 — Streaming Text With Vercel's AI SDK

## What This Lesson Covers
Using `streamText` to receive AI responses token by token
instead of waiting for the full response at the end.

## generateText vs streamText

| | `generateText` | `streamText` |
|---|---|---|
| **Returns** | Full text at once | Tokens as they arrive |
| **Wait time** | Longer — waits for full response | Instant — starts immediately |
| **Best for** | Scripts, background tasks | Chat UIs, real-time output |
| **Key property** | `text` (string) | `textStream` (async iterable) |

## How Streaming Works