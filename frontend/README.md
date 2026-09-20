# 모의 주문 라우터

React + Vite + JavaScript로 만든 프론트엔드 프로토타입입니다. 시장 가격은 `src/services/marketService.js`의 임시 데이터를 사용합니다.

## 실행

```bash
npm install
npm run dev
```

## C# API 연결 지점

`src/services/marketService.js`의 `fetchMarketQuote`를 ASP.NET Core API에 요청하는 `fetch` 코드로 교체하면 됩니다. 화면 컴포넌트는 `{ market, price, receivedAt }` 형태의 응답을 사용합니다.
