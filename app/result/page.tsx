"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlacesList } from "@/components/PlacesList";
import { ResultMap } from "@/components/ResultMap";
import { usePlaces } from "@/hooks/usePlaces";
import { SUBWAY_LINES } from "@/data/subwayLines";
import { getStationById } from "@/data/stations";
import type { SubwayLine, Station } from "@/types/subway";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lineId = searchParams.get("line");
  const stationId = searchParams.get("station");

  const [line, setLine] = useState<SubwayLine | null>(null);
  const [station, setStation] = useState<Station | null>(null);

  useEffect(() => {
    if (lineId && stationId) {
      const foundLine = SUBWAY_LINES.find((l) => l.id === lineId);
      const foundStation = getStationById(stationId);

      if (foundLine && foundStation) {
        setLine(foundLine);
        setStation(foundStation);
      }
    }
  }, [lineId, stationId]);

  const {
    data: places,
    isLoading,
    error,
  } = usePlaces(station?.latitude, station?.longitude);

  if (!line || !station) {
    return (
      <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">역 정보를 불러오는 중...</p>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            처음으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen md:h-dvh p-3 md:p-8">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:h-full">
        {/* 왼쪽: 지도 영역 */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-800">
              오늘의 데이트 장소는?
            </h1>
            <div
              className="inline-block px-4 md:px-6 py-2 md:py-3 rounded-full text-white text-base md:text-2xl font-bold mb-3 md:mb-4 shadow-lg"
              style={{ backgroundColor: line.color }}
            >
              {line.name} {station.name}역
            </div>
            <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">
              {station.name}역 주변 추천 맛집과 카페예요!
            </p>
          </div>

          {/* 지도 */}
          <div className="flex-1 mb-3 md:mb-4 min-h-[200px] md:min-h-0">
            <ResultMap station={station} />
          </div>

          {/* 다시 뽑기 버튼 */}
          <div className="text-center">
            <button
              onClick={() => router.push("/")}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm md:text-base font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105"
            >
              다시 뽑기
            </button>
          </div>
        </div>

        {/* 오른쪽: 장소 리스트 */}
        <div className="w-full md:w-3/5 lg:w-2/3">
          {isLoading ? (
            <div className="h-full min-h-[300px] bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 flex items-center justify-center">
              <div className="animate-pulse">
                <div className="text-base md:text-xl text-gray-600">
                  주변 장소를 찾는 중...
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="h-full min-h-[300px] bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 mb-4 text-sm md:text-base">
                  장소 정보를 불러오는데 실패했습니다
                </p>
                <p className="text-gray-500 text-xs md:text-sm">{error}</p>
              </div>
            </div>
          ) : places ? (
            <PlacesList
              restaurants={places.restaurants || []}
              cafes={places.cafes || []}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
