import {Dispatch} from "../../constants/globalTypes";
import {authFetch} from "../../helpers/createAuthProvider";

export const GET_RESERVATIONS_LIST = "get_reservations_list";
export const GET_RESERVATIONS_LIST_SUCCESS = "get_reservations_list_success";
export const GET_RESERVATIONS_LIST_FAIL = "get_reservations_list_fail";
export const getReservationsList = ({
                                        dispatch,
                                        restaurantId,
                                        filter,
                                        date
                                    }: { dispatch: Dispatch, restaurantId: string, filter: string, date: string }) => {
    dispatch({
        type: GET_RESERVATIONS_LIST,
        payload: []
    });

    authFetch(`/bookings/restaurant/${restaurantId}/date/${date}/${filter}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_RESERVATIONS_LIST_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {

        dispatch({type: GET_RESERVATIONS_LIST_SUCCESS, payload: data})

    }).catch(error => {
        console.log("err", error)
    })
}

export const GET_RESERVATION_BY_ID = "get_reservation_by_id";
export const GET_RESERVATION_BY_ID_SUCCESS = "get_reservation_by_id_success";
export const GET_RESERVATION_BY_ID_FAIL = "get_reservation_by_id_fail";
export const getReservationById = ({
                                       dispatch,
                                       reservationId,
                                   }: { dispatch: Dispatch, reservationId: string }) => {
    dispatch({
        type: GET_RESERVATION_BY_ID,
        payload: []
    });

    authFetch(`/bookings/id/${reservationId}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_RESERVATION_BY_ID_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_RESERVATION_BY_ID_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}

export const GET_OPTIONS_DATETIME = "get_options_datetime";
export const GET_OPTIONS_DATETIME_SUCCESS = "get_options_datetime_success";
export const GET_OPTIONS_DATETIME_FAIL = "get_options_datetime_fail";
export const getOptionDateTimeByDate = ({
                                            dispatch,
                                            reservationId,
                                            date
                                        }: { dispatch: Dispatch, reservationId: string, date: string }) => {
    dispatch({
        type: GET_OPTIONS_DATETIME,
        payload: []
    });

    authFetch(`/bookings/restaurant/${reservationId}/dataInterval/date/${date}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_OPTIONS_DATETIME_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_OPTIONS_DATETIME_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}


export const GET_AVAILABLE_TABLES = "get_available_tables";
export const GET_AVAILABLE_TABLES_SUCCESS = "get_available_tables_success";
export const GET_AVAILABLE_TABLES_FAIL = "get_available_tables_fail";
export const getAvailableTables = ({
                                       dispatch,
                                       restaurantId,
                                       startDate,
                                       endDate
                                   }: { dispatch: Dispatch, restaurantId: string, startDate: string, endDate: string }) => {
    dispatch({
        type: GET_AVAILABLE_TABLES,
        payload: []
    });

    authFetch(`/bookings/restaurant/${restaurantId}/availableTables/${startDate}/${endDate}`, {method: "GET"}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: GET_AVAILABLE_TABLES_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        if (data) {
            dispatch({type: GET_AVAILABLE_TABLES_SUCCESS, payload: data})
        }
    }).catch(error => {
        console.log("err", error)
    })
}

export const UPDATE_STATUS_RESERVATION = "update_status_reservation";
export const UPDATE_STATUS_RESERVATION_SUCCESS = "update_status_reservation_success";
export const UPDATE_STATUS_RESERVATION_FAIL = "update_status_reservation_fail";

export const updateStatusReservation = ({
                                            dispatch,
                                            reservationId,
                                            values,
                                            callBack
                                        }: { dispatch: Dispatch, reservationId: string, values: any, callBack: () => void }) => {
    dispatch({
        type: UPDATE_STATUS_RESERVATION,
        payload: []
    });

    authFetch(`/bookings/id/${reservationId}/status`, {method: "PUT", body: JSON.stringify(values)}).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: UPDATE_STATUS_RESERVATION_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: UPDATE_STATUS_RESERVATION_SUCCESS, payload: data})
        if (callBack) {
            callBack()
        }
    }).catch(error => {
        console.log("err", error)
    })
}


export const UPDATE_PRODUCTS_RESERVATION = "update_products_reservation";
export const UPDATE_PRODUCTS_RESERVATION_SUCCESS = "update_products_reservation_success";
export const UPDATE_PRODUCTS_RESERVATION_FAIL = "update_products_reservation_fail";

export const updateProductsReservation = ({
                                              dispatch,
                                              reservationId,
                                              values,
                                              callBack
                                          }: { dispatch: Dispatch, reservationId: string, values: any, callBack: () => void }) => {
    dispatch({
        type: UPDATE_PRODUCTS_RESERVATION,
        payload: []
    });

    authFetch(`/bookings/id/${reservationId}/products`, {
        method: "PUT",
        body: JSON.stringify(values)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(error => {
                dispatch({type: UPDATE_PRODUCTS_RESERVATION_FAIL, payload: JSON.parse(error)})
            })
        }
        return response.json()
    }).then(data => {
        dispatch({type: UPDATE_PRODUCTS_RESERVATION_SUCCESS, payload: data})
        if (callBack) {
            callBack()
        }
    }).catch(error => {
        console.log("err", error)
    })
}

