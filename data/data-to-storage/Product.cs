using Microsoft.WindowsAzure.Storage.Table;
using System.Collections.Generic;

namespace data_to_storage
{
    public class Product : TableEntity
    {

        //partition: "Products"
        //key: Product Name

        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }

        public List<string> Photos { get; set; }

        public double Price { get; set; }
        public List<string> Categories { get; set; }

        public List<Product> Related { get; set; }

        public List<string> Reviews { get; set; }
        public double AvgRating { get; set; }
    }
}