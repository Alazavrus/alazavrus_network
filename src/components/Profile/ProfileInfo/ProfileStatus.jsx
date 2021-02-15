import css from "./ProfileInfo.module.css";
import React, {useState, useRef} from "react";
import {FieldInput} from "../../common/FormsControls/FormsControls";
import {clearSubmitErrors, reduxForm} from "redux-form";
import cn from "classnames";
import PopupError from "../../common/Errors/PopupError/PopupError";
const StatusForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} onBlur={props.handleSubmit}>
            <FieldInput className={css.status_input}
                        name={"status"}
                        autoFocus={true}
                        placeholder={"Напишите ваш статус..."}/>
            {
                props.error &&
                    <PopupError error={props.error} />
            }
        </form>
    )
}

const StatusRF = reduxForm({
    form: "profile_status",
    onChange: (values, dispatch, props) => {
        if (props.error) dispatch(clearSubmitErrors('profile_status'));
    }
})(StatusForm)

const ProfileStatus = ({status, isOwner, updateStatus}) => {
    let [editMode, setEditMode] = useState(false);
    const StatusRFRef = useRef()


    const activationEditMode = () => {
        if(isOwner) setEditMode(true)
    }
    const onSubmitUpdateStatus = (data) => {
        updateStatus(data.status).then(()=>{
            setEditMode(false);
        })
    }

    return (
        <div className={css.status_block}>
            {
                isOwner && !editMode &&
                    <div className={cn(css.status_text, css.status_text_with_edit)}
                         onClick={ activationEditMode }
                         title={status ? status : ""}>
                        <span>{status ? status :"Введите статус"}</span>
                    </div>
            }
            {
                isOwner && editMode &&
                    <StatusRF ref={StatusRFRef}
                              initialValues={{status: status}}
                              onSubmit={ onSubmitUpdateStatus } />
            }
            {
                !isOwner &&
                    <div className={css.status_text} title={status}><span>{status}</span></div>
            }
        </div>
    )
}

export default ProfileStatus;