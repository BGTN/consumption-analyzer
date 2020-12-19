using ConsumptionAnalyzeService.Model.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.Model.ApiModel
{
    public class ConsumptionMeasurement
    {
        public string Id { get; set; }
        public double Level { get; set; }
        public string LevelType { get; set; }
        public string ConsumptionType { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }

        public ConsumptionMeasurement(float level, DateTime date)
        {
            this.Level = level;
            this.Date = date;
        }

        public ConsumptionMeasurement() { }

        public ConsumptionMeasurement(ConsumptionMeasurementEntity consumptionMeasurementEntity)
        {
            this.Level = consumptionMeasurementEntity.Level;
            this.Date = consumptionMeasurementEntity.Date;
            this.LevelType = consumptionMeasurementEntity.LevelType;
            this.ConsumptionType = consumptionMeasurementEntity.ConsumptionType;
            this.Location = consumptionMeasurementEntity.Location;
        }
    }
}
