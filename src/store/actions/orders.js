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

export const fetchAllOrders = (token,userId) => {
    return {
        type: actions.OrdersActions.FETCH_ALL_ORDERS,
        token:token,
        userId:userId
    }
}