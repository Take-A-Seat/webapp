import React, {Suspense, useEffect} from "react";
import {Switch, withRouter} from 'react-router-dom'

import {History} from 'history'
import Header from "../globals/header/Header";
import {useRestaurantDispatch, useRestaurantState} from "../restaurant/RestaurantContext";
import {checkIfManagerHasRestaurant} from "../restaurant/RestaurantActions";
import {useLoginState} from "../auth/AuthContext";
import {HomePageWrapper} from "./style";
import _ from "lodash";

const HomeRouter = ({history}: { history: History }) => {
    const restaurantState = useRestaurantState();
    const restaurantDispatch = useRestaurantDispatch();
    const {shouldCreateRestaurant} = restaurantState;
    const logInState = useLoginState();
    const {loggedUser} = logInState;

    useEffect(() => {
        if (!_.isEmpty(loggedUser)) {
            checkIfManagerHasRestaurant({dispatch: restaurantDispatch, managerId: loggedUser.UserId})
        }
    }, [loggedUser])
    console.log("rest?", shouldCreateRestaurant)
    return (
        <Suspense fallback={<div/>}>
            <HomePageWrapper>
                <Header/>
                {shouldCreateRestaurant ? <div>"Tre sa adaugi restuarant"</div> : <Switch>

                </Switch>}
            </HomePageWrapper>
        </Suspense>
    );
};

export default withRouter(HomeRouter);
