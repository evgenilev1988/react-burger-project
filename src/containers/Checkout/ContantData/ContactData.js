import React, { useState } from "react";
import classes from "./ContactData.css";

import { connect } from "react-redux";

import Button from "../../../components/UI/Buttun/Button";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import { contactDataHelper, inputType } from "../ContantData/ContactDataHelper";

import withErrorHandler from "../../../hoc/withErrorHandling/withErrorHanding";
import * as orderActions from "../../../store/actions/order";

import { checkValidity } from "../../../shared/utility";

const ContactData = function(props) {
  const [orderForm, setOrderForm] = useState({
    name: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "text",
      "Your Name",
      "",
      "Name",
      {
        required: true,
        minLength: 2
      },
      false,
      false
    ),
    street: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "text",
      "Your Street",
      "",
      "Street",
      {
        required: true,
        minLength: 2
      },
      false,
      false
    ),
    zipCode: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "text",
      "Your Zip",
      "",
      "Zip Code",
      {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      false,
      false
    ),
    contry: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "text",
      "Your Country",
      "",
      "Country",
      {
        required: true,
        minLength: 2
      },
      false,
      false
    ),
    email: contactDataHelper.orderFormElementTextCreator(
      inputType.input,
      "email",
      "Your mail",
      "",
      "Email",
      {
        required: true,
        minLength: 2
      },
      false,
      false
    ),
    deliveryMethod: contactDataHelper.orderFormElementDDLCreator(
      inputType.select,
      [
        { value: "fastest", displayValue: "fastest" },
        { value: "slowest", displayValue: "slowest" }
      ],
      "fastest",
      "Delivery Method",
      {}
    )
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const onChangeHandler = function(event, inputIdentifier) {
    var updatedOrderForm = { ...orderForm };
    var updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderFormElement.valid = checkValidity(
      event.target.value,
      updatedOrderFormElement.validation
    );
    updatedOrderFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

    var formIsValid = true;
    for (var identifier in updatedOrderForm) {
      if (!updatedOrderForm[identifier].valid) {
        formIsValid = false;
        break;
      }
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const orderHandler = function(event) {
    event.preventDefault();

    const formData = {};
    for (var form in orderForm) {
      formData[form] = orderForm[form].value;
    }

    const order = {
      userId: props.userId,
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData
    };

    props.onOrderBurger(order, props.token);
  };

  var formElements = [];

  for (var key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key]
    });
  }

  var form = (
    <form onSubmit={orderHandler}>
      {formElements.map(formElement => {
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
            changed={event => onChangeHandler(event, formElement.id)}
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  var render = props.loading ? <Spinner /> : form;
  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {render}
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    ingredients: state.ings.ingredients,
    totalPrice: state.price.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(orderActions.purchaseBurderStart(orderData, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
