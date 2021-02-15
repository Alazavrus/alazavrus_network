import s from './Post.module.css';

const Post = ({avatar, likeCount, message}) => {
    return (
        <div className={s.item}>
            <img className={s.avatar} src={avatar} alt=""/>
            <div className={s.message_text}>{message}</div>
            <div className={s.like}>
                like <b className={s.like_count}>({likeCount})</b>
            </div>
        </div>
    );
}

export default Post;
