import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOut} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)