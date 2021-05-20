import React, {useState} from "react";
import {HeaderWrapper} from "../../globals/header/style";
import {AreaForm, AreaFormValuesTypes} from "../form/AreaForm";
import {addArea, getAreasByRestaurantId} from "../SettingsActions";
import {useSettingsDispatch} from "../SettingsContext";
import {Button} from "../../globals/GlobalStyles";
import Popup from "../../globals/popup/Popup";
import MaterialIcon from "../../globals/MaterialIcons";

export const HeaderTables = ({restaurant, listAreas}: { restaurant: any, listAreas: any },) => {
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useSettingsDispatch();
    let initialValues: AreaFormValuesTypes = {
        name: "",
        id: "",
        displayName: "",
        onlineCapacity: 0,
        priority: listAreas && listAreas.length || 0,
        restaurantId: restaurant.id
    }

    const onSubmitCreateArea = (values: AreaFormValuesTypes) => {
        values.displayName = values.name;
        addArea({
            dispatch: dispatch, values: values, callBack: () => {
                setShowPopup(false)
                getAreasByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})

            }
        })
    }

    return <HeaderWrapper>
        <Button onClick={() => {
            initialValues = {
                name: "",
                id: "",
                displayName: "",
                onlineCapacity: 0,
                priority: listAreas && listAreas.length || 0,
                restaurantId: restaurant.id
            }
            setShowPopup(!showPopup)
        }} blueButton noBorder circle><MaterialIcon iconName={"add"}/></Button>


        <Popup
            show={showPopup}
            iconTitle={"home"}
            popupDetails={{title: "Add area"}}
            onClose={() => setShowPopup(false)}
        >
            <AreaForm withDisplayName={false} initialValues={initialValues} onSubmit={(values: AreaFormValuesTypes) => {
                onSubmitCreateArea(values)
            }} cancel={() => setShowPopup(false)}/>
        </Popup>


    </HeaderWrapper>
}