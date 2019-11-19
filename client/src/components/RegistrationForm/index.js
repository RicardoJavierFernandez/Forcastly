import React, {Component} from 'react';
import API from '../../../src/utils/API';

import { Form, Button, Container, Col, Jumbotron } from 'react-bootstrap';

import './styles.css';


class RegistrationForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password: ""
        }
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    register = () => {
        API.registerUser(this.state.firstName.toLowerCase(), this.state.lastName.toLowerCase(), this.state.email.toLowerCase(), this.state.password)
            .then((session) => {
                this.props.onRegister(session.data);
            });
    }

    render () {
        // isEnable boolean for the button
        const isEnabled = this.state.firstName.length >  0 && this.state.lastName.length >  0 && this.state.email.length > 0 && this.state.password.length > 0;
        
        return (
            <div className="colored-container">
            <Container>
                <Jumbotron className= "jumbo2">
                    <Container className= "jumbo2">
                        <h2>Welcome to Forcastly</h2>
                        <p> Fill out the form for registration </p>
                    </Container>
                </Jumbotron>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control 
                        type="text" 
                        rows="" 
                        value={this.state.firstName} 
                        name="firstName" 
                        id= "firstName" 
                        placeholder="Enter your First Name" 
                        onChange={this.inputChangeHandler} 
                    />
                </Col>
                
                <br />
                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control 
                        type="text" 
                        rows="1" 
                        value={this.state.lastName} 
                        name="lastName" 
                        id= "lastName" 
                        placeholder="Enter your Last Name" 
                        onChange={this.inputChangeHandler} 
                    />
                </Col>
                
                <br />
                
                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control 
                        type="text" 
                        rows="1" 
                        value={this.state.email} 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email address" 
                        onChange={this.inputChangeHandler} 
                    />
                </Col>
                
                <br />

                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control 
                        type="password" 
                        rows="1" 
                        value={this.state.password} 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        onChange={this.inputChangeHandler} 
                    />
                </Col>
                <br />
                <Col md={{ span: 4, offset: 4 }}>
                    <Button className = "button"disabled={!isEnabled} onClick={this.register}>Register</Button>
                    <br />
                    <a href="login" className = "already">Already Registered? Go to login</a>
                </Col>
            </Container>   </div>
        )
    }
}

export default RegistrationForm;