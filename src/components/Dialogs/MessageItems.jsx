import css from'./Dialogs.module.css';
import MessageItem from "./MessageItem/MessageItem";
import {reduxForm} from "redux-form";
import {FieldTextarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../utils/validators";
import SubmitButton from "../common/SubmitButton/SubmitButton";
import {NavLink} from "react-router-dom";
import {useEffect, useCallback} from "react";

const maxLength500 = maxLengthCreator(500);

const SenderMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.create_message_container}>
            <FieldTextarea className={css.textarea}
                           name={"messageText"}
                           validate={[maxLength500]}
                           placeholder={"Напишите сообщение..."} />
            <SubmitButton>Отправить</SubmitButton>
        </form>
    );
}

const SenderMessageFormReduxForm = reduxForm({
    form: 'sender_message'
})(SenderMessageForm);

const MessageItems = ({messages, userId, authUserPhoto, userPhoto, userName, ...props}) => {

    const infinityScroll = useCallback(e => {

            if(e.currentTarget.scrollY === 0) {
                console.log("boom")
                props.getMessages(userId)
            }

    }, [props.getMessages])

    useEffect(() => {
        window.scrollTo(0, window.outerHeight);

        window.addEventListener("scroll", infinityScroll);
        return () => {
            window.removeEventListener("scroll", infinityScroll);
        }
    }, [])

    const sendMessage = (data) => {
        props.sendMessage(userId, data.messageText).then(() => {
            window.scrollTo(0, window.outerHeight);
        });
    }

    return (
        <>
            <div className={css.messages_block}>
                <div className={css.message_header}>
                    <div className={css.message_header__back}>
                        <NavLink to={`/dialogs`}>Назад</NavLink>
                    </div>
                    <div className={css.message_header__user_name}>
                        <NavLink to={`/profile/${userId}`}>{userName}</NavLink>
                    </div>
                </div>
                <div className={css.messages_items}>
                    {
                        messages.map(el =>
                            <MessageItem key={el.id} {...el}
                                         userId={userId}
                                         userPhoto={userPhoto}
                                         authUserPhoto={authUserPhoto}/>
                        )
                    }
                </div>
                <SenderMessageFormReduxForm onSubmit={sendMessage}/>
            </div>
        </>
    );
}

export default MessageItems;
