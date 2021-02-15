import {usersApi} from "../api/api";
import {updateObjInArray} from "../utils/helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_COUNT_USERS = "SET_TOTAL_COUNT_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_FOLLOWS_FETCHING = "SET_FOLLOWS_FETCHING";

let initialState = {
    users: [],
    totalCountUsers: 0,
    currentPage: 1,
    pageSize: 20,
    isFetching: false,
    followsFetching: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id",{followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_TOTAL_COUNT_USERS:
            return {
                ...state,
                totalCountUsers: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_FOLLOWS_FETCHING:
            return {
                ...state,
                followsFetching: action.followsFetching
                    ? [...state.followsFetching, action.userId]
                    : state.followsFetching.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const setFollow = (userId) => ({
    type: FOLLOW,
    userId
});

export const setUnfollow = (userId) => ({
    type: UNFOLLOW,
    userId
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const setTotalCountUsers = (totalCount) => ({
    type: SET_TOTAL_COUNT_USERS,
    totalCount
});

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING,
    isFetching
});

export const setFollowsFetching = (followsFetching, userId) => ({
    type: SET_FOLLOWS_FETCHING,
    followsFetching,
    userId
});

export const getUsers = (currentPage, pageSize, term, friend) => async (dispatch) => {
    dispatch(setIsFetching(true));
    const data = await usersApi.getUsers(currentPage, pageSize, term, friend);
    dispatch(setIsFetching(false));
    dispatch(setTotalCountUsers(data.totalCount));
    dispatch(setCurrentPage(currentPage))
    dispatch(setUsers(data.items));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setFollowsFetching(true, userId));

    const data = await apiMethod(userId);

    if(data.resultCode === 0) {
        dispatch(setFollowsFetching(false, userId));
        dispatch(actionCreator(userId));
    } else {
        dispatch(setFollowsFetching(false, userId));
    }
}

export const follow = (userId) => (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersApi.addFollow.bind(usersApi), setFollow);
}

export const unfollow = (userId) => (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersApi.deleteFollow.bind(usersApi), setUnfollow);
}

export default usersReducer