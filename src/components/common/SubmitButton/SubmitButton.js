import style from "./SubmitButton.module.css";
import cn from "classnames"

const SubmitButton = ({children, className, onClick}) => {
    return (
        <button onClick={onClick} className={cn(style.submit_button, className)}>{children}</button>
    )
}

export default SubmitButton;