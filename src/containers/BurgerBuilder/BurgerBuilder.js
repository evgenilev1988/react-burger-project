import React, { useState, useEffect,useCallback } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandling from "../../hoc/withErrorHandling/withErrorHanding";
import axios from "../../axios-orders";

import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../store/actions/index";

const BurgerBuilder = function(props) {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.ings.ingredients;
  });
  const totalPrice = useSelector(state => {
    return state.price.totalPrice;
  });
  const error = useSelector(state => {
    return state.ings.error;
  });
  const isAuthenticated = useSelector(state => {
    return state.auth.token !== null;
  });

  const onAddIngredients = function(ingedientName) {
    return dispatch(Actions.addIngredient(ingedientName));
  };
  const onRemoveIngridients = function(ingedientName) {
    return dispatch(Actions.removeIngredient(ingedientName));
  };
  const onSetRedirectPath = function(path) {
    return dispatch(Actions.setAuthRedirectPath(path));
  };
  const onAddPrice = function(ingedientName) {
    return dispatch(Actions.addPrice(ingedientName));
  };
  const onRemovePrice = function(ingedientName) {
    return dispatch(Actions.reducrPrice(ingedientName));
  };
  const oninitIngredients = useCallback(function() {
    return dispatch(Actions.initIngredients());
  },[dispatch]);
  const onInitPurchase = function() {
    return dispatch(Actions.purchaseInit());
  };

  useEffect(
    function() {
      oninitIngredients();
    },
    [oninitIngredients]
  );

  const updatePurchaseState = function() {
    const sum = Object.keys(ings)
      .map((value, index) => {
        return ings[value];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);

    return sum > 0;
  };

  const purchaseHander = function() {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath("/checkout");
      props.history.push({ pathname: "/auth" });
    }
  };

  const purchaseCancel = function() {
    setPurchasing(false);
  };

  const purchaseContinue = function() {
    onInitPurchase();
    props.history.push({
      pathname: "/checkout"
    });
  };

  var orderSummary = null;
  var burger = error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
  if (ings) {
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        totalPay={totalPrice}
        purchaseCancelled={purchaseCancel}
        purchaseContinue={purchaseContinue}
      />
    );

    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredients={ings}
          ordered={purchaseHander}
          purchasable={updatePurchaseState}
          price={totalPrice}
          isAuth={isAuthenticated}
          ingredientRemoved={ings => {
            onRemoveIngridients(ings);
            onRemovePrice(ings);
          }}
          ingredientAdded={ings => {
            onAddIngredients(ings);
            onAddPrice(ings);
          }}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancel}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandling(BurgerBuilder, axios);
