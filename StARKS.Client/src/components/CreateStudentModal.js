import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import config from "../config.json"
const btnRightStyle = {
  float: 'right'
};

export class CreateStudentModal extends Component {

  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(JSON.stringify(data));
    let jsonObject = {};

    for (const [key, value]  of data.entries()) {
      jsonObject[key] = value;
    }

    
    const {onCreateStudent} = this.props;

    fetch( `${config.baseUrl}/student`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: jsonObject.firstName,
        lastName: jsonObject.lastName,
        adress: jsonObject.adress,
        city: jsonObject.city,
        state: jsonObject.state,
        dateOfBirth: jsonObject.dateOfBirth
      })
    }).then(() => onCreateStudent())

    this.setState({show: false});
  }

  render() {
    return (
        <div className="container">
          <Button className="btn btn-light pull-right"
                  onClick={this.handleShow}> Add Student </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
              Add Student
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={(e) => this.handleSubmit(e)}>

                    <div className="form-group">
                      <label htmlFor="name">First name</label>
                      <input id="firstName" name="firstName" type="text"/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <label htmlFor="lastName">Last name</label>
                      <input id="lastName" name="lastName" type="text"/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <label htmlFor="adress">Adress</label>
                      <input id="adress" name="adress" type="text"/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input id="city" name="city" type="text"/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input id="state" name="state" type="text"/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date Of Birth</label>
                      <input id="dateOfBirth" name="dateOfBirth" type="text"/>
                    </div>
                    <br/>
                    <div className="form-group">
                      <button style={btnRightStyle}
                              className="btn btn-light pull-right">Add Student
                      </button>
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

export default CreateStudentModal
