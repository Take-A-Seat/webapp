import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from "../helpers/PrivateRoute";
import {AUTH_ROUTE} from "./clientRoutes";

const AuthRouter = lazy(() => import('../components/auth/AuthRouter'));
const HomeRouter = lazy(() => import("../components/home/HomeRouter"));

const AppRouter = () => {

    return (
        <Suspense fallback={<div/>}>
            <Switch>
                <Route
                    component={AuthRouter}
                    path={AUTH_ROUTE}
                />
                <PrivateRoute
                    component={HomeRouter}
                    exact={false}
                    path={'/'}
                />
            </Switch>
        </Suspense>
    )
};

export default AppRouter
