import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }


    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                var orders = Object.keys(res.data).map((key, index, arr) => {
                    return { ...res.data[key], id: key };
                })

                this.setState({
                    loading: false,
                    orders:orders
                })
            }).catch(err => {
                this.setState({
                    loading: false
                })
            });
    }

    render() {
        var loading = this.state.loading ? <Spinner /> : this.state.orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        });
        return (
            <div>
                {loading}
            </div>
        );
    }
}

export default Orders;