import css from './MessageItems.module.css';
import {NavLink} from "react-router-dom";

const MessageItems = ({interlocutorId, interlocutorName}) => {
    return (
        <>
            <div className={css.message_header}>
                <div className={css.message_header__back}>
                    <NavLink to={`/dialogs`}>Назад</NavLink>
                </div>
                <div className={css.message_header__user_name}>
                    <NavLink to={`/profile/${interlocutorId}`}>{interlocutorName}</NavLink>
                </div>
            </div>
        </>
    );
}

export default MessageItems;
