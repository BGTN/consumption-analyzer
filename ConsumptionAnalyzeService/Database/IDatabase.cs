using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.Database
{
    public interface IDatabase<T>
    {
        public T save(T item);
        public T retrieve(string id);
    }
}
