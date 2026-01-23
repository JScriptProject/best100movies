import { client } from "@/app/sanity";
import { cache } from "react";

interface Movie {
  title: string;
  poster: string;
  overview: string;
  _id: string;
  releaseDate: string;
  rating: number;
  slug: string;
  genres?: string[];
  trailer?: string;
  runtime?: number;
  cast?: {
    actorName: string;
    photoUrl: string;
  }[];
}

// 1. GET ALL MOVIES (Cached + ISR)
export const getMovie = cache(async (query?: string) => {
  const queryString = query
    ? `*[_type == "movie" && title match $search + "*"] | order(releaseDate desc) {
        _id, 
        title, 
        overview, 
        releaseDate, 
        "poster": poster.asset->url,
        "slug": slug.current,
        rating, 
        genres
      }`
    : `*[_type == "movie"] | order(releaseDate desc) { 
        _id, 
        title, 
        overview, 
        releaseDate, 
        "poster": poster.asset->url,
        "slug": slug.current,
        rating,
        genres
      }`;

  const response = await client.fetch<Movie[]>(
    queryString,
    { search: query ? query : null },
    { next: { revalidate: 3600 } },
  );

  return response;
});

// 2. GET SINGLE MOVIE (Fetches Full Details)
export const getMovieBySlug = cache(async (selectedSlug: string) => {
  const query = `*[_type == "movie" && slug.current == $slug][0]{
    _id,
    title,
    overview,
    releaseDate,
    "poster": poster.asset->url,
    rating,
    genres,
    trailer,
    runtime,
    cast[]{
      actorName,
      "photoUrl": photo.asset->url
    }
  }`;

  const response = await client.fetch<Movie>(
    query,
    { slug: selectedSlug },
    { next: { revalidate: 3600 } },
  );

  return response;
});
