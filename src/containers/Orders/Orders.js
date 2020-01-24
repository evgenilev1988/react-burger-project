import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandling from "../../hoc/withErrorHandling/withErrorHanding";

import * as ordersActions from "../../store/actions/orders";

const Orders = function(props) {
  const {onOrdersFetch} = props;
  useEffect(function() {
    onOrdersFetch(props.token, props.userId);
  }, [onOrdersFetch,props.token,props.userId]);

  var loading = <Spinner />;

  if (!props.loading)
    loading = props.orders.map(order => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  return <div>{loading}</div>;
};

const mapStateToProps = function(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    onOrdersFetch: (token, userId) => {
      dispatch(ordersActions.fetchAllOrders(token, userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axios));
