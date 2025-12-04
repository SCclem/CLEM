import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Star, 
  StarOff, 
  Play, 
  ExternalLink, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  Lightbulb,
  FileText,
  PenTool,
  Link2
} from "lucide-react";
import type { Chapter, Exercise } from "@shared/schema";

interface ChapterContentProps {
  chapter: Chapter;
  subjectColor: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenVideo: () => void;
}

export function ChapterContent({ 
  chapter, 
  subjectColor, 
  isFavorite, 
  onToggleFavorite,
  onOpenVideo 
}: ChapterContentProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const toggleAnswer = (exerciseId: string) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-chapter-title">
            {chapter.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full gap-2"
            onClick={onToggleFavorite}
            data-testid="button-toggle-favorite"
          >
            {isFavorite ? (
              <>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="hidden sm:inline">Favori</span>
              </>
            ) : (
              <>
                <StarOff className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouter aux favoris</span>
              </>
            )}
          </Button>
          <Button
            className="rounded-full gap-2 text-white"
            style={{ backgroundColor: subjectColor }}
            onClick={onOpenVideo}
            data-testid="button-open-video"
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Voir la vidéo</span>
          </Button>
        </div>
      </div>

      <Accordion 
        type="multiple" 
        defaultValue={["introduction", "course"]}
        className="space-y-4"
      >
        <AccordionItem value="introduction" className="border rounded-lg overflow-hidden">
          <AccordionTrigger 
            className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors"
            data-testid="accordion-introduction"
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
              >
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="font-semibold">Introduction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="bg-gradient-to-br from-french-blue/5 to-transparent border-french-blue/20">
              <CardContent className="p-4">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {chapter.introduction}
                </p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="course" className="border rounded-lg overflow-hidden">
          <AccordionTrigger 
            className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors"
            data-testid="accordion-course"
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-semibold">Cours complet</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-6">
              {chapter.course.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: subjectColor }} />
                    {section.title}
                  </h3>
                  <p className="text-foreground leading-relaxed pl-6 whitespace-pre-line">
                    {section.content}
                  </p>
                  {section.examples && section.examples.length > 0 && (
                    <div className="pl-6 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Exemples :</p>
                      {section.examples.map((example, i) => (
                        <Card key={i} className="bg-muted/30 border-dashed">
                          <CardContent className="p-3">
                            <p className="text-sm italic">{example}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary" className="border rounded-lg overflow-hidden">
          <AccordionTrigger 
            className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors"
            data-testid="accordion-summary"
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
              >
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-semibold">Bilan / Synthèse</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  Points clés à retenir
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {chapter.summary.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white mt-0.5"
                        style={{ backgroundColor: subjectColor }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exercises" className="border rounded-lg overflow-hidden">
          <AccordionTrigger 
            className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors"
            data-testid="accordion-exercises"
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
              >
                <PenTool className="w-4 h-4" />
              </div>
              <span className="font-semibold">Exercices</span>
              <Badge variant="secondary" className="rounded-full ml-2">
                {chapter.exercises.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {chapter.exercises.map((exercise, index) => (
                <ExerciseCard 
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  subjectColor={subjectColor}
                  isRevealed={revealedAnswers.has(exercise.id)}
                  onToggleReveal={() => toggleAnswer(exercise.id)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="resources" className="border rounded-lg overflow-hidden">
          <AccordionTrigger 
            className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors"
            data-testid="accordion-resources"
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
              >
                <Link2 className="w-4 h-4" />
              </div>
              <span className="font-semibold">Ressources externes</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {chapter.externalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`link-external-${index}`}
                >
                  <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary flex-shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm text-primary truncate">
                            {link.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  subjectColor: string;
  isRevealed: boolean;
  onToggleReveal: () => void;
}

function ExerciseCard({ exercise, index, subjectColor, isRevealed, onToggleReveal }: ExerciseCardProps) {
  return (
    <Card className="overflow-hidden" data-testid={`card-exercise-${exercise.id}`}>
      <CardHeader className="pb-3 bg-muted/30">
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: subjectColor }}
          >
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">{exercise.question}</p>
            {exercise.type === 'multiple-choice' && exercise.options && (
              <div className="mt-3 space-y-2">
                {exercise.options.map((option, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                      isRevealed && option === exercise.answer
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-background'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{option}</span>
                    {isRevealed && option === exercise.answer && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2"
          onClick={onToggleReveal}
          data-testid={`button-reveal-answer-${exercise.id}`}
        >
          {isRevealed ? (
            <>
              <XCircle className="w-4 h-4" />
              Masquer la correction
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Voir la correction
            </>
          )}
        </Button>
        
        {isRevealed && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">Réponse :</p>
                    <p className="text-foreground">{exercise.answer}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-green-500/20">
                  <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-700 dark:text-yellow-400">Explication :</p>
                    <p className="text-muted-foreground text-sm">{exercise.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
