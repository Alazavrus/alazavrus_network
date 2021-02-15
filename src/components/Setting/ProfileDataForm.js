import style from "./ProfileDataForm.module.css";
import {FieldInput, FieldTextarea, FieldToggle} from "../common/FormsControls/FormsControls";
import SubmitButton from "../common/SubmitButton/SubmitButton";
import {reduxForm} from "redux-form";
import {compose} from "redux";
import {required} from "../../utils/validators";
import ErrorMessage from "../common/ErrorMessage/ErrorMessage";

const Form = (props) => {
    return (
        <form className={style.form} onSubmit={props.handleSubmit}>
            <FieldInput name={"fullName"}
                        validate={required}
                        label={"Ваше имя"}
                        placeholder={"Введите ваше имя..."} />
            <FieldToggle name={"lookingForAJob"}
                         label={"Поиск работы"} />
            <FieldTextarea name={"aboutMe"}
                           validate={required}
                           label={"Обо мне"}
                           placeholder={"Расскажите о себе..."} />
            <FieldTextarea name={"lookingForAJobDescription"}
                           validate={required}
                           label={"Ваши профессиональные навыки"}
                           placeholder={"Введите навыки..."} />
            <div className={style.contacts_container}>
                <div className={style.contacts_title}>Контакты</div>
                <div className={style.contacts}>
                    <FieldInput name={"contacts.github"} label={"github"} placeholder={"github.com..."} />
                    <FieldInput name={"contacts.vk"} label={"vk"} placeholder={"vk.com..."} />
                    <FieldInput name={"contacts.facebook"} label={"facebook"} placeholder={"facebook.com..."} />
                    <FieldInput name={"contacts.instagram"} label={"instagram"} placeholder={"instagram.com..."} />
                    <FieldInput name={"contacts.twitter"} label={"twitter"} placeholder={"twitter.com..."} />
                    <FieldInput name={"contacts.website"} label={"website"} placeholder={"site.com..."} />
                    <FieldInput name={"contacts.youtube"} label={"youtube"} placeholder={"youtube.com"} />
                    <FieldInput name={"contacts.mainLink"} label={"mainLink"} placeholder={"mail@mail.ru..."} />
                </div>
            </div>
            {
                props.error &&
                    <ErrorMessage>{props.error}</ErrorMessage>
            }

            <SubmitButton className={style.submit_button}>Сохранить</SubmitButton>
        </form>
    )
}

export default compose(
    reduxForm({ form: "profile_data" })
)(Form);