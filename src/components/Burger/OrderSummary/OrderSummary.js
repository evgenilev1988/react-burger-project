import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import Button from "../../UI/Buttun/Button";

const OrderSummary = function(props) {
  const ingridientSummary = Object.keys(props.ingredients).map(value => {
    return (
      <li key={value}>
        <span
          style={{
            textTransform: "capitalize"
          }}
        >
          {value}: {props.ingredients[value]}
        </span>
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order:</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingridientSummary}</ul>
      <p>
        Your Total sum is: <strong>{props.totalPay.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        PROCEED
      </Button>
    </Aux>
  );
};

export default OrderSummary;
