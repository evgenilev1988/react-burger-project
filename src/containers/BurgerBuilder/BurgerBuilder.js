import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHanding';
import axios from '../../axios-orders';

import { connect } from 'react-redux';

import * as Actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false
        };
    }

    componentDidMount() {
        this.props.oninitIngredients();
    }

    updatePurchaseState() {
        const sum = Object.keys(this.props.ings).map((value, index) => {
            return this.props.ings[value];
        }).reduce((arr, el) => {
            return arr + el;
        }, 0)

        return sum > 0;
    }

    purchaseHander() {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            });
        }
        else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push({pathname: '/auth'});
        }
    }

    purchaseCancel() {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinue() {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        var orderSummary = null;
        var burger = this.props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                totalPay={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancel.bind(this)}
                purchaseContinue={this.purchaseContinue.bind(this)}
            />);

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls ingredients={this.props.ings}
                        ordered={this.purchaseHander.bind(this)}
                        purchasable={this.updatePurchaseState()}
                        price={this.props.totalPrice}
                        isAuth={this.props.isAuthenticated}
                        ingredientRemoved={(ings) => {
                            this.props.onRemoveIngridients(ings)
                            this.props.onRemovePrice(ings)
                        }}
                        ingredientAdded={(ings) => {
                            this.props.onAddIngredients(ings)
                            this.props.onAddPrice(ings)
                        }} />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        ings: state.ings.ingredients,
        totalPrice: state.price.totalPrice,
        error: state.ings.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapdispatchToProps = function (dispatch) {
    return {
        onAddIngredients: function (ingedientName) { return dispatch(Actions.addIngredient(ingedientName)) },
        onRemoveIngridients: function (ingedientName) { return dispatch(Actions.removeIngredient(ingedientName)) },
        onSetRedirectPath:function(path){return dispatch(Actions.setAuthRedirectPath(path))},
        onAddPrice: function (ingedientName) { return dispatch(Actions.addPrice(ingedientName)) },
        onRemovePrice: function (ingedientName) { return dispatch(Actions.reducrPrice(ingedientName)) },
        oninitIngredients: function () { return dispatch(Actions.initIngredients()) },
        onInitPurchase: function () { return dispatch(Actions.purchaseInit()) }
    };
}

export default connect(mapStateToProps, mapdispatchToProps)(withErrorHandling(BurgerBuilder, axios));