using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Table;
using System.IO;
using Newtonsoft.Json;

namespace data_to_storage
{

    class Program
    {

        static StorageCredentials storageCredentials =
                new StorageCredentials("fastfurniture", "7oaGOD5J0XCJ5AE3LEMbHfx99TljgC+NHzaDTCyuAQJ6GMZIWklD9dJ8DNqERzI2G1K4sHKi1h61jBs5Pn0Z5w==");


        static void Main(string[] args)
        {

            storageAccount = new CloudStorageAccount(storageCredentials, true);

            MakeProductsTable();
            MakeCategoriesTable();

        }

        public static CloudTableClient tableClient;
        public static CloudStorageAccount storageAccount;

        public void InitCloudConnection()
        {

            if (storageAccount == null)
            {

                storageAccount = new CloudStorageAccount(storageCredentials, true);
            }


            if (tableClient == null)
            {

                // Create the table client.
                tableClient = storageAccount.CreateCloudTableClient();

            }

        }


        static void MakeProductsTable() {

            CreateTable("products");

        }

        static void MakeCategoriesTable()
        {

            CreateTable("categories");

        }

        static void CreateTable(string tableName) {

            // Create the table client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Create the table if it doesn't exist.
            CloudTable table = tableClient.GetTableReference(tableName);
            table.CreateIfNotExists();
        }

        static string ReadDataFile(string path) {

            return File.ReadAllText(path);

        }

        static void insertCategories() {

            Category category = JsonConvert.DeserializeObject<Category>(File.ReadAllText(@"c:\movie.json"));

        }


        static void insertProducts() { }


        static void insertMisc() { }

        static void insertRecords(string tableName, List<TableEntity> records) {

            // Create the CloudTable object that represents the "people" table.
            CloudTable table = tableClient.GetTableReference(tableName);

            // Create the batch operation.
            TableBatchOperation batchOperation = new TableBatchOperation();

            foreach (var record in records)
            {
                batchOperation.Insert(record);
            }

            // Execute the batch operation.
            table.ExecuteBatch(batchOperation);

        }

    }
}
