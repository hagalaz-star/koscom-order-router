
namespace KoscomRouter.Models
{
    public class OrderResponse
    { 
        public string Symbol { get; set; } = "";
        public int Quantity { get; set; }
        public string Side { get; set; } = ""; // "buy" or "sell"
        public string SelectedMarket { get; set; } = ""; // "MarketA" or "MarketB"
        public decimal Price { get; set; }
    }
}
