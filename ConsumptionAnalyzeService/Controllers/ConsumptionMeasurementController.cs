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
    public class ConsumptionMeasurementController : ControllerBase
    {
        private readonly ILogger<ConsumptionMeasurementController> _logger;
        private static IDatabase<ConsumptionMeasurementEntity> _db;
        private readonly string _tableName = "ConsumptionMeasurements";

        public ConsumptionMeasurementController(ILogger<ConsumptionMeasurementController> logger, IDatabase<ConsumptionMeasurementEntity> db)
        {
            _logger = logger;
            _db = db;
            _db.Init(_tableName);
        }

        [HttpGet]
        public IEnumerable<ConsumptionMeasurementEntity> GetBy([FromQuery] string consumptionType, [FromQuery] string location)
        {
            var partitionKey = $"{consumptionType}-{location}";
            var results = _db.RetrieveBy(partitionKey).Result.OrderBy(consumptionMeasurement => consumptionMeasurement.Date);
            return results;
        }

        [HttpPost]
        public ConsumptionMeasurement Post(ConsumptionMeasurement consumptionMeasurement)
        {
            ConsumptionMeasurementEntity consumptionMeasurementEntity = new ConsumptionMeasurementEntity(consumptionMeasurement);
            var result = _db.Save(consumptionMeasurementEntity).Result;
            if(result == null)
            {
                throw new ApplicationException("Something went wrong saving the ConsumptionMeasurement");
            }
            return new ConsumptionMeasurement(result);
        }

        [HttpDelete]
        public ConsumptionMeasurement Delete(ConsumptionMeasurement consumptionMeasurement)
        {
            Console.WriteLine(consumptionMeasurement);
            ConsumptionMeasurementEntity consumptionMeasurementEntity = new ConsumptionMeasurementEntity(consumptionMeasurement);
            var result = _db.Delete(consumptionMeasurementEntity).Result;
            if (result == null)
            {
                throw new ApplicationException("Something went wrong deleting the ConsumptionMeasurement");
            }
            return new ConsumptionMeasurement(result);
        }
    }
}
