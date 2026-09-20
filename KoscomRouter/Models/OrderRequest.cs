using System;

namespace KoscomRouter.Models
{
    public class OrderRequest
    {
        public string Symbol { get; set; } = "";
        public int Quantity { get; set; }
        public string Side { get; set; } = ""; // "buy" or "sell"
    }
}
	

