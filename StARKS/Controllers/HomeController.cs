using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StARKS.Data;
using StARKS.Models;

namespace StARKS.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        [Produces("application/json")]
        public HomeViewModel Get()
        {


            var info =
                   (from st in _context.Students.Include("Marks")
                    from co in _context.Courses.Include("Marks")
                    select new
                    {
                        sid = st.Id,
                        sname = st.FirstName + " " + st.LastName,
                        cid = co.Id,
                        cname = co.Name,
                        grad = st.Marks.Where(o => o.StudentId == st.Id && o.CourseId == co.Id
                            ).FirstOrDefault().Grade
                    }

                    ).ToList();
            var studList = _context.Students.ToList();
            var coursList = _context.Courses.ToList();



            HomeViewModel hvm = new HomeViewModel
            {
                AllSCM = new List<SCM>(),

                Students = studList,

                Courses = coursList
            };


            for (int i = 0; i < studList.Count; i++)
            {
                SCM sc = new SCM();
                sc.Sid = studList[i].Id;
                sc.FirstName = studList[i].FirstName;
                sc.Sname = studList[i].FirstName + " " + studList[i].LastName;

                var tmpL = new List<Mark>();
                foreach (var inf in info)
                {

                    if (inf.sid == studList[i].Id)
                    {
                        tmpL.Add(new Mark { Grade = inf.grad, CourseId = inf.cid, Course = new Course {Name = inf.cname}  });
                        //tmpL.Add(inf.grad,inf.cid);
                    }
                }
                sc.Grades = tmpL;
                hvm.AllSCM.Add(sc);


            }

            return  hvm;
        }

    }
}