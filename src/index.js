import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import totalPriceReducer from  './store/reducers/totalPriceReducer';
import burgerBuilderReducer from './store/reducers/BurgerBuilder';
import orderReducer from './store/reducers/order';
import ordersReducer from  './store/reducers/orders';
import authReducer from './store/reducers/auth';
import {whatAuth,whatBurgerBuilder,whatOrdersBuilder,whatOrderBuilder} from './store/sagas/index';

const rootReducer = combineReducers({
    ings:burgerBuilderReducer,
    price:totalPriceReducer,
    order:orderReducer,
    orders:ordersReducer,
    auth:authReducer
})

const sagaMiddleWare = createSagaMiddleware()

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk,sagaMiddleWare)
));

sagaMiddleWare.run(whatAuth);
sagaMiddleWare.run(whatBurgerBuilder);
sagaMiddleWare.run(whatOrdersBuilder);
sagaMiddleWare.run(whatOrderBuilder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
