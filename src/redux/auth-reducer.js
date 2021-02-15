import {securityApi, authApi, usersApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_INFO = "SET_USER_INFO";
const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
    userData: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: {...action.payload}
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state
    }
}

export const setAuthUserInfo = (userId, login, email, isAuth) => ({
    type: SET_USER_INFO,
    payload: {
        userId,
        login,
        email,
        isAuth
    }
})

export const setAuthUserData = (data) => ({
    type: SET_USER_DATA,
    payload: data
})

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA,
    captchaUrl
})

export const getAuthUserInfo = () => async (dispatch) => {
    const res = await authApi.me();

    if(res.resultCode === 0) {
        let {id, login, email} = res.data;
        let isAuth = res.resultCode === 0 ? true : false;
        dispatch(setAuthUserInfo(id, login, email, isAuth));
        dispatch(getAuthUserData(id));
    }
}

export const getAuthUserData = (userId) => async (dispatch) => {
    const res = await usersApi.getUserInfo(userId);
    dispatch(setAuthUserData(res));
}


export const logIn = (email, password, rememberMe, captcha) => async (dispatch) => {
    const res = await authApi.logIn(email, password, rememberMe, captcha)

    let message = res.messages.length ? res.messages[0] : "Some error";

    if(res.resultCode === 0) {
        dispatch(getAuthUserInfo())
    } else {
        if(res.resultCode === 10) dispatch(getCaptchaUrl());
        if(res.messages.length) dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logOut = () => async (dispatch) => {
    const res = await authApi.logOut()

    if(res.resultCode === 0) {
        dispatch(setAuthUserInfo(null, null, null, false))
        dispatch(setAuthUserData(null))
    }
}


export const getCaptchaUrl = () => async (dispatch) => {
    const res = await securityApi.getCaptchaUrl();
    dispatch(setCaptchaUrl(res.url))
}

export default authReducer;