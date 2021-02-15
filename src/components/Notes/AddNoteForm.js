import style from "./AddNotesForm.module.css"
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../common/FormsControls/FormsControls";

const AddNotesForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div>
                <Field className={style.input}
                       name={"title"}
                       component={Input}
                       placeholder={"Название записи"}/>
                <Field className={style.textarea}
                       name={"text"}
                       component={Textarea}
                       placeholder={"Описание записи"}/>
            </div>
            <div>
                <button className={style.save}>Сохранить</button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'create_note'
})(AddNotesForm);