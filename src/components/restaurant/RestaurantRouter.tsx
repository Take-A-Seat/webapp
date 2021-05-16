import React, {lazy, useEffect} from 'react'
import {Redirect, Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";
import {useRestaurantDispatch, useRestaurantState} from "./RestaurantContext";
import {useLoginState} from "../auth/AuthContext";
import _ from "lodash";
import {checkIfManagerHasRestaurant} from "./RestaurantActions";

const CreateRestaurant = lazy(() => import("../restaurant/add/CreateRestaurant"))
const RestaurantRouter = () => {
    const restaurantState = useRestaurantState();
    const restaurantDispatch = useRestaurantDispatch();
    const {shouldCreateRestaurant} = restaurantState;
    const logInState = useLoginState();
    const {loggedUser} = logInState;
    useEffect(() => {
        if (!_.isEmpty(loggedUser) && loggedUser.UserId != undefined) {
            checkIfManagerHasRestaurant({dispatch: restaurantDispatch, managerId: loggedUser.UserId})
        }
    }, [loggedUser])
    if (shouldCreateRestaurant) {
        return <CreateRestaurant/>
    } else
        return (
            <Switch>
                <PrivateRoute component={CreateRestaurant} path={"/settings/restaurant"} exact/>
            </Switch>
        )
}
export default withRouter(RestaurantRouter)