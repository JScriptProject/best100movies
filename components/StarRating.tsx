import { Star, StarHalf } from "lucide-react";

interface Props {
  rating: number; // Expects 0 to 5
}

export default function StarRating({ rating }: Props) {
  // Create an array of 5 elements (1, 2, 3, 4, 5) to loop through
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        // Logic: Should this star be full, half, or empty?
        const isFullStar = rating >= star;
        const isHalfStar = rating >= star - 0.5 && rating < star;

        return (
          <span key={star} className="text-yellow-500">
            {isFullStar ? (
              // Full Star
              <Star fill="currentColor" className="w-4 h-4" />
            ) : isHalfStar ? (
              // Half Star
              <StarHalf fill="currentColor" className="w-4 h-4" />
            ) : (
              // Empty Star (Gray)
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        );
      })}
      {/* Show the number text next to stars */}
      <span className="text-xs text-gray-500 font-bold ml-2">
        {rating.toFixed(1)} / 5
      </span>
    </div>
  );
}
