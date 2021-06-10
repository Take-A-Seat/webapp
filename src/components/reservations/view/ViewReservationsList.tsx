import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {useReservationsDispatch, useReservationsState} from "../ReservationsContext";
import {useSettingsState} from "../../settings/SettingsContext";
import {
    getAvailableTables,
    getOptionDateTimeByDate,
    getReservationById,
    getReservationsList,
    updateStatusReservation
} from "../ReservationsActions";
import moment from "moment";
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


const ViewReservationsList = () => {
    const dispatch = useReservationsDispatch();
    const reservationState = useReservationsState();
    const settingsState = useSettingsState();
    const {restaurant} = settingsState;
    const {
        listReservations,
        loading,
        error,
        loadingListReservation,
        optionsDate,
        listAreasWithAvailableTables,
        selectedReservation
    } = reservationState;
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
    const [selectedFilter, setFilter] = useState("All")
    let [acceptReservation, setAcceptReservationPopup] = useState(false)
    let [declinedReservation, setDeclinedReservationPopup] = useState(false)
    let [arrivedReservation, setArrivedReservationPopup] = useState(false)
    let [finishReservation, setFinishReservationPopup] = useState(false)
    let [selectedReservationId, setSelectedReservationId] = useState("")

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
    let initialValuesFinish = {
        ...selectedReservation,
        status: "Finished"
    }

    return (
        <PageWrapper noPadding centerPage>
            <HeaderReservations initialValues={initialValuesHeader} date={selectedDate} filter={selectedFilter}
                                setFilter={(value) => setFilter(value)}
                                setDate={(value) => setSelectedDate(value)}/>
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
                                Party size
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
                                Status
                            </TableText>
                        </TableColumn>

                        <TableColumn midSmall/>
                    </TableRow>
                </TableHead>
                <TableBody noBackground>
                    {listReservations && !_.isEmpty(listReservations) && listReservations.map((reservation, index) => {
                        const lastElementId = `reservationListing-elem:${reservation.id}`;
                        const dropDownElements: DropdownElement[] = [{
                            text: "Edit Reservation", icon: "edit", onClick: () => {
                                setSelectedReservationId(reservation.id)
                            }
                        }]
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
                                text: "Finish Reservation", icon: "check_circle_outline", onClick: () => {
                                    setSelectedReservationId(reservation.id)
                                    setFinishReservationPopup(true)
                                }
                            })
                        }

                        let startReservationString = optionsDate.find(date => date.dateTime == reservation.startReservationDate)
                        let endReservationString = optionsDate.find(date => date.dateTime == reservation.endReservationDate)
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
                                <TableText thead statusReservation
                                           pending={reservation.status == "Pending"}
                                           waitClient={reservation.status == "Wait Client"}
                                           active={reservation.status == "Active"}
                                           finished={reservation.status == "Finished"}
                                           declined={reservation.status == "Declined"}>
                                    {reservation.status}
                                </TableText>
                            </TableColumn>
                            '
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
                                getReservationsList({
                                    dispatch: dispatch,
                                    date: selectedDate,
                                    filter: selectedFilter,
                                    restaurantId: values.restaurantId
                                })
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
                                getReservationsList({
                                    dispatch: dispatch,
                                    date: selectedDate,
                                    filter: selectedFilter,
                                    restaurantId: values.restaurantId
                                })
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
                                getReservationsList({
                                    dispatch: dispatch,
                                    date: selectedDate,
                                    filter: selectedFilter,
                                    restaurantId: values.restaurantId
                                })
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
                                getReservationsList({
                                    dispatch: dispatch,
                                    date: selectedDate,
                                    filter: selectedFilter,
                                    restaurantId: values.restaurantId
                                })
                                setFinishReservationPopup(false)
                            }
                        })
                    }} initialValues={initialValuesFinish}/>
            </Popup>
        </PageWrapper>
    )

}
export default withRouter(ViewReservationsList)