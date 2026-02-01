'use client';

import { getStationsByLine } from '@/data/stations';
import { useSlotMachine } from '@/hooks/useSlotMachine';
import type { SubwayLine, Station } from '@/types/subway';

interface StationSlotMachineProps {
  line: SubwayLine;
  onStationSelected: (station: Station) => void;
}

export const StationSlotMachine = ({ line, onStationSelected }: StationSlotMachineProps) => {
  const stations = getStationsByLine(line.id);
  const { isRolling, displayedItem, roll } = useSlotMachine({
    items: stations,
    onComplete: onStationSelected,
  });

  return (
    <div className="flex flex-col items-center">
      {/* 슬롯 디스플레이 */}
      <div
        className="relative w-full max-w-md h-28 md:h-32 rounded-xl md:rounded-2xl shadow-inner overflow-hidden mb-6 md:mb-8"
        style={{
          background: `linear-gradient(135deg, ${line.colorCode.primary}, ${line.colorCode.secondary})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-3xl md:text-4xl font-bold transition-all duration-100"
            style={{
              color: line.colorCode.text,
              transform: isRolling ? 'scale(0.9)' : 'scale(1)',
            }}
          >
            {displayedItem ? displayedItem.name : '???'}
          </div>
        </div>

        {/* 롤링 효과 */}
        {isRolling && (
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        )}

        {/* 장식 라인 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30" />
      </div>

      {/* 역 개수 표시 */}
      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
        {line.name} 전체 {stations.length}개 역 중에서
      </p>

      {/* 스핀 버튼 */}
      <button
        onClick={roll}
        disabled={isRolling}
        className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm md:text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        {isRolling ? '역 선택 중...' : '데이트 역 뽑기!'}
      </button>
    </div>
  );
};
