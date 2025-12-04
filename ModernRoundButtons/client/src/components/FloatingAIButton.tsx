import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingAIButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function FloatingAIButton({ onClick, isOpen }: FloatingAIButtonProps) {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-french-blue to-french-red hover:shadow-xl hover:scale-105 transition-all duration-300 p-0 md:hidden"
      data-testid="button-floating-ai"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="w-2.5 h-2.5 text-yellow-900" />
        </div>
      </div>
    </Button>
  );
}
