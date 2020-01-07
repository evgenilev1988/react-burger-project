import axios from '../../axios-orders';
import * as actions from '../../helpers/action';


export const fetchOrder = (orders) => {
    return {
        type: actions.OrdersActions.FETCH_ORDERS,
        orders: orders
    }
}

export const errorOrders = (error) => {
    return {
        type: actions.OrdersActions.ERROR_ORDERS,
        error: error
    }
}

export const loadingOrders = () => {
    return {
        type: actions.OrdersActions.LOADING_ORDERS
    }
}

export const fetchAllOrders = (token) => {
    return dispatch => {
        dispatch(loadingOrders());
        
        axios.get('/orders.json?auth=' + token)
            .then(res => {
                var orders = Object.keys(res.data).map((key, index, arr) => {
                    return { ...res.data[key], id: key };
                });
                dispatch(fetchOrder(orders));
            }).catch(err => {
                dispatch(errorOrders(err));
            });
    }
}