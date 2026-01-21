import { client } from "@/app/sanity";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";

// Fetch logic specifically for a single movie
async function getMovieDetail(slug: string) {
  const query = `*[_type == "movie" && slug.current == '${slug}'][0] {
    _id,
    title,
    overview,
    releaseDate,
    rating,
    "poster": poster.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const movie = await getMovieDetail(slug);

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <Link href="/">
          <Button className="mt-4">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION WITH BLURRED BACKDROP */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* The Background Layer */}
        <div className="absolute inset-0">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover blur-xl opacity-50 scale-110" // Blurs and scales up
            priority
          />
          {/* The Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* The Content Layer */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col md:flex-row items-end pb-12 gap-8">
          {/* Floating Poster */}
          <div className="hidden md:block shrink-0 w-[250px] rounded-lg overflow-hidden shadow-2xl border-4 border-white/10 transform translate-y-16">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={250}
              height={375}
              className="object-cover"
            />
          </div>

          {/* Movie Info */}
          <div className="flex flex-col gap-4 mb-4">
            {/* Back Button */}
            <Link
              href="/"
              className="absolute top-8 left-4 md:left-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-sm md:text-base text-gray-300">
              <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400 border border-yellow-500/30">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="font-bold">{movie.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{movie.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-[250px_1fr] gap-8">
        {/* Empty column to align with poster above */}
        <div className="hidden md:block"></div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold border-l-4 border-red-600 pl-4">
            Storyline
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            {movie.overview}
          </p>

          <div className="pt-8">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
