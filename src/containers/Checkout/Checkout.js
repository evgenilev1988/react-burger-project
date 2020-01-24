import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContantData/ContactData";

const Checkout = function(props) {
  const onCheckoutCanceled = function() {
    props.history.goBack();
  };

  const onCheckoutContinued = function() {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutContinued={onCheckoutContinued}
          onCheckoutCanceled={onCheckoutCanceled}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = function(state) {
  return {
    ings: state.ings.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
