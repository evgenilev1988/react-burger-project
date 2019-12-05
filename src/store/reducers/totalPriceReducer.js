import { TotalPriceReducer } from '../../helpers/action';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

var initialState = {
    totalPrice: 4
}

const addPrice = (state, action) => {
    return {
        ...state,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingedientName]
    }
}

const reducePrice = (state, action) => {
    return {
        ...state,
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingedientName]
    }
}

const resetPrice = (state, action) => {
    return {
        ...state,
        totalPrice: 4
    }
}

var totalPriceReducer = function (state = initialState, action) {
    switch (action.type) {
        case TotalPriceReducer.ADDPRICE: return addPrice(state, action)
        case TotalPriceReducer.REDUCEPRICE: return reducePrice(state, action)
        case TotalPriceReducer.RESETPRICE: return resetPrice(state, action)
        default: return state;
    }
}

export default totalPriceReducer;