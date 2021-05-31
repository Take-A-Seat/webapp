import React, {lazy, Suspense, useEffect} from "react";
import {Route, Switch, withRouter} from 'react-router-dom'

import {History} from 'history'
import Header from "../globals/header/Header";
import {HomePageWrapper} from "./style";
import {checkIfManagerHasRestaurant} from "../settings/SettingsActions";
import {useLoginState} from "../auth/AuthContext";
import {useSettingsDispatch, useSettingsState} from "../settings/SettingsContext";
import _ from "lodash";
import CreateRestaurant from "../settings/restaurant/add/CreateRestaurant";

const SettingsRouter = lazy(() => import("../settings/SettingsRouter"))

const HomeRouter = ({history}: { history: History }) => {
        const restaurantState = useSettingsState();
        const restaurantDispatch = useSettingsDispatch();
        const {shouldCreateRestaurant} = restaurantState;
        const logInState = useLoginState();
        const {loggedUser} = logInState;

        useEffect(() => {
            if (!_.isEmpty(loggedUser)) {
                checkIfManagerHasRestaurant({dispatch: restaurantDispatch, managerId: loggedUser.UserId})
            }
        }, [loggedUser])

        return (
            <Suspense fallback={<div/>}>
                <HomePageWrapper>
                    <Header/>
                    {shouldCreateRestaurant ? <CreateRestaurant/> : <Switch>
                        <Route component={SettingsRouter} path={"/settings"}/>
                    </Switch>}

                </HomePageWrapper>
            </Suspense>
        );
    }
;

export default withRouter(HomeRouter);
