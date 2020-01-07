import * as actions from '../../helpers/action';
import axios from 'axios';

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
    return dispatch =>{
        debugger;
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout())    
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                const time = expirationDate.getTime() - new Date().getTime();
                dispatch(checkAuthTimeout((time/1000)));
            }
            
        }
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',res.data.localId);
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err =>{
            dispatch(authFailed(err.response.data.error))
        })
    }
}