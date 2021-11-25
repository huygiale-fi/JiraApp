import * as authType from 'store/constants/authType'

const initialState = {
    isLogged:false,
    accessToken:localStorage.getItem("accessToken"),
    user:localStorage.getItem("user"),
}

const authReducer =  (state = initialState, { type, payload }) => {
    switch (type) {
    case authType.SIGNUP_REQUEST:
        return { ...state}
    case authType.SIGNUP_SUCCESS:
        console.log('Đăng kí thành công');
        return {...state}
    case authType.SIGNUP_FAILED:
        console.log('Đăng kí Thất bại');
        return {...state}
    case authType.SIGNIN_REQUEST:
        return { ...state}
    case authType.SIGNIN_SUCCESS:
        console.log('Đăng nhập thành công');
        localStorage.setItem("accessToken",payload.accessToken)
        localStorage.setItem("user",JSON.stringify(payload))
        return {...state,isLogged:true,accessToken:payload.accessToken,user:payload}
    case authType.SIGNIN_FAILED:
        console.log('Đăng nhập thất bại');
        return {...state}
    default:
        return state
    }
}

export default authReducer;