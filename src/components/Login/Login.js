import {reduxForm} from "redux-form";
import {FieldCheckbox, FieldInput} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators";
import {connect} from "react-redux";
import {logIn} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import css from "./Login.module.css";
import SubmitButton from "../common/SubmitButton/SubmitButton";
import cn from "classnames";

const maxLength12 = maxLengthCreator(12);
const minLength4 = minLengthCreator(4);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.login_form}>
            <FieldInput className={css.login_form__indent} name={"login"} validate={required} placeholder={"Логин"} />
            <FieldInput className={css.login_form__indent}  name={"password"} type={"password"}
                        validate={[required, maxLength12, minLength4]}
                        placeholder={"Пароль"}/>

            <label className={cn(css.remember_me, css.login_form__indent)}>
                <FieldCheckbox name={"rememberMe"} type="checkbox" />
                <div className={css.remember_me__text}>Запомнить меня</div>
            </label>
            {
                props.error &&
                    <div className={css.formSummaryError}>
                        {props.error}
                    </div>
            }
            {
                props.captchaUrl &&
                <div className={css.login_form__indent}>
                    <img src={props.captchaUrl} alt=""/>
                    <FieldInput name={"captcha"}
                                validate={required}
                                placeholder={"Введите код с картинки"}/>
                </div>
            }
            <SubmitButton>Войти</SubmitButton>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    let onSubmit = (data) => {
        props.logIn(data.login, data.password, data.rememberMe, data.captcha);
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className={css.login_wrapper}>
            <h1 style={{margin: "15px 0"}}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {
    logIn
})(Login)