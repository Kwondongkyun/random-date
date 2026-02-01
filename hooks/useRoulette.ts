import { useState, useCallback } from 'react';

interface UseRouletteProps<T> {
  items: T[];
  onComplete?: (selectedItem: T) => void;
}

export const useRoulette = <T,>({ items, onComplete }: UseRouletteProps<T>) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const spin = useCallback(() => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setSelectedIndex(null);

    // 랜덤 선택
    const randomIndex = Math.floor(Math.random() * items.length);

    // 회전 각도 계산
    const itemAngle = 360 / items.length;
    const targetAngle = 360 - (randomIndex * itemAngle);

    // 여러 바퀴 회전 + 목표 각도 (3~5바퀴 랜덤)
    const extraRotations = (3 + Math.random() * 2) * 360;
    const finalRotation = rotation + extraRotations + targetAngle;

    setRotation(finalRotation);

    // 애니메이션 완료 후 처리 (3초 후)
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIndex(randomIndex);
      onComplete?.(items[randomIndex]);
    }, 3000);
  }, [items, rotation, isSpinning, onComplete]);

  const reset = useCallback(() => {
    setRotation(0);
    setSelectedIndex(null);
    setIsSpinning(false);
  }, []);

  return {
    rotation,
    isSpinning,
    selectedIndex,
    spin,
    reset,
  };
};
