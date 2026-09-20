using System;

public class MarketAService
{
	private readonly Dictionary<string, decimal> _prices = new()
    {
		["005930"] = 72500m,
		["000660"] = 193800m,
		["035420"] = 214000m,
		["035720"] = 42150m,

	};

	public async Task<decimal> GetPriceAsync(string stockCode)
	{
		await Task.Delay(410); // Simulate network delay

		if (!_prices.TryGetValue(stockCode, out decimal price))
		{
			throw new ArgumentException(
				$"Market A에 존재하지 않는 종목입니다:{stockCode}"
			);
        }
		return price;
    }
}
