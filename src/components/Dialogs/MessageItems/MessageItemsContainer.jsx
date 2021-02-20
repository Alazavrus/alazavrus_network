import {useEffect, useCallback, useState} from "react";
import MessageItems from "./MessageItems";

const MessageItemsContainer = (props) => {
    const {
        messages, interlocutorId, interlocutorPhoto, authUserPhoto, onMoreMessages,
        resetMessages, isTotalLoadMessages
    } = props;
    const [isScrollBottom, setIsScrollBottom] = useState(true);
    const scrollBottom = () => window.scrollTo(0, window.outerHeight);

    const infinityScroll = useCallback(e => {
        if(e.currentTarget.scrollY <= 200) {
            window.removeEventListener("scroll", infinityScroll);
            onMoreMessages();
        }
    }, [])

    useEffect(() => {
        if(!isTotalLoadMessages && messages.length) {
            window.addEventListener("scroll", infinityScroll);
        } else {
            window.removeEventListener("scroll", infinityScroll);
        }
    }, [isTotalLoadMessages, messages])

    useEffect(() => {
        return () => {
            resetMessages([])
        }
    }, [])

    useEffect(() => {
        if(isScrollBottom && messages.length && interlocutorId) {
            scrollBottom();
            setIsScrollBottom(false)
        }
    }, [messages, interlocutorId])

    useEffect(() => {
        if(interlocutorId) {
            setIsScrollBottom(true)
        }
    }, [interlocutorId]);


    const setIsSubMessage = (arr) => {
        return arr.map((item, index) => {
            let itemDate = new Date(item.addedAt).getTime();
            let prevItem = messages[index - 1];
            let nextItem = messages[index + 1];
            let isSubMessage = false;
            let resultItem = {...item, isSubMessage: isSubMessage, isNextMessageTheIsSub: false};
            let prevItemDate = null;

            if(prevItem && item.senderId === prevItem.senderId) {
                prevItemDate = new Date(prevItem.addedAt).getTime();
                let difference = Math.abs(itemDate - prevItemDate);
                if( prevItemDate && difference <= 600000) {
                    resultItem = {...resultItem, isSubMessage: true}
                }
            }
            if(nextItem && prevItemDate && item.senderId === prevItem.senderId) {
                let nextItemDate = new Date(nextItem.addedAt).getTime();
                let difference = Math.abs(nextItemDate - prevItemDate);

                if( nextItemDate && difference <= 600000 ) {
                    resultItem = {...resultItem, isNextMessageTheIsSub: true}
                }
            }
            return resultItem
        })
    }

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            {
                !!messages.length &&
                    <MessageItems {
                        ...{messages: setIsSubMessage(messages),
                        interlocutorId,
                        interlocutorPhoto,
                        authUserPhoto}
                    } />
            }
        </div>
    );
}

export default MessageItemsContainer;
