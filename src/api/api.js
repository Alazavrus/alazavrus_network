import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "2318fcfd-fc23-4f6a-8444-954e9b81aab5"
        // "API-KEY": "dc1190ec-0332-4428-a344-fa3c6328a29e"
        // "API-KEY": "df6a61a5-2ee8-4313-8f36-8d7c4cb542ab"
    }
});

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10, term, friend) {
        let isTerm = term ? `&term=${term}` : ``;
        let isFriend = friend ? `&friend=true` : ``;
        return instance.get(`users?count=${pageSize}&page=${currentPage}${isTerm}${isFriend}`).then(res => res.data)
    },
    addFollow(userId) {
        return instance.post(`follow/${userId}`).then(res => res.data).catch(err => err)
    },
    deleteFollow(userId) {
        return instance.delete(`follow/${userId}`).then(res => res.data).catch(err => err)
    },
    getUserInfo(userId) {
        return instance.get(`profile/${userId}`).then(res => res.data).catch(err => err)
    },
    getStatusProfile(userId) {
        return instance.get(`profile/status/${userId}`).then(res => res.data).catch(err => err)
    },
    setAuthUserStatus(status) {
        return instance.put(`profile/status`, {status}).then(res => res.data).catch(err => err)
    }
}

export const dialogApi = {
    getDialogs() {
        return instance.get(`dialogs/`).then(res => res.data)
    },
    getMessages(userId) {
        return instance.get(`dialogs/${userId}/messages?page=1&count=20`).then(res => res.data).catch(err => err)
    },
    sendMessage(userId, message) {
        return instance.post(`dialogs/${userId}/messages`, {body: message}).then(res => res.data).catch(err => err)
    },
    startChatting(userId) {
        return instance.put(`dialogs/${userId}`).then(res => res.data).catch(err => err)
    },
}

export const profileApi = {
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(res => res.data).catch(err => err)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
            .then(res => res.data)
            .catch(err => "Что то пошло не так")
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put(`profile/photo`, formData, {
            headers: {"Content-Type" : "multipart/form-data"}
        }).then(res => res.data).catch(err => err)
    },
    updateProfileData(data) {
        return instance.put(`profile`, {...data}).then(res => res.data).catch(err => err)
    }
}

export const authApi = {
    me() {
        return instance.get(`auth/me`).then(res => res.data).catch(err => err)
    },
    logIn(email, password, rememberMe = false, captcha) {
        return instance.post(`/auth/login`, {email, password, rememberMe, captcha}).then(res => res.data).catch(err => err)
    },
    logOut() {
        return instance.delete(`/auth/login`).then(res => res.data).catch(err => err)
    }
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then(res => res.data).catch(err => err)
    }
}


