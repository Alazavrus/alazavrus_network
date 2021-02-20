import css from "./MessageItem.module.css";
import Avatar from "../../common/Avatar/Avatar";
import cn from "classnames";

/*
    addedAt: "2021-02-10T13:34:46.353"
    body: "asd"
    id: "7ec23667-5d58-45b9-b2ef-cfaaac130a9b"
    recipientId: 14822
    senderId: 14426
    senderName: "Alazavrus"
    translatedBody: null
    viewed: false
*/

const MessageItem = (props) => {
    const { addedAt, body, senderId, senderName, viewed,
        interlocutorId, interlocutorPhoto, authUserPhoto, isSubMessage, isNextMessageTheIsSub } = props;
    let isInterlocutor = interlocutorId === senderId;
    let date = new Date(addedAt);
    let dateString = date.toLocaleDateString("ru", {year: "numeric", day: "numeric", month: "long"})
    let timeString = date.toLocaleTimeString("ru", {hour: "numeric", minute: "numeric"})

    let classNameList = cn(
        css.message_item,
        {[css.sub]: !!isSubMessage},
        {[css.main]: !isSubMessage},
        {[css.is_next_sub]: !!isNextMessageTheIsSub},
        {[css.viewed]: !viewed}
    );

    return (
        <div className={ classNameList }>
            <div>
                <div className={css.message_avatar}>
                    {
                        !isSubMessage &&
                            <Avatar style={{borderRadius: "50%"}} photo={ isInterlocutor ? interlocutorPhoto : authUserPhoto } width={"50px"} height={"50px"} />
                    }
                </div>
            </div>
            <div className={css.message_info_block}>
                {
                    !isSubMessage &&
                        <div className={css.sender_name}>
                            <b>{senderName}</b>
                            <span className={css.message_date}>{timeString}, {dateString}</span>
                        </div>
                }
                <div className={css.message_text} dangerouslySetInnerHTML={{__html:body}}></div>
            </div>
        </div>
    )
}

export default MessageItem;
