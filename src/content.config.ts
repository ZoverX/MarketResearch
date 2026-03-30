import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  section: z.string(),
  order: z.number().default(999),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([])
});

const methodologyCollection = defineCollection({
  type: "content",
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
  type: "content",
  schema: baseSchema.extend({
    summary: z.string().optional()
  })
});

const glossaryCollection = defineCollection({
  type: "content",
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
  displayr: notesCollection,
  sawtooth: notesCollection,
  glossary: glossaryCollection
};
