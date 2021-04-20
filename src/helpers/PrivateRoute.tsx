import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../services/auth";

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = ({path, exact, component}) => {
    if (isAuthenticated()) {
        return <Route path={path} exact={exact} component={component}/>
    } else {
        return <Redirect to={'/auth/login'}/>
    }
};

export default PrivateRoute;