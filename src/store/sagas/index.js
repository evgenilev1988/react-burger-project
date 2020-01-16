import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../helpers/action';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { fetchAllOrdersSaga } from './orders';
import { purchaseBurderStartSaga } from './order';

export function* whatAuth() {
    yield all([
        takeEvery(actionTypes.authentication.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.authentication.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.authentication.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.authentication.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* whatBurgerBuilder() {
    yield takeEvery(actionTypes.Actions.SET_INIT_INGREDIENTS, initIngredientsSaga);
}

export function* whatOrdersBuilder() {
    yield takeEvery(actionTypes.OrdersActions.FETCH_ALL_ORDERS, fetchAllOrdersSaga);
}

export function* whatOrderBuilder() {
    yield takeEvery(actionTypes.Actions.PURCHASE_BURGER_START, purchaseBurderStartSaga);
}