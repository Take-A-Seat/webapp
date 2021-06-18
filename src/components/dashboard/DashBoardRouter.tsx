import React, {lazy, Suspense} from "react";
import {Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../../helpers/PrivateRoute";

const ViewDashBoard = lazy(() => import("./view/ViewDashBoard"))

const DashBoardRouter = ()=>{
    return <Suspense fallback={<div/>}>
        <Switch>
            <PrivateRoute component={ViewDashBoard} path={"/"} exact={true} />
        </Switch>
    </Suspense>
}

export default withRouter(DashBoardRouter);