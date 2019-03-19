import React, {Component} from 'react';
import CreateCourseModal from './CreateCourseModal';
import './ScmTable.css';
import CreateStudentModal from './CreateStudentModal';
import EditCourseModal from './EditCourseModal'
import EditStudentModal from './EditStudentModal'
import $ from 'jquery';

const tableStyleThTdThead = {
  border: '1px solid black',
  borderBottom: '1px solid black',
  borderCollapse: 'collapse',
  textAlign: 'center'
};
const inputStyle = {
  border: 'none transparent',
  outline: 'none',
  textAlign: 'center'
};
const btnLeftStyle = {
  float: 'left'
};

const btnRightStyle = {
  float: 'left'
};

class ScmTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      courses: [],
      allScm: [],
      studentSearch: '',
      courseSearch: ''
    }
  }

  componentDidMount() {
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

  handleChange(e, studentId, courseId) {
    console.log("Param1 ", sid);
    console.log("param2", cid);
    const inputText = e.target.value;
    console.log("event", e.target.value);

    //  this.updateGrade(sid,cid,e.target.value);
  }

  updateGrade(sid, cid, val) {
    fetch('https://localhost:44312/api/ChangeGrade', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {sid: sid, cid: cid, val: val},
      body: JSON.stringify({sid: sid[0], cid: cid[0], val: val})
    });
  }

  getItems() {
    fetch('https://localhost:44312/api/home')
    .then(response => response.json())
    .then(response => {
          this.setState({
            students: response.students,
            courses: response.courses,
            allScm: response.allSCM
          });
        }
    )
  }

  handleChangeStudentSearch(e) {
    this.setState({studentSearch: e.target.value});
  }

  handleChangeCourseSearch(e) {
    this.setState({courseSearch: e.target.value});
  }

  render() {

    return (
        <div>
          <div className="containerFluid">
            <br/>
            <div style={btnLeftStyle}>
              <input id="studentFilter" type="text"
                     value={this.state.studentSearch}
                     onChange={this.handleChangeStudentSearch.bind(this)}
                     placeholder="Filter students..."/>
            </div>
            <div style={btnLeftStyle}>
              <input id="courseFilter" type="text"
                     value={this.state.courseSearch}
                     onChange={this.handleChangeCourseSearch.bind(this)}
                     placeholder="Filter courses..."/>
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
            <table id="tableX" className="table" style={tableStyleThTdThead}>
              <thead style={tableStyleThTdThead}>
              <tr>
                <th scope="col" style={tableStyleThTdThead}/>
                {this.state.courses.map((course, index) =>
                    <th scope="col" style={tableStyleThTdThead}>
                      <EditCourseModal key={index} course={course}/>
                    </th>
                )}
              </tr>
              </thead>
              <tbody>
              {this.state.allScm.map((studentCourseMark, i) =>
                  <tr key={i}>
                    <th scope="row" style={tableStyleThTdThead}>
                      <EditStudentModal scm={studentCourseMark}/></th>
                    {studentCourseMark.grades.map((sc, indexgr) =>
                        <td style={tableStyleThTdThead} key={indexgr}>
                          <input style={inputStyle}
                                 value={sc.grade || ''}
                                 onChange={e => this.handleChange(e,
                                     studentCourseMark.sid, sc.courseId)}/>
                        </td>
                    )}
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

export default ScmTable;
