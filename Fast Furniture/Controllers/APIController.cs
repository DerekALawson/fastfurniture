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
    public class DataController : ApiController
    {

        [HttpGet]
        public HttpResponseMessage Products()
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\products.json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpGet]
        public HttpResponseMessage Categories()
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\categories.json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpGet]
        public HttpResponseMessage CategoryProducts(string category)
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\" + category + ".json"));
            
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

    }
}
