import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        };
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((value, index) => {
            return ingredients[value];
        }).reduce((arr, el) => {
            return arr + el;
        }, 0)

        this.setState({ purchasable: sum > 0 });
    }

    AddIngridientHandler(type) {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = ingredients[type] + 1;
        const priceAddition = INGRIDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: ingredients,
            totalPrice: priceAddition
        });
        this.updatePurchaseState(ingredients);
    }

    RemoveIngridientHander(type) {
        const ingredients = { ...this.state.ingredients };
        if (ingredients[type] > 0) {
            ingredients[type] = ingredients[type] - 1;
            const priceDeduction = this.state.totalPrice - INGRIDIENT_PRICES[type];
            this.setState({
                ingredients: ingredients,
                totalPrice: priceDeduction
            });
        }
        this.updatePurchaseState(ingredients);
    }

    purchaseHander() {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancel() {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinue() {
        alert('You continue');
    }

    render() {

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel.bind(this)}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        totalPay={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancel.bind(this)}
                        purchaseContinue={this.purchaseContinue}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredients={this.state.ingredients}
                    ordered={this.purchaseHander.bind(this)}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ingredientRemoved={this.RemoveIngridientHander.bind(this)}
                    ingredientAdded={this.AddIngridientHandler.bind(this)} />
            </Aux>
        );
    }
}

export default BurgerBuilder;