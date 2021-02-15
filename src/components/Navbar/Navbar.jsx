import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import settingsIcon from '../../assets/images/settings.svg';
import newsIcon from '../../assets/images/news.svg';
import notesIcon from '../../assets/images/notes.svg';
import dialogsIcon from '../../assets/images/dialogs.svg';
import musicIcon from '../../assets/images/music.svg';
import peopleIcon from '../../assets/images/people.svg';
import personIcon from '../../assets/images/person.svg'


const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}>
                    <img className={s.item_img} src={personIcon} alt={""}/>
                    Профиль
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.active}>
                    <img className={s.item_img} src={dialogsIcon} alt={""}/>
                    Сообщения
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.active}>
                    <img className={s.item_img} src={newsIcon} alt={""}/>
                    Новости
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.active}>
                    <img className={s.item_img} src={musicIcon} alt={""}/>
                    Музыка
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/setting" activeClassName={s.active}>
                    <img className={s.item_img} src={settingsIcon} alt={""}/>
                    Настройки
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/notes" activeClassName={s.active}>
                    <img className={s.item_img} src={notesIcon} alt={""}/>
                    Записи
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.active}>
                    <img className={s.item_img} src={peopleIcon} alt={""}/>
                    Пользователи
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;

