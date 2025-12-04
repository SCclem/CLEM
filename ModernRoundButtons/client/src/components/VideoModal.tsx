import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getEmbedUrl = (url: string): string => {
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }
    return url;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        data-testid="video-modal-backdrop"
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-card rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        data-testid="video-modal-content"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="video-modal-title" className="font-semibold truncate pr-4">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={onClose}
            data-testid="button-close-video"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="relative aspect-video bg-black">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
