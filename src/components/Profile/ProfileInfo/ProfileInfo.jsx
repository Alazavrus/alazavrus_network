import style from './ProfileInfo.module.css';
import React from "react";
import ProfileStatus from "./ProfileStatus";
import ProfileAvatar from "./ProfileAvatar";

import facebookIcon from "../../../assets/images/facebook.png";
import githubIcon from "../../../assets/images/github.png";
import instagramIcon from "../../../assets/images/instagram.png";
import mainLinkIcon from "../../../assets/images/mainLink.png";
import twitterIcon from "../../../assets/images/twitter.png";
import vkIcon from "../../../assets/images/vk.png";
import websiteIcon from "../../../assets/images/website.png";
import youtubeIcon from "../../../assets/images/youtube.png";
import jobsIcon from "../../../assets/images/jobs.png";
import SubmitButton from "../../common/SubmitButton/SubmitButton";
import {useHistory} from "react-router";
// import Tooltip from "../../common/Tooltip/Tooltip";
// import {NavLink} from "react-router-dom";

const ProfileInfo = ({profile, status, isOwner, updateStatus, savePhoto, startChatting}) => {
    let {photos, fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts, userId} = profile;
    let {facebook, github, instagram, mainLink, twitter, vk, website, youtube} = contacts;
    let history = useHistory();
    let toWrite = () => {
        startChatting(userId).then(() => {
            history.push(`/dialogs/${userId}`)
        })
    }
    return (
        <div className={style.profile_info_container}>
            <div className={style.description_block}>
                <div>
                    <div style={{marginBottom: "10px"}}>
                        <ProfileAvatar photo={photos.large}
                                       isOwner={isOwner}
                                       savePhoto={savePhoto}/>
                    </div>
                    {
                        !isOwner &&
                            <SubmitButton onClick={toWrite}>Написать</SubmitButton>
                    }
                </div>

                <div className={style.infoBlock}>
                    <div className={style.userName}>{fullName}</div>
                    <ProfileStatus isOwner={isOwner} status={status} updateStatus={updateStatus}/>
                    {
                        lookingForAJob &&
                        <div className={style.jobs}>
                            <img width="30px" height="30px" src={jobsIcon} alt=""/>
                            <span
                                className={style.jobs_description}>{lookingForAJob && lookingForAJobDescription}</span>
                        </div>
                    }
                    {
                        aboutMe
                            ?
                            <div className={style.about_me}>
                                <b>Обо мне</b>
                                <div>{aboutMe}</div>
                            </div>
                            : null
                    }

                    <div className={style.contact_container}>
                        <Contact icon={facebookIcon} contactKey={"facebook"} contactValue={facebook}/>
                        <Contact icon={githubIcon} contactKey={"github"} contactValue={github}/>
                        <Contact icon={instagramIcon} contactKey={"instagram"} contactValue={instagram}/>
                        <Contact icon={mainLinkIcon} contactKey={"mainLink"} contactValue={mainLink}/>
                        <Contact icon={twitterIcon} contactKey={"twitter"} contactValue={twitter}/>
                        <Contact icon={vkIcon} contactKey={"vk"} contactValue={vk}/>
                        <Contact icon={websiteIcon} contactKey={"website"} contactValue={website}/>
                        <Contact icon={youtubeIcon} contactKey={"youtube"} contactValue={youtube}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Contact = ({icon, contactKey, contactValue}) => {
    if (!contactValue) return null
    return (
        <div className={style.contact}>
            <a href={"http://" + contactValue} rel="noreferrer" target="_blank" style={{display: "flex"}}>
                <img width="30px" height="30px" src={icon} alt=""/>
                {/*<b>{contactKey}:</b> {contactValue}*/}
            </a>
        </div>
    )
}

export default ProfileInfo;
