import { Actions } from '../../helpers/action';


const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return {
        ...state,
        purchased: false
    };
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = { ...action.orderData, id: action.orderId };

    return {
        ...state,
        purchased: true,
        orders: state.orders.concat(newOrder),
        loading: false
    };
}

const purchaseBurgerFailed = (state,action) => {
    return {
        ...state,
        loading: false
    }
}

const purchaseBurgerInProgress = (state, action) =>{
    return {
        ...state,
        loading: true
    }
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.PURACHASE_INIT: return purchaseInit(state, action);
        case Actions.PURCASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case Actions.PURACHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
        case Actions.PURCASE_BURGER_INPROGRESS: return purchaseBurgerInProgress(state,action);
        default: return state;
    }
}

export default orderReducer;