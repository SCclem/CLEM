import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, Globe, Landmark, Scale, Leaf, Atom, Cpu, Mic } from "lucide-react";
import type { Subject } from "@shared/schema";

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

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const Icon = iconMap[subject.icon] || BookOpen;
  
  return (
    <Link href={`/subject/${subject.id}`}>
      <Card 
        className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border/50"
        data-testid={`card-subject-${subject.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div 
              className="p-3 rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `${subject.color}15`,
                color: subject.color 
              }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <Badge 
              variant="secondary" 
              className="rounded-full text-xs font-medium"
            >
              {subject.chapters.length} chapitres
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold mt-3 group-hover:text-primary transition-colors">
            {subject.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {subject.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div 
              className="h-1 flex-1 rounded-full bg-muted overflow-hidden"
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: "0%",
                  backgroundColor: subject.color 
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">0%</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
