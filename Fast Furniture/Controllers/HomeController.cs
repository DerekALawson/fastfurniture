using System;
using System.Web;
using System.Web.Mvc;

namespace fastFurniture.Controllers
{
    public class HomeController : Controller
    {

        //Only cache for 30 seconds to keep sanity developing on localhost :)
        [OutputCache(Duration = 30, VaryByParam = "_escaped_fragment_")]
        public ActionResult Index()
        {
            //put IE X-UA-Compatible as HTTP header to avoid recycling critical rendering path
            HttpContext.Response.AddHeader("X-UA-Compatible", "IE=edge");

            //Used to Hydrate only required markup
            HttpContext.Response.Cache.SetLastModified(DateTime.UtcNow);

            return View();
        }

        [OutputCache(Duration = 30)]
        public ActionResult Deferred()
        {

            HttpContext.Response.Cache.SetLastModified(DateTime.UtcNow);

            return View();
        }

    }
}