import style from "./Notes.module.css";
import {save} from "../../redux/localStorage-reducer.js";
import {connect} from "react-redux";
import {useState} from "react";
import Popup from "../common/Popup/Popup";
import AddNoteForm from "./AddNoteForm";
import Note from "./Note";
import addIcon from "../../assets/images/add.png";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

const getNewId = () => {
    return new Date().getTime()
}

const Notes = ({notes, save}) => {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [editId, setEditId] = useState(null);

    const createNote = ({title, text}) => {
        let newNotes;
        if(!notes || notes.length === 0) {
            // if first add new note
            newNotes = [{ title, text, id: editId }];
        } else {
            if([...notes].some(el => el.id === editId)) {
                // if edit note
                newNotes = [...notes].map(el => el.id === editId ? { title, text, id: editId } : el)
            } else {
                // if add new note
                newNotes = [...notes, { title, text, id: editId }]
            }
        }

        save("notes", newNotes);
        closePopup();
    }
    const deleteNote = (id) => {
        save("notes", notes.filter(el => el.id !== id))
    }

    const openPopup = (id, initialValues) => {
        setEditId(id);
        setInitialValues( initialValues );
        setIsShowPopup(true);
    }
    const closePopup = () => {
        setEditId(null);
        setInitialValues( {} );
        setIsShowPopup(false);
    }

    return (
        <div className={style.notes}>
            <h1>
                Записи
                <img className={style.addNote} src={addIcon} onClick={()=> openPopup(getNewId(), {})} alt=""/>
            </h1>

            <Popup isShow={isShowPopup} onClose={closePopup}>
                <AddNoteForm initialValues={initialValues} onSubmit={createNote} />
            </Popup>

            {
                !!notes && !!notes.length && notes.map(el => {
                    return (
                        <Note key={el.id} note={el}
                              onEditNote={openPopup}
                              onDeleteNote={deleteNote} />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notes: state.localStorage.notes
    }
}
const mapDispatchToProps = {
    save
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Notes)