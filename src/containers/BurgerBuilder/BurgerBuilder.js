import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHanding';
import axios from '../../axios-orders';

import { Actions } from '../../helpers/action';
import {connect} from 'react-redux'



class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        /*this.componentDidMount(this.props);
        
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
            })*/
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
        
        const queryParams = [];
        for (var i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
    }

    render() {
        var orderSummary = null;
        if (this.state.loading)
            orderSummary = <Spinner />;
        var burger = this.state.error ? <p>aaa</p> : <Spinner />;
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
                        ingredientRemoved={(ings) => this.props.onRemoveIngridients(ings) }
                        ingredientAdded={(ings) => this.props.onAddIngredients(ings)} />
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
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapdispatchToProps = function(dispatch){
    return {
        onAddIngredients:function(ingedientName){
            return dispatch({type:Actions.ADDINGRIDIENTS,ingedientName:ingedientName})
        },
        onRemoveIngridients:function(ingedientName){
            return dispatch({type:Actions.REMOVEINGRIDIENTS,ingedientName:ingedientName})
        }
    };
}


export default connect(mapStateToProps,mapdispatchToProps)(withErrorHandling(BurgerBuilder, axios));