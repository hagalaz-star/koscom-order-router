# Koscom Order Router

---

두 개의 가상 시장 가격을 비교해서 주문을 어느 시장으로 보낼지 결정하는 프로젝트입니다.

매수 주문은 가격이 낮은 시장으로, 매도 주문은 가격이 높은 시장으로 보냅니다. 프론트에서 주문 정보를 보내면 ASP.NET Core API가 MarketA와 MarketB의 가격을 비교한 뒤 선택된 시장과 가격을 반환합니다.

순차 조회와 병렬 조회의 처리 시간 차이도 화면에서 확인할 수 있습니다. 실제 거래소 API 대신 고정된 모의 시세와 지연 시간을 사용했습니다.

## 사용 기술

---

- React
- JavaScript
- ASP.NET Core
- C#

## 실행 방법

---

백엔드:

```bash
cd KoscomRouter
dotnet run
```

프론트엔드:

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`로 접속하면 됩니다.
