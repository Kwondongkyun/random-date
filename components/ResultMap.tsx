'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { Station } from '@/types/subway';

interface ResultMapProps {
  station: Station;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export const ResultMap = ({ station }: ResultMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (kakaoLoaded && mapContainer.current && window.kakao && station) {
      window.kakao.maps.load(() => {
        // 기존 지도가 있으면 제거
        if (mapInstance.current) {
          mapInstance.current = null;
        }

        const options = {
          center: new window.kakao.maps.LatLng(station.latitude, station.longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer.current, options);
        mapInstance.current = map;

        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(
          station.latitude,
          station.longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 인포윈도우 추가
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:10px;font-weight:bold;">${station.name}역</div>`,
        });
        infowindow.open(map, marker);
      });
    }
  }, [kakaoLoaded, station.latitude, station.longitude, station.name]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=354a177e6c00f5f98921bc27331382ab&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setKakaoLoaded(true)}
      />
      <div
        ref={mapContainer}
        className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-gray-100"
      />
    </>
  );
};
