import * as actions from '../../helpers/action';

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


export const purchaseBurderStart = (orderData,token) => {
    return{
        type:actions.Actions.PURCHASE_BURGER_START,
        orderData:orderData,
        token:token
    }
}

export const purchaseInit = ()=>{
    return {
        type:actions.Actions.PURACHASE_INIT
    }
}


