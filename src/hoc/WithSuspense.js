import {Suspense} from "react";

const WithSuspense = (Component) => {
    return (props) => {
        return (
            <Suspense fallback={null}>
                <Component {...props}/>
            </Suspense>
        )
    }
}

export default WithSuspense;