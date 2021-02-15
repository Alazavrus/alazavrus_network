import {getDialogs, getMessages, sendMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {useEffect, useCallback} from "react";
import {withRouter} from "react-router-dom";

const DialogContainer = (props) => {
    let {getDialogs, getMessages, location} = props;
    let getDialogsCb = useCallback( getDialogs, [getDialogs] )
    let getMessagesCb = useCallback( getMessages, [getMessages] )

    useEffect(() => {
        getDialogsCb();
    }, [getDialogsCb])

    useEffect(() => {
        if(location.pathname.split("/")[2]) {
            getMessagesCb(location.pathname.split("/")[2])
        }
    }, [getMessagesCb, location.pathname])

    return (
        <Dialogs {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        authUserPhoto: state.auth.userData && state.auth.userData.photos && state.auth.userData.photos.small
    }
}

const mapDispatchToProps = {
    sendMessage,
    getDialogs,
    getMessages
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
    withRouter
)(DialogContainer);
