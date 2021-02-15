import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";

export const WithAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.auth) return <Redirect to={"/login"} />

            return <Component {...this.props} />
        }

    }

    let mapStateToProps = (state) => ({
        auth: state.auth.isAuth
    })

    return connect(mapStateToProps)(RedirectComponent)
}