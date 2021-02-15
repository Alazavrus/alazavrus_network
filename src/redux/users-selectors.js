export const getUsersFromState = (state) => {
    return state.usersPage.users
}
export const getTotalCountUsersFromState = (state) => {
    return state.usersPage.totalCountUsers
}
export const getCurrentPageFromState = (state) => {
    return state.usersPage.currentPage
}
export const getPageSizeFromState = (state) => {
    return state.usersPage.pageSize
}
export const getPageNavigationFromState = (state) => {
    return state.usersPage.pageNavigation
}
export const getIsFetchingFromState = (state) => {
    return state.usersPage.isFetching
}
export const getFollowsFetchingFromState = (state) => {
    return state.usersPage.followsFetching
}
