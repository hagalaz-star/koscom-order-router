const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`

export default function RoutingResult({ result, side, quantity, isRouting }) {
  const marketName = result?.market === 'marketA' ? '시장 A' : '시장 B'
  const sideText = side === 'buy' ? '매수' : '매도'

  return (
    <section className="result-section" aria-labelledby="result-title">
      <div className="section-heading compact">
        <span className="step-number">03</span>
        <div>
          <p className="eyebrow">ROUTING RESULT</p>
          <h2 id="result-title">최적 시장</h2>
        </div>
      </div>

      <div className={result ? 'result-display has-result' : 'result-display'} aria-live="polite">
        {result && !isRouting ? (
          <>
            <div className="result-main">
              <span className="result-check" aria-hidden="true">✓</span>
              <div>
                <p className="result-caption">선택된 시장</p>
                <p className="result-market">{marketName}</p>
              </div>
            </div>
            <dl className="result-details">
              <div>
                <dt>주문 가격</dt>
                <dd>{formatPrice(result.price)}</dd>
              </div>
              <div>
                <dt>주문 조건</dt>
                <dd>{sideText} · {Number(quantity).toLocaleString('ko-KR')}주</dd>
              </div>
            </dl>
            <p className="routing-reason">
              {side === 'buy' ? '더 낮은 가격을 제시한 시장으로 라우팅합니다.' : '더 높은 가격을 제시한 시장으로 라우팅합니다.'}
            </p>
          </>
        ) : (
          <div className="empty-result">
            <span className="empty-symbol" aria-hidden="true">↗</span>
            <p>{isRouting ? '두 시장의 가격을 비교하고 있습니다.' : '주문 조건을 입력하고 라우팅을 실행하세요.'}</p>
          </div>
        )}
      </div>
    </section>
  )
}
