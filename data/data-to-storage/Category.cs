using Microsoft.WindowsAzure.Storage.Table;
using System.Collections.Generic;

namespace data_to_storage
{
    public class Category : TableEntity
    {

        //partition: "Category"
        //key: Category Name

        public string Name {get; set; }
        public string Slug { get; set; }
        public List<Category> Children { get; set; }

    }
}