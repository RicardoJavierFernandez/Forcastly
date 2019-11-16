import React, {Component} from 'react';
import API from '../utils/API';

import {Container, Col, Form, Button, Jumbotron} from 'react-bootstrap';


class LoginForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email:"",
            password: "",
            invalidPassword: true
        }
    }


    inputChangeHandler = (e) => {
        this.setState ({[e.target.name]: e.target.value});
    }; 
    
    login = () => {
        API.login(this.state.email, this.state.password)
            .then((session) => {
                this.setState({invalid: true})
                this.props.onLogin(session.data);
            });
    };

    render() {
        // isEnable boolean for the button
        const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;

        return (
            <Container>
                <Jumbotron>
                    <Container>
                    <Col md={{ span: 4, offset: 4 }}>
                        <h2>Login</h2>
                        <p>Welcome, please login</p>
                    </Col>
                    </Container>
                </Jumbotron>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control
                        type="email"
                        rows="1"
                        value={this.state.email}
                        name="email"
                        onChange={this.inputChangeHandler}
                        placeholder="Enter your email"
                    />
                </Col>
                <br />
                <Col md={{ span: 4, offset: 4 }}>
                    <Form.Control
                        type="password"
                        rows="1"
                        value={this.state.password}
                        name="password"
                        onChange={this.inputChangeHandler}
                        placeholder="Enter your password"
                    />
                </Col>
                <br />
                <Col md={{ span: 4, offset: 4 }}>
                <Button disabled={!isEnabled} onClick={this.login} variant="primary">Login</Button>
                <br />
                <a href="register">Not Registered?</a>
                </Col>
            </Container>
        )
    }
}

export default LoginForm;