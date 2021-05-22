import React, {useState} from "react";
import {HeaderWrapper} from "../../globals/header/style";
import {createTable, getTablesByAreaId} from "../SettingsActions";
import {useSettingsDispatch, useSettingsState} from "../SettingsContext";
import {Button} from "../../globals/GlobalStyles";
import Popup from "../../globals/popup/Popup";
import MaterialIcon from "../../globals/MaterialIcons";
import {BackContainer, SectionTableSettings, TextTitleHeader, TitleHeader} from "./style";
import {TableForm, TablesFormValues} from "../form/TablesForm";
import {useHistory} from "react-router-dom";

export const HeaderTables = ({
                                 restaurantId,
                                 listTables,
                                 areaId,
                                 optionPeopleNumber
                             }: { restaurantId: string, listTables: any, areaId: string, optionPeopleNumber: { label: string; value: number }[] }) => {
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {selectedArea} = settingsState;
    let history = useHistory();
    let initialValues: TablesFormValues = {
        id: "",
        tableGroupId: "",
        areaId: areaId,
        number: listTables && listTables.length + 1 || 1,
        priority: listTables && listTables.length+1 || 1,
        availableOnline: false,
        minPeople: 1,
        maxPeople: 1,
    }

    const onSubmit = (values: TablesFormValues) => {
        createTable({
            dispatch: dispatch,
            restaurantId: restaurantId,
            areaId: areaId,
            values: values,
            callBack: () => {
                getTablesByAreaId({dispatch: dispatch, areaId: areaId, restaurantId: restaurantId})
                setShowPopup(false)
            }

        })

    }


    return <HeaderWrapper table area>
        <SectionTableSettings>
            <TitleHeader>
                <BackContainer onClick={() => {
                    history.push("/settings/tables/plan")
                }}><MaterialIcon iconName={"arrow_back"}/></BackContainer>
                <TextTitleHeader noPadding>{selectedArea ? selectedArea.name : ""}</TextTitleHeader>
            </TitleHeader>
            <Button onClick={() => {
                initialValues = {
                    id: "",
                    tableGroupId: "",
                    areaId: areaId,
                    number: listTables && listTables.length || 0,
                    priority: listTables && listTables.length || 0,
                    availableOnline: false,
                    minPeople: 0,
                    maxPeople: 0,
                }
                setShowPopup(!showPopup)
            }} blueButton noBorder circle><MaterialIcon iconName={"add"}/></Button>
        </SectionTableSettings>

        <Popup
            show={showPopup}
            iconTitle={"add_location_alt"}
            popupDetails={{title: "Add table"}}
            onClose={() => setShowPopup(false)}
        >
            <TableForm
                onSubmit={(values) => {
                    onSubmit(values)
                }}
                cancel={() => {
                    setShowPopup(false)
                }}
                initialValues={initialValues}
                optionsNumberPeople={optionPeopleNumber}
            />
        </Popup>


    </HeaderWrapper>
}