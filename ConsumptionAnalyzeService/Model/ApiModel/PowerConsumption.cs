using ConsumptionAnalyzeService.Model.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.Model.ApiModel
{
    public class PowerConsumption
    {
        public string Id { get; set; }
        public double PowerLevelInKWh { get; set; }
        public DateTime Created { get; set; }

        public PowerConsumption(float powerLevelInKWh, DateTime created)
        {
            this.PowerLevelInKWh = powerLevelInKWh;
            this.Created = created;
        }

        public PowerConsumption() { }

        public PowerConsumption(PowerConsumptionEntity powerConsumptionEntity)
        {
            this.PowerLevelInKWh = powerConsumptionEntity.PowerLevelInKWh;
            this.Created = powerConsumptionEntity.Created;
        }
    }
}
