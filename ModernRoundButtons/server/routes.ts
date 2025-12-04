import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/subjects", async (_req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subjects" });
    }
  });

  app.get("/api/subjects/:subjectId", async (req, res) => {
    try {
      const subject = await storage.getSubject(req.params.subjectId);
      if (!subject) {
        return res.status(404).json({ error: "Subject not found" });
      }
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subject" });
    }
  });

  app.get("/api/subjects/:subjectId/chapters/:chapterId", async (req, res) => {
    try {
      const chapter = await storage.getChapter(
        req.params.subjectId,
        req.params.chapterId
      );
      if (!chapter) {
        return res.status(404).json({ error: "Chapter not found" });
      }
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chapter" });
    }
  });

  return httpServer;
}
