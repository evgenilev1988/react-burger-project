import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContantData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                ingredients: this.props.location.state.ingredients
            });
        }
    }

    onCheckoutCanceled() {
        this.props.history.goBack();
    }

    onCheckoutContinued() {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log(this.props.match.path);
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutContinued={this.onCheckoutContinued.bind(this)}
                    onCheckoutCanceled={this.onCheckoutCanceled.bind(this)} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;