'use client';

import { SUBWAY_LINES } from '@/data/subwayLines';
import { useSlotMachine } from '@/hooks/useSlotMachine';
import { SubwayLine } from '@/types/subway';

interface LineRouletteWheelProps {
  onLineSelected: (line: SubwayLine) => void;
  isTransitioning?: boolean;
}

export const LineRouletteWheel = ({ onLineSelected, isTransitioning = false }: LineRouletteWheelProps) => {
  const { isRolling, displayedItem, roll } = useSlotMachine({
    items: SUBWAY_LINES,
    onComplete: onLineSelected,
  });

  const displayedLine = displayedItem || SUBWAY_LINES[0];

  return (
    <div className="flex flex-col items-center">
      {/* 슬롯 디스플레이 */}
      <div
        className="relative w-full max-w-md h-32 md:h-40 rounded-xl md:rounded-2xl shadow-inner overflow-hidden mb-6 md:mb-8"
        style={{
          background: displayedLine
            ? `linear-gradient(135deg, ${displayedLine.colorCode.primary}, ${displayedLine.colorCode.secondary})`
            : 'linear-gradient(135deg, #888, #aaa)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-4xl md:text-5xl font-bold transition-all duration-100"
            style={{
              color: displayedLine?.colorCode.text || '#fff',
              transform: isRolling ? 'scale(0.9)' : 'scale(1)',
            }}
          >
            {displayedLine ? displayedLine.name : '???'}
          </div>
        </div>

        {/* 롤링 효과 */}
        {isRolling && (
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        )}

        {/* 장식 라인 */}
        <div className="absolute top-0 left-0 right-0 h-1 md:h-2 bg-white/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-white/30" />
      </div>

      {/* 호선 개수 표시 */}
      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
        전체 {SUBWAY_LINES.length}개 호선 중에서
      </p>

      {/* 스핀 버튼 */}
      <button
        onClick={roll}
        disabled={isRolling || isTransitioning}
        className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm md:text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      >
        {isRolling ? '호선 선택 중...' : isTransitioning ? '역 선택 준비 중...' : '오늘의 데이트 호선 뽑기!'}
      </button>
    </div>
  );
};
