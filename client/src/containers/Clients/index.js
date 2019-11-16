import React, {Component} from 'react'
import client from  '../..components/clientcard'
import Api from '../..utils/api';


// partygoes example from video 


class client extends Component
{
    constructor (props)
    {
        super(props);
        this.state ={
            clients:[]
        }

    }
}
componentDidMount()
{
    Api.getClient(1).then
    (client=>this.setState ({client}))
}
render()
{
    return <div className="row">
        {this.state.client.map((client, index)=> <Client key = {index} name ={client.name}/>)}
    
    </div>
}
export default client;