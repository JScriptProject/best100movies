import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";

export function TrailerModal({
  title,
  videoId,
}: {
  title: string;
  videoId?: string;
}) {
  // If no video ID exists, show disabled button
  if (!videoId) {
    return (
      <Button
        disabled
        variant="outline"
        className="opacity-50 cursor-not-allowed gap-2"
      >
        <PlayCircle className="w-5 h-5" /> No Trailer Available
      </Button>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white px-8 gap-2 cursor-pointer transition-transform active:scale-95"
        >
          <PlayCircle className="w-5 h-5" /> Watch Trailer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] bg-black border-white/10 p-0 overflow-hidden">
        <DialogHeader className="p-4 absolute z-10 top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent">
          <DialogTitle className="text-white drop-shadow-md">
            {title} - Official Trailer
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full bg-black">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={`${title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
