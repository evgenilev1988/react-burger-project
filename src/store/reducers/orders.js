import * as actions from '../../helpers/action';


const initialState = {
    orders: [],
    loading: false
}

const loadingOrder = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const errorOrders = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const fetchOrders = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    }
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.OrdersActions.LOADING_ORDERS: return loadingOrder(state, action);
        case actions.OrdersActions.ERROR_ORDERS: return errorOrders(state, action);
        case actions.OrdersActions.FETCH_ORDERS: return fetchOrders(state,action);
        default: return state;
    }
}

export default ordersReducer;
