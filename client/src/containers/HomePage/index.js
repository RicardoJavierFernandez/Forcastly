
import React, {Component} from 'react'; 
import ForcastCard from '../../components/ForcastCard';
import Api from '.../../utils/api';

class Homepage extends Component

{
    constructor (props)
    {
    super(props);
    this.state= {
        forcast:[]

    }
}
logIn =(Forcast)=> {
}

componentDidMount ()
{
Api.getFestivals().then
(forcast =>{
    this.setState({forcast})
})
}



render ()
{
return <div className= "row">
    <div className ="col-12">
       {this.props.session && <h1>Hello {this.props.session.name} </h1>}
    </div>
    {this.state.map((forcast, index)=><ForcastCard id={forcast._id} client= {forcast.client}
    key ={index} 
    tittle = {forcast.title} description= {forcast.description } 
    date = {forcast.date} onLogin = {()=>this.logIn(forcast)} />)}
</div>
{

}
}
}
export default Homepage;