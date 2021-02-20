import {maxLengthCreator} from "../../../utils/validators";
import css from "./SenderMessageForm.module.css";
import {FieldTextarea} from "../../common/FormsControls/FormsControls";
import SubmitButton from "../../common/SubmitButton/SubmitButton";
import {reduxForm} from "redux-form";

const maxLength500 = maxLengthCreator(500);

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.create_message_container}>
            <FieldTextarea className={css.textarea}
                           name={"messageText"}
                           validate={[maxLength500]}
                           placeholder={"Напишите сообщение..."} />
            <SubmitButton>Отправить</SubmitButton>
        </form>
    );
}

const SenderMessageForm = reduxForm({
    form: 'sender_message'
})(Form);


export default SenderMessageForm