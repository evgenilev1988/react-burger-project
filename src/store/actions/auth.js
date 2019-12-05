import * as actions from '../../helpers/action';
import axios from 'axios';

export const authStart = () =>{
    return{
        type:actions.authentication.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return{
        type:actions.authentication.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFailed = (error) =>{
    return{
        type:actions.authentication.AUTH_FAILED,
        error:error
    }
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
        axios.post(url + '?key=AIzaSyBqfrz3EFMhEhFCQxIS4mIOw90aOSZ3jyY',authData)
        .then(res=>{
            console.log(res);
            dispatch(authSuccess(res));
        }).catch(err =>{
            console.log(err);
            dispatch(authFailed(err))
        })
    }
}