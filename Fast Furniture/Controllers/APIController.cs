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
        public HttpResponseMessage Product(string slug)
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\products\" + slug + ".json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpGet]
        public HttpResponseMessage RelatedProducts()
        {

            string content = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\data\related-products.json"));

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(content)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }


        [HttpGet]
        public HttpResponseMessage HomeCategories()
        {
            string fileName = HttpContext.Current.Server.MapPath(@"~\data\home-categories.json");

            if (Request.Headers.Accept.ToString() != "application/json, text/javascript")
            {
                fileName = HttpContext.Current.Server.MapPath(@"~\data\home-categories.html");
            }


            string content = File.ReadAllText(fileName);


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


        [HttpPut, HttpPost]
        public HttpResponseMessage Category(Category category)
        {


            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(category.Name)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [HttpGet]
        public HttpResponseMessage Category(string slug)
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
        public HttpResponseMessage DeleteCategory(string slug)
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
