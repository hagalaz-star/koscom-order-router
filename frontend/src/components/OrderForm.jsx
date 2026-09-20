export default function OrderForm({
  stocks,
  stockCode,
  quantity,
  side,
  isRouting,
  error,
  onStockChange,
  onQuantityChange,
  onSideChange,
  onSubmit,
}) {
  return (
    <section className="order-panel" aria-labelledby="order-title">
      <div className="section-heading">
        <span className="step-number">01</span>
        <div>
          <p className="eyebrow">ORDER ENTRY</p>
          <h2 id="order-title">주문 조건</h2>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="field-group">
          <label htmlFor="stock">종목</label>
          <select
            id="stock"
            value={stockCode}
            onChange={(event) => onStockChange(event.target.value)}
            disabled={isRouting}
          >
            {stocks.map((stock) => (
              <option key={stock.code} value={stock.code}>
                {stock.name} ({stock.code})
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="quantity">주문 수량</label>
          <div className="quantity-input">
            <input
              id="quantity"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={quantity}
              onChange={(event) => onQuantityChange(event.target.value)}
              required
              disabled={isRouting}
            />
            <span>주</span>
          </div>
        </div>

        <fieldset className="side-fieldset">
          <legend>주문 구분</legend>
          <div className="side-control">
            <button
              type="button"
              className={
                side === "buy" ? "side-button buy active" : "side-button buy"
              }
              aria-pressed={side === "buy"}
              disabled={isRouting}
              onClick={() => onSideChange("buy")}
            >
              매수
            </button>
            <button
              type="button"
              className={
                side === "sell" ? "side-button sell active" : "side-button sell"
              }
              aria-pressed={side === "sell"}
              disabled={isRouting}
              onClick={() => onSideChange("sell")}
            >
              매도
            </button>
          </div>
        </fieldset>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button className="route-button" type="submit" disabled={isRouting}>
          {isRouting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              시장 조회 중
            </>
          ) : (
            <>
              주문 라우팅
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}
