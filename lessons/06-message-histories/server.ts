import "dotenv/config";

import { generateText, type ModelMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { once } from "node:events";

const model = groq("llama-3.1-8b-instant");

export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", async (ctx) => {
    const messages: ModelMessage[] = await ctx.req.json();

    const result = await generateText({
      model,
      messages,
    });

    return ctx.json(result.response.messages);
  });

  const server = serve({
    fetch: app.fetch,
    port: 4317,
    hostname: "0.0.0.0",
  });

  await once(server, "listening");
  console.log("Server running at http://localhost:4317");

  return server;
};