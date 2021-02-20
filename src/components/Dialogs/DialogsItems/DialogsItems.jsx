import DialogItem from "../DialogsItem/DialogsItem";

const DialogsItems = ({dialogs, selectDialog}) => {
    if(!dialogs) return (
        <h2 style={{textAlign: "center", marginTop: "50px"}}>
            У вас нет начатых диалогов!
        </h2>
    )

    return (
        <>
            {
               dialogs.map(el => <DialogItem onClick={() => selectDialog(el.id) }
                                             key={el.id}
                                             {...el}/> )
            }
        </>
    );
}

export default DialogsItems;
