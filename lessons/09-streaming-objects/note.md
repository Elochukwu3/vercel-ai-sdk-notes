# Lesson 09 — Streaming Objects With Vercel's AI SDK

## What This Lesson Covers
Streaming structured objects in real time using `streamText` +
`Output.object()`, seeing the object build up chunk by chunk.

## generateText vs streamText for Objects

| | `generateText` + `Output.object()` | `streamText` + `Output.object()` |
|---|---|---|
| **Returns** | Full object at once | Partial objects as they arrive |
| **Wait time** | Waits for everything | Starts immediately |
| **UX** | User sees nothing, then everything | User sees progress in real time |
| **Best for** | Background tasks, scripts | Chat UIs, dashboards, real-time apps |

## How It Works