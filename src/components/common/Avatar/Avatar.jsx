import css from './Avatar.module.css';
import React from "react";
import userPhotoPlaceholder from "../../../assets/images/user-logo.png";

/*
    props: {
        photo,
        width,
        height
    }
*/

const Avatar = ({photo, width, height, className, style}) => {
    const setStyle = {
        width,
        height,
        ...style
    };
    const setClassName = css.avatar + " " + className;

    return (
        <>
            {
                photo
                    ? <img style={setStyle} className={setClassName} src={photo} alt=""/>
                    : <img style={setStyle} className={setClassName} src={userPhotoPlaceholder} alt=""/>
            }
        </>
    );
}

export default Avatar;
