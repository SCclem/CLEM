import { SubjectCard } from "@/components/SubjectCard";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import type { Subject } from "@shared/schema";

interface SubjectsProps {
  subjects: Subject[];
}

export function Subjects({ subjects }: SubjectsProps) {
  const totalChapters = subjects.reduce((acc, s) => acc + s.chapters.length, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-subjects-title">
            Toutes les matières
          </h1>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <p>Programme complet de 3ème</p>
          <Badge variant="secondary" className="rounded-full">
            {totalChapters} chapitres au total
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
