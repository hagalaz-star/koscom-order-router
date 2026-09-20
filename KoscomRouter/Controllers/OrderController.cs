using Microsoft.AspNetCore.Mvc;
using KoscomRouter.Models;
using KoscomRouter.Services;


namespace KoscomRouter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderRoutingService _orderRoutingService;

        public OrderController(OrderRoutingService orderRoutingService)
        {
            _orderRoutingService = orderRoutingService;
        }
        
        [HttpPost("route")]
        public async Task<ActionResult<OrderResponse>> RouterOrder(OrderRequest request)
        {
            OrderResponse result = await _orderRoutingService.RouterOrderAsync(request);
            return Ok(result);
        }
    }
}


