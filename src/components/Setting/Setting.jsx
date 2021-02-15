import Details from "../common/Details/Details";
import ProfileDataForm from "./ProfileDataForm";
import OtherDataForm from "./OtherDataForm";

const Setting = ({updateProfileData, userData, themeList, languageList}) => {
    const saveProfileData = (data) => {
        updateProfileData({
            ...data,
            lookingForAJobDescription: data.lookingForAJobDescription === "" ? null : data.lookingForAJobDescription
        })
    }
    const otherProfileData = (data) => {
        // console.log(data)
    }
    return (
        <div style={{marginTop: "15px"}}>
            <Details>
                Настройки профиля
                <div style={{marginTop: "15px"}}>
                    <ProfileDataForm initialValues={userData} onSubmit={saveProfileData} />
                </div>
            </Details>
            <Details>
                Другие настройки
                <div style={{marginTop: "15px"}}>
                    <OtherDataForm languageList={languageList} themeList={themeList} onChange={otherProfileData} />
                </div>
            </Details>
        </div>
    );
}

export default Setting;
