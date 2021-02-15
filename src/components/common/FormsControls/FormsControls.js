import style from "./FormsControls.module.css";
import React from "react";
import cn from "classnames";
import {Field} from "redux-form";
import ReactSelect from "react-select";
import warningIcon from "../../../assets/images/warning.png"
import PopupError from "../Errors/PopupError/PopupError";


const FormsControl = ({input, meta, label, children, ...props}) => {
    const isHasError = meta.touched && meta.error;
    const isHasWarning = meta.touched && meta.active && meta.warning;
    const setStyleClass = cn({[style.error]: isHasError}, style.formControl);

    return (
        <label className={setStyleClass}>
            {label && <div className={style.label}>{label}</div>}

            <div className={style.input_block}>
                {
                    isHasError && !meta.active &&
                        <PopupError error={meta.error} />
                }

                { children }

                {
                    isHasError &&
                        <img className={style.error_block__icon} src={warningIcon} alt=""/>

                }
                {
                    isHasWarning &&
                        <div className={style.warn_block}>
                            <img className={style.warn_block__icon} src={warningIcon} alt=""/>
                            <div className={style.warn_block__text}>{meta.warning}</div>
                        </div>
                }

            </div>
        </label>
    )
}

export const Textarea = ({input, meta, className, ...props}) => {
    return (
        <FormsControl input={{...input}} meta = {{...meta}} {...props}>
            <textarea className={cn(style.textarea, className)} {...input} {...props}/>
        </FormsControl>
    )
}

export const Input = ({input, meta, className, ...props}) => {
    return (
        <FormsControl input={{...input}} meta = {{...meta}} {...props}>
            <input className={cn(style.input, className)} {...input} {...props}/>
        </FormsControl>
    )
}

const Toggle = ({input, meta, ...props}) => {
    return (
        <FormsControl input={{...input}} meta = {{...meta}} {...props}>
            <label className={style.toggle}>
                <input className={style.input} {...input} {...props}/>
                <span className={style.slider}></span>
            </label>
        </FormsControl>
    )
}
const Checkbox = ({input, meta, ...props}) => {
    return (
        <FormsControl input={{...input}} meta = {{...meta}} {...props} >
            <input {...input} {...props}/>
        </FormsControl>
    )
}
const Select = ({input, meta, ...props}) => {
    return (
        <FormsControl input={{...input}} meta = {{...meta}} {...props} >
            <ReactSelect {...input} {...props}/>
        </FormsControl>
    )
}

export const FieldInput = (props) => {
    return <Field component={Input} {...props} />
}

export const FieldSearchInput = (props) => {
    return <Field {...props} component={Input} type={"search"} />
}

export const FieldTextarea = (props) => {
    return <Field {...props} component={Textarea} />
}

export const FieldToggle = (props) => {
    return <Field {...props} component={Toggle} type={"checkbox"}/>
}

export const FieldCheckbox = (props) => {
    return <Field {...props} component={Checkbox} type={"checkbox"}/>
}

export const FieldSelect = (props) => {
    return (
        <Field component={Select} {...props} />
    )
}

