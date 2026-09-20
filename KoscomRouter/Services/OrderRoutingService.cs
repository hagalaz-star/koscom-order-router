using System;
using System.Threading.Tasks;
using KoscomRouter.Models;



namespace KoscomRouter.Services
{
    public class OrderRoutingService
    {
        private readonly MarketAService _marketAService;
        private readonly MarketBService _marketBService;

        public OrderRoutingService(MarketAService marketAService, MarketBService marketBService)
        {
            _marketAService = marketAService;
            _marketBService = marketBService;
        }

        public async Task<OrderResponse> RouterOrderAsync(OrderRequest request)
        {
            decimal marketAPrice = await _marketAService.GetPriceAsync(request.Symbol);
            decimal marketBPrice = await _marketBService.GetPriceAsync(request.Symbol);

            string selectedMarket;
            decimal selectedPrice;

            if (request.Side == "buy")
            {
                if (marketAPrice <= marketBPrice)
                {
                    selectedMarket = "MarketA";
                    selectedPrice = marketAPrice;
                }
                else
                {
                    selectedMarket = "MarketB";
                    selectedPrice = marketBPrice;
                }
            }
            else
            {
                if (marketAPrice >= marketBPrice)
                {
                    selectedMarket = "MarketA";
                    selectedPrice = marketAPrice;
                }
                else
                {
                    selectedMarket = "MarketB";
                    selectedPrice = marketBPrice;
                }
            }

            return new OrderResponse
            {
                Symbol = request.Symbol,
                Quantity = request.Quantity,
                Side = request.Side,
                SelectedMarket = selectedMarket,
                Price = selectedPrice
            };
        }
    }
}