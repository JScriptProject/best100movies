import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Movie {
  _id: string;
  title: string;
  poster: string;
  rating: number;
  slug: string;
  genres?: string[];
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export function MovieCarousel({
  title,
  movies,
  viewAllLink,
}: MovieCarouselProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full py-8 space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold tracking-tight text-black border-l-4 border-red-600 pl-3">
          {title}
        </h2>
        {viewAllLink && (
          <Link href={viewAllLink}>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-400 hover:bg-white/5"
            >
              View All <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Carousel Section */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {movies.map((movie) => (
            <CarouselItem
              key={movie._id}
              className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <Link href={`/movie/${movie.slug}`}>
                <div className="group relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-900 cursor-pointer border border-white/10 hover:border-white/30 transition-all">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Content (Visible on Hover) */}
                  <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {movie.rating.toFixed(1)}
                      </div>
                      {movie.genres && (
                        <span className="truncate max-w-[100px] opacity-80">
                          • {movie.genres[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-black/50 border-white/20 hover:bg-red-600 hover:border-red-600 text-white" />
        <CarouselNext className="hidden md:flex -right-4 bg-black/50 border-white/20 hover:bg-red-600 hover:border-red-600 text-white" />
      </Carousel>
    </div>
  );
}
