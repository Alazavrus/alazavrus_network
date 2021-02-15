import css from'./Dialogs.module.css';
import {useHistory} from "react-router";
import DialogsItems from "./DialogsItems";
import MessageItems from "./MessageItems";
import {useEffect, useState, useCallback} from "react";

const Dialogs = ({dialogsPage, location, authUserPhoto, ...props}) => {
    const [userId, setUserId]     = useState(null);
    const [messages, setMessages] = useState([]);
    const [dialogs, setDialogs]   = useState([]);
    const history = useHistory();
    let userPhoto = null;
    let userName = null;

    if(userId && dialogs.length) {
        let user = dialogs.filter(el => el.id === userId)[0];
        userName = user.userName;
        userPhoto = user.photos.small;
    }
    useEffect(() => {
        setMessages(dialogsPage.messages);
    }, [dialogsPage.messages]);

    useEffect(() => {
        setDialogs(dialogsPage.dialogs);
    }, [dialogsPage.dialogs]);

    useEffect(() => {
        let userId = Number(location.pathname.split("/")[2])
        if(userId) {
            setUserId(userId);
            props.getMessages(userId);
        } else {
            setUserId(null);
            setMessages([]);
        }
        return () => {
            setUserId(null)
            setMessages([]);
        }
    }, [location.pathname, props.getMessages])

    const selectDialog = (userId) => {
        history.push("/dialogs/" + userId);
    }

    const setIsSubMessage = (arr) => {
        return arr.map((item, index) => {
            let itemDate = new Date(item.addedAt).getTime();
            let prevItem = dialogsPage.messages[index - 1];
            let nextItem = dialogsPage.messages[index + 1];
            let isSubMessage = false;
            let resultItem = {...item, isSubMessage: isSubMessage, isNextMessageTheIsSub: false};
            let prevItemDate = null;

            if(prevItem && item.senderId === prevItem.senderId) {
                prevItemDate = new Date(prevItem.addedAt).getTime();
                let d  = Math.abs(itemDate - prevItemDate);
                if( prevItemDate && d <= 600000) {
                    resultItem = {...resultItem, isSubMessage: true}
                }
            }
            if(nextItem && prevItemDate && item.senderId === prevItem.senderId) {
                let nextItemDate = new Date(nextItem.addedAt).getTime();
                let d2 = Math.abs(nextItemDate - prevItemDate);

                if( nextItemDate && d2 <= 600000 ) {
                    resultItem = {...resultItem, isNextMessageTheIsSub: true}
                }
            }
            return resultItem
        })
    }

    return (
        <div className={css.dialogs}>
            {
                !userId &&
                    <DialogsItems dialogs={dialogs}
                                  userId={userId}
                                  selectDialog={selectDialog}/>
            }
            {
                !!userId && !!messages.length &&
                    <MessageItems messages={setIsSubMessage(messages)}
                                  userId={userId}
                                  userName={userName}
                                  userPhoto={userPhoto}
                                  sendMessage={props.sendMessage}
                                  getMessages={props.getMessages}/>
            }
        </div>
    );
}

export default Dialogs;
