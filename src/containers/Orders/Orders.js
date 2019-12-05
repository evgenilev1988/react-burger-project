import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHanding';

import * as ordersActions from '../../store/actions/orders';


class Orders extends Component {
    componentDidMount() {
        this.props.onOrdersFetch();
    }

    render() {
        var loading = <Spinner />;

        if (!this.props.loading)
            loading = this.props.orders.map(order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                });
        return (
            <div>
                {loading}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onOrdersFetch: () => { dispatch(ordersActions.fetchAllOrders()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));