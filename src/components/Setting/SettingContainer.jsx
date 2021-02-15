import Setting from "./Setting";
import {connect} from "react-redux";
import {updateProfileData} from "../../redux/setting-reducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

const SettingContainer = (props) => {
    return (
        <Setting {...props} />
    );
}

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
    themeList: state.settings.themeList,
    languageList: state.settings.languageList
})

const mapDispatchToProps = {
    updateProfileData
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(SettingContainer);
