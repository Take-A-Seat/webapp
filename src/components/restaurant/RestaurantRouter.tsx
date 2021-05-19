import React, {lazy, useEffect,Suspense} from 'react'
import {Redirect, Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";
import {useRestaurantDispatch, useRestaurantState} from "./RestaurantContext";
import {useLoginState} from "../auth/AuthContext";
import _ from "lodash";
import {checkIfManagerHasRestaurant} from "./RestaurantActions";

const CreateRestaurant = lazy(() => import("../restaurant/add/CreateRestaurant"))
const EditRestaurant = lazy(() => import("../restaurant/edit/EditRestaurant"))
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
        return <Suspense fallback={<div/>}>
            <CreateRestaurant/>
        </Suspense>
    } else
        return (
            <Suspense fallback={<div/>}>

                <Switch>
                    <PrivateRoute component={EditRestaurant} path={"/settings/restaurant"} exact/>
                </Switch>
            </Suspense>
        )
}
export default withRouter(RestaurantRouter)