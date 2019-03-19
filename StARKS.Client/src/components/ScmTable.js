import React, { Component } from 'react';
import Scm from './Scm';
import CreateCourseModal from './CreateCourseModal';
import './ScmTable.css';
import Modal from 'react-bootstrap/Modal';
import CreateStudentModal from './CreateStudentModal';
import EditCourseModal from './EditCourseModal'
import EditStudentModal from './EditStudentModal'
import $ from 'jquery';

const tableStyleThTdThead = {  
        border: '1px solid black',
        borderBottom: '1px solid black',
        borderCollapse: 'collapse',
        textAlign: 'center'
}
const inputStyle = {
    border: 'none transparent',
    outline: 'none',
    textAlign: 'center'
}
const btnLeftStyle = {
    float: 'left'
}

const btnRightStyle = {
    float: 'left'
}


class ScmTable extends Component {
  
  constructor(props){
    super(props);

    // Model state
    this.state = 
    {
      students : [] ,
      courses : [] ,

      allScm: [],
      studsearch : '',
      coursesearch : ''

    }
}

componentDidMount()
{
  this.getItems();


  $(document).ready(function () {
    $('#studentFilter').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();
        $('#tableX tbody tr').each(function () {
            var lineStr = $(this).text().toLowerCase();
            if (lineStr.indexOf(searchTerm) === -1) {
  
                $(this).hide();
  
            } else {
                $(this).show();
            }
        });
    });
  });


  $(document).ready(function () {
    $('#courseFilter').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();
        $('#tableX thead th').each(function () {
            var lineStr = $(this).text().toLowerCase();
            if (lineStr !== "   ") {
                if (lineStr.indexOf(searchTerm) === -1) {
                    var $curr = $(this);
                    var $cell = $curr.closest('th,td')
                    var $table = $curr.closest('table')


                    var cellIndex = $cell[0].cellIndex + 1;

                    $table.find("tbody tr, thead tr")
                        .children(":nth-child(" + cellIndex + ")")
                        .hide()
                } else {
                    var $curr1 = $(this);
                    var $cell1 = $curr1.closest('th,td')
                    var $table1 = $curr1.closest('table')


                    var cellIndex1 = $cell1[0].cellIndex + 1;

                    $table1.find("tbody tr, thead tr")
                        .children(":nth-child(" + cellIndex1 + ")")
                        .show()


                    $(this).show();
                }
            }
        });
    });
});




}

handleChange(e,sid,cid) {
  console.log("Param1 " , sid);
  console.log("param2" , cid);
  const inputText = e.target.value;
  console.log("event", e.target.value);
   

  //  this.UpdateGrade(sid,cid,e.target.value);
}

UpdateGrade(sid,cid,val) {
  //this.setState({value: event.target.value});
  // console.log("Param1 " , sid[0]);
  // console.log("param2" , cid[0]);
  // console.log("event", val);

  fetch('https://localhost:44312/api/ChangeGrade', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {sid: sid,cid:cid,val:val},
    body: JSON.stringify({sid: sid[0],cid:cid[0],val:val})
  });
}
handleCreateCourse(e)
{
  console.log("kliknuto");
}


getItems(){
    fetch('https://localhost:44312/api/home')
      .then(response => response.json())
      .then(response =>
        {

         this.setState({'students' : response.students});
         this.setState({'courses' : response.courses});
         this.setState({'allScm' : response.allSCM });
         
        
        }
        )

}

handleChangeStudentSearch (e)
{
  this.setState({studsearch:e.target.value});
}

handleChangeCourseSearch (e)
{
  this.setState({coursesearch:e.target.value});
}
  render() {

    return (
          <div>
              <div className="containerFluid">
              <br/>
              <div  style={btnLeftStyle}>
                <input id="studentFilter" type="text" value={this.state.studsearch} onChange={this.handleChangeStudentSearch.bind(this)}  placeholder="Filter students..."/>
              </div>
              <div style= {btnLeftStyle}> 
              <label value=" "/>
              </div>
              <div style={btnLeftStyle }>
              <input  id="courseFilter" type="text" value={this.state.coursesearch}  onChange={this.handleChangeCourseSearch.bind(this)}  placeholder="Filter courses..."/>
              </div>
              <div style={btnRightStyle}> 
                    <CreateCourseModal/>
                </div>

              <div style={btnRightStyle}>
                    <CreateStudentModal/>
               </div>
            <br/>
                    
            </div>
            <br/>
            <div className="table-responsive">
               <table id="tableX" className="table" style={tableStyleThTdThead} >
                    <thead style={tableStyleThTdThead}>
                        <tr>
                            <th scope="col" style={tableStyleThTdThead}>   </th>
                            
                                    {
                                      this.state.courses.map((course,index) => 
                                    {

                                      return <th scope="col" style={tableStyleThTdThead}> <EditCourseModal key={index} course = {course} /></th>

                                    })
                                  }                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allScm.map((scm,indexscm) => {
                                return (
                                    <tr key={indexscm}>
                                            <th scope="row" style={tableStyleThTdThead}> <EditStudentModal scm = {scm}/></th>
                                         {
                                              scm.grades.map((sc,indexgr) => {
                                                    // onChange={this.handleChange(scm.sid, sc.cid,this.value)}
                                              return( 
                                              <td style={tableStyleThTdThead} key={indexgr}>  
                                                <input style={inputStyle} value={sc.grade || ''} onChange={e => this.handleChange(e, scm.sid, sc.courseId)}/> 
                                              </td>
                                              )
                                          })
                                        } 


                                    </tr>
                                )


                            })

                        }


                    </tbody>
                </table>
                </div>
        </div>
        )
  }
}

export default ScmTable;
