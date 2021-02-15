import css from'./Dialogs.module.css';
import DialogItem from "./DialogsItem/DialogsItem";

const DialogsItems = ({dialogs, userId, selectDialog}) => {
    if(!dialogs) return null
    return (
        <>
            {
                !userId &&
                    <div className={css.dialogs_block}>
                        <div className={css.dialogs_items}>
                            {
                                dialogs.map(el =>
                                    <DialogItem onClick={() => selectDialog(el.id) } key={el.id}  {...el}/>
                                )
                            }
                        </div>
                    </div>
            }
        </>
    );
}

export default DialogsItems;
