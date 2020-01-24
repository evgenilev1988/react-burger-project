import { put } from 'redux-saga/effects';
import * as actions from '../actions/order';

import axios from '../../axios-orders';


export function* purchaseBurderStartSaga(action) {
    yield put(actions.purchaseBurgerInProgress());

    try{
        const res = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSucess(res.data.name, action.orderData));
    }catch(err){
        yield put(actions.purchaseBurgerFailed(err));
    }
}