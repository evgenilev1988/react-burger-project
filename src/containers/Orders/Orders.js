import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHanding';

import * as ordersActions from '../../store/actions/orders';


class Orders extends Component {
    componentDidMount() {
        this.props.onOrdersFetch(this.props.token,this.props.userId);
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
        loading: state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onOrdersFetch: (token,userId) => { dispatch(ordersActions.fetchAllOrders(token,userId)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));