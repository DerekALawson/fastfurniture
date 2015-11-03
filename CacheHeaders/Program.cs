using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CacheHeaders
{
    class Program
    {
        static StorageCredentials storageCredentials =
            new StorageCredentials("fastfurniture", "7oaGOD5J0XCJ5AE3LEMbHfx99TljgC+NHzaDTCyuAQJ6GMZIWklD9dJ8DNqERzI2G1K4sHKi1h61jBs5Pn0Z5w==");
        private static string newCacheSettings = "public, max-age=31104000"; // 12 months
        private static string[] containersToProcess = { "display", "mobile", "thumb", "originals" };
        
        static void Main(string[] args)
        {
            var account = new CloudStorageAccount(
                storageCredentials,
                false /* useHttps */);

            CloudBlobClient blobClient = account.CreateCloudBlobClient();

            var tasks = new List<Task>();
            foreach (var container in blobClient.ListContainers())
            {
                if (containersToProcess.Contains(container.Name))
                {
                    var c = container;
                    tasks.Add(Task.Run(() => FixHeaders(c)));
                }
            }
            Task.WaitAll(tasks.ToArray());
        }

        private static async Task FixHeaders(CloudBlobContainer cloudBlobContainer)
        {
            int totalCount = 0, updateCount = 0, errorCount = 0;

            Console.WriteLine("Starting container: " + cloudBlobContainer.Name);
            IEnumerable<IListBlobItem> blobInfos = cloudBlobContainer.ListBlobs(useFlatBlobListing: true);

            foreach (var blobInfo in blobInfos)
            {
                try
                {
                    CloudBlockBlob blockBlob = (CloudBlockBlob)blobInfo;
                    var blob = await cloudBlobContainer.GetBlobReferenceFromServerAsync(blockBlob.Name);
                    blob.FetchAttributes();

//                    cloudBlobContainer.

                    //Response.Cache.SetExpires(DateTime.Now.AddHours(1));
                    //Response.Cache.SetCacheability(HttpCacheability.Public);
                    //Response.Cache.SetLastModified(DateTime.Now);

                    

                    // set cache-control header if necessary
                    if (blob.Properties.CacheControl != newCacheSettings)
                    {
                        blob.Properties.CacheControl = newCacheSettings;
                        blob.SetProperties();
                        updateCount++;
                    }
                }
                catch (Exception ex)
                {
                    // Console.WriteLine(ex.Message);
                    errorCount++;
                }
                totalCount++;
            }
            Console.WriteLine("Finished container: " + cloudBlobContainer.Name +
                ", TotalCount = " + totalCount +
                ", Updated = " + updateCount +
                ", Errors = " + errorCount);
        }

        // http://geekswithblogs.net/EltonStoneman/archive/2014/10/09/configure-azure-storage-to-return-proper-response-headers-for-blob.aspx
        private static void UpdateAzureServiceVersion(CloudBlobClient blobClient)
        {
            var props = blobClient.GetServiceProperties();
            props.DefaultServiceVersion = new DateTime().AddDays(730).ToShortDateString();
            blobClient.SetServiceProperties(props);
        }
    }
}
