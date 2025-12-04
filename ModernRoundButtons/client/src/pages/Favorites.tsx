import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Trash2, 
  ChevronRight, 
  BookOpen,
  Calculator,
  Globe,
  Landmark,
  Scale,
  Leaf,
  Atom,
  Cpu,
  Mic,
  Heart
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

interface FavoritesProps {
  subjects: Subject[];
  favorites: Favorite[];
  onRemoveFavorite: (chapterId: string) => void;
}

export function Favorites({ subjects, favorites, onRemoveFavorite }: FavoritesProps) {
  const getFavoriteDetails = (favorite: Favorite) => {
    const subject = subjects.find(s => s.id === favorite.subjectId);
    const chapter = subject?.chapters.find(c => c.id === favorite.chapterId);
    return { subject, chapter };
  };

  const validFavorites = favorites.filter(f => {
    const { subject, chapter } = getFavoriteDetails(f);
    return subject && chapter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-yellow-500/10">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-favorites-title">
            Mes favoris
          </h1>
        </div>
        <p className="text-muted-foreground">
          {validFavorites.length === 0 
            ? "Tu n'as pas encore de chapitres favoris"
            : `${validFavorites.length} chapitre${validFavorites.length > 1 ? 's' : ''} sauvegardé${validFavorites.length > 1 ? 's' : ''}`
          }
        </p>
      </div>

      {validFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Ajoute des chapitres à tes favoris pour les retrouver facilement ici. 
            Clique sur l'étoile dans n'importe quel chapitre pour le sauvegarder.
          </p>
          <Link href="/subjects">
            <Button className="rounded-full gap-2" data-testid="button-explore-subjects">
              Explorer les matières
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {validFavorites.map((favorite) => {
            const { subject, chapter } = getFavoriteDetails(favorite);
            if (!subject || !chapter) return null;
            
            const Icon = iconMap[subject.icon] || BookOpen;
            const chapterIndex = subject.chapters.findIndex(c => c.id === chapter.id);

            return (
              <Card 
                key={favorite.chapterId}
                className="group"
                data-testid={`card-favorite-${favorite.chapterId}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: `${subject.color}15`,
                        color: subject.color 
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge 
                          variant="secondary" 
                          className="rounded-full text-xs"
                          style={{ 
                            backgroundColor: `${subject.color}15`,
                            color: subject.color 
                          }}
                        >
                          {subject.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Chapitre {chapterIndex + 1}
                        </span>
                      </div>
                      <h3 className="font-semibold truncate">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {chapter.introduction.substring(0, 80)}...
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemoveFavorite(favorite.chapterId);
                        }}
                        data-testid={`button-remove-favorite-${favorite.chapterId}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Link href={`/subject/${subject.id}/chapter/${chapter.id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          data-testid={`button-open-favorite-${favorite.chapterId}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
