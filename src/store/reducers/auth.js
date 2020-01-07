import * as actions from '../../helpers/action';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const authStart = (state,action)=>{
    return {
        ...state,
        error:null,
        loading:true
    }
}

const authSuccess = (state,action) =>{
    return {
        ...state,
        token:action.idToken,
        userId:action.userId,
        loading:false,
        error:null
    }
}

const authFailed = (state,action) =>{
    return {
        ...state,
        loading:false,
        error:action.error
    }
}

const authlogout = (state,action)=>{
    return{
        ...state,
        token:null,
        userId:null
    }
}

const authRedirect = (state,action)=>{
    return{
        ...state,
        authRedirectPath:action.path
    }
}


const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case actions.authentication.AUTH_START: return authStart(state,action);
        case actions.authentication.AUTH_SUCCESS : return authSuccess(state,action);
        case actions.authentication.AUTH_FAILED : return authFailed(state,action);
        case actions.authentication.AUTH_LOGOUT:return authlogout(state,action);
        case actions.authentication.SET_AUTH_REDIRECT_PATH:return authRedirect(state,action);
        default: return state;
    }
}

export default authReducer;