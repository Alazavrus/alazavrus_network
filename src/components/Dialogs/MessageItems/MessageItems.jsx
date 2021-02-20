import css from './MessageItems.module.css';
import MessageItem from "../MessageItem/MessageItem";

const MessageItems = ({messages, interlocutorId, interlocutorPhoto, authUserPhoto}) => {
    return (
        <div className={css.messages_items}>
            {
                messages.map(el =>
                    <MessageItem key={el.id} {...el}
                                 interlocutorId={interlocutorId}
                                 interlocutorPhoto={interlocutorPhoto}
                                 authUserPhoto={authUserPhoto}/>
                )
            }
        </div>
    )
}

export default MessageItems;
