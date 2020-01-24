import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";

const Logout = function(props) {
  const {onLogout} = props;
  useEffect(function() {
    props.onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actions.logout());
    }
  };
};

export default connect(null, mapDispatchToProps)(Logout);
