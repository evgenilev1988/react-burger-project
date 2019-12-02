import * as actions from '../../helpers/action';
import axios from '../../axios-orders';

export const purchaseBurgerSucess = (id, orderdata) => {
    return {
        type: actions.Actions.PURCASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderdata
    }
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actions.Actions.PURACHASE_BURGER_FAILED,
        error: error
    }
};

export const purchaseBurgerInProgress = () => {
    return {
        type: actions.Actions.PURCASE_BURGER_INPROGRESS
    }
};


export const purchaseBurderStart = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerInProgress());

        axios.post('/orders.json', orderData)
            .then(res => {
                dispatch(purchaseBurgerSucess(res.data.name,orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFailed(err));
            });
    }
}

export const purchaseInit = ()=>{
    return {
        type:actions.Actions.PURACHASE_INIT
    }
}


