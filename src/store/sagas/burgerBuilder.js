import { put } from 'redux-saga/effects';
import * as totalPriceActions from '../actions/totalPrice';
import * as burgerBuilderActions from '../actions/burgerBuilder';

import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
    try {
        const res = yield axios.get('/ingredients.json');
        yield put(totalPriceActions.priceInit());
        yield put(burgerBuilderActions.setIngredients(res.data))
    }
    catch (err) {
        yield put(burgerBuilderActions.featchIngredientsFailed());
    }
}