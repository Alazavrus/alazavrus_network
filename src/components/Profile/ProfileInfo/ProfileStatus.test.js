import ProfileStatus from "./ProfileStatus";
import {create, act} from "react-test-renderer";

describe("Button component", () => {
    test("it show the expected text when clicked", () => {
        const component = create(<ProfileStatus status={"TESTING IT"} />);
        const root = component.root;
        expect(root.props.status).toBe("TESTING IT");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status={"TESTING IT"} />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    })

    test("after creation <input> not should be displayed", () => {
        const component = create(<ProfileStatus status={"TESTING IT"} />);
        const root = component.root;
        expect(() => {
            root.findByType("input")
        }).toThrow();
    })

    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status={"TESTING IT"} />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("TESTING IT");
    })


    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"TESTING IT"} />);
        const root = component.root;
        let span = root.findByType("span");
        act(() => span.props.onClick());
        let input = root.findByType("input");
        expect(input.props.value).toBe("TESTING IT");
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn(status => {});

        const component = create(<ProfileStatus status={"TESTING IT"} updateStatus={mockCallback} />);
        const root = component.root;

        let span = root.findByType("span");
        act(() => span.props.onClick());

        let input = root.findByType("input");
        act(() => input.props.onBlur());

        expect(mockCallback.mock.calls.length).toBe(1);
    })
})