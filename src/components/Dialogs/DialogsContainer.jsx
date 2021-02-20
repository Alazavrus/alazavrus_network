import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import DialogsItemsContainer from "./DialogsItems/DialogsItemsContainer";
import MessageItemsContainer from "./MessageItems/MessageItemsContainer";
import {getDialogs, getInterlocutor, getMessages, resetMessages, sendMessage, resetToDefaultState} from "../../redux/dialogs-reducer";
import MessageItemsHeader from "./MessageItems/MessageItemsHeader";
import SenderMessageForm from "./SenderMessageForm/SenderMessageForm";
import {useEffect} from "react";

const DialogContainer = ({authUserPhoto, dialogs, interlocutor, messages, location: {pathname}, ...props}) => {
    let interlocutorId = Number(pathname.split("/")[2]);
    let interlocutorName  = interlocutor ? interlocutor.fullName : null;
    let interlocutorPhoto = interlocutor ? interlocutor.photos.small : null;

    useEffect(() => {
        if(interlocutorId) {
            props.getInterlocutor(interlocutorId)
            props.getMessages(interlocutorId)
        } else {
            props.getDialogs()
        }
        return () => {
            props.resetToDefaultState()
        }
    }, [interlocutorId])

    let sendMessage = (data) => {
        if(interlocutorId) props.sendMessage(interlocutorId, data.messageText)
    }
    const moreMessages = () => {
        props.getMessages(interlocutorId, 1)
    }

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%", border: "1px solid #ddd"}}>
            {
                !interlocutorId &&
                    <DialogsItemsContainer authUserPhoto={authUserPhoto}
                                           dialogs={dialogs}/>
            }
            {
                !!interlocutorId &&
                    <>
                        <MessageItemsHeader {...{interlocutorId, interlocutorName}} />
                        <MessageItemsContainer interlocutorId={interlocutorId}
                                               interlocutorPhoto={interlocutorPhoto}
                                               authUserPhoto={authUserPhoto}
                                               messages={messages}
                                               isTotalLoadMessages={props.isTotalLoadMessages}
                                               onMoreMessages={moreMessages}
                                               resetMessages={props.resetMessages}/>

                        <SenderMessageForm onSubmit={sendMessage}/>
                    </>

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        dialogs: state.dialogsPage.dialogs,
        interlocutor: state.dialogsPage.interlocutor,
        isTotalLoadMessages: state.dialogsPage.isTotalLoadMessages,
        authUserPhoto: state.auth.userData && state.auth.userData.photos && state.auth.userData.photos.small
    }
}

const mapDispatchToProps = {
    sendMessage,
    getMessages,
    resetMessages,
    getDialogs,
    getInterlocutor,
    resetToDefaultState
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
    withRouter
)(DialogContainer);
