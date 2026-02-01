"use client";

import { PlaceCard } from "./PlaceCard";
import type { KakaoPlace } from "@/types/place";

interface PlacesListProps {
  restaurants: KakaoPlace[];
  cafes: KakaoPlace[];
}

export const PlacesList = ({ restaurants, cafes }: PlacesListProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-full">
      {/* 맛집 영역 */}
      <div className="w-full md:w-1/2 min-h-[300px] md:h-full bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 flex flex-col">
        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2 flex-shrink-0">
          <span>🍽️</span>
          <span>주변 맛집</span>
        </h3>
        {restaurants.length > 0 ? (
          <div className="flex-1 overflow-y-auto pr-1 md:pr-2 space-y-2 md:space-y-4">
            {restaurants.map((restaurant) => (
              <PlaceCard
                key={restaurant.id}
                place={restaurant}
                type="restaurant"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6 md:py-8 text-sm">
            주변 맛집 정보를 찾을 수 없습니다
          </p>
        )}
      </div>

      {/* 카페 영역 */}
      <div className="w-full md:w-1/2 min-h-[300px] md:h-full bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 flex flex-col">
        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2 flex-shrink-0">
          <span>☕</span>
          <span>주변 카페</span>
        </h3>
        {cafes.length > 0 ? (
          <div className="flex-1 overflow-y-auto pr-1 md:pr-2 space-y-2 md:space-y-4">
            {cafes.map((cafe) => (
              <PlaceCard key={cafe.id} place={cafe} type="cafe" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6 md:py-8 text-sm">
            주변 카페 정보를 찾을 수 없습니다
          </p>
        )}
      </div>
    </div>
  );
};
