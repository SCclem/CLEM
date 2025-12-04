import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  Star,
  Play,
  ChevronRight,
  Calculator,
  Globe,
  Landmark,
  Scale,
  Leaf,
  Atom,
  Cpu,
  Mic
} from "lucide-react";
import type { Subject, Favorite } from "@shared/schema";

const iconMap: Record<string, typeof BookOpen> = {
  "book-open": BookOpen,
  "calculator": Calculator,
  "globe": Globe,
  "landmark": Landmark,
  "scale": Scale,
  "leaf": Leaf,
  "atom": Atom,
  "cpu": Cpu,
  "mic": Mic,
};

interface SubjectDetailProps {
  subject: Subject;
  favorites: Favorite[];
}

export function SubjectDetail({ subject, favorites }: SubjectDetailProps) {
  const Icon = iconMap[subject.icon] || BookOpen;
  const favoriteChapterIds = new Set(favorites.map(f => f.chapterId));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/subjects">
          <Button 
            variant="ghost" 
            className="rounded-full gap-2 mb-4 -ml-2"
            data-testid="button-back-subjects"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux matières
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <div 
            className="p-4 rounded-full flex-shrink-0"
            style={{ 
              backgroundColor: `${subject.color}15`,
              color: subject.color 
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
          <div className="min-w-0">
            <h1 
              className="text-2xl md:text-3xl font-bold mb-2"
              data-testid="text-subject-title"
            >
              {subject.name}
            </h1>
            <p className="text-muted-foreground mb-3">
              {subject.description}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="rounded-full">
                {subject.chapters.length} chapitres
              </Badge>
              <Badge variant="outline" className="rounded-full">
                {subject.chapters.reduce((acc, c) => acc + c.exercises.length, 0)} exercices
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Chapitres</h2>
        
        <div className="grid gap-4">
          {subject.chapters.map((chapter, index) => {
            const isFavorite = favoriteChapterIds.has(chapter.id);
            
            return (
              <Link 
                key={chapter.id} 
                href={`/subject/${subject.id}/chapter/${chapter.id}`}
              >
                <Card 
                  className="group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  data-testid={`card-chapter-${chapter.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: subject.color }}
                      >
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h3>
                          {isFavorite && (
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {chapter.introduction.substring(0, 100)}...
                        </p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <Badge variant="outline" className="rounded-full text-xs">
                            {chapter.course.length} sections
                          </Badge>
                          <Badge variant="outline" className="rounded-full text-xs">
                            {chapter.exercises.length} exercices
                          </Badge>
                          {chapter.videoUrl && (
                            <Badge 
                              variant="secondary" 
                              className="rounded-full text-xs gap-1"
                            >
                              <Play className="w-3 h-3" />
                              Vidéo
                            </Badge>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
