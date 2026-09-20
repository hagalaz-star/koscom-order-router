export function routeOrder(side, quotes) {
  const candidates = [quotes.marketA, quotes.marketB]

  return candidates.reduce((selected, current) => {
    if (side === 'buy') {
      return current.price < selected.price ? current : selected
    }

    return current.price > selected.price ? current : selected
  })
}
