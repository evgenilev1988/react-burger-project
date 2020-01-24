import React, { useState, useEffect } from "react";
import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Buttun/Button";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import {
  contactDataHelper,
  inputType
} from "../Checkout/ContantData/ContactDataHelper";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";

import { checkValidity } from "../../shared/utility";

const Auth = function(props) {
  const [controls, setControls] = useState({
    email: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "email",
      "Mail Address",
      "",
      "E-mail",
      {
        required: true,
        isEmail: true,
        minLength: 2
      },
      false,
      false
    ),
    password: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "password",
      "password",
      "",
      "Password",
      {
        required: true,
        minLength: 6
      },
      false,
      false
    )
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const inputChangedHandler = function(event, controlName) {
    const updatedController = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      }
    };

    setControls(updatedController);
  };

const {BuildingBurder,authRedirectPath,onSetAuthRedirectPath} = props;

  useEffect(function() {
    if (!BuildingBurder && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [BuildingBurder,authRedirectPath,onSetAuthRedirectPath]);

  const switchAuthHandler = function() {
    setIsSignUp(!isSignUp);
  };

  const submitHandler = function(event) {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  var formElements = [];

  for (var key in controls) {
    formElements.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElements.map(formElement => {
    return (
      <Input
        key={formElement.id}
        touched={formElement.config.touched}
        valid={formElement.config.valid}
        shouldValidate={formElement.config.validation}
        label={formElement.config.elementLabel}
        elementtype={formElement.config.elementType}
        elementconfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => inputChangedHandler(event, formElement.id)}
      />
    );
  });

  if (props.loading) form = <Spinner />;

  let errorMessage = null;
  if (props.error !== null) {
    // Firebase returns the error.message property, it can be manually crafted as we want
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthHandler}>
        SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    BuildingBurder: state.ings.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(actions.auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: path => {
      dispatch(actions.setAuthRedirectPath("/"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
