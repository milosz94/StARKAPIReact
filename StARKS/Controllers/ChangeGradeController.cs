using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StARKS.Data;
using StARKS.Models;

namespace StARKS.Controllers
{

    public class GradeChangeRequest
    {
        public int sid { get; set; }
        public int cid { get; set; }
        public int val { get; set; }
    }



    [Route("api/[controller]")]
    [ApiController]
    public class ChangeGradeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ChangeGradeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] GradeChangeRequest changeGradeRequest)
        {
            int val = changeGradeRequest.val;
            int sid = changeGradeRequest.sid;
            int cid = changeGradeRequest.cid;


            if (val < 6 || val > 10)
                return BadRequest();

            var toUpdate = from m in _context.Marks
                           where m.StudentId == sid && m.CourseId == cid
                           select new Mark
                           {
                               Id = m.Id,
                               Student = m.Student,
                               StudentId = m.StudentId,
                               Course = m.Course,
                               CourseId = m.CourseId

                           };


            if (toUpdate.FirstOrDefault() == null)
            {
                Mark m = new Mark
                {
                    CourseId = cid,
                    StudentId = sid,
                    Grade = val

                };
                _context.Marks.Add(m);
                _context.SaveChangesAsync();
            }
            else
            {
                toUpdate.First().Grade = val;
                Mark m1 = new Mark
                {
                    Id = toUpdate.First().Id,
                    CourseId = toUpdate.First().CourseId,
                    StudentId = toUpdate.First().StudentId,
                    Student = toUpdate.First().Student,
                    Course = toUpdate.First().Course,
                    Grade = val
                };


                _context.Marks.Update(m1);
                _context.SaveChangesAsync();
            }



            return Ok();


        }
    }
}