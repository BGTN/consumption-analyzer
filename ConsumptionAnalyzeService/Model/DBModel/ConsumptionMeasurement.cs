using ConsumptionAnalyzeService.Model.ApiModel;
using Microsoft.Azure.Cosmos.Table;
using System;

namespace ConsumptionAnalyzeService.Model.DBModel
{
    public class ConsumptionMeasurementEntity : TableEntity
    {
        public string Id { get; set; }
        public double Level { get; set; }
        public string LevelType { get; set; }
        public string ConsumptionType { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }

        public ConsumptionMeasurementEntity() { }

        public ConsumptionMeasurementEntity(ConsumptionMeasurement consumptionMeasurement)
        {
            if (consumptionMeasurement.Id == null)
            {
                this.Id = Guid.NewGuid().ToString();
            } else
            {
                this.Id = consumptionMeasurement.Id;
            }
            this.Level = consumptionMeasurement.Level;
            this.LevelType = consumptionMeasurement.LevelType;
            this.ConsumptionType = consumptionMeasurement.ConsumptionType;
            this.Location = consumptionMeasurement.Location;
            this.ETag = "*";
            if (consumptionMeasurement.Date == null)
            {
                this.Date = DateTime.UtcNow;
            }
            else
            {
                this.Date = new DateTime(consumptionMeasurement.Date.Ticks, DateTimeKind.Utc);
            }
            this.PartitionKey = $"{this.ConsumptionType}-{this.Location}";
            this.RowKey = $"{this.Date.Year}-{this.Date.Month}-{this.Date.Day}";
        }
    }
}
