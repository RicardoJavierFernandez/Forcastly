import React, { Component } from 'react';
import LoginForm from '../../views/LoginForm';
import './style.css';


class Login extends Component {
    render() {
        return <LoginForm onLogin={this.props.onLogin} history={this.props.history}/>
    }
}

export default Login;