import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../src/containers/LoginPage'
import HomePage from './views/HomePage';
import Registration from '../src/containers/Registration';
import CreateOrder from './views/CreateOrder';
import CreateProduct from './views/CreateProduct';
import CreateProductGroup from './views/CreateProductGroup'
import ForecastDetail from './views/ForecastDetail';
import Inventory from './views/Inventory';
import History from './views/History';


class App extends Component {
  constructor (props) {
      super(props);
      this.state = {
          session: null
      }
  }

  signIn = (session) => this.setState({session});

  render () {
    const history = createBrowserHistory();
    // 10:45 minute mark
    return (
        <Router>
        <Switch>
        {!this.state.session && <Route exact path ="/login" component = {()=> <Login onLogin={this.signIn} history={history}/>} />}
        {!this.state.session && <Route exact path ="/register" component = {()=> <Registration onRegister={this.signIn}/>} />}
        {!this.state.session && <Route exact path="/home" component = {() => <HomePage session={this.state.session} />}/>}
        {!this.state.session && <Route exact path="/createorder" component = {() => <CreateOrder session={this.state.session} />}/>}
        {!this.state.session && <Route exact path="/createproduct" component={CreateProduct} session={this.state.session}/>}
        {!this.state.session && <Route exact path="/creategroup" component={CreateProductGroup} session={this.state.session}/>}
        {!this.state.session && <Route exact path="/forecast" component={ForecastDetail} session={this.state.session}/>}
        {!this.state.session && <Route exact path="/inventory" component={Inventory} session={this.state.session}/>}
        {!this.state.session && <Route exact path="/history" component={History} session={this.state.session}/>}

        <Route component={HomePage} />

        </Switch>
        </Router>
    )
}
}

export default App;