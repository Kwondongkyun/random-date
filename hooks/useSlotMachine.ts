import { useState, useCallback, useEffect } from 'react';

interface UseSlotMachineProps<T> {
  items: T[];
  onComplete?: (selectedItem: T) => void;
}

export const useSlotMachine = <T,>({ items, onComplete }: UseSlotMachineProps<T>) => {
  const [isRolling, setIsRolling] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState<number | null>(null);
  const [finalIndex, setFinalIndex] = useState<number | null>(null);
  const [hasRolled, setHasRolled] = useState(false);

  const roll = useCallback(() => {
    if (isRolling || items.length === 0) return;

    setIsRolling(true);
    setHasRolled(true);
    setFinalIndex(null);

    // 랜덤 선택
    const randomIndex = Math.floor(Math.random() * items.length);
    setFinalIndex(randomIndex);

    // 2.5초 동안 롤링
    const rollingDuration = 2500;
    const intervalTime = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += intervalTime;

      if (elapsed >= rollingDuration) {
        clearInterval(interval);
        setDisplayedIndex(randomIndex);
        setIsRolling(false);
        onComplete?.(items[randomIndex]);
      } else {
        // 빠르게 랜덤하게 인덱스 변경
        const currentIndex = Math.floor(Math.random() * items.length);
        setDisplayedIndex(currentIndex);
      }
    }, intervalTime);
  }, [items, isRolling, onComplete]);

  const reset = useCallback(() => {
    setDisplayedIndex(null);
    setFinalIndex(null);
    setIsRolling(false);
    setHasRolled(false);
  }, []);

  const displayedItem = displayedIndex !== null ? items[displayedIndex] : null;

  return {
    isRolling,
    displayedItem,
    displayedIndex,
    hasRolled,
    roll,
    reset,
  };
};
