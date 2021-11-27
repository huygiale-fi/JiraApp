import authApi from "apis/authApi";
import * as authType from 'store/constants/authType'
import { fetchAllProjectAction } from "./projectAction";

export const signUpAction = (formData)=>async(dispatch)=>{
    try{
        dispatch({type:authType.SIGNUP_REQUEST})
        const response = await authApi.signUpApi(formData)
        dispatch({
            type:authType.SIGNUP_SUCCESS,
            payload:response.data
        })
        dispatch(signInAction(formData))
    }catch(err){
        dispatch({
            type:authType.SIGNUP_FAILED,
            payload:err
        })
    }
}

export const signInAction = (formData)=>async(dispatch)=>{
    try{
        dispatch({type:authType.SIGNIN_REQUEST})
        const response = await authApi.signInApi(formData)
        dispatch({
            type:authType.SIGNIN_SUCCESS,
            payload:response.data.content
        })
        dispatch(fetchAllProjectAction())
    }catch(err){
        dispatch({
            type:authType.SIGNIN_FAILED,
            payload:err
        })
    }
}

export const LogoutAction=()=>async(dispatch)=>{
    dispatch({
        type:authType.LOGOUT
    })
}