import React, {lazy, Suspense} from "react";
import {useSettingsState} from "../settings/SettingsContext";
import {Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";

const CreateRestaurant = lazy(() => import("../settings/restaurant/add/CreateRestaurant"))
const ViewReservationsList = lazy(() => import("./view/ViewReservationsList"))

const ReservationsRouter = () => {
    const settingsState = useSettingsState();
    const {shouldCreateRestaurant} = settingsState;

    if (shouldCreateRestaurant) {
        return <Suspense fallback={<div/>}>
            <CreateRestaurant/>
        </Suspense>
    } else {
        return (
            <Suspense fallback={<div/>}>
                <Switch>
                     <PrivateRoute component={ViewReservationsList} path={"/reservations"} exact={true} />
                </Switch>
            </Suspense>
        )
    }
}

export default withRouter(ReservationsRouter)