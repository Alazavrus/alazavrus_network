import style from './ProfileAvatar.module.css';
import React, {useState} from "react";
import userPhotoPlaceholder from "../../../assets/images/user-logo.png";
import addPhotoIcon from "../../../assets/images/add_photo.svg";
import editPhotoIcon from "../../../assets/images/edit_photo.svg";
import zoomPhotoIcon from "../../../assets/images/zoom.svg";
import Popup from "../../common/Popup/Popup";


const LoadPhotoButton = ({iconSrc, onSelectedPhoto}) => {
    return (
        <label>
            <img className={style.change_photo__button} src={iconSrc} alt=""/>
            <input className={style.file_input} type="file" onChange={onSelectedPhoto} />
        </label>
    )
}

const ZoomButton = ({imageZoomingSrc}) => {
    const [isShowPhotoPopup, setIsShowPhotoPopup] = useState(false);

    const onZoomPhoto = (e) => {
        setIsShowPhotoPopup(true);
    }

    const onCloseZoomPopup = (e) => {
        setIsShowPhotoPopup(false);
    }

    return (
        <>
            <img onClick={onZoomPhoto}
                 className={style.change_photo__button}
                 src={zoomPhotoIcon} alt=""/>

            <Popup isShow={isShowPhotoPopup} onClose={onCloseZoomPopup}>
                <img className={style.avatar_full_size} src={imageZoomingSrc} alt=""/>
            </Popup>
        </>
    )
}

const ProfileAvatar = ({photo, isOwner, savePhoto}) => {
    const onSelectedPhoto = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const avatar = photo ? photo : userPhotoPlaceholder;
    const IconSrcForLoadPhotoButton = photo ? editPhotoIcon : addPhotoIcon;

    return (
        <div className={style.avatar_container}>
            <img className={style.avatar} src={avatar} alt=""/>
            <div className={style.change_photo__button_container}>
                { isOwner && <LoadPhotoButton iconSrc={IconSrcForLoadPhotoButton} onSelectedPhoto={onSelectedPhoto} /> }
                { photo && <ZoomButton imageZoomingSrc={photo} /> }
            </div>
        </div>
    );
}

export default ProfileAvatar;
