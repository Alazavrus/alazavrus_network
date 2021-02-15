import {getAuthUserInfo} from "./auth-reducer";

const INITIALED_SUCCESS = "INITIALED_SUCCESS";

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}

export const initialedSuccess = () => ({
    type: INITIALED_SUCCESS
})

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserInfo());

    Promise
        .all([promise])
        .then(() => {
            dispatch(initialedSuccess())
        })
}

export default appReducer;