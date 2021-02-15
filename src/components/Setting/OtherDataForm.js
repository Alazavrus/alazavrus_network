import style from "./OtherDataForm.module.css";
import {FieldSelect} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {compose} from "redux";
import {notWorkingField} from "../../utils/validators";

const Form = ({themeList, languageList, handleSubmit}) => {
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <FieldSelect warn={notWorkingField} name={"theme"} label={"Тема"} options={themeList} placeholder={"Выбрать тему..."} />
            <FieldSelect warn={notWorkingField} name={"language"} label={"Язык"} options={languageList} placeholder={"Выбрать язык..."}/>
        </form>
    )
}

export default compose(
    reduxForm({ form: "other_data" })
)(Form);