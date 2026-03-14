import { z } from "zod";

export const startupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().optional(),
  description: z.string().optional(),
  stage: z.enum(["idea", "pre_seed", "seed", "series_a", "series_b", "growth"]),
  industry: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  location: z.string().optional(),
  foundedYear: z.coerce.number().int().min(1900).max(2100).optional(),
  teamSize: z.coerce.number().int().min(0).optional(),
});

export const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  firm: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  checkSizeMin: z.coerce.number().int().min(0).optional(),
  checkSizeMax: z.coerce.number().int().min(0).optional(),
  focusAreas: z.array(z.string()).optional(),
  stages: z.array(z.string()).optional(),
});

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
});

export type StartupInput = z.infer<typeof startupSchema>;
export type InvestorInput = z.infer<typeof investorSchema>;
export type EventInput = z.infer<typeof eventSchema>;
