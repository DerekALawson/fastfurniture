using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Fast_Furniture.Startup))]
namespace Fast_Furniture
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
