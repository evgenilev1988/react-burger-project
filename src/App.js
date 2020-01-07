import React,{ Component } from 'react';
import {connect} from 'react-redux';
import { Route,Switch,Redirect,withRouter } from 'react-router-dom';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Unknown from './components/404/404';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component{
  
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            {this.props.isAuthenticated ? <Route path="/checkout" component={Checkout} /> : null}
            {this.props.isAuthenticated ? <Route path="/orders" component={Orders} /> : null}
            {this.props.isAuthenticated ? <Route path="/logout" component={Logout} /> : null}
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/404" exact component={Unknown} />
            <Redirect from="/" to="/404"/>
          </Switch>
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp:() => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
