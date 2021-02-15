import style from "./Popup.module.css";
import React from "react";

/*
    props: {
        onClose,
        isShow
    }
*/

const Popup = ({isShow, onClose, children}) => {
    return (
        isShow &&
        <div className={style.popup_background_container} onClick={onClose}>
            <div className={style.popup_background}></div>
            <div className={style.popup_content_container} onClick={e=>{e.stopPropagation()}}>
                {children}
                <div className={style.popup_close_button} onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Popup);