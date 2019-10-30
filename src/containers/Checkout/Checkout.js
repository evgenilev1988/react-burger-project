import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContantData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice:0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        var price = 0;
        for (var param of query.entries()) {
            // ['salad', '1']
            if (param[0] !== 'price')
                ingredients[param[0]] = +param[1];
            else
                price = param[1];

        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    onCheckoutCanceled() {
        this.props.history.goBack();
    }

    onCheckoutContinued() {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutContinued={this.onCheckoutContinued.bind(this)}
                    onCheckoutCanceled={this.onCheckoutCanceled.bind(this)} />
                <Route path={this.props.match.path + '/contact-data'} render={
                    (props) => {
                        return (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />);
                    }
                } />
            </div>
        );
    }
}

export default Checkout;