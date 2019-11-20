import React, {Component} from 'react';
import API from '../utils/API';
import {Link} from 'react-router-dom';
import { Container, Col, Form, Button, Jumbotron } from 'react-bootstrap';


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
            .then((session) => this.props.onLogin(session.data),response=>{
                alert("Invalid credentials1!")
                this.setState({invalid: true})
            });
    };

    render() {
        // isEnable boolean for the button
        const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;

        return (
            <div className="colored-container">
            <Container >
                <Jumbotron className = "jumbo5">
                    <Container classname = "jumbo5">
                   
                        <h2>Welcome to Forcastly  </h2>
                        <p>Please sign in below or create an account</p>
                    
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
                <Button  className= "button" disabled={!isEnabled} onClick={this.login} variant="primary">Login</Button>
                <br />
                <Link to="/register" className= "already">Not Registered?</Link>
                </Col>
            </Container> </div>
        )
    }
}

export default LoginForm;