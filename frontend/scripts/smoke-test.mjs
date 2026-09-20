import { chromium } from 'playwright-core'

const baseUrl = process.env.APP_URL ?? 'http://127.0.0.1:5173'
const chromePath = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  timeout: 10_000,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
})

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await desktop.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await desktop.locator('.market-price').first().waitFor({ timeout: 3_000 })

  await desktop.locator('#stock').selectOption('000660')
  await desktop.locator('#quantity').fill('25')
  await desktop.getByRole('button', { name: '매도' }).click()
  await desktop.getByRole('button', { name: '주문 라우팅' }).click()
  await desktop.locator('.result-market').waitFor({ timeout: 4_000 })

  const selectedMarket = await desktop.locator('.result-market').textContent()
  const timingValues = await desktop.locator('.timing-copy b').allTextContents()
  const desktopOverflow = await desktop.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )

  if (selectedMarket !== '시장 A') {
    throw new Error(`매도 라우팅 결과가 예상과 다릅니다: ${selectedMarket}`)
  }

  if (timingValues.some((value) => value === '-- ms')) {
    throw new Error('처리시간 결과가 표시되지 않았습니다.')
  }

  if (desktopOverflow) {
    throw new Error('데스크톱 화면에 가로 넘침이 있습니다.')
  }

  await desktop.screenshot({ path: '/tmp/koscom-router-desktop.png', fullPage: true })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10_000 })
  const mobileOverflow = await mobile.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )

  if (mobileOverflow) {
    throw new Error('모바일 화면에 가로 넘침이 있습니다.')
  }

  await mobile.screenshot({ path: '/tmp/koscom-router-mobile.png', fullPage: true })

  console.log(`라우팅 결과: ${selectedMarket}`)
  console.log(`처리시간: ${timingValues.join(' / ')}`)
  console.log('데스크톱 및 모바일 가로 넘침: 없음')
} finally {
  await browser.close()
}
