import { useEffect, useState } from "react";
import MarketPrices from "./components/MarketPrices.jsx";
import OrderForm from "./components/OrderForm.jsx";
import RoutingResult from "./components/RoutingResult.jsx";
import TimingComparison from "./components/TimingComparison.jsx";
import { STOCKS } from "./data/stocks.js";
import {
  fetchParallelQuotes,
  fetchSequentialQuotes,
  loadMarketPreview,
} from "./services/marketService.js";

export default function App() {
  const [stockCode, setStockCode] = useState(STOCKS[0].code);
  const [quantity, setQuantity] = useState("10");
  const [side, setSide] = useState("buy");
  const [quotes, setQuotes] = useState(null);
  const [result, setResult] = useState(null);
  const [timings, setTimings] = useState(null);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [isRouting, setIsRouting] = useState(false);

  const selectedStock = STOCKS.find((stock) => stock.code === stockCode);

  useEffect(() => {
    let isCurrent = true;
    setIsLoadingPrices(true);
    setQuotes(null);
    setResult(null);
    setTimings(null);

    loadMarketPreview(stockCode).then((nextQuotes) => {
      if (isCurrent) {
        setQuotes(nextQuotes);
        setIsLoadingPrices(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [stockCode]);

  async function handleRoute(event) {
    event.preventDefault();

    if (!quantity || Number(quantity) < 1) return;

    setIsRouting(true);
    setResult(null);
    setTimings(null);

    try {
      const [sequential, parallel, response] = await Promise.all([
        fetchSequentialQuotes(stockCode),
        fetchParallelQuotes(stockCode),

        fetch("http://localhost:5000/api/order/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol: stockCode,
            quantity: Number(quantity),
            side: side,
          }),
        }),
      ]);

      if (!response.ok) {
        throw new Error("주문 라우팅 요청 실패");
      }

      const data = await response.json();

      setQuotes(parallel.quotes);

      setTimings({
        sequential: sequential.duration,
        parallel: parallel.duration,
      });

      setResult({
        market: data.selectedMarket,
        price: data.price,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsRouting(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#main-content"
          aria-label="모의 주문 라우터 홈"
        >
          <span className="brand-mark" aria-hidden="true">
            SR
          </span>
          <span>
            <strong>Smart Route</strong>
            <small>Trading Lab</small>
          </span>
        </a>
        <div className="system-status">
          <span className="status-dot" aria-hidden="true" />
          <span>모의 시장 연결됨</span>
        </div>
      </header>

      <main id="main-content">
        <div className="page-intro">
          <div>
            <p className="eyebrow">ORDER ROUTING SIMULATOR</p>
            <h1>모의 주문 라우터</h1>
            <p>시장별 호가를 비교해 주문에 유리한 거래 시장을 선택합니다.</p>
          </div>
          <div className="selected-stock" aria-label="현재 선택 종목">
            <span>{selectedStock.name}</span>
            <strong>{selectedStock.code}</strong>
          </div>
        </div>

        <div className="workspace">
          <OrderForm
            stocks={STOCKS}
            stockCode={stockCode}
            quantity={quantity}
            side={side}
            isRouting={isRouting}
            onStockChange={setStockCode}
            onQuantityChange={setQuantity}
            onSideChange={setSide}
            onSubmit={handleRoute}
          />

          <div className="dashboard">
            <MarketPrices
              quotes={quotes}
              isLoading={isLoadingPrices || isRouting}
            />
            <RoutingResult
              result={result}
              side={side}
              quantity={quantity}
              isRouting={isRouting}
            />
            <TimingComparison timings={timings} />
          </div>
        </div>
      </main>

      <footer>
        <span>FRONT-END PROTOTYPE</span>
        <span>데이터는 모의 시세입니다.</span>
      </footer>
    </div>
  );
}
