import Image from "next/image";
import  Link  from 'next/link'
import { getMovie } from "@/lib/getMovie";
import StarRating from "@/components/StarRating"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";


export default async function Home({searchParams}:{searchParams:{query?:string};}) {
   
  const query = searchParams?.query || ""
  const data = await getMovie(query);
  console.log("The movie data=>", data);


  return (
    <main>
      <h1 className="text-center mt-16 text-4xl font-bold mb-5">
        Latest Released movies
      </h1>
      <SearchInput />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((movie) => {
            const originalOverview = movie.overview;
            const shortOverview = originalOverview.substring(0, 65);
            console.log("Original Overview=>", originalOverview);
            console.log("ShortOverview=> ", shortOverview);
            return (
              <Card
                key={movie._id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header Section */}
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {movie.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {movie.overview}
                  </CardDescription>
                </CardHeader>

                {/* Image Section (Fixed Aspect Ratio) */}
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </CardContent>

                {/* Footer Section (Stars + Details) */}
                <CardFooter className="p-4 flex flex-col gap-3 items-start">
                  {/* The New Star Rating */}
                  <StarRating rating={movie.rating} />

                  <div className="flex w-full justify-between items-center mt-1">
                    <span className="text-xs text-gray-400 font-medium">
                      {movie.releaseDate}
                    </span>
                    <Link href={`/movie/${movie.slug}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            );})): (
          <div className="col-span-full text-center py-20 text-gray-500">
            No movies found matching "{query}"
          </div>
        )}
      </div>
    </main>
  );
}
