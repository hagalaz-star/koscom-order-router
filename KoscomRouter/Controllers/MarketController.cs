using Microsoft.AspNetCore.Mvc;

namespace KoscomRouter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MarketController : ControllerBase
    {
        [HttpGet("quotes")]
        public IActionResult GetQuotes()
        {
            var quotes = new[]
            {
                new { Market = "A", Price = 10100 },
                new { Market = "B", Price = 10050 },
                
            };
            return Ok(quotes);
        }
    }
}

