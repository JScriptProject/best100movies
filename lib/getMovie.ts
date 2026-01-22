import { client } from "@/app/sanity";

//typescript

interface Movie {
  title: string;
  poster: string;
  overview: string;
  _id: string;
  releaseDate: Date;
  rating: number;
  slug: string;
}

export async function getMovie(query?: string) {
  const queryString = query
    ? `*[_type == "movie" && title match $search + "*"]{
  _id, 
  title, 
  overview, 
  releaseDate, 
  "poster": poster.asset->url,
  "slug":slug.current,
  rating, 
  genres,
  }`
    : `*[_type == "movie"]{ 
  _id, 
  title, 
  overview, 
  releaseDate, 
  "poster": poster.asset->url,
  "slug":slug.current,
  rating,
  genres
  }`;
  const response = await client.fetch<Movie[]>(queryString, {
    search: query ? query : null,
  });
  return response;
}

///////////////////////////
// GET MOVIE INFORMATION BY SLUG TO SHOW MOVIE
///////////////////////////

export async function getMovieBySlug(selectedSlug: string) {
  const query = `*[_type == "movie" && slug.current == $slug][0]{
    _id,
    title,
    overview,
    releaseDate,
    "poster": poster.asset->url,
    rating,
    genres
    }`;

  const response = await client.fetch<Movie>(query, { slug: selectedSlug });
  return response;
}
