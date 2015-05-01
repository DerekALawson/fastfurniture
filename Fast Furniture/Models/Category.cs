using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fast_Furniture.Models
{
    public class Category
    {

        public string Name { get; set; }
        public string Slug { get; set; }
        public List<SubCategory> Children { get; set; }

    }
}