import React, { useEffect,Suspense } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Unknown from "./components/404/404";
import Logout from "./containers/Auth/Logout/Logout";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});


const App = (props) => {
  const {onTryAutoSignUp} = props;

  useEffect(() => {
    onTryAutoSignUp();
  },[onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/404" exact component={Unknown} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
