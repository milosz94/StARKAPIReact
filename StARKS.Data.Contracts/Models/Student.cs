using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StARKS.Data.Contracts.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(256)]
        public string firstname { get; set; }

        [MaxLength(256)]
        public string lastname { get; set; }

        [MaxLength(256)]
        public string adress { get; set; }

        [MaxLength(256)]
        public string city { get; set; }

        public DateTime dateofbirth { get; set; }

        public string gender { get; set; }

    }
}
