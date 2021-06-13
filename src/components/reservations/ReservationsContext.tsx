import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";

import {useToasts} from "react-toast-notifications";
import {
    GET_AVAILABLE_TABLES,
    GET_AVAILABLE_TABLES_FAIL,
    GET_AVAILABLE_TABLES_SUCCESS,
    GET_OPTIONS_DATETIME,
    GET_OPTIONS_DATETIME_FAIL,
    GET_OPTIONS_DATETIME_SUCCESS,
    GET_RESERVATION_BY_ID,
    GET_RESERVATION_BY_ID_FAIL,
    GET_RESERVATION_BY_ID_SUCCESS,
    GET_RESERVATIONS_LIST,
    GET_RESERVATIONS_LIST_FAIL,
    GET_RESERVATIONS_LIST_SUCCESS,
    getAvailableTables,
    getReservationById,
    getReservationsList,
    SET_SELECTED_DAY,
    SET_SELECTED_FILTER,
    UPDATE_STATUS_RESERVATION,
    UPDATE_STATUS_RESERVATION_SUCCESS
} from "./ReservationsActions";
import moment from "moment";
import {API_WS_BOOKING} from "../../constants/globalConstants";

type State = {
    loading: boolean,
    loadingListReservation: boolean,
    error: any,
    listReservations: Reservation[];
    selectedReservation: Reservation;
    optionsDate: { timeString: string, dateTime: string }[];
    listAreasWithAvailableTables: AreaWithTables[];
    selectedDate: any;
    selectedFilter: string,
    recreateConnection: boolean,

}

export type AreaWithTables = {
    id: string,
    restaurantId: string,
    name: string,
    displayName: string,
    tables: { id: string, number: number, priority: number, availableOnline: string, availableNow: string, minPeople: string, maxPeople: string }[]
}

export type Reservation = {
    id: string,
    persons: number,
    startReservationDate: string,
    endReservationDate: string,
    restaurantId: string,
    phone: string,
    firstName: string,
    lastName: string,
    email: string,
    details: string,
    status: string,
    tableId: string[],
    messageToClient: string,
    code: string,
    products: any[],
    totalToPay: number,
    needAssistance:boolean,
}

const ReservationsStateContext = createContext<State | undefined>(undefined)
const ReservationsDispatchContext = createContext<Dispatch | undefined>(undefined)


const initialState: State = {
    recreateConnection: true,
    loading: false,
    loadingListReservation: false,
    error: {},
    selectedDate: moment().utc().format("YYYY-MM-DD"),
    selectedFilter: "All",
    listReservations: [],
    optionsDate: [],
    listAreasWithAvailableTables: [],
    selectedReservation: {
        endReservationDate: "",
        startReservationDate: "",
        code: "",
        details: "",
        email: "",
        id: "",
        firstName: "",
        lastName: "",
        messageToClient: "",
        status: "",
        persons: 0,
        phone: "",
        tableId: [],
        restaurantId: "",
        needAssistance:false,
        totalToPay: 0,
        products: []
    },
}


export const RECREATE_CONNECTION = "recreate_connection";
export const SUCCESS_RECREATE_CONNECTION = "success_recreate";

export const setupWebSocket=(channel: string, dispatch: Dispatch)=> {
    let socket = new WebSocket(`${API_WS_BOOKING}/${channel}`, ["Upgrade"]);
    socket.onopen = () => {
        dispatch({type: SUCCESS_RECREATE_CONNECTION, payload: {}})
        console.log("Successfully Connected");
    };


    socket.onclose = (event: any) => {
        console.log("Socket Closed Connection: ", event);
        socket.close();
        dispatch({type: RECREATE_CONNECTION, payload: {}})
    };

    socket.onerror = (error: any) => {
        console.log("Socket Error: ", error);
    };

    socket.onmessage = (e: { data: string; }) => {
        let json = JSON.parse(e.data)
        console.log(json)
        switch (json.type) {
            case GET_RESERVATIONS_LIST: {
                dispatch({type: UPDATE_LIST_RESERVATION, payload: {dispatch: dispatch, restaurantId: json.id}})
                break;
            }
            case GET_AVAILABLE_TABLES: {
                dispatch({type: UPDATE_AVAILABLE_TABLES, payload: {dispatch: dispatch}});
                break;
            }
            case UPDATE_BOOKING: {
                dispatch({type: UPDATE_BOOKING, payload: {dispatch: dispatch, id: json.id}})
            }
        }
    }

    return socket;
}

export const UPDATE_BOOKING = "update_booking";
export const UPDATE_LIST_RESERVATION = "update_list_reservation"
export const UPDATE_AVAILABLE_TABLES = "update_available_tables";


const reservationReducer = (state: State, action: Action) => {
    const {addToast} = useToasts();

    switch (action.type) {
        case UPDATE_BOOKING: {
            getReservationById({dispatch: action.payload.dispatch, reservationId: action.payload.id})
            return {
                ...state,
            }
        }
        case SUCCESS_RECREATE_CONNECTION: {
            return {
                ...state,
                recreateConnection: false,
            }
        }
        case RECREATE_CONNECTION: {
            return {
                ...state,
                recreateConnection: true,
            }
        }
        case UPDATE_AVAILABLE_TABLES: {
            getAvailableTables({
                dispatch: action.payload.dispatch,
                restaurantId: state.selectedReservation.restaurantId,
                endDate: state.selectedReservation.endReservationDate,
                startDate: state.selectedReservation.startReservationDate
            })
            return {
                ...state,
            }
        }
        case UPDATE_LIST_RESERVATION: {
            getReservationsList({
                dispatch: action.payload.dispatch,
                restaurantId: action.payload.restaurantId,
                date: state.selectedDate,
                filter: state.selectedFilter
            })

            return {
                ...state,
            }
        }
        case SET_SELECTED_FILTER: {
            return {
                ...state,
                selectedFilter: action.payload
            }
        }
        case SET_SELECTED_DAY: {
            return {
                ...state,
                selectedDate: action.payload
            }
        }
        case UPDATE_STATUS_RESERVATION: {
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case UPDATE_STATUS_RESERVATION_SUCCESS: {
            return {
                ...state,
                loading: false,

            }
        }
        case GET_AVAILABLE_TABLES: {
            return {
                ...state,
                loading: true,
                listAreasWithAvailableTables: [],
                error: ""
            }
        }
        case GET_AVAILABLE_TABLES_SUCCESS: {
            return {
                ...state,
                loading: false,
                listAreasWithAvailableTables: action.payload,
                error: ""
            }
        }
        case GET_AVAILABLE_TABLES_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                listAreasWithAvailableTables: [],
                loading: false
            }
        }
        case GET_OPTIONS_DATETIME: {
            return {
                ...state,
                error: "",
                loading: true,
                optionsDate: [],
            }
        }
        case GET_OPTIONS_DATETIME_SUCCESS: {
            return {
                ...state,
                error: "",
                loading: false,
                optionsDate: action.payload
            }
        }
        case GET_OPTIONS_DATETIME_FAIL: {
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                error: action.payload.error,
                loading: false,
                optionsDate: []
            }
        }
        case GET_RESERVATION_BY_ID: {
            return {
                ...state,
                error: "",
                selectedReservation: {},
                loading: true,
            }
        }
        case GET_RESERVATION_BY_ID_SUCCESS: {
            return {
                ...state,
                error: "",
                selectedReservation: action.payload,
                loading: false
            }
        }
        case GET_RESERVATION_BY_ID_FAIL: {
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        }
        case GET_RESERVATIONS_LIST: {
            return {
                ...state,
                loadingListReservation: true,
                error: "",
                listReservations: []
            }
        }
        case GET_RESERVATIONS_LIST_FAIL: {
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                loadingListReservation: false,
                error: action.payload.error
            }
        }
        case GET_RESERVATIONS_LIST_SUCCESS: {
            addToast('Get reservations', {appearance: 'info'});
            return {
                ...state,
                loadingListReservation: false,
                listReservations: action.payload
            }
        }
        default: {
            return {
                ...state,
                loading: false
            }
        }
    }
}

const ReservationsProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(reservationReducer, initialState)
    return (
        <ReservationsStateContext.Provider value={state}>
            <ReservationsDispatchContext.Provider value={dispatch}>
                {children}
            </ReservationsDispatchContext.Provider>
        </ReservationsStateContext.Provider>
    )
}

const useReservationsState = () => {
    const context = useContext(ReservationsStateContext);
    if (context === undefined) {
        throw new Error("useReservationsState must be used within aReservationsProvider")
    }
    return context;
}

const useReservationsDispatch = () => {
    const context = useContext(ReservationsDispatchContext);

    if (context === undefined) {
        throw new Error("useReservationsState must be used within aReservationsProvider")
    }
    return context;
}

export {ReservationsProvider, useReservationsDispatch, useReservationsState}