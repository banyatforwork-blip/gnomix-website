import { z } from "zod";

// Download statistics
export const downloadSchema = z.object({
  id: z.string(),
  version: z.string(),
  filename: z.string(),
  size: z.string(),
  releaseDate: z.string(),
  downloadUrl: z.string(),
  sourceforgeUrl: z.string(),
  githubUrl: z.string(),
  checksum: z.string(),
  isBeta: z.boolean(),
});

export type Download = z.infer<typeof downloadSchema>;

// Download statistics tracking
export const downloadStatSchema = z.object({
  id: z.string(),
  totalDownloads: z.number(),
  weeklyDownloads: z.number(),
  monthlyDownloads: z.number(),
});

export type DownloadStat = z.infer<typeof downloadStatSchema>;

// FAQ items
export const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string(),
});

export type FAQ = z.infer<typeof faqSchema>;

// Feature items
export const featureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Feature = z.infer<typeof featureSchema>;

// Testimonial items
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  content: z.string(),
  avatar: z.string().optional(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// System requirement
export const systemRequirementSchema = z.object({
  id: z.string(),
  category: z.string(),
  requirement: z.string(),
  recommended: z.string(),
});

export type SystemRequirement = z.infer<typeof systemRequirementSchema>;

// Gallery image
export const galleryImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;

// Comparison item
export const comparisonItemSchema = z.object({
  feature: z.string(),
  gnomix: z.string(),
  ubuntu: z.string(),
  stockGnome: z.string(),
});

export type ComparisonItem = z.infer<typeof comparisonItemSchema>;

// Stats for animated counters
export const statsSchema = z.object({
  downloads: z.number(),
  communityMembers: z.number(),
  githubStars: z.number(),
  contributors: z.number(),
});

export type Stats = z.infer<typeof statsSchema>;

// User schema (keeping existing)
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: string };
