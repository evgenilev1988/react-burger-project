import * as actions from '../../helpers/action';
import * as totalPrice from './totalPrice';
import axios from '../../axios-orders';

export const addIngredient = (ingridientName) => {
    return {
        type: actions.Actions.ADDINGRIDIENTS,
        ingedientName: ingridientName
    }
}

export const removeIngredient = (ingridientName) => {
    return {
        type: actions.Actions.REMOVEINGRIDIENTS,
        ingedientName: ingridientName
    }
}

export const setIngredients = (ing) => {
    return {
        type: actions.Actions.SETINGREDIENTS,
        ingridients: ing
    }
}

export const featchIngredientsFailed = (ing) => {
    return {
        type: actions.Actions.FETCHINGREDIENTSFAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(res => {
            // Using the totlaPriceActions for reseting the price during init
            dispatch(totalPrice.priceInit());
            dispatch(setIngredients(res.data))
        }).catch(error => {
            dispatch(featchIngredientsFailed())
        });
    };
}