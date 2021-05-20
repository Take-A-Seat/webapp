import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useSettingsDispatch, useSettingsState} from "../SettingsContext";
import {addArea, getAreasByRestaurantId} from "../SettingsActions";
import {Button, PageWrapper} from "../../globals/GlobalStyles";
import Popup from "../../globals/popup/Popup";
import {AreaForm, AreaFormValuesTypes} from "../form/AreaForm";
import {HeaderTables} from "../Headers/HeaderTables";
import _ from "lodash";


const AreaListing = () => {
    const settingsState = useSettingsState();
    const dispatch = useSettingsDispatch();
    const {restaurant, loading, listAreas} = settingsState;

    useEffect(() => {
        if (restaurant.id != undefined) {
            getAreasByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
        }
    }, [restaurant])


    console.log("area", listAreas)
    return <PageWrapper noPadding>
        <HeaderTables restaurant={restaurant} listAreas={listAreas}/>
        {listAreas&& !_.isEmpty(listAreas) && listAreas.map((area:AreaFormValuesTypes,index:number)=>{
            return <>
            {area.name} -- {area.displayName}
            </>
        })}
    </PageWrapper>
}

export default withRouter(AreaListing)