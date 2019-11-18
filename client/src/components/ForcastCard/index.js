import React ,{ Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

// festival example from video



class ForcastCard extends Component 
{
    constructor (props)
    {
        super (props);
    }
    render ()
    {
    return <div className ="col-12">
        <h1> {this,props.tittle} </h1>
      <button onClick= {this.props.onLogIn}> Log In</button>
      <div className ="col-6">
         <Link>
         {this.props.client}
         Client List
         </Link>
      </div>

</div>
}
}
export default ForcastCard;

// need to add link video time stamp at 1:11:15 for example