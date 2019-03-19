import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const btnRightStyle = {
    float: 'right'
}
export class EditStudentModal extends Component {
    constructor(props){
        super(props);
        //Modal for Create Course
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleOnfirstNameChange = this.handleOnfirstNameChange.bind(this);
        this.handleOnlastNameChange = this.handleOnlastNameChange.bind(this);
        this.handleOnAdressChange = this.handleOnAdressChange.bind(this);
        this.handleOnCityChange = this.handleOnCityChange.bind(this);
        this.handleOndateOfBirthChange = this.handleOndateOfBirthChange.bind(this);
        this.handleOnStateChange = this.handleOnStateChange.bind(this);
        this.state = {
          show: false,
          id : props.scm.sid,
          firstName : '',
          lastName : '',
          adress : '',
          city : '',
          state : '',
          dateOfBirth : ''

        };
    }
    componentDidMount()
    {
    }

    getStudent(){
        fetch('https://localhost:44312/api/student' + "/" + this.state.id )
          .then(response => response.json())
          .then(response =>
            {
             this.setState({'id' : response.id});
             this.setState({'firstName' : response.firstName});
             this.setState({'lastName' : response.lastName});
             this.setState({'adress' : response.adress });
             this.setState({'city' : response.city });
             this.setState({'state' : response.state});
             this.setState({'dateOfBirth' : response.dateOfBirth });
            }
            )
    
    }
    

    handleClose() {
        this.setState({ show: false });
      }
      
      handleShow() {
        this.setState({ show: true });
        this.setState({id :this.props.scm.id});
        this.getStudent();
      }
      handleSubmit(e){

        
        var url = new URL("https://localhost:44312/api/student" + "/" + this.state.id);
        // params = {id: this.props.course.id}
        // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify({id:this.state.id , firstName: this.state.firstName , lastName : this.state.lastName, adress: this.state.adress, dateOfBirth : this.state.dateOfBirth, city : this.state.city, state: this.state.state})
            });
            this.setState({ show: false });
      }
      handleDelete(e){
        //window.alert(this.state.id);
        var url = new URL("https://localhost:44312/api/student" + "/" + this.state.id);
        // params = {id: this.state.id}
        // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        this.setState({ show: false });
      };


      handleOnfirstNameChange(e)
      {
         this.setState({firstName : e.target.value});
      }
      handleOnlastNameChange(e)
      {
         this.setState({lastName : e.target.value});
      }
      handleOnAdressChange(e)
      {
         this.setState({adress : e.target.value});
      }
      handleOndateOfBirthChange(e)
      {
        this.setState({dateOfBirth : e.target.value});
      }
      handleOnStateChange(e)
      {
        this.setState({state : e.target.value});
      }
      handleOnCityChange(e)
      {
        this.setState({city : e.target.value});
      }

  render() {
    return (
        
        <div className="container">
       <a onClick={this.handleShow}> {this.props.scm.sname} </a>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
                Add Course
            </Modal.Header>
            <Modal.Body>
            <div className="row" >
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                        

                        
                        <div className="form-group">
                            <label htmlFor="name">First name</label> 
                            <input id="firstName" name="firstName" type="text" value={this.state.firstName} onChange={this.handleOnfirstNameChange.bind(this)} required/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <input id="lastName" name="lastName" type="text" value={this.state.lastName} onChange={this.handleOnlastNameChange.bind(this)}required/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="adress">Adress</label>
                            <input id="adress" name="adress" type="text" value={this.state.adress} onChange={this.handleOnAdressChange.bind(this)}required />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" value={this.state.city} onChange={this.handleOnCityChange.bind(this)} required/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="state">State</label> 
                            <input id="state" name="state" type="text" value={this.state.state} onChange={this.handleOnStateChange.bind(this)} required/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date Of Birth</label>
                            <input id="dateOfBirth" name="dateOfBirth" type="text" value= {this.state.dateOfBirth} onChange={this.handleOndateOfBirthChange.bind(this)}required/>
                        </div>
                        <br/>
                        <div className="form-group">
                        <button className="btn btn-light pull-right" >Edit Student</button>
                        <Button style={btnRightStyle} onClick={this.handleDelete}  >Remove Student </Button>
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

export default EditStudentModal
