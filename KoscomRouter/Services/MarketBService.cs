using System;

public class MarketBService
{
    private readonly Dictionary<string, decimal> _prices = new()
    {
        ["005930"] = 72700m,
        ["000660"] = 197800m,
        ["035420"] = 212000m,
        ["035720"] = 41150m,

    };

    public async Task<decimal> GetPriceAsync(string stockCode)
    {
        await Task.Delay(560); // Simulate network delay

        if (!_prices.TryGetValue(stockCode, out decimal price))
        {
            throw new ArgumentException(
                $"MarketB에 존재하지 않는 종목입니다:{stockCode}"
            );
        }
        return price;
    }
}

