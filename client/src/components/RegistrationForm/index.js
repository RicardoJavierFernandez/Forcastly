import React, {Component} from 'react';
import API from '../../../src/utils/API';

import {Form, Button, Container, Col, Jumbotron} from 'react-bootstrap';

import './styles.css';


class RegistrationForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name:"",
            email:"",
            password: ""
        }
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    register = () => {
        API.registerUser(this.state.name, this.state.email.toLowerCase(), this.state.password)
            .then((session) => {
                this.props.onRegister(session.data);
            });
    }

    render () {
        // isEnable boolean for the button
        const isEnabled = this.state.name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0;
        
        return (
            <Container>
                <Jumbotron>
                    <Container>
                        <h2>Registration Form</h2>
                        <p>Enter your information below</p>
                    </Container>
                </Jumbotron>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control 
                        type="text" 
                        rows="1" 
                        value={this.state.name} 
                        name="name" 
                        id= "name" 
                        placeholder="Enter your Name" 
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
                    <Button disabled={!isEnabled} onClick={this.register}>Register</Button>
                    <br />
                    <a href="login">Already Registered? Go to login</a>
                </Col>
            </Container>   
        )
    }
}

export default RegistrationForm;