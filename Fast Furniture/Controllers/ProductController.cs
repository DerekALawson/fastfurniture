using System;
using Fast_Furniture.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace Fast_Furniture.Controllers
{
    public class ProductController : ApiController
    {

        [HttpGet]
        public HttpResponseMessage Products(int? page, int? count)
        {

            if (count == null)
            {
                count = 10;
            }

            if (page == null || page < 1)
            {
                page = 1;
            }

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\products.json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpPut, HttpPost]
        public HttpResponseMessage Product(Product Product)
        {


            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(Product.Name)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpGet]
        public HttpResponseMessage Product(string slug)
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\" + slug + ".json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }


        [HttpDelete]
        public HttpResponseMessage DeleteProduct(string slug)
        {

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(slug)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }


    }
}
