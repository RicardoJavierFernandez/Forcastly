import React, {Component} from 'react';
import RegistrationForm from '../../components/RegistrationForm';


class Registration extends Component {

    render () {
    
        return <RegistrationForm onRegister ={this.props.onRegister} /> // prop comes from App.js
    
    }

}

export default Registration;