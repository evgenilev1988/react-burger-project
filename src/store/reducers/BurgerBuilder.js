
import { Actions } from '../../helpers/action';

const initialState = {
    ingredients: null,
    error: false
}

const burgerBuilderReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.ADDINGRIDIENTS:
            var ingredients = { ...state.ingredients };
            ingredients[action.ingedientName] = ingredients[action.ingedientName] + 1

            return {
                ...state,
                ingredients: ingredients,
            };
        case Actions.REMOVEINGRIDIENTS:
            var ingredients = { ...state.ingredients };
            ingredients[action.ingedientName] = ingredients[action.ingedientName] - 1;

            return {
                ...state,
                ingredients: ingredients
            };
        case Actions.SETINGREDIENTS:
            return {
                ...state,
                ingredients: action.ingridients,
                error:false
            };
        case Actions.FETCHINGREDIENTSFAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default burgerBuilderReducer;