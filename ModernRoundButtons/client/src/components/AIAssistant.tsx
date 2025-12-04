import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatMessage, Subject } from "@shared/schema";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
}

export function AIAssistant({ isOpen, onClose, subjects }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis CLEM, ton assistant IA pour le programme de 3ème. Pose-moi tes questions sur n'importe quelle matière : français, maths, histoire, sciences... Je suis là pour t'aider !",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const findRelevantContent = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
    
    const matches: { subject: string; chapter: string; content: string; score: number }[] = [];

    for (const subject of subjects) {
      for (const chapter of subject.chapters) {
        let score = 0;
        let matchedContent = "";

        if (chapter.title.toLowerCase().includes(lowerQuery)) {
          score += 10;
          matchedContent = `Chapitre : ${chapter.title}`;
        }

        for (const keyword of keywords) {
          if (chapter.introduction.toLowerCase().includes(keyword)) {
            score += 2;
          }
          for (const section of chapter.course) {
            if (section.title.toLowerCase().includes(keyword)) {
              score += 3;
              matchedContent = section.content.substring(0, 300);
            }
            if (section.content.toLowerCase().includes(keyword)) {
              score += 1;
              if (!matchedContent) {
                matchedContent = section.content.substring(0, 300);
              }
            }
          }
          for (const point of chapter.summary) {
            if (point.toLowerCase().includes(keyword)) {
              score += 2;
              matchedContent = point;
            }
          }
        }

        if (score > 0) {
          matches.push({
            subject: subject.name,
            chapter: chapter.title,
            content: matchedContent || chapter.introduction.substring(0, 200),
            score,
          });
        }
      }
    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      return "Je n'ai pas trouvé d'informations précises sur ce sujet dans le programme de 3ème. Peux-tu reformuler ta question ou préciser la matière ?";
    }

    const topMatches = matches.slice(0, 3);
    let response = "";

    if (topMatches.length === 1) {
      const match = topMatches[0];
      response = `D'après le cours de **${match.subject}**, chapitre "${match.chapter}" :\n\n${match.content}...\n\nVeux-tu plus de détails sur ce chapitre ?`;
    } else {
      response = `J'ai trouvé plusieurs informations pertinentes :\n\n`;
      for (const match of topMatches) {
        response += `**${match.subject}** - ${match.chapter}\n${match.content.substring(0, 150)}...\n\n`;
      }
      response += `Pour plus de détails, consulte directement les chapitres correspondants !`;
    }

    return response;
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("bonjour") || lowerMessage.includes("salut") || lowerMessage.includes("coucou")) {
      return "Bonjour ! Comment puis-je t'aider avec tes révisions aujourd'hui ?";
    }

    if (lowerMessage.includes("merci")) {
      return "Je t'en prie ! N'hésite pas si tu as d'autres questions. Bon courage pour tes révisions !";
    }

    if (lowerMessage.includes("brevet") || lowerMessage.includes("oral")) {
      return "Pour le brevet, voici mes conseils :\n\n1. **Révise régulièrement** - Ne laisse pas tout pour la dernière minute\n2. **Fais des fiches** - Résume les points importants de chaque chapitre\n3. **Entraîne-toi** - Fais des exercices et des sujets d'annales\n4. **Pour l'oral** - Choisis un sujet qui te passionne et prépare un exposé clair\n\nTu trouveras des conseils détaillés dans la section 'Conseils pour le Brevet' !";
    }

    if (lowerMessage.includes("aide") || lowerMessage.includes("comment")) {
      return "Je peux t'aider de plusieurs façons :\n\n• **Explications** - Pose-moi des questions sur n'importe quel cours\n• **Recherche** - Je peux chercher des informations dans le programme\n• **Conseils** - Je peux te donner des conseils de méthodologie\n\nPar exemple, demande-moi 'Explique-moi le théorème de Pythagore' ou 'Qu'est-ce que la Révolution française ?'";
    }

    return findRelevantContent(userMessage);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

    const response = generateResponse(userMessage.content);

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
      <Card 
        className="w-full max-w-md h-[600px] max-h-[80vh] flex flex-col shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-4 duration-300"
        data-testid="ai-assistant-panel"
      >
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-french-blue to-french-red text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">CLEM Assistant</h3>
              <p className="text-xs text-white/80">IA locale - fonctionne hors ligne</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={onClose}
            data-testid="button-close-ai"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-french-blue to-french-red text-white"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}
                  data-testid={`message-${message.role}-${message.id}`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i}>{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-french-blue to-french-red text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pose ta question..."
              className="rounded-full"
              disabled={isLoading}
              data-testid="input-ai-message"
            />
            <Button
              size="icon"
              className="rounded-full flex-shrink-0"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              data-testid="button-send-ai"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
