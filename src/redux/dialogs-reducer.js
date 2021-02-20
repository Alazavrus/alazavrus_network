import {dialogApi, usersApi} from "../api/api";
import {reset} from "redux-form";

// const SEND_MESSAGE = "DIALOGS/SEND_MESSAGE";
const SET_DIALOGS  = "DIALOGS/SET_DIALOGS";
const SET_MESSAGES = "DIALOGS/SET_MESSAGES";
const UPDATE_MESSAGES = "DIALOGS/UPDATE_MESSAGES";
const SET_TOTAL_COUNT_MESSAGES = "DIALOGS/SET_TOTAL_COUNT_MESSAGES";
const SET_PAGE_MESSAGES = "DIALOGS/SET_PAGE_MESSAGES";
const RESET_MESSAGES = "DIALOGS/RESET_MESSAGES";
const SET_INTERLOCUTOR = "DIALOGS/SET_INTERLOCUTOR";
const RESET_INTERLOCUTOR = "DIALOGS/RESET_INTERLOCUTOR";
const SET_IS_TOTAL_LOAD_MESSAGES = "DIALOGS/SET_IS_TOTAL_LOAD_MESSAGES";
const RESET_TO_DEFAULT_STATE = "DIALOGS/RESET_TO_DEFAULT_STATE";

let initialState = {
    dialogs: [],
    messages: [],
    pageMessages: 1,
    countMessages: 20,
    totalCountMessages: null,
    interlocutor: null,
    isTotalLoadMessages: false
}

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESET_TO_DEFAULT_STATE:{
            return {
                    ...initialState
                };
            }
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
        case UPDATE_MESSAGES:{
            return {
                ...state,
                messages: [
                    ...action.payload,
                    ...state.messages
                ]
            };
        }
        case RESET_MESSAGES:{
            return {
                ...state,
                messages: []
            };
        }
        case SET_TOTAL_COUNT_MESSAGES:{
            return {
                ...state,
                totalCountMessages: action.payload
            };
        }
        case SET_PAGE_MESSAGES:{
            return {
                ...state,
                pageMessages: action.payload
            };
        }
        case SET_INTERLOCUTOR:{
            return {
                ...state,
                interlocutor: action.payload
            };
        }
        case RESET_INTERLOCUTOR:{
            return {
                ...state,
                interlocutor: null
            };
        }
        case SET_IS_TOTAL_LOAD_MESSAGES:{
            return {
                ...state,
                isTotalLoadMessages: action.payload
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
export const setMessages = (payload) => ({
    type: SET_MESSAGES,
    payload
})
export const updateMessages = (payload) => ({
    type: UPDATE_MESSAGES,
    payload
})
export const resetMessages = () => ({
    type: RESET_MESSAGES
})
export const setTotalCountMessages = (payload) => ({
    type: SET_TOTAL_COUNT_MESSAGES,
    payload
})
export const setPageMessages = (payload) => ({
    type: SET_PAGE_MESSAGES,
    payload
})
export const setInterlocutor = (payload) => ({
    type: SET_INTERLOCUTOR,
    payload
})
export const resetInterlocutor = () => ({
    type: RESET_INTERLOCUTOR
})
export const setIsTotalLoadMessages = (payload) => ({
    type: SET_IS_TOTAL_LOAD_MESSAGES,
    payload
})

export const resetToDefaultState = () => ({
    type: RESET_TO_DEFAULT_STATE
})

export const getDialogs = () => async (dispatch) => {
    let res = await dialogApi.getDialogs()
    if(Array.isArray(res)) {
        dispatch(setDialogs(res))
    }
}
export const getMessages = (userId, pageMessagesNumber) => async (dispatch, getState) => {
    const state = getState().dialogsPage;
    const pageMessages = pageMessagesNumber ? state.pageMessages + pageMessagesNumber : state.pageMessages;

    let res = await dialogApi.getMessages(userId, pageMessages, state.countMessages);

    if(Array.isArray(res.items)) {
        if(res.items.length) {
            if(res.items.length < state.countMessages) {
                dispatch(setIsTotalLoadMessages(true));
            }
            if(pageMessagesNumber) {
                dispatch(updateMessages(res.items))
            } else {
                dispatch(setMessages(res.items));
            }
        } else {
            dispatch(setIsTotalLoadMessages(true));
        }
    }
    if(res.totalCount) {
        dispatch(setTotalCountMessages(res.totalCount));
    }
    if(pageMessagesNumber) {
        dispatch(setPageMessages(pageMessages));
    }
}
export const startChatting = (userId) => async (dispatch) => {
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
export const getInterlocutor = (userId) => async (dispatch) => {
    let res = await usersApi.getUserInfo(userId);
    dispatch(setInterlocutor(res))
}

export default dialogsReducer;