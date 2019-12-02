import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContantData/ContactData';
import * as actions from '../../store/actions/index';
import { TotalPriceReducer } from '../../helpers/action';

import { priceUpdate } from '../../store/actions/totalPrice';

class Checkout extends Component {
    onCheckoutCanceled() {
        this.props.history.goBack();
    }

    onCheckoutContinued() {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;

        if (this.props.ings) {

            if (this.props.purchased) {
                this.props.onPurchaseComplete();
            }
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutContinued={this.onCheckoutContinued.bind(this)}
                        onCheckoutCanceled={this.onCheckoutCanceled.bind(this)} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = function (state) {
    return {
        ings: state.ings.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onPurchaseComplete: () => {dispatch(priceUpdate())}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);