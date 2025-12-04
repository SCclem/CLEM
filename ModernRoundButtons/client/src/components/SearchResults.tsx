import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, BookOpen, PenTool } from "lucide-react";
import type { SearchResult } from "@shared/schema";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onClose: () => void;
}

export function SearchResults({ results, query, onClose }: SearchResultsProps) {
  if (!query.trim()) return null;

  const highlightMatch = (text: string, query: string): JSX.Element => {
    if (!query.trim()) return <span>{text}</span>;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'introduction':
      case 'course':
        return BookOpen;
      case 'exercise':
        return PenTool;
      default:
        return FileText;
    }
  };

  return (
    <div 
      className="absolute top-full left-0 right-0 mt-2 z-50"
      data-testid="search-results-dropdown"
    >
      <Card className="shadow-xl border-border/50 max-h-[400px] overflow-hidden">
        <div className="p-3 border-b bg-muted/30 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="w-4 h-4" />
            <span>
              {results.length} résultat{results.length !== 1 ? 's' : ''} pour "{query}"
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-close-search"
          >
            Fermer
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[350px]">
          {results.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                Aucun résultat trouvé pour "{query}"
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Essaie avec d'autres mots-clés
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {results.map((result, index) => {
                const Icon = getSectionIcon(result.section);
                return (
                  <Link 
                    key={`${result.chapterId}-${index}`}
                    href={`/subject/${result.subjectId}/chapter/${result.chapterId}`}
                    onClick={onClose}
                  >
                    <CardContent 
                      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      data-testid={`search-result-${index}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="secondary" className="rounded-full text-xs">
                              {result.subjectName}
                            </Badge>
                            <span className="text-xs text-muted-foreground capitalize">
                              {result.section === 'course' ? 'Cours' : 
                               result.section === 'exercise' ? 'Exercice' :
                               result.section === 'introduction' ? 'Introduction' : 
                               result.section}
                            </span>
                          </div>
                          <h4 className="font-medium text-sm truncate">
                            {result.chapterTitle}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {highlightMatch(result.matchedText, query)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
