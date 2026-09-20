// 나중에는 이 파일의 함수 내부만 C# API 호출(fetch)로 교체하면 됩니다.
const MOCK_PRICES = {
  '005930': { marketA: 72500, marketB: 72700 },
  '000660': { marketA: 193800, marketB: 193500 },
  '035420': { marketA: 214000, marketB: 214500 },
  '035720': { marketA: 42150, marketB: 42050 },
}

const MARKET_LATENCY = {
  marketA: 410,
  marketB: 560,
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

async function fetchMarketQuote(stockCode, market) {
  const jitter = Math.floor(Math.random() * 90)
  await wait(MARKET_LATENCY[market] + jitter)

  return {
    market,
    price: MOCK_PRICES[stockCode][market],
    receivedAt: new Date(),
  }
}

export async function loadMarketPreview(stockCode) {
  const quotes = await Promise.all([
    fetchMarketQuote(stockCode, 'marketA'),
    fetchMarketQuote(stockCode, 'marketB'),
  ])

  return Object.fromEntries(quotes.map((quote) => [quote.market, quote]))
}

export async function fetchSequentialQuotes(stockCode) {
  const startedAt = performance.now()
  const marketA = await fetchMarketQuote(stockCode, 'marketA')
  const marketB = await fetchMarketQuote(stockCode, 'marketB')

  return {
    quotes: { marketA, marketB },
    duration: performance.now() - startedAt,
  }
}

export async function fetchParallelQuotes(stockCode) {
  const startedAt = performance.now()
  const [marketA, marketB] = await Promise.all([
    fetchMarketQuote(stockCode, 'marketA'),
    fetchMarketQuote(stockCode, 'marketB'),
  ])

  return {
    quotes: { marketA, marketB },
    duration: performance.now() - startedAt,
  }
}
