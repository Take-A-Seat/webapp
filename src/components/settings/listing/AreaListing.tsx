import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {useSettingsDispatch, useSettingsState} from "../SettingsContext";
import {deleteArea, getAreasByRestaurantId, updateArea} from "../SettingsActions";
import {PageWrapper} from "../../globals/GlobalStyles";
import Popup from "../../globals/popup/Popup";
import {AreaForm, AreaFormValuesTypes} from "../form/AreaForm";
import {HeaderTables} from "../Headers/HeaderTables";
import _ from "lodash";
import {Table, TableBody, TableColumn, TableHead, TableRow, TableText, TextContainer} from "../../globals/TableStyles";
import {DropdownElement} from "../../globals/dropdown/Dropdown";
import ContextualMenu from "../../globals/dropdown/ContextualMenu";


const AreaListing = () => {
    const settingsState = useSettingsState();
    const dispatch = useSettingsDispatch();
    const {restaurant, loading, listAreas} = settingsState;
    let history = useHistory();
    let [editNamePreview, setPreviewEditName] = useState(false)
    let [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        if (restaurant.id != undefined) {
            getAreasByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
        }
    }, [restaurant])

    const editArea = (values: AreaFormValuesTypes) => {
        console.log(values)
        updateArea({
            dispatch: dispatch, values: values, callBack: () => {
                getAreasByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
                setPreviewEditName(false)
            }
        })
    }


    console.log("area", listAreas)
    return <PageWrapper noPadding centerPage>
        <HeaderTables restaurant={restaurant} listAreas={listAreas}/>
        <Table customWidth={"68%"}>
            <TableHead>
                <TableRow>
                    <TableColumn customWidth={"20%"}>
                        <TableText thead>
                            Name
                        </TableText>
                    </TableColumn>
                    <TableColumn>
                        <TableText thead>
                            Tables
                        </TableText>
                    </TableColumn>
                    <TableColumn>
                        <TableText thead>
                            Capacity
                        </TableText>
                    </TableColumn>
                    <TableColumn verySmall/>
                </TableRow>
            </TableHead>
            <TableBody noBackground>
                {listAreas && !_.isEmpty(listAreas) && listAreas.map((area: AreaFormValuesTypes, index: number) => {
                    const lastElementId = `areaListing-elem:${index}`;

                    const dropdownElements: DropdownElement[] = [{
                        text: "Edit name",
                        icon: "edit",
                        onClick: () => {
                            setInitialValues(area);
                            setPreviewEditName(true)
                        }
                    }, {
                        text: "Remove area",
                        icon: "remove",
                        onClick: () => {
                            deleteArea({
                                dispatch: dispatch, areaId: area.id, restaurantId: restaurant.id, callBack: () => {
                                    getAreasByRestaurantId({dispatch: dispatch, restaurantId: restaurant.id})
                                }
                            })
                        }
                    }];
                    return (<TableRow key={area.id} withMargin withBorderRadius tableBody onClick={(e: MouseEvent) => {
                        const target = e.target as HTMLDivElement
                        if (target.getAttribute("id") !== lastElementId) {
                            history.push(`/settings/tables/area/${area.id}`)
                        }
                    }}>

                        <TableColumn customWidth={"20%"}>
                            <TextContainer>
                                <TableText bold customFontSize={"15px"} noPadding noMargin whiteTextBold>
                                    {area.name}
                                </TableText>
                                <TableText noPadding noMargin thead>
                                    {area.displayName}
                                </TableText>
                            </TextContainer>
                        </TableColumn>
                        <TableColumn>
                            <TableText thead>
                                {0}
                            </TableText>
                        </TableColumn>
                        <TableColumn>
                            <TableText thead>
                                0
                            </TableText>
                        </TableColumn>

                        <TableColumn verySmall>
                            <ContextualMenu
                                icon={"more_vert"}
                                id={lastElementId}
                                dropdownElements={dropdownElements}
                                history={history}
                            />
                        </TableColumn>

                    </TableRow>)
                })}
            </TableBody>
        </Table>

        <Popup
            show={editNamePreview}
            iconTitle={"home"}
            popupDetails={{title: "Add area"}}
            onClose={() => setPreviewEditName(false)}
        >
            <AreaForm withDisplayName={true} initialValues={initialValues as AreaFormValuesTypes}
                      onSubmit={(values: AreaFormValuesTypes) => {
                          // onSubmitCreateArea(values)
                          editArea(values)
                      }} cancel={() => setPreviewEditName(false)}/>
        </Popup>

    </PageWrapper>
}

export default withRouter(AreaListing)