import { NextRequest, NextResponse } from "next/server";
import { KakaoMapService } from "@/lib/kakaoMap";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latitude = parseFloat(searchParams.get("lat") || "0");
  const longitude = parseFloat(searchParams.get("lng") || "0");

  if (!latitude || !longitude) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  const apiKey = process.env.KAKAO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const kakaoService = new KakaoMapService(apiKey);
    const places = await kakaoService.searchRestaurantsAndCafes(
      latitude,
      longitude
    );

    return NextResponse.json(places);
  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}
