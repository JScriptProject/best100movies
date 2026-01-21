import Link from "next/link";
import { getMovie } from "@/lib/getMovie";
import StarRating from "@/components/StarRating";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";

// 1. FIX: Define Props for Next.js 15 (It MUST be a Promise)
interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // 2. FIX: You MUST await the searchParams in Next.js 15
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || "";

  const data = await getMovie(query);
  console.log("The movie data=>", data);

  return (
    <main className="container mx-auto px-4 pb-10">
      <h1 className="text-center mt-16 text-4xl font-bold mb-5">
        Latest Released Movies
      </h1>

      <SearchInput />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((movie: any) => (
            <Card
              key={movie._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-1">
                  {movie.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {movie.overview}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </CardContent>

              <CardFooter className="p-4 flex flex-col gap-3 items-start">
                <StarRating rating={movie.rating} />

                <div className="flex w-full justify-between items-center mt-1">
                  {/* 3. FIX: Format the Date string to avoid "Date" type errors */}
                  <span className="text-xs text-gray-400 font-medium">
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).toLocaleDateString()
                      : "N/A"}
                  </span>

                  <Link href={`/movie/${movie.slug}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No movies found matching "{query}"
          </div>
        )}
      </div>
    </main>
  );
}
