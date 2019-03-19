using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StARKS.Data.Contracts.Models
{
    public class Course
    {
        [Key]
        public int code { get; set; }

        [MaxLength(256)]
        public string name { get; set; }

        [MaxLength(256)]
        public string description { get; set; }


    }
}
