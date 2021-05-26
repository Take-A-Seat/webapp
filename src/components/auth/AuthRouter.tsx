import React, {lazy} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE,} from "../../router/clientRoutes";
import {isAuthenticated} from "../../services/auth";

const AuthRouter = () => {
    if (!isAuthenticated()) {
        return (
            <Switch>
                <Route
                    component={lazy(() => import("./login/Login"))}
                    exact
                    path={LOGIN_ROUTE}
                />
                <Route
                    component={lazy(() => import("./register/RegisterComponent"))}
                    exact
                    path={REGISTER_ROUTE}
                />
            </Switch>
        );
    } else {
        return <Redirect to={"/dashboard"}/>;
    }
};

export default AuthRouter;
