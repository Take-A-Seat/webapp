import React, {lazy, useEffect} from "react";
import PrivateRoute from "../../helpers/PrivateRoute";
import {Switch, withRouter} from 'react-router-dom'

import {History} from 'history'



const HomeRouter = ({history}: { history: History }) => {

    return (
        <>
            <div>
Am intrat si sunt auth cu token si tot
                <Switch>
                    {"home"}
                </Switch>

            </div>
        </>
    );
};

export default withRouter(HomeRouter);
