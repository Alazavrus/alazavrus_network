import style from "./ErrorMessage.module.css";
import warningIcon from "../../../assets/images/warning.png";
import React from "react";

const ErrorMessage = ({children}) => {
    return (
        <div className={style.error_block} title={children}>
            <img className={style.error_icon} src={warningIcon} alt=""/>
            <div className={style.error_text}>{children}</div>
        </div>
    )
}

export default ErrorMessage