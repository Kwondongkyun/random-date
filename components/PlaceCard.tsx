"use client";

import type { KakaoPlace } from "@/types/place";

interface PlaceCardProps {
  place: KakaoPlace;
  type: "restaurant" | "cafe";
}

export const PlaceCard = ({ place, type }: PlaceCardProps) => {
  const icon = type === "restaurant" ? "🍽️" : "☕";
  const bgColor = type === "restaurant" ? "bg-orange-50" : "bg-blue-50";
  const borderColor =
    type === "restaurant" ? "border-orange-200" : "border-blue-200";

  return (
    <div
      className={`${bgColor} ${borderColor} border-2 rounded-lg md:rounded-xl p-3 md:p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-2 md:gap-3">
        <div className="text-2xl md:text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm md:text-lg text-gray-800 mb-1 truncate">
            {place.place_name}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-1.5 md:mb-2 truncate">
            {place.category_name}
          </p>
          <div className="space-y-0.5 md:space-y-1">
            {place.road_address_name && (
              <p className="text-[10px] md:text-xs text-gray-500 truncate">
                📍 {place.road_address_name}
              </p>
            )}
            {place.phone && (
              <p className="text-[10px] md:text-xs text-gray-500">
                📞 {place.phone}
              </p>
            )}
            <p className="text-[10px] md:text-xs text-gray-500">
              🚶 거리: {place.distance}m
            </p>
          </div>
          {place.place_url && (
            <a
              href={place.place_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1.5 md:mt-2 text-[10px] md:text-xs text-blue-600 hover:text-blue-800 hover:underline"
            >
              상세 정보 보기 →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
