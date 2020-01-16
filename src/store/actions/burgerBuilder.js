import * as actions from '../../helpers/action';


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
    return {
        type:actions.Actions.SET_INIT_INGREDIENTS
    }
}