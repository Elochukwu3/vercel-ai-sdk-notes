/**
 * Lesson 13 — Extract Structured Data From PDFs With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to pass a PDF file to an LLM via the messages array
 * - How to combine file input + structured output (Output.object)
 * - How to use mimeType to tell the LLM what file it's receiving
 * - The core pattern behind Fincerta AI's bank statement parser
 *
 * Prerequisites:
 * - Place a PDF invoice in this folder named: invoice.pdf
 * - Or update the path below to point to any PDF on your machine
 *
 * Run:
 *   npx tsx lessons/13-extract-pdf-data/index.ts
 */

import "dotenv/config";

import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { readFileSync } from "fs";
import { z } from "zod";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct"); //Not all providers support file content parts.

// ─── Zod Schema ───────
// Describe every field — gives the LLM the best chance of accuracy
const schema = z
  .object({
    total: z
      .number()
      .describe("The total amount of the invoice."),
    currency: z
      .string()
      .describe("The currency of the total amount."),
    invoiceNumber: z
      .string()
      .describe("The invoice number."),
    companyName: z
      .string()
      .describe("The name of the company issuing the invoice."),
    companyAddress: z
      .string()
      .describe("The address of the company or person issuing the invoice."),
    invoiceeAddress: z
      .string()
      .describe("The address of the company or person receiving the invoice."),
  })
  .describe("The extracted data from the invoice.");

// ─── Extract data from PDF ─
export const extractDataFromInvoice = async (invoicePath: string) => {
  const result = await generateText({
    model,
    output: Output.object({ schema }),
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice.`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath), // load PDF as raw bytes
            mediaType: "application/pdf",     // tell the LLM what it's receiving
          },
        ],
      },
    ],
  });

  return result.output;
};

// ─── Run it ───────────────────────────────────────────────────────────────
console.log(" Extracting data from invoice PDF...\n");

const data = await extractDataFromInvoice("./lessons/13-extract-pdf-data/invoice.pdf");

console.log(" Extracted invoice data:");
console.dir(data, { depth: null });