import Link from "next/link";
import { getMovie } from "@/lib/getMovie";
import { MovieCarousel } from "@/components/MovieCarousel"; // Import the new carousel
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";

interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || "";
  console.log("Query: ", query);
  console.log("resolbed Params=>", resolvedParams);
  // Fetch data
  const data = await getMovie(query);

  // LOGIC: If searching, show grid. If home, show Carousel + "Must Watch" Sections
  const isSearching = query.length > 0;

  return (
    <main className="container mx-auto px-4 pb-20 space-y-12">
      {/* 1. HERO HEADER (Centered) */}
      
        <div className="text-center mt-16 mb-8 space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Best <span className="text-red-600">100</span> Movies
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Curated lists of the absolute best films from TMDB. Updated daily
            for the true cinema lover.
          </p>
          <div className="max-w-md mx-auto mt-6">
            <SearchInput />
          </div>
        </div>

      {/* If Searching: Show Simple Grid */}
      {isSearching ? (
        
          <div className="mt-8">
            <h2 className="text-xl mb-4 text-gray-400">
              Search Results for "{query}"
            </h2>
            {/* ... Your Existing Grid Code Here ... */}
            {/* (Keep your existing grid mapping logic here for search results) */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {data.map((movie: any) => (
                <Link key={movie._id} href={`/movie/${movie.slug}`}>
                  <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                    <img
                      src={movie.poster}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        
      ) : (
        /* 2. HOME LAYOUT (Carousels) */
        <div className="space-y-16">
          {/* Top 20 Carousel */}
          <MovieCarousel
            title="Top 20 Trending Now"
            movies={data.slice(0, 20)}
            viewAllLink="/trending"
          />

          {/* January Picks (Just using next 10 for demo) */}
          <MovieCarousel
            title="Must Watch in January 2026"
            movies={data.slice(20, 30)}
            viewAllLink="/picks/january"
          />

          {/* Action Movies (Filtering by Genre in Frontend for now) */}
          <MovieCarousel
            title="Best Action Movies"
            movies={data
              .filter((m: any) => m.genres?.includes("Action"))
              .slice(0, 15)}
            viewAllLink="/genre/action"
          />
        </div>
      )}
    </main>
  );
}
