using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data_to_storage
{
    public class CategoryProducts
    {

        //partition: "Category"
        //key: Category Name

        public List<Product> Products { get; set; }


    }
}
