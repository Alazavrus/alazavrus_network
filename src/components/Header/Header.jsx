import css from './Header.module.css';
import {NavLink} from 'react-router-dom';
import logoutIcon from '../../assets/images/logout.png';
import logoIcon from "../../assets/images/logo.svg"

const Header = (props) => {
    return (
        <header className={css.header}>
            <div className={css.header_container}>
                <a href={process.env.PUBLIC_URL} className={css.logo_link}>
                    <img className={css.logo} src={logoIcon} alt=""/>
                </a>
                {
                    props.isAuth
                        ?
                            <div className={css.log}>
                                <NavLink to={"/profile"} className={css.toProfile}>{props.login}</NavLink>
                                <img className={css.logout} onClick={props.logOut} src={logoutIcon} alt=""/>
                            </div>
                        :
                            <div className={css.auth}>
                                <NavLink to={"/login"} >login</NavLink>
                            </div>
                }
            </div>
        </header>
    );
}

export default Header;
