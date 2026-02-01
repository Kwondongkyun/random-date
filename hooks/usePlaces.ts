import { useState, useEffect } from 'react';
import type { PlacesData } from '@/types/place';

export const usePlaces = (latitude?: number, longitude?: number) => {
  const [data, setData] = useState<PlacesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/places?lat=${latitude}&lng=${longitude}`);

        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }

        const places = await response.json();
        setData(places);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [latitude, longitude]);

  return { data, isLoading, error };
};
