using ConsumptionAnalyzeService.Model.ApiModel;
using Microsoft.Azure.Cosmos.Table;
using System;

namespace ConsumptionAnalyzeService.Model.DBModel
{
    public class PowerConsumptionEntity : TableEntity
    {
        private string ROW_KEY_CONST = "POWER_CONSUMPTION";
        public string Id { get; set; }
        public double PowerLevelInKWh { get; set; }
        public DateTime Created { get; set; }

        public PowerConsumptionEntity() { }

        public PowerConsumptionEntity(PowerConsumption powerConsumption)
        {
            if (powerConsumption.Id == null)
            {
                this.Id = Guid.NewGuid().ToString();
            } else
            {
                this.Id = powerConsumption.Id;
            }
            this.PowerLevelInKWh = powerConsumption.PowerLevelInKWh;
            this.ETag = "*";
            if (powerConsumption.Created == null)
            {
                this.Created = DateTime.UtcNow;
            }
            else
            {
                this.Created = new DateTime(powerConsumption.Created.Ticks, DateTimeKind.Utc);
            }
            this.PartitionKey = $"{this.Created.Year}-{this.Created.Month}-{this.Created.Day}";
            this.RowKey = this.ROW_KEY_CONST;
        }
    }
}
