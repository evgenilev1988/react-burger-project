import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHanding';
import axios from '../../axios-orders';


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
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            if (res.isAxiosError) {
                this.setState({
                    error: true
                })
            }
            this.setState({
                ingredients: res.data
            })
        })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'teeest',
                address: {
                    street: 'test',
                    zipCode: 'asddassad',
                    contry: 'US'
                },
                email: 'test@test.test'
            },
            deliveryMethod: 'fastest'
        }

        this.props.history.push({
            pathname:'/checkout',
            state:order
        });
        //alert('You continue');

        /*
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'teeest',
                address: {
                    street: 'test',
                    zipCode: 'asddassad',
                    contry: 'US'
                },
                email: 'test@test.test'
            },
            deliveryMethod: 'fastest'
        }
        // .json is obly for fire base!
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });*/
            
    }

    render() {
        var orderSummary = null;
        if (this.state.loading)
            orderSummary = <Spinner />;
        var burger = this.state.error ? <p>aaa</p> : <Spinner />;
        if (this.state.ingredients) {
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                totalPay={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancel.bind(this)}
                purchaseContinue={this.purchaseContinue.bind(this)}
            />);

            burger = (
                <Aux>
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

export default withErrorHandling(BurgerBuilder, axios);