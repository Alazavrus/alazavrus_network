import {profileApi, usersApi} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_PHOTO = "SET_PHOTO";

let initialState = {
    posts: [
        // {id: 1, message: "", likeCount: 0}
    ],
    userProfile: null,
    userProfileStatus: ""
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { ...action.payload }
                ]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_STATUS:
            return {
                ...state,
                userProfileStatus: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    photos: action.photos
                }
            }
        default:
            return state
    }
}

export const addPost = (newPostText) => (dispatch, getState) => {
    const state = getState();
    dispatch({
        type: ADD_POST,
        payload: {
            id: new Date().getTime(),
            message: newPostText,
            likeCount: 0,
            avatar: state.auth.userData.photos.small
        }
    })
}

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    userProfile
});

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
});

export const setPhoto = (photos) => ({
    type: SET_PHOTO,
    photos
});

export const getUserInfo = (userId) => async (dispatch) => {
    const res = await usersApi.getUserInfo(userId);
    dispatch(setUserProfile(res));
}

export const getStatus = (userId) => async (dispatch) => {
    const res = await profileApi.getStatus(userId);
    dispatch(setStatus(res));
}

export const updateStatus = (status) => async (dispatch) => {
    const res = await profileApi.updateStatus(status);
    if(res === "Что то пошло не так") {
        dispatch(stopSubmit("profile_status", {_error: res}));
    }
    if(res.resultCode === 0) dispatch(setStatus(status));
    return res
}

export const savePhoto = (file) => async (dispatch) => {
    const res = await profileApi.savePhoto(file);
    if(res.resultCode === 0) dispatch(setPhoto(res.data.photos));
}

export default profileReducer