## Setup — Ollama (since you already have it!)

```bash
# Check Ollama is running
ollama list                    # see your pulled models

# Pull a model if you haven't yet
ollama pull llama3.2           # lightweight and fast
ollama pull mistral            # another great option

# Start Ollama (if not already running)
ollama serve
```

## The Code

```typescript
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const ollama = createOpenAICompatible({
  name: "ollama",
  baseURL: "http://localhost:11434/v1", // Ollama's default URL
});

const model = ollama("llama3.2"); // must match an ollama pulled model
```

## Provider URLs

| Provider | Base URL |
|---|---|
| **Ollama** | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| Any OpenAI-compatible | `http://your-url/v1` |

## Why `maxRetries: 0`?

```typescript
const { text } = await generateText({
  model,
  prompt: input,
  maxRetries: 0, // important for local models
});
```

By default the AI SDK retries failed requests **3 times**.
For cloud APIs this makes sense — network blips happen.
For local models, if it fails it means Ollama isn't running.
Retrying 3 times just wastes time — fail fast instead.

## Install

```bash
npm install @ai-sdk/openai-compatible
```

## Advantages of Local Models

| | Cloud API | Local (Ollama) |
|---|---|---|
| **Cost** | Paid per token | Free forever |
| **Privacy** | Data leaves your machine | Stays 100% local |
| **Internet** | Required | Not needed |
| **Speed** | Fast | Depends on your hardware |
| **Model quality** | GPT-4 / Claude level | Good, not quite as sharp |

## Personal Notes
> This is huge for Fincerta AI — sensitive financial documents
> should never leave the user's machine if possible.
> Running a local model via Ollama means zero data privacy concerns.
> For a fintech product, that's a serious selling point.
> Best part — same AI SDK code, just swap the provider. 