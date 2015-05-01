using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fast_Furniture.Models
{
    public class User
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<UserRoles> Roles { get; set; }
    }
}