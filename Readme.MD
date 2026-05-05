# Vercel AI SDK - Notes & Code [TypeScript]

> My personal study notes and code while working through the [Vercel AI SDK Tutorial](https://www.aihero.dev/vercel-ai-sdk-tutorial) by Matt Pocock.  
> Public repo — feel free to learn alongside me!

---

##  About

I'm **Romauld Elochukwu**, a Full-Stack / Backend Engineer (Node.js + TypeScript) documenting my journey into AI Engineering.

-  Portfolio: [romauldelochukwu.site](https://www.romauldelochukwu.site)
-  LinkedIn: Romuald Elochukwu

---

##  Lessons

| # | Lesson | Code | Status |
|---|--------|------|--------|
| 01 | What Is Vercel's AI SDK? | [/lessons/01](./lessons/01-what-is-ai-sdk/) |  |
| 02 | Generate Text | [/lessons/02](./lessons/02-generate-text/) |  |
| 03 | Streaming Text | [/lessons/03](./lessons/03-streaming-text/) |  |
| 04 | System Prompts | [/lessons/04](./lessons/04-system-prompts/) |  |
| 05 | Hot-Swap Models | [/lessons/05](./lessons/05-hot-swap-models/) |  |
| 06 | Message Histories | [/lessons/06](./lessons/06-message-histories/) |  |
| 07 | Local Models | [/lessons/07](./lessons/07-local-models/) |  |
| 08 | Structured Outputs | [/lessons/08](./lessons/08-structured-outputs/) |  |
| 09 | Streaming Objects | [/lessons/09](./lessons/09-streaming-objects/) |  |
| 10 | Generate Enums | [/lessons/10](./lessons/10-generate-enums/) |  |
| 11 | Generate Arrays | [/lessons/11](./lessons/11-generate-arrays/) |  |
| 12 | Alt Text Generator | [/lessons/12](./lessons/12-alt-text-generator/) |  |
| 13 | Extract Data From PDFs | [/lessons/13](./lessons/13-extract-pdf-data/) |  |
| 14 | Embeddings & Vector DBs | [/lessons/14](./lessons/14-embeddings/) |  |
| 15 | Tool Calling | [/lessons/15](./lessons/15-tool-calling/) |  |
| 16 | Build Your First Agent | [/lessons/16](./lessons/16-build-first-agent/) |  |

**Status:**  Done ·  In Progress ·  Coming Soon

---

##  Getting Started

### Prerequisites
- Node.js v18+
- npm or pnpm
- An OpenAI or Anthropic API key

### Installation

```bash
git clone https://github.com/elochukwu3/vercel-ai-sdk-notes.git
cd vercel-ai-sdk-notes
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Fill in your key inside `.env`:

```env
OPENAI_API_KEY=your_key_here
# or
GrOQ_API_KEY=your_key_here
```

### Run a Lesson

```bash
# Using tsx (no build step needed — recommended for learning)
npx tsx lessons/02-generate-text/index.ts

# Type check all files
npm run typecheck

# Build to JS
npm run build
```

---

##  Stack...

- **Runtime:** Node.js
- **Language:** TypeScript
- **Runner:** tsx (run `.ts` files directly, no compile step)
- **AI SDK:** [Vercel AI SDK](https://sdk.vercel.ai)
- **Providers:** OpenAI · Anthropic · (Local via Ollama)
- **Validation:** Zod

---

##  Folder Structure..

```
vercel-ai-sdk-notes/
├── lessons/
│   ├── 01-what-is-ai-sdk/
│   │   ├── index.ts      ← working TypeScript code
│   │   └── notes.md      ← personal notes & key takeaways
│   ├── 02-generate-text/
│   │   ├── index.ts
│   │   └── notes.md
│   └── ... (16 lessons total)
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── CONTRIBUTING.md
└── README.md
```

---

##  Contributing

PRs welcome! Fix a bug, improve notes, or add better examples.

1. Fork the repo
2. Create a branch: `git checkout -b fix/lesson-02`
3. Commit and push
4. Open a Pull Request

---

##  License

MIT — free to use, learn from, and share.

---

> ⭐ Star this repo if it helped you — it helps others find it!