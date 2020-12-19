using ConsumptionAnalyzeService.Database;
using ConsumptionAnalyzeService.Model.DBModel;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumptionAnalyzeService.ClientApp
{
    public class TableDatabaseClient<T> : IDatabase<T> where T: TableEntity, new()
    {

        private static CloudStorageAccount storageAccount;
        private static CloudTableClient tableClient;
        private static CloudTable _table;
        public TableDatabaseClient(IConfiguration config)
        {
            // Create the table client.
            if(storageAccount == null)
            {
                storageAccount = CloudStorageAccount.Parse(config["StorageConnectionString"]);
            }
            if(tableClient == null)
            {
               tableClient = storageAccount.CreateCloudTableClient();
            }
        }

        public void Init(string tableReference)
        {
            _table = tableClient.GetTableReference(tableReference);
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

        public async Task<IEnumerable<T>> Retrieve()
        {
            var results = new List<T>();

            TableQuery<T> query = new TableQuery<T>();
            TableContinuationToken continuationToken = null;
            do
            {
                var response = await _table.ExecuteQuerySegmentedAsync(query, continuationToken);
                continuationToken = response.ContinuationToken;
                results.AddRange(response.Results);
            } while (continuationToken != null);
         
            return results;
        }

        public async Task<IEnumerable<T>> RetrieveBy(string partitionKey)
        {
            var results = new List<T>();

            TableQuery<T> query = new TableQuery<T>().Where($"PartitionKey eq '{partitionKey}'");
            TableContinuationToken continuationToken = null;
            do
            {
                var response = await _table.ExecuteQuerySegmentedAsync(query, continuationToken);
                continuationToken = response.ContinuationToken;
                results.AddRange(response.Results);
            } while (continuationToken != null);

            return results;
        }

        public async Task<T> Delete(T entity)
        {
            var result = await DeleteObject(entity);

            return (T)result.Result;
        }

        public static async Task<TableResult> DeleteObject<T>(T entity) where T : ITableEntity
        {
            if (_table == null)
            {
                throw new ArgumentNullException(nameof(_table));
            }

            TableOperation operation = TableOperation.Delete(entity);
            var result = await _table.ExecuteAsync(operation);
            return result;
        }
    }
}
