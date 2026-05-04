/**
 * Lesson 14 — Create Embeddings With Vercel's AI SDK
 *
 * What you'll learn:
 * - What embeddings are and why they matter
 * - How to use embedMany() to embed multiple values at once
 * - How to build a simple in-memory vector database
 * - How to use embed() for a single search term
 * - How to use cosineSimilarity() to find the most similar entries
 *
 * Run:
 *   npx tsx lessons/14-embeddings/index.ts
 */

import "dotenv/config";

import { embedMany, embed, cosineSimilarity } from "ai";
import { groq } from "@ai-sdk/groq";

// Groq has a free embedding model
const model = groq.textEmbeddingModel("nomic-embed-text-v1_5-8192");

// ─── Step 1: Embed multiple values 
const values = ["Dog", "Cat", "Car", "Bike"];

const { embeddings } = await embedMany({
  model,
  values,
});

console.log(" Raw embeddings (first 5 numbers of each):");
embeddings.forEach((embedding, i) => {
  console.log(`  ${values[i]}: [${embedding.slice(0, 5).map(n => n.toFixed(4)).join(", ")} ...]`);
});

// ─── Step 2: Build a simple vector database 
// In production: use Postgres + pgvector, Pinecone, Supabase, etc.
const vectorDatabase = embeddings.map((embedding, index) => ({
  value: values[index],
  embedding,
}));

console.log("\n Vector database built with", vectorDatabase.length, "entries");

// ─── Step 3: Embed a search term
const searchTerm = "Canine";

const { embedding: searchEmbedding } = await embed({
  model,
  value: searchTerm,
});

console.log(`\n Searching for: "${searchTerm}"`);

// ─── Step 4: Calculate cosine similarity 
const results = vectorDatabase
  .map((entry) => ({
    value: entry.value,
    similarity: cosineSimilarity(entry.embedding, searchEmbedding),
  }))
  .sort((a, b) => b.similarity - a.similarity); // highest similarity first

console.log("\n Results ranked by similarity:");
results.forEach((result, i) => {
  const bar = "█".repeat(Math.round(result.similarity * 20));
  console.log(
    `  ${i + 1}. ${result.value.padEnd(6)} ${bar} ${result.similarity.toFixed(4)}`
  );
});

console.log(`\n Most similar to "${searchTerm}": ${results[0].value}`);