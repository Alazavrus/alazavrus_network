import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const THEME = "THEME";

let initialState = {
    theme: "light",
    themeList: [
        {value: 'Светлая', label: 'Светлая'},
        {value: 'Темная', label: 'Темная'}
    ],
    language: "russian",
    languageList: [
        {value: 'Русский', label: 'Русский'},
        {value: 'Английский', label: 'Английский'}
    ]
}

const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case THEME:
            return {
                ...state
            }
        default:
            return state
    }
}

export const setTheme = (theme) => ({
    type: THEME,
    theme
});

export const updateProfileData = (data) => async (dispatch) => {
    const res = await profileApi.updateProfileData(data);

    if(res.resultCode === 0) {
        dispatch(getAuthUserData(data.userId));
    }

    if(res.messages && res.messages.length) {
        let obj = {}
        let messageText = "Недопустимый формат URL-адреса"
        res.messages.forEach(item => {
            if(item === "Invalid url format (Contacts->Instagram)") obj.instagram = messageText
            if(item === "Invalid url format (Contacts->Facebook)")  obj.facebook = messageText
            if(item === "Invalid url format (Contacts->MainLink)")  obj.mainLink = messageText
            if(item === "Invalid url format (Contacts->Website)")   obj.website = messageText
            if(item === "Invalid url format (Contacts->Twitter)")   obj.twitter = messageText
            if(item === "Invalid url format (Contacts->Youtube)")   obj.youtube = messageText
            if(item === "Invalid url format (Contacts->Github)")    obj.github = messageText
            if(item === "Invalid url format (Contacts->Vk)")        obj.vk = messageText
        })

        dispatch(stopSubmit("profile_data", {contacts: {...obj}, _error: "" }))
    }

    if(res.resultCode !== 0 && !res.messages ){
        dispatch(stopSubmit("profile_data", {_error: "Что то пошло не так" }))
    }
}

export default settingReducer