import AppWrapper from "./App";
import ReactDOM from "react-dom"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppWrapper />, div);
  ReactDOM.unmountComponentAtNode(div)
});
