using ConsumptionAnalyzeService.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.ClientApp
{
    public class TableDatabaseClient<T> : IDatabase<T>
    {
        public T retrieve(string id)
        {
            throw new NotImplementedException();
        }

        public T save(T item)
        {
            throw new NotImplementedException();
        }
    }
}
