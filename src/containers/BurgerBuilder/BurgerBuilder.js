import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHanding';
import axios from '../../axios-orders';

import { Actions,TotalPriceReducer } from '../../helpers/action';
import {connect} from 'react-redux'

import * as burgerBuilderActions from '../../store/actions/index';

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
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout'
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

const mapStateToProps = function(state){
    return {
        ings: state.ings.ingredients,
        totalPrice: state.price.totalPrice,
        error:state.ings.error
    }
}

const mapdispatchToProps = function(dispatch){
    return {
        onAddIngredients:function(ingedientName){
            return dispatch(burgerBuilderActions.addIngredient(ingedientName))
        },
        onRemoveIngridients:function(ingedientName){
            return dispatch(burgerBuilderActions.removeIngredient(ingedientName))
        },
        onAddPrice:function(ingedientName){
            return dispatch({type:TotalPriceReducer.ADDPRICE,ingedientName:ingedientName})
        },
        onRemovePrice:function(ingedientName){
            return dispatch({type:TotalPriceReducer.REDUCEPRICE,ingedientName:ingedientName})
        },
        oninitIngredients:function(){return dispatch(burgerBuilderActions.initIngredients())},
        onInitPurchase:function(){return dispatch(burgerBuilderActions.purchaseInit())}

    };
}


export default connect(mapStateToProps,mapdispatchToProps)(withErrorHandling(BurgerBuilder, axios));