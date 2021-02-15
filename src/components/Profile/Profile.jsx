import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader/Preloader";
import React from "react";
import css from "./Profile.module.css"

const Profile = (props) => {
    return (
        <div className={css.profile_wrapper}>
            {
                !props.userProfile
                    ?
                        <div style={{display: "flex", justifyContent: "center", margin: "100px auto"}}>
                            <Preloader />
                        </div>
                    :
                        <>
                            <ProfileInfo isOwner={props.isOwner}
                                         savePhoto={props.savePhoto}
                                         profile={props.userProfileInfo}
                                         status={props.userProfileStatus}
                                         updateStatus={props.updateStatus}
                                         setStatus={props.setStatus}
                                         startChatting={props.startChatting} />
                            <MyPostsContainer />
                        </>
            }
        </div>
    );
}

export default Profile;
