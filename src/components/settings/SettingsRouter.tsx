import React, {lazy, Suspense} from 'react'
import {Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";
import {useSettingsState} from "./SettingsContext";
import HeaderSettings from "./Headers/HeaderSettings";

const CreateRestaurant = lazy(() => import("./restaurant/add/CreateRestaurant"))
const EditRestaurant = lazy(() => import("./restaurant/edit/EditRestaurant"))
const AreaListing = lazy(() => import("./area/listing/AreaListing"))
const TablesListing = lazy(() => import("./tables/listing/TablesListing"))
const MenuView = lazy(() => import("./menu/view/MenuView"))
const SpecificAndTypeView = lazy(() => import("./specific&type/view/Specific&TypeView"))
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
                    <PrivateRoute component={SpecificAndTypeView} path={"/settings/specific&type"} exact/>
                    <PrivateRoute component={TablesListing} path={"/settings/tables/area/:areaId/tables"}
                                  exact={false}/>

                </Switch>
            </Suspense>
        )
}
export default withRouter(SettingsRouter)