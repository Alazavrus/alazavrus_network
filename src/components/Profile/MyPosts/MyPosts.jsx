import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {reduxForm, reset} from "redux-form";
import {maxLengthCreator} from "../../../utils/validators";
import {FieldTextarea} from "../../common/FormsControls/FormsControls";
import SubmitButton from "../../common/SubmitButton/SubmitButton";
const maxLength100 = maxLengthCreator(100);

const CreatorPostForm = (props) => {
    return (
        <form className={style.create_posts_container} onSubmit={props.handleSubmit}>
            <FieldTextarea className={style.textarea}
                           name={"postText"}
                           placeholder={"Что у вас нового?"}
                           validate={[maxLength100]}/>
            <SubmitButton>Опубликовать</SubmitButton>
        </form>
    )
}


const CreatorPostReduxForm = reduxForm({
    form: "creator_post"
})(CreatorPostForm)

const MyPosts = (props) => {
    let addPost = (values) => {
        props.addPost(values.postText);
        reset("creator_post")
    };

    return (
        <div className={style.my_posts_container}>
            <CreatorPostReduxForm onSubmit={addPost}/>
            <div className={style.posts}>
                {
                    props.posts.map( el =>
                        <Post key={el.id} {...el}/>
                    )
                }
            </div>
        </div>
    );
}

export default MyPosts;
