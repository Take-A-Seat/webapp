import React, {lazy, Suspense, useEffect} from 'react'
import {Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";
import {useSettingsDispatch, useSettingsState} from "./SettingsContext";
import {useLoginState} from "../auth/AuthContext";
import _ from "lodash";
import {checkIfManagerHasRestaurant} from "./SettingsActions";
import HeaderSettings from "./Headers/HeaderSettings";

const CreateRestaurant = lazy(() => import("./add/CreateRestaurant"))
const EditRestaurant = lazy(() => import("./edit/EditRestaurant"))
const AreaListing = lazy(() => import("./listing/AreaListing"))
const TablesListing = lazy(() => import("./listing/TablesListing"))
const MenuView = lazy(() => import("./menu/view/MenuView"))
const SettingsRouter = () => {
    const settingsState = useSettingsState();
    const {shouldCreateRestaurant} = settingsState;

    if (shouldCreateRestaurant) {
        return <Suspense fallback={<div/>}>
            <CreateRestaurant/>
        </Suspense>
    } else
        return (
            <Suspense fallback={<div/>}>
                <HeaderSettings/>
                <Switch>
                    <PrivateRoute component={EditRestaurant} path={"/settings/restaurant"} exact/>
                    <PrivateRoute component={AreaListing} path={"/settings/tables/plan"} exact/>
                    <PrivateRoute component={MenuView} path={"/settings/menu"} exact/>
                    <PrivateRoute component={TablesListing} path={"/settings/tables/area/:areaId/tables"}  exact={false}/>

                </Switch>
            </Suspense>
        )
}
export default withRouter(SettingsRouter)