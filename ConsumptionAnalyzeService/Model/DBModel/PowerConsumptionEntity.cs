using ConsumptionAnalyzeService.Model.ApiModel;
using Microsoft.Azure.Cosmos.Table;
using System;

namespace ConsumptionAnalyzeService.Model.DBModel
{
    public class PowerConsumptionEntity : TableEntity
    {
        private string RowKeyConst = "POWER_CONSUMPTION";
        public string Id { get; set; }
        public double PowerLevelInKWh { get; set; }
        public DateTime Created { get; set; }

        public PowerConsumptionEntity() { }

        public PowerConsumptionEntity(float powerLevelInKWh, DateTime created)
        {
            this.Id = Guid.NewGuid().ToString();
            this.PowerLevelInKWh = powerLevelInKWh;
            if (created == null)
            {
                this.Created = new DateTime();
            }
            else
            {
                this.Created = created;
            }
            this.PartitionKey = $"{this.Created.Year}-{this.Created.Month}-{this.Created.Day}";
            this.RowKey = this.RowKeyConst;
        }

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
            this.RowKey = this.RowKeyConst;
        }
    }
}
