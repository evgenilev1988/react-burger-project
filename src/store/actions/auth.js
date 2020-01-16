import * as actions from '../../helpers/action';

export const authStart = () =>{
    return{
        type:actions.authentication.AUTH_START
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type:actions.authentication.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authSuccess = (idToken,userId) =>{
    return{
        type:actions.authentication.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
}

export const authFailed = (error) =>{
    return{
        type:actions.authentication.AUTH_FAILED,
        error:error
    }
}

export const authCheckState = () => {
    return {
        type:actions.authentication.AUTH_CHECK_STATE
    }
}

export const logout = () =>{
    return{
        type:actions.authentication.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () =>{
    return{
        type:actions.authentication.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (exparationTime) => {
    return{
        type:actions.authentication.AUTH_CHECK_TIMEOUT,
        exparationTime:exparationTime * 1000
    }
}

export const auth = (email,password,isSignUp) =>{
    return{
        type:actions.authentication.AUTH_USER,
        email:email,
        password:password,
        isSignUp:isSignUp
    }
}