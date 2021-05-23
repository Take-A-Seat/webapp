import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {PageWrapper} from "../../../globals/GlobalStyles";
import {useSettingsDispatch, useSettingsState} from "../../SettingsContext";
import {getMenuByRestaurantId} from "../../SettingsActions";
import {MenuForm} from "../form/MenuForm";


const MenuView = () => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {restaurant, menu} = settingsState;

    useEffect(() => {
        if (restaurant.id != undefined) {
            getMenuByRestaurantId({restaurantId: restaurant.id, dispatch: dispatch})
        }
    }, [restaurant])
    return <PageWrapper noPadding centerPage>
        <MenuForm initialValues={menu} onSubmit={(values) => {
            console.log(values)
        }}/>
    </PageWrapper>
}

export default withRouter(MenuView)