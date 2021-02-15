import './Music.module.css';
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import StubPage from "../StubPage/StubPage";

const Music = (props) => {
    return (
        <div>
            <StubPage />
        </div>
    );
}

export default compose(
    WithAuthRedirect
)(Music);
