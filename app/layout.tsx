import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘 어디 갈까? - 랜덤 데이트 추천",
  description: "지하철 룰렛으로 찾는 오늘의 데이트 코스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
