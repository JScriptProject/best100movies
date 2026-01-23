import { getMovieBySlug } from "@/lib/getMovie";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Calendar, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrailerModal } from "@/components/TrailerModal";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. DYNAMIC SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) return { title: "Movie Not Found" };

  return {
    title: `Watch ${movie.title} (2026) - Cast, Trailer & Reviews`,
    description: movie.overview,
    keywords: [
      `${movie.title} movie`,
      `download ${movie.title}`,
      `watch ${movie.title} online`,
      `${movie.title} cast`,
      ...(movie.genres || []),
    ],
    openGraph: {
      images: [movie.poster],
    },
  };
}

// Helper: Format Runtime
function formatRuntime(minutes: number) {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-gray-400 mt-2">Movie not found</p>
          <Link href="/">
            <Button
              variant="outline"
              className="mt-6 border-white/20 text-white"
            >
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* 1. HERO SECTION (Immersive Backdrop) */}
      {/* 1. HERO SECTION (Immersive Backdrop) */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Blurred Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover blur-3xl opacity-40 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-12">
          <Link href="/" className="absolute top-8 left-4 z-20">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 gap-2"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </Button>
          </Link>

          {/* LAYOUT FIX: Centered on mobile, End-aligned on Desktop */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
            {" "}
            {/* <--- CHANGED */}
            {/* Floating Poster (NOW VISIBLE ON MOBILE) */}
            {/* Removed 'hidden', added 'w-44' for mobile, kept 'md:w-72' for desktop */}
            <div className="relative w-44 md:w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500">
              {" "}
              {/* <--- CHANGED */}
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
                priority // Added priority for faster LCP
              />
            </div>
            {/* Info Column */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              {" "}
              {/* <--- CHANGED (Center text on mobile) */}
              {/* Genre Badges (Center on mobile) */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {" "}
                {/* <--- CHANGED */}
                {movie.genres?.map((genre: string) => (
                  <Badge
                    key={genre}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-sm border-none backdrop-blur-md transition-colors"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              {/* Title */}
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter drop-shadow-lg">
                {movie.title}
              </h1>
              {/* Metadata Row (Rating, Runtime, Date) */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm md:text-base font-medium text-gray-300">
                {" "}
                {/* <--- CHANGED */}
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-white">{movie.rating.toFixed(1)}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                </div>
              </div>
              {/* Trailer Button */}
              <div className="pt-4">
                <TrailerModal videoId={movie.trailer} title={movie.title} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DETAILS GRID */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Storyline */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">
              Storyline
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.overview}
            </p>
          </section>

          {/* Cast Carousel */}
          {movie.cast && movie.cast.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">
                Top Cast
              </h2>
              <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
                {movie.cast.map((actor: any, i: number) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-28 group text-center cursor-pointer"
                  >
                    {/* Actor Photo Circle */}
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-600 transition-all relative bg-gray-800 shadow-lg">
                      {actor.photoUrl ? (
                        <Image
                          src={actor.photoUrl}
                          alt={actor.actorName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                          {actor.actorName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white truncate">
                      {actor.actorName}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar (SEO & Quick Info) */}
        <div className="space-y-8">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 backdrop-blur-sm">
            <h3 className="font-semibold text-lg text-white">Movie Info</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Status</span>
                <span className="text-white">Released</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Language</span>
                <span className="text-white">English</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Download Available</span>
                <span className="text-green-400 font-bold">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
