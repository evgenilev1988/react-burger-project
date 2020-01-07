import * as actions from '../../helpers/action';
import axios from 'axios';

export const authStart = () =>{
    return{
        type:actions.authentication.AUTH_START
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

export const logout = () =>{
    return{
        type:actions.authentication.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (exparationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, exparationTime * 1000);
    };
}

export const auth = (email,password,isSignUp) =>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
        if(!isSignUp)
        {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
        }

        url += '?key=AIzaSyBqfrz3EFMhEhFCQxIS4mIOw90aOSZ3jyY';

        axios.post(url,authData)
        .then(res=>{
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err =>{
            dispatch(authFailed(err.response.data.error))
        })
    }
}