using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fast_Furniture.Models
{
    public class Product
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public double Price { get; set; }
        public string[] Categories { get; set; }

    }
}