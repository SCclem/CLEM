import { useState, useEffect, useMemo } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { AIAssistant } from "@/components/AIAssistant";
import { FloatingAIButton } from "@/components/FloatingAIButton";
import { SearchResults } from "@/components/SearchResults";
import { Home } from "@/pages/Home";
import { Subjects } from "@/pages/Subjects";
import { SubjectDetail } from "@/pages/SubjectDetail";
import { ChapterPage } from "@/pages/ChapterPage";
import { Favorites } from "@/pages/Favorites";
import NotFound from "@/pages/not-found";
import type { Subject, Favorite, SearchResult } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

function Router({ 
  subjects, 
  favorites, 
  onToggleFavorite,
  onRemoveFavorite 
}: { 
  subjects: Subject[];
  favorites: Favorite[];
  onToggleFavorite: (chapterId: string, subjectId: string) => void;
  onRemoveFavorite: (chapterId: string) => void;
}) {
  return (
    <Switch>
      <Route path="/">
        <Home subjects={subjects} favoritesCount={favorites.length} />
      </Route>
      <Route path="/subjects">
        <Subjects subjects={subjects} />
      </Route>
      <Route path="/subject/:subjectId">
        {(params) => {
          const subject = subjects.find(s => s.id === params.subjectId);
          if (!subject) return <NotFound />;
          return <SubjectDetail subject={subject} favorites={favorites} />;
        }}
      </Route>
      <Route path="/subject/:subjectId/chapter/:chapterId">
        {(params) => {
          const subject = subjects.find(s => s.id === params.subjectId);
          const chapter = subject?.chapters.find(c => c.id === params.chapterId);
          if (!subject || !chapter) return <NotFound />;
          return (
            <ChapterPage 
              subject={subject} 
              chapter={chapter} 
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          );
        }}
      </Route>
      <Route path="/favorites">
        <Favorites 
          subjects={subjects} 
          favorites={favorites} 
          onRemoveFavorite={onRemoveFavorite}
        />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clem-favorites");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });

  useEffect(() => {
    localStorage.setItem("clem-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setSearchQuery("");
    setShowSearchResults(false);
  }, [location]);

  const toggleFavorite = (chapterId: string, subjectId: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.chapterId === chapterId);
      if (exists) {
        return prev.filter((f) => f.chapterId !== chapterId);
      }
      return [...prev, { chapterId, subjectId, addedAt: new Date() }];
    });
  };

  const removeFavorite = (chapterId: string) => {
    setFavorites((prev) => prev.filter((f) => f.chapterId !== chapterId));
  };

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    for (const subject of subjects) {
      for (const chapter of subject.chapters) {
        if (chapter.title.toLowerCase().includes(query)) {
          results.push({
            type: "chapter",
            subjectId: subject.id,
            subjectName: subject.name,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            matchedText: chapter.introduction.substring(0, 150),
            section: "title",
          });
        }

        if (chapter.introduction.toLowerCase().includes(query)) {
          results.push({
            type: "chapter",
            subjectId: subject.id,
            subjectName: subject.name,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            matchedText: chapter.introduction.substring(0, 150),
            section: "introduction",
          });
        }

        for (const section of chapter.course) {
          if (section.title.toLowerCase().includes(query) || 
              section.content.toLowerCase().includes(query)) {
            results.push({
              type: "course",
              subjectId: subject.id,
              subjectName: subject.name,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
              matchedText: section.content.substring(0, 150),
              section: "course",
            });
            break;
          }
        }

        for (const exercise of chapter.exercises) {
          if (exercise.question.toLowerCase().includes(query)) {
            results.push({
              type: "exercise",
              subjectId: subject.id,
              subjectName: subject.name,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
              matchedText: exercise.question,
              section: "exercise",
            });
            break;
          }
        }
      }
    }

    const seen = new Set<string>();
    return results.filter((r) => {
      const key = `${r.chapterId}-${r.section}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 10);
  }, [searchQuery, subjects]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.length >= 2);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <Navigation 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onOpenAI={() => setIsAIOpen(true)}
        />
        {showSearchResults && (
          <div className="container mx-auto px-4">
            <div className="relative">
              <SearchResults 
                results={searchResults}
                query={searchQuery}
                onClose={() => setShowSearchResults(false)}
              />
            </div>
          </div>
        )}
      </div>

      <main>
        <Router 
          subjects={subjects}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRemoveFavorite={removeFavorite}
        />
      </main>

      <AIAssistant 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        subjects={subjects}
      />

      <FloatingAIButton 
        onClick={() => setIsAIOpen(true)}
        isOpen={isAIOpen}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
