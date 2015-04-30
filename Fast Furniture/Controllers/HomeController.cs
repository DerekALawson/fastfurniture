using System;
using System.Web;
using System.Web.Mvc;

namespace fastFurniture.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            HttpContext.Response.AddHeader("X-UA-Compatible", "IE=edge");
            HttpContext.Response.Cache.SetLastModified(DateTime.UtcNow);

            return View();
        }

        public ActionResult Deferred()
        {

            HttpContext.Response.Cache.SetLastModified(DateTime.UtcNow);

            return View();
        }

    }
}