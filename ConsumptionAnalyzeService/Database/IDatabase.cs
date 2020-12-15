using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.Database
{
    public interface IDatabase<T>
    {
        public void Init(string tableReference);
        public Task<T> Save(T item);
        public Task<IEnumerable<T>> Retrieve();
        public Task<T> Delete(T entity);
    }
}
