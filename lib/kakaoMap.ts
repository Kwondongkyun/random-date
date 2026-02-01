import { KakaoPlace } from '@/types/place';

export class KakaoMapService {
  private apiKey: string;
  private baseUrl = 'https://dapi.kakao.com/v2/local';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchPlaces(
    latitude: number,
    longitude: number,
    radius: number = 1000,
    category?: 'CE7' | 'FD6' // CE7: 카페, FD6: 음식점
  ): Promise<KakaoPlace[]> {
    const params = new URLSearchParams({
      x: longitude.toString(),
      y: latitude.toString(),
      radius: radius.toString(),
      sort: 'distance',
      ...(category && { category_group_code: category }),
    });

    const response = await fetch(`${this.baseUrl}/search/category.json?${params}`, {
      headers: {
        Authorization: `KakaoAK ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Kakao API Error:', response.status, errorData);
      throw new Error(`Failed to fetch places: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.documents || [];
  }

  async searchRestaurantsAndCafes(latitude: number, longitude: number) {
    try {
      const [restaurants, cafes] = await Promise.all([
        this.searchPlaces(latitude, longitude, 1000, 'FD6'),
        this.searchPlaces(latitude, longitude, 1000, 'CE7'),
      ]);

      return {
        restaurants: restaurants.slice(0, 5),
        cafes: cafes.slice(0, 5),
      };
    } catch (error) {
      console.error('Error searching places:', error);
      return {
        restaurants: [],
        cafes: [],
      };
    }
  }
}
