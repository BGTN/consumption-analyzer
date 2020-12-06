using ConsumptionAnalyzeService.Model.ApiModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsumptionAnalyzeService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PowerConsumptionController : ControllerBase
    {
        private readonly ILogger<PowerConsumptionController> _logger;

        public PowerConsumptionController(ILogger<PowerConsumptionController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<PowerConsumption> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new PowerConsumption
            {
                Created = DateTime.Now,
                PowerLevelInKWh = 6.949f
            })
            .ToArray();
        }

        [HttpPost]
        public PowerConsumption Post(PowerConsumption powerConsumption)
        {
            return powerConsumption;
        }
    }
}
