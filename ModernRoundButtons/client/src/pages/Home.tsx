import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  Star, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Target,
  Clock,
  Trophy
} from "lucide-react";
import { SubjectCard } from "@/components/SubjectCard";
import type { Subject } from "@shared/schema";

interface HomeProps {
  subjects: Subject[];
  favoritesCount: number;
}

export function Home({ subjects, favoritesCount }: HomeProps) {
  const totalChapters = subjects.reduce((acc, s) => acc + s.chapters.length, 0);

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-french-blue/5 via-transparent to-french-red/5" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-french-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-french-red/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge 
              variant="secondary" 
              className="rounded-full px-4 py-1.5 text-sm mb-6 gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Programme de 3ème complet
            </Badge>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-french-blue via-foreground to-french-red bg-clip-text text-transparent"
              data-testid="text-hero-title"
            >
              Bienvenue sur CLEM
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tout le programme de 3ème, toutes les matières, toutes les notions. 
              Cours complets, exercices corrigés et préparation au brevet.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/subjects">
                <Button 
                  size="lg" 
                  className="rounded-full gap-2 px-8 text-white bg-french-blue hover:bg-french-blue/90"
                  data-testid="button-start-learning"
                >
                  Commencer à réviser
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/favorites">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full gap-2 px-8"
                  data-testid="button-view-favorites"
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  Mes favoris ({favoritesCount})
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-french-blue" />
                  <p className="text-2xl font-bold">{subjects.length}</p>
                  <p className="text-xs text-muted-foreground">Matières</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-6 h-6 mx-auto mb-2 text-french-red" />
                  <p className="text-2xl font-bold">{totalChapters}</p>
                  <p className="text-xs text-muted-foreground">Chapitres</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-xs text-muted-foreground">Exercices</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">IA</p>
                  <p className="text-xs text-muted-foreground">Assistant</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Toutes les matières</h2>
              <p className="text-muted-foreground mt-1">
                Explore le programme complet de 3ème
              </p>
            </div>
            <Link href="/subjects">
              <Button variant="ghost" className="rounded-full gap-2">
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.slice(0, 6).map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>

          {subjects.length > 6 && (
            <div className="mt-8 text-center">
              <Link href="/subjects">
                <Button 
                  variant="outline" 
                  className="rounded-full gap-2"
                  data-testid="button-see-all-subjects"
                >
                  Voir les {subjects.length - 6} autres matières
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Pourquoi choisir CLEM ?
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-french-blue/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-french-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Programme complet</h3>
                  <p className="text-sm text-muted-foreground">
                    Toutes les matières, tous les chapitres du programme officiel de 3ème
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-french-red/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-french-red" />
                  </div>
                  <h3 className="font-semibold mb-2">Exercices corrigés</h3>
                  <p className="text-sm text-muted-foreground">
                    Des exercices variés avec corrections détaillées et explications
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Accès illimité</h3>
                  <p className="text-sm text-muted-foreground">
                    Révise quand tu veux, où tu veux, même hors connexion
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-french-blue via-white to-french-red flex items-center justify-center">
                <span className="text-french-blue font-bold text-sm">C</span>
              </div>
              <span className="font-semibold">CLEM</span>
              <span className="text-muted-foreground text-sm">by Clément Caillot</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Programme de 3ème - Préparation au Brevet des Collèges
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
