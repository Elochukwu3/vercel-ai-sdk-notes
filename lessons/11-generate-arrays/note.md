# Lesson 11 — Generate Arrays With Vercel's AI SDK

## What This Lesson Covers
Generating arrays of typed objects using `Output.array()` —
both all at once and streamed element by element.

## The Core Pattern

```typescript
// Generate all at once
const result = await generateText({
  model,
  output: Output.array({ element: userSchema }),
  prompt: "Generate 5 fake users from Nigeria.",
  system: "You are generating fake user data.",
});

const users = result.output; // fully typed User[]
```

## generateText vs streamText for Arrays

| | `generateText` | `streamText` |
|---|---|---|
| **Returns** | Full array at once | Elements one by one via `elementStream` |
| **Access** | `result.output` | `for await of result.elementStream` |
| **Best for** | When you need all data before proceeding | When you want to show items as they arrive |

## Streaming Elements One by One

```typescript
const result = streamText({
  model,
  output: Output.array({ element: userSchema }),
  prompt: input,
});

// Each iteration gives you one COMPLETE validated element
for await (const user of result.elementStream) {
  console.log(user); // fully typed, fully validated
}
```

Unlike `partialOutputStream` which gives partial incomplete objects,
`elementStream` waits until each element is complete before yielding it.

## Zod Schema with .describe()

```typescript
const userSchema = z.object({
  name: z.string().describe("The full name of the user"),
  age: z.number().describe("The user's age"),
  email: z
    .string()
    .email()
    .describe("The user's email address, @example.com"),
});
```

`.describe()` gives the AI context for each field — critical
for getting accurate and realistic fake data.

## API Change Note — AI SDK v5+

```typescript
//  Old (deprecated)
const { object } = await generateObject({
  output: "array",
  schema,
});

//  New
const result = await generateText({
  output: Output.array({ element: schema }),
});
const array = result.output;
```

## Real World Use Cases

| Use Case | Schema |
|---|---|
| Fake seed data for dev/testing | User, Product, Order schemas |
| Batch content generation | Blog posts, product descriptions |
| Extracting multiple items from a doc | Transactions from a bank statement |
| Generating test cases | Input/output pairs for unit tests |
