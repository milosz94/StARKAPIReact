import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const btnRightStyle = {
    float: 'right'
}


export class CreateCourseModal extends Component {

    constructor(props){
        super(props);
        //Modal for Create Course
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.state = {
          show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
      }
      
      handleShow() {
        this.setState({ show: true });
      }
      
        handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            console.log(JSON.stringify(data));
            //console.log( JSON.stringify(new JSONFormData(data));
            let jsonObject = {};

            for (const [key, value]  of data.entries()) {
                jsonObject[key] = value;
                }

            //console.log(jsonObject.name);

                

            fetch('https://localhost:44312/api/course', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify({code:jsonObject.code,  name: jsonObject.name, description: jsonObject.description})
            });
            this.setState({ show: false });
         }


    render() {
        return (
            <div className="container">
                <Button className="btn btn-light pull-right" onClick={this.handleShow}> Add Course </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        Add Course
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row" >
                            <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>

                     <div className="form-group">
                         <label htmlFor="code">Code</label> 
                        
                        <input id="code" name="code" type="text"  />
                        </div>

                    <div className="form-group">
                         <label htmlFor="name">Name</label> 
                        
                        <input id="name" name="name" type="text"  />
                        </div>
                        
                        <div className="form-group">
                         <label htmlFor="description">Description</label>
                       
                        <input id="description" name="description" type="text"  />
                        </div>
                        <br/>
                        <div className="form-group">
                        <button style={btnRightStyle} className="btn btn-light pull-right" >Add Course</button>
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

export default CreateCourseModal
