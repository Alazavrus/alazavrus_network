import './News.module.css';
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import StubPage from "../StubPage/StubPage";

const News = (props) => {
    return (
        <div>

            <StubPage />
        </div>
    );
}

export default compose(
    WithAuthRedirect
)(News);
