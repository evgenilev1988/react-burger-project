import * as actions from '../../helpers/action';

export const priceInit = () => {
    return {
        type: actions.TotalPriceReducer.RESETPRICE
    }
};

export const addPrice = (ingedientName) => {
    return {
        type:actions.TotalPriceReducer.ADDPRICE,
        ingedientName:ingedientName
    }
}

export const reducrPrice = (ingedientName)=>{
    return {
        type:actions.TotalPriceReducer.REDUCEPRICE,
        ingedientName:ingedientName
    }
}
