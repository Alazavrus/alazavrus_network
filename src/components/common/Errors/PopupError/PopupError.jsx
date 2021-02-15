import css from "./PopupError.module.css";

const PopupError = (props) => {
    return (
        <div className={css.error_block__text}>{props.error}</div>
    )
}
export default PopupError;