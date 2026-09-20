const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`

function PriceBox({ name, code, quote, isLoading }) {
  return (
    <article className={`price-box ${code}`}>
      <div className="market-name-row">
        <span className="market-indicator" aria-hidden="true" />
        <span className="market-label">{name}</span>
        <span className="market-status">정상</span>
      </div>
      <p className={isLoading ? 'market-price loading' : 'market-price'}>
        {quote ? formatPrice(quote.price) : '가격 조회 중'}
      </p>
      <p className="quote-time">
        {quote ? `수신 ${quote.receivedAt.toLocaleTimeString('ko-KR')}` : '실시간 호가 대기'}
      </p>
    </article>
  )
}

export default function MarketPrices({ quotes, isLoading }) {
  return (
    <section className="market-section" aria-labelledby="market-title">
      <div className="section-heading compact">
        <span className="step-number">02</span>
        <div>
          <p className="eyebrow">MARKET WATCH</p>
          <h2 id="market-title">시장 가격 비교</h2>
        </div>
      </div>

      <div className="price-grid" aria-live="polite">
        <PriceBox name="시장 A" code="market-a" quote={quotes?.marketA} isLoading={isLoading} />
        <PriceBox name="시장 B" code="market-b" quote={quotes?.marketB} isLoading={isLoading} />
      </div>
    </section>
  )
}
