const SAVE = "SAVE";

const initialStorage = () => {
    let obj = {};
    if(localStorage.length) {
        try {
            Object.keys(localStorage).forEach(field => {
                obj[field] = JSON.parse(localStorage[field])
            });
        }  catch (error) {}
    }
    return obj
}

const localStorageReducer = (state = initialStorage(), action) => {
    switch(action.type) {
        case SAVE: {
            if(action.value) {
                localStorage.setItem(action.key, JSON.stringify(action.value));
            }
            return {
                ...state,
                notes: action.value
            }
        }
        default:
            return state
    }
}

export const save = (key, value) => ({
    type: SAVE,
    key,
    value
});

// export const load = (file) => async (dispatch) => {
//     let obj = {};
//     if(localStorage.length) {
//         Object.keys(localStorage).forEach(field => {
//             obj[field] = JSON.parse(localStorage[field])
//         });
//     }
// }

export default localStorageReducer