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
    public class CartController : ApiController
    {

        [HttpGet]
        public HttpResponseMessage Get(string cartId)
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\shopping.cart.json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpPost]
        public HttpResponseMessage Post(string cartId, int productId, int Qty)
        {

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(cartId)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpPut]
        public HttpResponseMessage Put(string cartId, int productId, int Qty)
        {

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(cartId)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpDelete]
        public HttpResponseMessage DeleteCart(string cartId)
        {

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(cartId)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

    }
}
