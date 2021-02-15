import css from './DialogsItem.module.css';
import {NavLink} from "react-router-dom";
import Avatar from "../../common/Avatar/Avatar";

/*
    props: {
        hasNewMessages: false
        id: 14822
        lastDialogActivityDate: "2021-02-10T13:34:46.353"
        lastUserActivityDate: "2021-02-10T13:46:23.55"
        newMessagesCount: 0
        photos: {small: null, large: null}
        userName: "wasakog",
        onClick: () => {}
    }
*/

const DialogItem = ({onClick, id, newMessagesCount, photos, userName}) => {
    return (
        <div onClick={onClick} className={css.dialog_item}>
            <Avatar className={css.avatar} width={"50px"} height={"50px"} photo={photos.small} />
            <NavLink className={css.user_name} to={"/dialogs/" + id}>{userName}</NavLink>
            <div className={css.new_messages_count}>{newMessagesCount}</div>
        </div>
    )

}

export default DialogItem;
