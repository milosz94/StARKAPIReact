import React, {Component} from 'react';
import CreateCourseModal from './CreateCourseModal';
import './ScmTable.css';
import CreateStudentModal from './CreateStudentModal';
import EditCourseModal from './EditCourseModal'
import EditStudentModal from './EditStudentModal'

import config from "../config.json"

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
  float: 'right'
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

  }

  handleChange(e, studentId, courseId) {
    const inputText = e.target.value;
    console.log("event", e.target.value);
    const allScm = this.state.allScm.map(student => {
      if (student.sid === studentId) {
        const s = student;
        s.grades.map(grade => {
          if (grade.courseId === courseId) {
            const g = grade;
            g.grade = e.target.value;
            return g;
          }
          return grade;
        });
        return s;
      } else {
        return student;
      }
    });

    this.setState({
      allScm: allScm
    });

    //  this.updateGrade(studentId,courseId,e.target.value);
  }
  handleBlur(e, studentId, courseId) {
    this.updateGrade(studentId, courseId, e.target.value);
  }


  updateGrade(sid, cid, val) {
    fetch(`${config.baseUrl}/ChangeGrade`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {sid: sid, cid: cid, val: val},
      body: JSON.stringify({sid: sid, cid: cid, val: val})
    }).then(this.getItems.bind(this));
  }

  getItems() {
    
    fetch(`${config.baseUrl}/home`)
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
              <CreateCourseModal onCreateCourse={() => this.getItems()}/>
            </div>
            <div style={btnRightStyle}>
              <CreateStudentModal onCreateStudent={() => this.getItems()}/>
            </div>
            <br/>

          </div>
          <br/>
          <div className="table-responsive">
            <table id="tableX" className="table" style={tableStyleThTdThead}>
              <thead style={tableStyleThTdThead}>
              <tr>
                <th scope="col" style={tableStyleThTdThead}/>
                {this.state.courses.filter(item => item.name.indexOf(this.state.courseSearch) !== -1).map((course, index) =>
                    <th scope="col" style={tableStyleThTdThead}>
                      <EditCourseModal key={index} onEditCourse={() => this.getItems()} course={course}/>
                    </th>
                )}
              </tr>
              </thead>
              <tbody>
              {this.state.allScm.filter(item => item.sname.toLowerCase().indexOf(this.state.studentSearch.toLowerCase()) !== -1).map((studentCourseMark, i) =>
                  <tr key={i}>
                    <th scope="row" style={tableStyleThTdThead}>
                      <EditStudentModal scm={studentCourseMark}  onStudentEdit={() => this.getItems()}/>
                    </th>
                    {studentCourseMark.grades.filter(grade => grade.course.name.indexOf(this.state.courseSearch) !== -1).map((sc, indexgr) =>
                        <td style={tableStyleThTdThead} key={indexgr}>
                          <input style={inputStyle}
                                 value={sc.grade || ''}
                                 onBlur={e => this.handleBlur(e,
                                  studentCourseMark.sid, sc.courseId)}
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
