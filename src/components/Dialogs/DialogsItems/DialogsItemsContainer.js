import DialogsItems from "./DialogsItems";
import {useHistory} from "react-router";

const DialogsItemsContainer = ({dialogs}) => {
    const history = useHistory();

    const selectDialog = (interlocutorId) => {
        history.push("/dialogs/" + interlocutorId);
    }

    return (
        <DialogsItems dialogs={dialogs} selectDialog={selectDialog}/>
    )
}

export default DialogsItemsContainer;