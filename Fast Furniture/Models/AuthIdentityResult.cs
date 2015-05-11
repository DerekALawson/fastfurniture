using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fast_Furniture.Models
{
    public class AuthIdentityResult
    {

        public AuthIdentityResult() {

            this.Succeeded = true;
            this.Success = true;

        }

        public bool Succeeded { get; private set; }
        public bool Success { get; private set; }

        public IEnumerable<string> Errors { get; private set; }

    }
}