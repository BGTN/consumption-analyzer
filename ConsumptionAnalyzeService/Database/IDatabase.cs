using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.Database
{
    public interface IDatabase<T>
    {
        public Task<T> Save(T item);
        public Task<IEnumerable<T>> Retrieve();
    }
}
