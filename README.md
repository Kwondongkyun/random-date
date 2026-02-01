# 오늘 어디 갈까? 💕

커플을 위한 랜덤 데이트 장소 추천 웹 서비스

## 기능

- 🎡 지하철 호선 룰렛 (1-9호선, 신분당선)
- 🎰 역 랜덤 선택
- 🗺️ 선택된 역 주변 맛집/카페 추천
- 📱 모바일 반응형 디자인

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- 카카오맵 API

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일에 카카오맵 API 키를 추가하세요:

```env
KAKAO_API_KEY=your_rest_api_key
NEXT_PUBLIC_KAKAO_JS_KEY=your_javascript_key
```

API 키 발급: https://developers.kakao.com/

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 프로젝트 구조

```
project/
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트
├── data/            # 지하철 노선 및 역 데이터
├── hooks/           # 커스텀 React 훅
├── lib/             # 유틸리티 및 API 클래스
└── types/           # TypeScript 타입 정의
```

## 배포

Vercel로 배포:

```bash
npm run build
```

## 라이선스

MIT
