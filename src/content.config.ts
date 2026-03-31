import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  section: z.string(),
  order: z.number().default(999),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([])
});

const methodologyCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/methodologies" }),
  schema: baseSchema.extend({
    featured: z.boolean().default(false),
    chooserStage: z.array(z.string()).default([]),
    chooserGoal: z.array(z.string()).default([]),
    chooserData: z.array(z.string()).default([]),
    chooserOutput: z.array(z.string()).default([]),
    whatItIs: z.string(),
    whenToUse: z.array(z.string()).default([]),
    whenNotToUse: z.array(z.string()).default([]),
    inputsRequired: z.array(z.string()).default([]),
    typicalOutputs: z.array(z.string()).default([]),
    simpleExample: z.string(),
    strengths: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    commonMistakes: z.array(z.string()).default([]),
    practicalUse: z.string(),
    outputted: z.array(z.string()).default([]),
    interpretation: z.array(z.string()).default([]),
    clientCommunication: z.array(z.string()).default([]),
    displayrNotes: z.array(z.string()).default([]),
    demoType: z.enum(["interactive", "placeholder"]).default("placeholder"),
    demoTitle: z.string().optional(),
    demoSummary: z.string().optional()
  })
});

const notesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/basics" }),
  schema: baseSchema.extend({
    summary: z.string().optional()
  })
});

const glossaryCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string().default("Glossary"),
    order: z.number().default(999),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    term: z.string(),
    shortDefinition: z.string(),
    category: z.string().default("General")
  })
});

export const collections = {
  basics: notesCollection,
  methodologies: methodologyCollection,
  displayr: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/displayr" }),
    schema: baseSchema.extend({
      summary: z.string().optional()
    })
  }),
  sawtooth: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/sawtooth" }),
    schema: baseSchema.extend({
      summary: z.string().optional()
    })
  }),
  glossary: glossaryCollection
};
