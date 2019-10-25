import React,{ Component } from 'react';

import { Route,Switch,Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Unknown from './components/404/404';

class App extends Component{
  
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/404" exact component={Unknown} />
            <Redirect from="/" to="/404"/>
          </Switch>
        </Layout>
      </div>
    );
  }
  
}

export default App;
