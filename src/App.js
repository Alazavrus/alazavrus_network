import './App.css';
import {Route, withRouter, Switch, HashRouter} from "react-router-dom";
import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";

import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import WithSuspense from "./hoc/WithSuspense";
import {WithAuthRedirect} from "./hoc/WithAuthRedirect";

const Login            = React.lazy(() => import('./components/Login/Login'));
const SettingContainer = React.lazy(() => import('./components/Setting/SettingContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News             = React.lazy(() => import('./components/News/News'));
const Music            = React.lazy(() => import('./components/Music/Music'));
const UsersContainer   = React.lazy(() => import('./components/Users/UsersContainer'));
const Notes            = React.lazy(() => import('./components/Notes/Notes'));

const Content = () => {
    return (

            <div className="app-wrapper">
                <Navbar/>
                <div className="app-wrapper__content">
                    <Route path="/news"    render={ WithSuspense(News) } />
                    <Route path="/music"   render={ WithSuspense(Music) } />
                    <Route path="/setting" render={ WithSuspense(SettingContainer) } />
                    <Route path="/users"   render={ WithSuspense(UsersContainer) } />
                    <Route path="/notes"   render={ WithSuspense(Notes) } />
                    <Route path="/dialogs" render={ WithSuspense(DialogsContainer) }/>
                    <Route path="/profile/:userId?" render={ WithSuspense(ProfileContainer) }/>
                </div>
            </div>
    )
}

const ContentWithRedirect = compose(
    WithAuthRedirect
)(Content)

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return null
        }

        return (
            <>
                <HeaderContainer/>
                <Switch>
                    <Route path="/login" render={ WithSuspense(Login) }/>
                    <Route path="/">
                        <ContentWithRedirect />
                    </Route>
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const WithRouterApp = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);


const AppWrapper = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <WithRouterApp />
            </Provider>
        </HashRouter>
    )
}

export default AppWrapper;
