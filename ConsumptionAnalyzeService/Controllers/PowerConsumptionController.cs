using ConsumptionAnalyzeService.Database;
using ConsumptionAnalyzeService.Model.ApiModel;
using ConsumptionAnalyzeService.Model.DBModel;
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
        private static IDatabase<PowerConsumptionEntity> _db;

        public PowerConsumptionController(ILogger<PowerConsumptionController> logger, IDatabase<PowerConsumptionEntity> db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        public IEnumerable<PowerConsumptionEntity> Get()
        {
            return _db.Retrieve().Result;
        }

        [HttpPost]
        public PowerConsumption Post(PowerConsumption powerConsumption)
        {
            PowerConsumptionEntity powerConsumptionEntity = new PowerConsumptionEntity(powerConsumption);
            var result = _db.Save(powerConsumptionEntity).Result;
            if(result == null)
            {
                throw new ApplicationException("Something went wrong saving the PowerConsumption");
            }
            return new PowerConsumption(result);
        }
    }
}
