/**
 * Lesson 12 — Build an Alt Text Generator With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to pass images to LLMs via the messages array
 * - How to load a local image file as Uint8Array using readFileSync
 * - How to pass an image URL directly to the AI SDK
 * - Real world use case: accessibility alt text generation
 *
 * Run:
 *   npx tsx lessons/12-alt-text-generator/index.ts
 */

import "dotenv/config";

import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { readFileSync } from "fs";

// Note: Vision/image support requires a model that supports it
// Groq vision models: llama-4-scout, llama-4-maverick
const model = groq("meta-llama/llama-4-scout-17b-16e-instruct");

// ─── System Prompt 
const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not exceed 160 characters. ` +
  `Use simple language.`;

// ─── Option 1: Describe image from local file 
export const describeImageFromFile = async (
  imagePath: string
): Promise<string> => {
  // Load image into memory as raw bytes (Uint8Array)
  const imageAsUint8Array = readFileSync(imagePath);

  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: imageAsUint8Array, 
          },
        ],
      },
    ],
  });

  return text;
};

// ─── Option 2: Describe image from URL 
export const describeImageFromUrl = async (
  imageUrl: string
): Promise<string> => {
  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl), // wrap in URL — SDK handles the download
          },
        ],
      },
    ],
  });

  return text;
};

// ─── Run it ───────

// Test with a URL (no local file needed)
// Unsplash direct image — always works
const imageUrl =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
  
console.log("Generating alt text from URL...\n");
const altText = await describeImageFromUrl(imageUrl);
console.log("Alt text:", altText);

// Uncomment to test with a local file:
// console.log("\n  Generating alt text from local file...\n");
// const localAltText = await describeImageFromFile("./fireworks.jpg");
// console.log("Alt text:", localAltText);