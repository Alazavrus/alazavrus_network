import style from './Users.module.css'
import Avatar from "../common/Avatar/Avatar";
import Popup from "../common/Popup/Popup";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames";

const Users = (props) => {
    const [photo, setPhoto] = useState(null);

    const [isShowPhotoPopup, setIsShowPhotoPopup] = useState(false);
    const onZoomPhoto = (img) => {
        if(img) {
            setPhoto(img)
            setIsShowPhotoPopup(true);
        }
    }
    const onCloseZoomPopup = (e) => {
        setPhoto(null)
        setIsShowPhotoPopup(false);
    }
    const followButton = (el) => {
        let disabled = props.followsFetching.some(id => id === el.id);

        return (
            el.followed
                ? <button className={ `${style.follow_button} ${style.unfollow}` }
                          disabled={ disabled }
                          onClick={ () => deleteFollow(el.id) } >Отписаться</button>
                : <button className={`${style.follow_button} ${style.follow}`}
                          disabled={ disabled }
                          onClick={ () => addFollow(el.id) } >Подписаться</button>
        )
    }
    const deleteFollow = (id) => {
        props.unfollow(id)
    }

    const addFollow = (id) => {
        props.follow(id)
    }

    return (
        <>
            <Popup isShow={isShowPhotoPopup} onClose={onCloseZoomPopup}>
                <Avatar photo={photo} />
            </Popup>
            <div className={style.users_container}>
                {
                    props.users.map(el => {
                        return (
                            <div key={ el.id } className={ style.user }>
                                <div className={ style.avatar_container }>
                                    <div className={ cn(style.user_avatar, {[style.user_avatar_pointer]: !!el.photos.small}) }
                                         onClick={()=>onZoomPhoto(el.photos.large)}>
                                        <Avatar width={"75px"}
                                                height={"75px"}
                                                photo={el.photos.small} />
                                    </div>
                                    { followButton(el) }
                                </div>
                                <div className={ style.profileInfo_container }>
                                    <div className={style.fullName}>
                                        <NavLink to={"/profile/" + el.id}>
                                            {el.name}
                                        </NavLink>
                                    </div>
                                    <div className={style.status}>
                                        {el.status}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Users;