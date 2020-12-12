using ConsumptionAnalyzeService.Database;
using ConsumptionAnalyzeService.Model.DBModel;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.ClientApp
{
    public class TableDatabaseClient<T> : IDatabase<T> where T: TableEntity
    {

        private static CloudStorageAccount storageAccount = CloudStorageAccount.Parse("");
        private static CloudTableClient tableClient;
        private static CloudTable _table;

        public TableDatabaseClient()
        {
            // Create the table client.
            tableClient = storageAccount.CreateCloudTableClient();
            _table = tableClient.GetTableReference("PowerConsumptions");
            // Create the table if it doesn't exist.
            _table.CreateIfNotExists();
        }

        public async Task<T> Save(T entity)
        {
            var result = await AddObject(entity);
            
            return (T) result.Result;
        }

        public static async Task<TableResult> AddObject<T>(T value) where T : ITableEntity
        {
            if (_table == null)
            {
                throw new ArgumentNullException(nameof(_table));
            }

            TableOperation operation = TableOperation.InsertOrReplace(value);
            var result = await _table.ExecuteAsync(operation);
            return result;
        }

    }
}
