import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import ToolBar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = function(props) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = function() {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = function() {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <ToolBar
        menuClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToPros = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToPros)(Layout);
