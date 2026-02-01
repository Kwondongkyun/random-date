'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineRouletteWheel } from '@/components/LineRouletteWheel';
import { StationSlotMachine } from '@/components/StationSlotMachine';
import type { SubwayLine, Station } from '@/types/subway';

export default function HomePage() {
  const router = useRouter();
  const [selectedLine, setSelectedLine] = useState<SubwayLine | null>(null);
  const [step, setStep] = useState<'line' | 'station'>('line');

  const handleLineSelected = (line: SubwayLine) => {
    setSelectedLine(line);
    setTimeout(() => {
      setStep('station');
    }, 1000);
  };

  const handleStationSelected = (station: Station) => {
    router.push(`/result?line=${selectedLine?.id}&station=${station.id}`);
  };

  return (
    <main className="min-h-screen p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4">
            오늘 어디 갈까?
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            랜덤 데이트 코스 추천 서비스
          </p>
        </header>

        {/* 호선 선택 단계 */}
        {step === 'line' && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800">
              Step 1: 호선 뽑기
            </h2>
            <LineRouletteWheel onLineSelected={handleLineSelected} />
          </div>
        )}

        {/* 역 선택 단계 */}
        {step === 'station' && selectedLine && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">
              Step 2: {selectedLine.name} 역 뽑기
            </h2>
            <StationSlotMachine
              line={selectedLine}
              onStationSelected={handleStationSelected}
            />
            <button
              onClick={() => {
                setStep('line');
                setSelectedLine(null);
              }}
              className="mt-6 md:mt-8 mx-auto block text-gray-500 hover:text-gray-700 underline text-sm"
            >
              다시 호선 뽑기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
