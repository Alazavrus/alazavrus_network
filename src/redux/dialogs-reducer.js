import {dialogApi} from "../api/api";
import {reset} from "redux-form";

// const SEND_MESSAGE = "DIALOGS/SEND_MESSAGE";
const SET_DIALOGS  = "DIALOGS/SET_DIALOGS";
const SET_MESSAGES = "DIALOGS/SET_MESSAGES";

let initialState = {
    dialogs: [],
    messages: []
}

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_DIALOGS:{
            return {
                ...state,
                dialogs: [
                    ...action.payload
                ]
            };
        }
        case SET_MESSAGES:{
            return {
                ...state,
                messages: [
                    ...action.payload
                ]
            };
        }
        default:
            return state
    }
}
export const setDialogs = (payload) => ({
    type: SET_DIALOGS,
    payload
})
export const setMessages= (payload) => ({
    type: SET_MESSAGES,
    payload
})

export const getDialogs = () => async (dispatch) => {
    let res = await dialogApi.getDialogs()
    if(Array.isArray(res)) {
        dispatch(setDialogs(res))
    }
}
export const getMessages = (userId) => async (dispatch) => {
    let res = await dialogApi.getMessages(userId)
    if(Array.isArray(res.items)) {
        dispatch(setMessages(res.items))
    }
}
export const startChatting = (userId) => async (dispatch) => {
    debugger
    let res = await dialogApi.startChatting(userId);
    console.log(res)
}
export const sendMessage = (userId, message) => async (dispatch) => {
    let res = await dialogApi.sendMessage(userId, message);
    if(res.resultCode === 0){
        dispatch(reset("sender_message"))
        dispatch(getMessages(userId))
    }
}

export default dialogsReducer;