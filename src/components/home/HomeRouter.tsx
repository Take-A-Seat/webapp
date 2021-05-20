import React, {lazy, Suspense} from "react";
import {Route, Switch, withRouter} from 'react-router-dom'

import {History} from 'history'
import Header from "../globals/header/Header";
import {HomePageWrapper} from "./style";

const SettingsRouter = lazy(() => import("../settings/SettingsRouter"))

const HomeRouter = ({history}: { history: History }) => {
        return (
            <Suspense fallback={<div/>}>
                <HomePageWrapper>
                    <Header/>
                    <Switch>
                        <Route component={SettingsRouter} path={"/"}/>
                    </Switch>
                </HomePageWrapper>
            </Suspense>
        );
    }
;

export default withRouter(HomeRouter);
