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

var totalPriceReducer = function (state = initialState, action) {
    switch (action.type) {
        case TotalPriceReducer.ADDPRICE: {
            return {
                ...state,
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingedientName]
            }
        }
        case TotalPriceReducer.REDUCEPRICE: {
            return {
                ...state,
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingedientName]
            }
        }
        case TotalPriceReducer.RESETPRICE:{
            return {
                ...state,
                totalPrice: 4
            }
        }
        default:
            return state;
    }
}

export default totalPriceReducer;