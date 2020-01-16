import { put } from 'redux-saga/effects';
import * as actions from '../actions/orders';

import axios from '../../axios-orders';

export function* fetchAllOrdersSaga(action) {
    yield put(actions.loadingOrders());
    const queryParams = 'auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

    try {
        const res = yield axios.get('/orders.json?' + queryParams);
        var orders = Object.keys(res.data).map((key, index, arr) => {
            return { ...res.data[key], id: key };
        });
        yield put(actions.fetchOrder(orders));
    }
    catch (err) {
        yield put(actions.errorOrders(err));
    }
}