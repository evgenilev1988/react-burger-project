import { Actions } from '../../helpers/action';
import * as orders from '../actions/order';


const initialState = {
    orders: [],
    loading: false,
    purchased:false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.PURACHASE_INIT:
            return{
                ...state,
                purchased: false
            };
        case Actions.PURCASE_BURGER_SUCCESS:
            const newOrder = { ...action.orderData, id: action.orderId };

            return {
                ...state,
                purchased: true,
                orders: state.orders.concat(newOrder),
                loading: false
            };
        case Actions.PURACHASE_BURGER_FAILED: {
            return {
                ...state,
                loading: false
            }
        }
        case Actions.PURCASE_BURGER_INPROGRESS: {
            return {
                ...state,
                loading: true
            }
        }
        default: return state;
    }
}

export default orderReducer;