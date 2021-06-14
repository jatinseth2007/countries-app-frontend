import {
    Route, Redirect
} from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem("csrfToken");
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}