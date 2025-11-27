import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API Routes - prefix all routes with /api

  // Get stats for animated counters
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Track download (increment counter)
  app.post("/api/stats/download", async (_req, res) => {
    try {
      const stats = await storage.incrementDownloads();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to track download" });
    }
  });

  // Get downloads/releases
  app.get("/api/downloads", async (_req, res) => {
    try {
      const downloads = await storage.getDownloads();
      res.json(downloads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch downloads" });
    }
  });

  // Get latest download
  app.get("/api/downloads/latest", async (_req, res) => {
    try {
      const download = await storage.getLatestDownload();
      if (!download) {
        res.status(404).json({ error: "No downloads available" });
        return;
      }
      res.json(download);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest download" });
    }
  });

  // Get FAQs
  app.get("/api/faqs", async (_req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  // Get features
  app.get("/api/features", async (_req, res) => {
    try {
      const features = await storage.getFeatures();
      res.json(features);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch features" });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Get system requirements
  app.get("/api/system-requirements", async (_req, res) => {
    try {
      const requirements = await storage.getSystemRequirements();
      res.json(requirements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch system requirements" });
    }
  });

  return httpServer;
}
