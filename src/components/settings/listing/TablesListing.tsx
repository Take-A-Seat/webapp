import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import {Circle, PageWrapper} from "../../globals/GlobalStyles";
import {useSettingsDispatch, useSettingsState} from "../SettingsContext";
import {deleteTable, getAreaById, getTablesByAreaId, updateTable} from "../SettingsActions";
import {HeaderTables} from "../Headers/HeaderTables";
import {Table, TableBody, TableColumn, TableHead, TableRow, TableText} from "../../globals/TableStyles";
import _ from "lodash";
import {DropdownElement} from "../../globals/dropdown/Dropdown";
import ContextualMenu from "../../globals/dropdown/ContextualMenu";
import {TableForm, TablesFormValues} from "../form/TablesForm";
import Popup from "../../globals/popup/Popup";

export type MatchParams = {
    areaId: string;
};

interface TablesListingProps extends RouteComponentProps<MatchParams> {

}

const TablesListing = ({match}: TablesListingProps) => {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {listTables, restaurant} = settingsState;
    const [initialValues, setInitialValues] = useState({} as TablesFormValues);
    const [showPopup, setPreview] = useState(false);
    let history = useHistory();
    useEffect(() => {
        getTablesByAreaId({dispatch: dispatch, areaId: match.params.areaId, restaurantId: restaurant.id})
        getAreaById({dispatch: dispatch, areaId: match.params.areaId, restaurantId: restaurant.id})
    }, [])

    const optionPeopleNumber: { label: string; value: number }[] = [];
    for (let index = 1; index <= 50; index++) {
        optionPeopleNumber.push({label: `${index}`, value: index})
    }
    return <PageWrapper noPadding centerPage>
        <HeaderTables optionPeopleNumber={optionPeopleNumber} listTables={listTables} restaurantId={restaurant.id}
                      areaId={match.params.areaId}/>
        <Table customWidth={"68%"}>
            <TableHead>
                <TableRow>
                    <TableColumn small>
                        <TableText thead>
                            Table number
                        </TableText>
                    </TableColumn>

                    <TableColumn customFlex={".1"}>
                        <TableText thead>
                            Min.
                        </TableText>
                    </TableColumn>

                    <TableColumn customFlex={".1"}>
                        <TableText thead>
                            Max.
                        </TableText>
                    </TableColumn>
                    <TableColumn>
                        <TableText thead>
                            Available online
                        </TableText>
                    </TableColumn>
                    <TableColumn>
                        <TableText thead>
                            Table group
                        </TableText>
                    </TableColumn>
                    <TableColumn midSmall/>
                </TableRow>
            </TableHead>
            <TableBody noBackground>
                {listTables && !_.isEmpty(listTables) && listTables.map((table: TablesFormValues, index: number) => {
                    const lastElementId = `tableListing-elem:${index}`;
                    const dropdownElements: DropdownElement[] = [{
                        text: "Edit name",
                        icon: "edit",
                        onClick: () => {
                            setInitialValues(Object.assign({}, table));
                            setPreview(true)
                        }
                    }, {
                        text: "Remove table",
                        icon: "remove",
                        onClick: () => {
                            deleteTable({
                                dispatch: dispatch,
                                areaId: match.params.areaId,
                                restaurantId: restaurant.id,
                                tableId: table.id,
                                callBack: () => {
                                    getTablesByAreaId({
                                        dispatch: dispatch,
                                        areaId: match.params.areaId,
                                        restaurantId: restaurant.id
                                    })
                                }
                            })
                        }
                    }];
                    return (<TableRow key={table.id} withMargin withBorderRadius tableBody>
                        <TableColumn small>
                            <TableText thead whiteTextBold>
                                {table.number}
                            </TableText>
                        </TableColumn>

                        <TableColumn customFlex={".1"}>
                            <TableText thead>
                                {table.minPeople}
                            </TableText>
                        </TableColumn>

                        <TableColumn customFlex={".1"}>
                            <TableText thead>
                                {table.maxPeople}
                            </TableText>
                        </TableColumn>

                        <TableColumn>
                            <TableText thead>
                                {table.availableOnline ? <Circle green/> : <Circle red/>}
                            </TableText>
                        </TableColumn>
                        <TableColumn>
                            <TableText thead>

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
            show={showPopup}
            iconTitle={"add_location_alt"}
            popupDetails={{title: "Add table"}}
            onClose={() => setPreview(false)}
        >
            <TableForm
                onSubmit={(values) => {
                    console.log(values)
                    updateTable({
                        dispatch: dispatch,
                        values: values,
                        restaurantId: restaurant.id,
                        areaId: match.params.areaId,
                        tableId: values.id,
                        callBack: () => {
                            getTablesByAreaId({
                                dispatch: dispatch,
                                areaId: match.params.areaId,
                                restaurantId: restaurant.id
                            })
                            setPreview(false)
                        }
                    })
                }}
                cancel={() => {
                    setPreview(false)
                }}
                initialValues={initialValues}
                optionsNumberPeople={optionPeopleNumber}
            />
        </Popup>
    </PageWrapper>

}

export default withRouter(TablesListing)