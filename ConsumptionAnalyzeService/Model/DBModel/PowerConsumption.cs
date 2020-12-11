using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.Model.DBModel
{
    public class PowerConsumption
    {
        public string Id { get; set; }
        public float PowerLevelInKWh { get; set; }
        public DateTime Created { get; set; }

        public PowerConsumption(float powerLevelInKWh, DateTime created)
        {
            this.PowerLevelInKWh = powerLevelInKWh;
            this.Created = created;
        }

        public PowerConsumption() { }
    }
}
