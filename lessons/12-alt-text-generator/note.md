# Lesson 12 — Build an Alt Text Generator With Vercel's AI SDK

## What This Lesson Covers
Passing images to LLMs via the messages array —
both from local files and from URLs.

## Two Ways to Pass an Image

**Option 1 — Local file (Uint8Array)**
```typescript
import { readFileSync } from "fs";

const imageAsUint8Array = readFileSync("./image.jpg");

messages: [
  {
    role: "user",
    content: [
      {
        type: "image",
        image: imageAsUint8Array, // raw bytes
      },
    ],
  },
]
```

**Option 2 — URL (let the SDK handle it)**
```typescript
messages: [
  {
    role: "user",
    content: [
      {
        type: "image",
        image: new URL("https://example.com/image.jpg"),
      },
    ],
  },
]
```
Wrap with `new URL()` — tells the SDK this is a web URL,
not a raw string. The LLM downloads and reads it directly.

## Why messages[] Instead of prompt?
Images can't be passed as a plain prompt string.
They go in the `messages` array as content parts:

```typescript
// ❌ Can't do this
generateText({ model, prompt: imageAsUint8Array });

// ✅ Must use messages array with content parts
generateText({
  model,
  messages: [
    {
      role: "user",
      content: [
        { type: "image", image: imageAsUint8Array },
        { type: "text", text: "What is in this image?" } // optional
      ],
    },
  ],
});
```

## readFileSync vs readFile

```typescript
// readFileSync — simple, blocking (fine for scripts)
const image = readFileSync("./image.jpg");

// readFile — async, non-blocking (better for servers)
import { readFile } from "fs/promises";
const image = await readFile("./image.jpg");
```
For a learning script — `readFileSync` is fine.
For a production API server — use `readFile` from `fs/promises`.

## Vision-Supported Groq Models
Not all models support images. Use these on Groq:
- `meta-llama/llama-4-scout-17b-16e-instruct` ✅
- `meta-llama/llama-4-maverick-17b-128e-instruct` ✅

## Real World Use Cases

| Use Case | How |
|---|---|
| Auto alt text for CMS uploads | Pass uploaded image URL |
| Receipt/invoice scanner | Pass local file bytes |
| Product image descriptions | Pass e-commerce image URLs |
| Bank statement OCR (Fincerta AI) | Pass PDF/image bytes |

## Fincerta AI Connection
```typescript
// Core of Fincerta AI — pass bank statement image to LLM
const statementBytes = readFileSync(uploadedFilePath);

const { text } = await generateText({
  model,
  system: "Extract all transactions from this bank statement as JSON.",
  messages: [
    {
      role: "user",
      content: [{ type: "image", image: statementBytes }],
    },
  ],
});
```
This is literally how the PDF/image parsing works. 🔥

## Personal Notes
> This lesson connects everything for Fincerta AI.
> Bank statements come in as PDFs or images —
> you load them as bytes, pass them to the model,
> combine with Output.array() from lesson 11,
> and you get structured transaction data back.
> Lesson 08 + 11 + 12 = the core of Fincerta AI.