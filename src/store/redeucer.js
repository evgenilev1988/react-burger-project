
import { Actions } from '../helpers/action';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
}

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.ADDINGRIDIENTS:
            var ingredients = { ...state.ingredients };
            ingredients[action.ingedientName] = ingredients[action.ingedientName] + 1

            return {
                ...state,
                ingredients: ingredients,
                totalPrice:state.totalPrice + INGRIDIENT_PRICES[action.ingedientName]
            };
        case Actions.REMOVEINGRIDIENTS:
            var ingredients = { ...state.ingredients };
            ingredients[action.ingedientName] = ingredients[action.ingedientName] - 1;

            return {
                ...state,
                ingredients: ingredients,
                totalPrice:state.totalPrice - INGRIDIENT_PRICES[action.ingedientName]
            };
        default:
            return state;
    }
}

export default reducer;