import { put, delay, call } from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions/auth';

export function* logoutSaga(action) {
    yield call([localStorage,"removeItem"],"token");
    yield call([localStorage,"removeItem"],"expirationDate");
    yield call([localStorage,"removeItem"],"userId");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.exparationTime);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    }

    url += '?key=AIzaSyBqfrz3EFMhEhFCQxIS4mIOw90aOSZ3jyY';

    try {
        const res = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId))
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
        yield put(actions.authFailed(err.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            const time = expirationDate.getTime() - new Date().getTime();
            yield put(actions.checkAuthTimeout((time / 1000)));
        }

    }
}