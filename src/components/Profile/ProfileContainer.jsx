import React from "react";
import {connect} from "react-redux";
import {
    getUserInfo,
    getStatus,
    setUserProfile,
    setStatus,
    updateStatus, savePhoto
} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {withRouter} from "react-router";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {startChatting} from "../../redux/dialogs-reducer";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId
            if(!userId) {
                this.props.history.push("/login")
            }
        }

        this.props.getUserInfo(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    componentWillUnmount() {
        this.props.setUserProfile(null);
    }

    render() {
        return (
            <Profile {...this.props}
                     savePhoto={this.props.savePhoto}
                     isOwner={!this.props.match.params.userId}
                     userProfileInfo={this.props.userProfile}
                     status={this.props.userProfileStatus} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userProfileStatus: state.profilePage.userProfileStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = {
    setUserProfile,
    getUserInfo,
    getStatus,
    setStatus,
    updateStatus,
    savePhoto,
    startChatting
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
    withRouter
)(ProfileContainer);

