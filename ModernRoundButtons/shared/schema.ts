import { z } from "zod";

// Subject definition
export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  chapters: Chapter[];
}

// Chapter definition with all content sections
export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  introduction: string;
  course: CourseSection[];
  summary: string[];
  exercises: Exercise[];
  externalLinks: ExternalLink[];
  videoUrl: string;
}

export interface CourseSection {
  title: string;
  content: string;
  examples?: string[];
}

export interface Exercise {
  id: string;
  question: string;
  type: 'text' | 'multiple-choice' | 'fill-blank';
  options?: string[];
  answer: string;
  explanation: string;
}

export interface ExternalLink {
  title: string;
  url: string;
  description: string;
}

// AI Chat message
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Favorites stored in localStorage
export interface Favorite {
  chapterId: string;
  subjectId: string;
  addedAt: Date;
}

// Search result
export interface SearchResult {
  type: 'chapter' | 'exercise' | 'course';
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  matchedText: string;
  section: string;
}

// Zod schemas for validation
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
});

export type InsertChatMessage = z.infer<typeof chatMessageSchema>;
