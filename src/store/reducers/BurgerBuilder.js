
import { Actions } from '../../helpers/action';

const initialState = {
    ingredients: null,
    error: false
}

const addIngredient = (state, action) => {
    var ingredients = { ...state.ingredients };
    ingredients[action.ingedientName] = ingredients[action.ingedientName] + 1

    return {
        ...state,
        ingredients: ingredients,
    };
}

const removeIngridients = (state, action) => {
    var ingredients = { ...state.ingredients };
    ingredients[action.ingedientName] = ingredients[action.ingedientName] - 1;

    return {
        ...state,
        ingredients: ingredients
    };
}

const setIngredients = (state,action)=>{
    return {
        ...state,
        ingredients: action.ingridients,
        error: false
    };
}

const fetchIngredientsFailed = (state,action) => {
    return {
        ...state,
        error: true
    };
}
const burgerBuilderReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.ADDINGRIDIENTS: return addIngredient(state, action);
        case Actions.REMOVEINGRIDIENTS: return removeIngridients(state, action);
        case Actions.SETINGREDIENTS: return setIngredients(state,action);
        case Actions.FETCHINGREDIENTSFAILED: return fetchIngredientsFailed(state,action);
        default:
            return state;
    }
}

export default burgerBuilderReducer;