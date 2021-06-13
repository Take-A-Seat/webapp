import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {setupWebSocket, useReservationsDispatch, useReservationsState} from "../ReservationsContext";
import {useSettingsDispatch, useSettingsState} from "../../settings/SettingsContext";
import {
    getAvailableTables,
    getOptionDateTimeByDate,
    getReservationById,
    getReservationsList,
    setSelectedDay,
    setSelectedFilter,
    updateAssistanceReservation,
    updateProductsReservation,
    updateStatusReservation
} from "../ReservationsActions";
import HeaderReservations from "../../settings/Headers/HeaderReservations";
import {PageWrapper} from "../../globals/GlobalStyles";
import {LoaderComponent} from "../../globals/Loading/Loader";
import {Table, TableBody, TableColumn, TableHead, TableRow, TableText} from "../../globals/TableStyles";
import _ from "lodash";
import {DropdownElement} from "../../globals/dropdown/Dropdown";
import ContextualMenu from "../../globals/dropdown/ContextualMenu";
import Popup from "../../globals/popup/Popup";
import {AcceptReservation} from "./AcceptReservation";
import {DeclineReservation} from "./DeclineReservation";
import {ArrivedReservation} from "./ArrivedReservation";
import {FinishReservation} from "./FinishReservation";
import ManageReservation from "./ManageReservation";
import {getMenuByRestaurantId} from "../../settings/SettingsActions";
import "./style.css"
import MaterialIcon from "../../globals/MaterialIcons";
import {AssistanceSign, ContainerSigns} from "./style";
import {Tooltip} from '@material-ui/core';


const ViewReservationsList = () => {
    const dispatch = useReservationsDispatch();
    const reservationState = useReservationsState();
    const {
        listReservations,
        loading,
        error,
        loadingListReservation,
        optionsDate,
        listAreasWithAvailableTables,
        selectedReservation,
        selectedDate,
        selectedFilter,
        recreateConnection
    } = reservationState;
    let [acceptReservation, setAcceptReservationPopup] = useState(false)
    let [declinedReservation, setDeclinedReservationPopup] = useState(false)
    let [arrivedReservation, setArrivedReservationPopup] = useState(false)
    let [finishReservation, setFinishReservationPopup] = useState(false)
    let [manageReservation, setManageReservationPopup] = useState(false)
    let [selectedReservationId, setSelectedReservationId] = useState("");
    const settingsDispatch = useSettingsDispatch();
    const {menu, restaurant} = useSettingsState();

    const autoReconnectDelay = 8000

    useEffect(() => {
            let wsRestaurant: WebSocket | undefined;
            let wsReservation: WebSocket | undefined;
            if (restaurant.id != undefined && recreateConnection) {
                wsRestaurant = setupWebSocket(restaurant.id, dispatch)
            }
            if (selectedReservation.id != "" && recreateConnection) {
                wsReservation = setupWebSocket(selectedReservation.id, dispatch)
            }

            return () => {
                setTimeout(() => {
                    if (wsRestaurant) {
                        wsRestaurant.close();
                    }
                }, autoReconnectDelay)
                setTimeout(() => {
                    if (wsReservation) {
                        wsReservation.close();
                    }
                }, autoReconnectDelay)
                console.log('unmounting...')
            }


        }, [restaurant, recreateConnection]
    )

    let history = useHistory();
    useEffect(() => {
        if (selectedReservationId != "") {
            getReservationById({dispatch: dispatch, reservationId: selectedReservationId})
        }

    }, [selectedReservationId])

    useEffect(() => {
        if (selectedReservation.id != undefined) {
            getAvailableTables({
                dispatch: dispatch,
                restaurantId: selectedReservation.restaurantId,
                endDate: selectedReservation.endReservationDate,
                startDate: selectedReservation.startReservationDate
            })
        }
    }, [selectedReservation])


    useEffect(() => {
        if (restaurant.id != undefined) {
            getReservationsList({
                dispatch: dispatch,
                restaurantId: restaurant.id,
                date: selectedDate,
                filter: selectedFilter
            })
        }
    }, [restaurant, selectedDate, selectedFilter])

    useEffect(() => {
        if (restaurant.id != undefined) {
            getOptionDateTimeByDate({dispatch: dispatch, date: selectedDate, reservationId: restaurant.id})
        }


    }, [selectedDate, restaurant])

    useEffect(() => {
        if (restaurant.id != undefined && menu) {
            getMenuByRestaurantId({dispatch: settingsDispatch, restaurantId: restaurant.id})
        }
    }, [restaurant])

    let initialValuesHeader = {
        date: selectedDate,
        filter: selectedFilter,
    }

    let initialValuesAccept = {
        ...selectedReservation,
        tableId: [],
        status: "Wait Client"
    }

    let initialValuesDeclined = {
        ...selectedReservation,
        status: "Declined"
    }

    let initialValuesArrived = {
        ...selectedReservation,
        status: "Active"
    }


    return (
        <PageWrapper noPadding centerPage>
            <HeaderReservations initialValues={initialValuesHeader} date={selectedDate} filter={selectedFilter}
                                setFilter={(value) => setSelectedFilter({value: value, dispatch: dispatch})}
                                setDate={(value) => setSelectedDay({dispatch: dispatch, value: value})}/>
            {!loadingListReservation ? <Table customWidth={"72%"}>
                <TableHead>
                    <TableRow>
                        <TableColumn>
                            <TableText thead>
                                Interval Hours
                            </TableText>
                        </TableColumn>

                        <TableColumn>
                            <TableText thead>
                                Persons
                            </TableText>
                        </TableColumn>

                        <TableColumn customWidth={"10%"}>
                            <TableText thead>
                                Name
                            </TableText>
                        </TableColumn>

                        <TableColumn>
                            <TableText thead>
                                Phone
                            </TableText>
                        </TableColumn>

                        <TableColumn>
                            <TableText thead>
                                Total to pay
                            </TableText>
                        </TableColumn>

                        <TableColumn>
                            <TableText thead>
                                Signs
                            </TableText>
                        </TableColumn>

                        <TableColumn>
                            <TableText thead>
                                Status
                            </TableText>
                        </TableColumn>

                        <TableColumn midSmall/>
                    </TableRow>
                </TableHead>
                <TableBody noBackground>
                    {listReservations && !_.isEmpty(listReservations) && listReservations.map((reservation, index) => {
                        const lastElementId = `reservationListing-elem:${reservation.id}`;
                        const dropDownElements: DropdownElement[] = [];
                        if (reservation.needAssistance) {
                            dropDownElements.push({
                                text: "Check solved assistance", icon: "done_all", onClick: () => {
                                    updateAssistanceReservation({
                                        dispatch: dispatch,
                                        reservationId: reservation.id,
                                        values: {...reservation, needAssistance: false},
                                        callBack: () => {
                                        }
                                    })
                                }
                            })
                        }
                        if (reservation.status == "Pending") {
                            dropDownElements.push({
                                text: "Accept Reservation", icon: "person_add_alt", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setAcceptReservationPopup(true)
                                }
                            }, {
                                text: "Decline Reservation", icon: "event_busy", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setDeclinedReservationPopup(true)
                                }
                            })
                        }
                        if (reservation.status == "Wait Client") {
                            dropDownElements.push({
                                text: "Arrived Client", icon: "deck", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setArrivedReservationPopup(true);
                                }
                            }, {
                                text: "Decline Reservation", icon: "event_busy", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setDeclinedReservationPopup(true)
                                }
                            })
                        }
                        if (reservation.status == "Active") {
                            dropDownElements.push({
                                text: "Manage Reservation", icon: "edit", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setManageReservationPopup(true)
                                }
                            })

                            dropDownElements.push({
                                text: "Finish Reservation", icon: "check_circle_outline", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setFinishReservationPopup(true)
                                }
                            })
                        }


                        let startReservationString = optionsDate.find(date => date.dateTime == reservation.startReservationDate)
                        let endReservationString = optionsDate.find(date => date.dateTime == reservation.endReservationDate)

                        let hasNewProduct = _.findIndex(reservation.products, (product) => product.status == "New")
                        let hasUndeliveredProduct = _.findIndex(reservation.products, (product) => product.status == "Read")

                        return (<TableRow key={index} withMargin withBorderRadius tableBody>
                            <TableColumn>
                                <TableText bold customFontSize={"15px"} noPadding noMargin whiteTextBold>
                                    {startReservationString != undefined ? startReservationString.timeString : ""} - {endReservationString != undefined ? endReservationString.timeString : ""}
                                </TableText>
                            </TableColumn>

                            <TableColumn>
                                <TableText thead>
                                    {reservation.persons}p
                                </TableText>
                            </TableColumn>

                            <TableColumn customWidth={"10%"}>
                                <TableText thead>
                                    {reservation.firstName} {reservation.lastName}
                                </TableText>
                            </TableColumn>

                            <TableColumn>
                                <TableText thead>
                                    {reservation.phone}
                                </TableText>
                            </TableColumn>

                            <TableColumn>
                                <TableText thead>
                                    {reservation.totalToPay}$
                                </TableText>
                            </TableColumn>

                            <TableColumn>
                                <TableText thead>
                                    <ContainerSigns>
                                        <Tooltip title="Need assistance" placement="left">
                                            <AssistanceSign red>{reservation.needAssistance &&
                                            <MaterialIcon iconName={"help_center"}/>}</AssistanceSign>
                                        </Tooltip>

                                        <Tooltip title="New products was added" placement="bottom">
                                            <AssistanceSign>{hasNewProduct != -1 &&
                                            <MaterialIcon iconName={"library_add"}/>}</AssistanceSign>
                                        </Tooltip>
                                        <Tooltip title="Has undelivered products" placement="right">
                                            <AssistanceSign>{hasUndeliveredProduct != -1 &&
                                            <MaterialIcon iconName={"production_quantity_limits"}/>}</AssistanceSign>
                                        </Tooltip>

                                    </ContainerSigns>
                                </TableText>
                            </TableColumn>


                            <TableColumn>
                                <TableText thead statusReservation
                                           pending={reservation.status == "Pending"}
                                           waitClient={reservation.status == "Wait Client"}
                                           active={reservation.status == "Active"}
                                           finished={reservation.status == "Finished"}
                                           declined={reservation.status == "Declined"}>
                                    {reservation.status}
                                </TableText>
                            </TableColumn>

                            <TableColumn verySmall>
                                <ContextualMenu
                                    icon={"more_vert"}
                                    id={lastElementId}
                                    dropdownElements={dropDownElements}
                                    history={history}
                                />
                            </TableColumn>
                        </TableRow>)
                    })}
                </TableBody>
            </Table> : <LoaderComponent/>}

            <Popup
                show={acceptReservation}
                iconTitle={"home"}
                popupDetails={{title: "Accept Reservation"}}
                onClose={() => setAcceptReservationPopup(false)}
            >
                <AcceptReservation
                    cancel={() => {
                        setAcceptReservationPopup(false)
                    }}
                    listAvailableTables={listAreasWithAvailableTables}
                    onSubmit={(values) => {
                        updateStatusReservation({
                            dispatch: dispatch,
                            reservationId: values.id,
                            values: values,
                            callBack: () => {
                                setAcceptReservationPopup(false)

                            }
                        })
                    }} initialValues={initialValuesAccept}/>
            </Popup>

            <Popup
                show={declinedReservation}
                iconTitle={"home"}
                popupDetails={{title: "Declined Reservation"}}
                onClose={() => setDeclinedReservationPopup(false)}
            >
                <DeclineReservation
                    cancel={() => {
                        setDeclinedReservationPopup(false)
                    }}
                    onSubmit={(values) => {
                        updateStatusReservation({
                            dispatch: dispatch,
                            reservationId: values.id,
                            values: values,
                            callBack: () => {
                                setDeclinedReservationPopup(false)
                            }
                        })
                    }} initialValues={initialValuesDeclined}/>
            </Popup>

            <Popup
                show={arrivedReservation}
                iconTitle={"home"}
                popupDetails={{title: "Arrived Client"}}
                onClose={() => setArrivedReservationPopup(false)}
            >
                <ArrivedReservation
                    cancel={() => {
                        setArrivedReservationPopup(false)
                    }}
                    onSubmit={(values) => {
                        updateStatusReservation({
                            dispatch: dispatch,
                            reservationId: values.id,
                            values: values,
                            callBack: () => {
                                setArrivedReservationPopup(false)
                            }
                        })
                    }} initialValues={initialValuesArrived}/>
            </Popup>

            <Popup
                show={finishReservation}
                iconTitle={"home"}
                popupDetails={{title: "Finish Reservation"}}
                onClose={() => setFinishReservationPopup(false)}
            >
                <FinishReservation
                    cancel={() => {
                        setFinishReservationPopup(false)
                    }}
                    onSubmit={(values) => {
                        updateStatusReservation({
                            dispatch: dispatch,
                            reservationId: values.id,
                            values: values,
                            callBack: () => {
                                setFinishReservationPopup(false)
                            }
                        })
                    }} initialValues={{
                    ...selectedReservation,
                    status: "Finished"
                }}/>
            </Popup>

            <Popup
                show={manageReservation}
                iconTitle={"home"}
                customMaxWidth={"80%"}
                customWidth={"80%"}
                popupDetails={{title: `Manage Reservation - Client ${selectedReservation.firstName} ${selectedReservation.lastName}`}}
                onClose={() => setManageReservationPopup(false)}
            >
                <ManageReservation
                    cancel={() => {
                        setManageReservationPopup(false)
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        updateProductsReservation({
                            dispatch: dispatch, reservationId: values.id, values, callBack: () => {
                                setManageReservationPopup(false);
                                getReservationById({dispatch: dispatch, reservationId: values.id})
                            }
                        })
                    }} initialValues={selectedReservation} menu={menu}/>
            </Popup>
        </PageWrapper>
    )

}
export default withRouter(ViewReservationsList)