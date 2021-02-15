import React from "react";
import {connect} from "react-redux";
import {follow, unfollow, getUsers, setCurrentPage} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import PageNavigation from "../common/PageNavigation/PageNavigation";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {
    getCurrentPageFromState, getFollowsFetchingFromState, getIsFetchingFromState, getPageNavigationFromState,
    getPageSizeFromState,
    getTotalCountUsersFromState,
    getUsersFromState
} from "../../redux/users-selectors";
import {FieldSearchInput} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const UsersSearchForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} onBlur={props.handleSubmit}>
            <FieldSearchInput name={"search_text"} placeholder={"Поиск пользователей..."} />
        </form>
    )
}
const UsersSearchRF = reduxForm({
    form: "search_form"
})(UsersSearchForm)

class UsersContainer extends React.Component {
    state = {
        searchState: ""
    }
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }


    componentWillUnmount() {
        this.props.setCurrentPage(1)
    }

    selectPage = (el) => {
        this.props.getUsers(el, this.props.pageSize, this.state.searchState);
    }

    searchUsers = (data) => {
        this.setState({ searchState: data.search_text })
        this.props.getUsers(1, this.props.pageSize, data.search_text);
    }

    render() {
        return (
            <>
                <div style={{marginBottom: "20px", marginTop: "20px"}}>
                    <UsersSearchRF onSubmit={this.searchUsers} />
                </div>
                {
                    !this.props.isFetching
                        ? <Users users={this.props.users}
                                 currentPage={this.props.currentPage}
                                 unfollow={this.props.unfollow}
                                 follow={this.props.follow}
                                 followsFetching={this.props.followsFetching}/>
                        : null
                }
                {
                    this.props.isFetching
                        ?   <div style={{display: "flex", justifyContent: "center", margin: "100px auto"}}>
                                <Preloader />
                            </div>
                        :   null
                }
                 <PageNavigation selectPage={this.selectPage}
                                 selectedPage={this.props.currentPage}
                                 totalItems={this.props.totalCountUsers}
                                 showItems={this.props.pageSize}
                                 style={{margin: "auto 0 20px 0 "}}/>

            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsersFromState(state),
        totalCountUsers: getTotalCountUsersFromState(state),
        currentPage: getCurrentPageFromState(state),
        pageSize: getPageSizeFromState(state),
        pageNavigation: getPageNavigationFromState(state),
        isFetching: getIsFetchingFromState(state),
        followsFetching: getFollowsFetchingFromState(state)
    }
}
const mapDispatchToProps = {
    follow, unfollow, setCurrentPage, getUsers
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(UsersContainer);