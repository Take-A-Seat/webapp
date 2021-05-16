import React, {lazy, Suspense, useEffect} from "react";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'

import {History} from 'history'
import Header from "../globals/header/Header";
import {useRestaurantDispatch, useRestaurantState} from "../restaurant/RestaurantContext";
import {checkIfManagerHasRestaurant} from "../restaurant/RestaurantActions";
import {useLoginState} from "../auth/AuthContext";
import {HomePageWrapper} from "./style";
import _ from "lodash";
import PrivateRoute from "../../helpers/PrivateRoute";

const RestaurantRouter = lazy(() => import("../restaurant/RestaurantRouter"))

const HomeRouter = ({history}: { history: History }) => {
        return (
            <Suspense fallback={<div/>}>
                <HomePageWrapper>
                    <Header/>
                    <Switch>
                        <Route component={RestaurantRouter} path={"/"}/>
                    </Switch>
                </HomePageWrapper>
            </Suspense>
        );
    }
;

export default withRouter(HomeRouter);
