# CLEM by Clément Caillot - Educational Platform

## Overview

CLEM is a comprehensive French educational platform designed for 3ème (9th grade) students preparing for the brevet exam. The application provides complete curriculum coverage across all subjects with structured learning paths including introductions, detailed courses, summaries, exercises with corrections, and multimedia resources.

The platform features a modern, French-themed design with full dark mode support, an integrated AI assistant for student questions, favorites management, and responsive layouts optimized for mobile, tablet, and desktop devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- Client-side code located in `client/src/` directory

**UI Component System**
- Radix UI primitives for accessible, unstyled components (@radix-ui/react-*)
- shadcn/ui component library with custom theming (New York style variant)
- Tailwind CSS for utility-first styling with custom French flag color palette
- Class Variance Authority (CVA) for component variant management

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- Local state with React hooks (useState, useEffect, useMemo)
- Context API for theme management (ThemeProvider)

**Design System**
- French national identity through color palette (Blue #0055A4, Red #EF4135, White #FFFFFF)
- All buttons use border-radius: 999px (fully rounded) as per design guidelines
- Responsive grid layouts using Tailwind breakpoints (sm, md, lg)
- Dark mode toggle with class-based theme switching
- Custom CSS variables for consistent theming across light/dark modes

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- HTTP server creation using Node's built-in `http` module
- Development mode uses Vite middleware for SSR and HMR
- Production mode serves static files from `dist/public`

**API Structure**
- RESTful endpoints under `/api` prefix
- Subject retrieval: `GET /api/subjects` (all subjects)
- Individual subject: `GET /api/subjects/:subjectId`
- Chapter details: `GET /api/subjects/:subjectId/chapters/:chapterId`
- All endpoints return JSON responses with error handling

**Data Layer**
- In-memory storage implementation (`server/storage.ts`)
- IStorage interface defines data access contract
- Mock data structure with complete French curriculum content
- Data includes: subjects (Français, Mathématiques, Histoire, etc.) with nested chapters
- Each chapter contains: introduction, course sections, summaries, exercises, external links, video URLs

**Build Process**
- Custom build script (`script/build.ts`) using esbuild for server bundling
- Dependencies allowlist for bundling specific packages to reduce cold start times
- Vite builds client assets to `dist/public`
- Server bundled to `dist/index.cjs` with external dependencies

### External Dependencies

**UI & Component Libraries**
- @radix-ui/react-* (v1.x) - Comprehensive set of accessible UI primitives
- @tanstack/react-query (v5.x) - Server state management and caching
- tailwindcss - Utility-first CSS framework
- class-variance-authority - Type-safe component variants
- clsx & tailwind-merge - Class name utilities
- cmdk - Command palette component
- embla-carousel-react - Carousel implementation
- lucide-react - Icon library

**Database & ORM**
- Drizzle ORM (v0.39.x) with drizzle-zod for schema validation
- @neondatabase/serverless (v0.10.x) - Neon Postgres serverless driver
- PostgreSQL dialect configuration in drizzle.config.ts
- Database URL expected from environment variable `DATABASE_URL`
- Migrations output to `./migrations` directory
- Schema definition in `shared/schema.ts`

**Form Handling**
- @hookform/resolvers (v3.x) - React Hook Form integration
- Zod schema validation throughout application

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development plugins (runtime error overlay, cartographer, dev banner)
- tsx - TypeScript execution for build scripts and development
- Vite plugins for React and enhanced development experience

**Session & Storage**
- connect-pg-simple (v10.x) - PostgreSQL session store for Express
- express-session capabilities (implied by pg-simple dependency)

**Styling**
- PostCSS with Autoprefixer for vendor prefixing
- Custom Tailwind configuration with extended color palette and border radius values
- Google Fonts integration (DM Sans, Inter, Poppins) via CDN

**Additional Features**
- date-fns (v3.x) - Date manipulation utilities
- Responsive design breakpoints: mobile (<768px), tablet (768px-1024px), desktop (>1024px)