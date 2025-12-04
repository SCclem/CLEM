import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ChevronLeft,
  ChevronRight,
  BookOpen, 
  Calculator,
  Globe,
  Landmark,
  Scale,
  Leaf,
  Atom,
  Cpu,
  Mic
} from "lucide-react";
import { ChapterContent } from "@/components/ChapterContent";
import { VideoModal } from "@/components/VideoModal";
import type { Subject, Chapter, Favorite } from "@shared/schema";

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

interface ChapterPageProps {
  subject: Subject;
  chapter: Chapter;
  favorites: Favorite[];
  onToggleFavorite: (chapterId: string, subjectId: string) => void;
}

export function ChapterPage({ 
  subject, 
  chapter, 
  favorites, 
  onToggleFavorite 
}: ChapterPageProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const Icon = iconMap[subject.icon] || BookOpen;
  const isFavorite = favorites.some(f => f.chapterId === chapter.id);
  
  const chapterIndex = subject.chapters.findIndex(c => c.id === chapter.id);
  const prevChapter = chapterIndex > 0 ? subject.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < subject.chapters.length - 1 ? subject.chapters[chapterIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/subject/${subject.id}`}>
          <Button 
            variant="ghost" 
            className="rounded-full gap-2 mb-4 -ml-2"
            data-testid="button-back-subject"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à {subject.name}
          </Button>
        </Link>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <div 
            className="p-1.5 rounded-full"
            style={{ 
              backgroundColor: `${subject.color}15`,
              color: subject.color 
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <span>{subject.name}</span>
          <span>/</span>
          <Badge variant="secondary" className="rounded-full">
            Chapitre {chapterIndex + 1} / {subject.chapters.length}
          </Badge>
        </div>
      </div>

      <ChapterContent
        chapter={chapter}
        subjectColor={subject.color}
        isFavorite={isFavorite}
        onToggleFavorite={() => onToggleFavorite(chapter.id, subject.id)}
        onOpenVideo={() => setIsVideoOpen(true)}
      />

      <div className="flex items-center justify-between mt-12 pt-8 border-t">
        {prevChapter ? (
          <Link href={`/subject/${subject.id}/chapter/${prevChapter.id}`}>
            <Button 
              variant="outline" 
              className="rounded-full gap-2"
              data-testid="button-prev-chapter"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Chapitre précédent</span>
              <span className="sm:hidden">Préc.</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        {nextChapter ? (
          <Link href={`/subject/${subject.id}/chapter/${nextChapter.id}`}>
            <Button 
              className="rounded-full gap-2 text-white"
              style={{ backgroundColor: subject.color }}
              data-testid="button-next-chapter"
            >
              <span className="hidden sm:inline">Chapitre suivant</span>
              <span className="sm:hidden">Suiv.</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        ) : (
          <Link href={`/subject/${subject.id}`}>
            <Button 
              className="rounded-full gap-2 text-white"
              style={{ backgroundColor: subject.color }}
              data-testid="button-finish-subject"
            >
              Terminer la matière
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={chapter.videoUrl}
        title={chapter.title}
      />
    </div>
  );
}
