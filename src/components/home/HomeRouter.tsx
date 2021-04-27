import React, {lazy, useEffect} from "react";
import PrivateRoute from "../../helpers/PrivateRoute";
import {Switch, withRouter} from 'react-router-dom'

import {History} from 'history'
import Header from "../globals/header/Header";

const HomeRouter = ({history}: { history: History }) => {

    return (
        <>
                <Header/>
                    <Switch>
                        {"home"}
                    </Switch>
        </>
    );
};

export default withRouter(HomeRouter);
