import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import config from "../config.json"
const btnRightStyle = {
  float: 'right'
}

export class EditCourseModal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnNameChange = this.handleOnNameChange.bind(this);
    this.handleOnDescripitonChange = this.handleOnDescripitonChange.bind(this);
    this.handleOnCodeChange = this.handleOnCodeChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      show: false,
      id: this.props.course.id,
      code: this.props.course.code,
      name: this.props.course.name,
      description: this.props.course.description
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  handleSubmit(e) {

    var url = new URL( `${config.baseUrl}/course` + "/" + this.state.id);

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        code: this.state.code,
        name: this.state.name,
        description: this.state.description
      })
    });
    this.setState({show: false});
  }

  handleDelete(e) {
    const url = new URL( `${config.baseUrl}/course` + "/" + this.state.id);
    // params = {id: this.state.id}
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const {onEditCourse} = this.props;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => onEditCourse());
    this.setState({show: false});

  }

  handleOnNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleOnDescripitonChange(e) {
    this.setState({description: e.target.value});
  }

  handleOnCodeChange(e) {
    this.setState({code: e.target.value});
  }

  render() {
    return (

        <div className="container">
          <a onClick={this.handleShow}> {this.props.course.name} </a>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
              Add Course
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="code">Code</label>
                      <input id="code" name="code" type="text"
                             value={this.state.code}
                             onChange={this.handleOnCodeChange.bind(this)}
                             required/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Name</label>

                      <input id="name" name="name" type="text"
                             value={this.state.name}
                             onChange={this.handleOnNameChange.bind(this)}
                             required/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>

                      <input id="description" name="description" type="text"
                             value={this.state.description}
                             onChange={this.handleOnDescripitonChange.bind(
                                 this)} required/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <button className="btn btn-light pull-right">Edit Course
                      </button>
                      <Button style={btnRightStyle} onClick={this.handleDelete}>Remove
                        Course </Button>
                    </div>
                  </form>
                </div>

              </div>
            </Modal.Body>

          </Modal>
        </div>
    )
  }
}

export default EditCourseModal
