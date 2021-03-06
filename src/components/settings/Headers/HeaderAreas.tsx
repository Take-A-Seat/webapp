import React, {useState} from "react";
import {HeaderWrapper} from "../../globals/header/style";
import {AreaForm, AreaFormValuesTypes} from "../area/form/AreaForm";
import {addArea, getAreasByRestaurantId} from "../SettingsActions";
import {useSettingsDispatch} from "../SettingsContext";
import {Button} from "../../globals/GlobalStyles";
import Popup from "../../globals/popup/Popup";
import MaterialIcon from "../../globals/MaterialIcons";
import {SectionTableSettings, TextTitleHeader, TitleHeader} from "./style";

export const HeaderAreas = ({restaurant, listAreas}: { restaurant: any, listAreas: any },) => {
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useSettingsDispatch();
    let initialValues: AreaFormValuesTypes = {
        name: "",
        id: "",
        displayName: "",
        onlineCapacity: 0,
        priority: listAreas && listAreas.length || 0,
        restaurantId: restaurant.id,
        numberTables:0,
        capacity:"",
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

    return <HeaderWrapper area>
        <SectionTableSettings>
            <TitleHeader>
                <MaterialIcon iconName={"home"}/>
                <TextTitleHeader>Areas</TextTitleHeader>

            </TitleHeader>
            <Button onClick={() => {
                initialValues = {
                    name: "",
                    id: "",
                    displayName: "",
                    onlineCapacity: 0,
                    priority: listAreas && listAreas.length || 0,
                    restaurantId: restaurant.id,
                    capacity:"",
                    numberTables:0,
                }
                setShowPopup(!showPopup)
            }} blueButton noBorder circle><MaterialIcon iconName={"add"}/></Button>
        </SectionTableSettings>

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