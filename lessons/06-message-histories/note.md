# Lesson 06 — Working With Message Histories In Vercel's AI SDK

## What This Lesson Covers
How to track conversation history using `ModelMessage`,
build a stateless server with Hono, and call it from a client.

## The ModelMessage Type

```typescript
import { type ModelMessage } from "ai";
```

Every message has two required properties:

| Property | Type | Description |
|---|---|---|
| `role` | `"user" \| "assistant" \| "system" \| "tool"` | Who sent the message |
| `content` | `string` | The message content |

```typescript
const messages: ModelMessage[] = [
  { role: "system",    content: "You are a friendly greeter." },
  { role: "user",      content: "Hello, you!" },
  { role: "assistant", content: "Hi there!" },
];
```

## How Conversation History Works