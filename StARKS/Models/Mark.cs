using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StARKS.Models
{
    public partial class Mark
    {
        [Key]
        public int Id { get; set; }

        public int? StudentId { get; set; }
        public Student Student { get; set; }

        public int? CourseId { get; set; }
        public Course Course { get; set; }

        public int? Grade { get; set; }

    }
}
