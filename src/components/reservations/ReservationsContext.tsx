import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";

import {useToasts} from "react-toast-notifications";
import {
    GET_AVAILABLE_TABLES, GET_AVAILABLE_TABLES_FAIL, GET_AVAILABLE_TABLES_SUCCESS,
    GET_OPTIONS_DATETIME, GET_OPTIONS_DATETIME_FAIL, GET_OPTIONS_DATETIME_SUCCESS,
    GET_RESERVATION_BY_ID, GET_RESERVATION_BY_ID_FAIL, GET_RESERVATION_BY_ID_SUCCESS,
    GET_RESERVATIONS_LIST,
    GET_RESERVATIONS_LIST_FAIL,
    GET_RESERVATIONS_LIST_SUCCESS, UPDATE_STATUS_RESERVATION, UPDATE_STATUS_RESERVATION_SUCCESS
} from "./ReservationsActions";

type State = {
    loading: boolean,
    loadingListReservation: boolean,
    error: any,
    listReservations: Reservation[];
    selectedReservation: Reservation;
    optionsDate: { timeString: string, dateTime: string }[];
    listAreasWithAvailableTables: AreaWithTables[];
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
    products:any[],
    totalToPay:number,
}

const ReservationsStateContext = createContext<State | undefined>(undefined)
const ReservationsDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    loading: false,
    loadingListReservation:false,
    error: {},
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
        totalToPay:0,
        products:[]
    },

}

const reservationReducer = (state: State, action: Action) => {
    const {addToast} = useToasts();

    switch (action.type) {
        case UPDATE_STATUS_RESERVATION:{
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case UPDATE_STATUS_RESERVATION_SUCCESS:{
            return {
                ...state,
                loading: false,

            }
        }
        case GET_AVAILABLE_TABLES:{
            return {
                ...state,
                loading: true,
                listAreasWithAvailableTables:[],
                error: ""
            }
        }
        case GET_AVAILABLE_TABLES_SUCCESS:{
            return {
                ...state,
                loading: false,
                listAreasWithAvailableTables: action.payload,
                error: ""
            }
        }
        case GET_AVAILABLE_TABLES_FAIL:{
            return {
                ...state,
                error: action.payload.error,
                listAreasWithAvailableTables: [],
                loading: false
            }
        }
        case GET_OPTIONS_DATETIME:{
            return {
                ...state,
                error: "",
                loading: true,
                optionsDate:[],
            }
        }
        case GET_OPTIONS_DATETIME_SUCCESS:{
            return {
                ...state,
                error: "",
                loading: false,
                optionsDate: action.payload
            }
        }
        case GET_OPTIONS_DATETIME_FAIL:{
            addToast(action.payload.error, {appearance: 'error'});
            return {
                ...state,
                error: action.payload.error,
                loading: false,
                optionsDate: []
            }
        }
        case GET_RESERVATION_BY_ID:{
            return {
                ...state,
                error: "",
                selectedReservation:{},
                loading:true,
            }
        }
        case GET_RESERVATION_BY_ID_SUCCESS:{
            return {
                ...state,
                error: "",
                selectedReservation: action.payload,
                loading:false
            }
        }
        case GET_RESERVATION_BY_ID_FAIL:{
            addToast(action.payload.error, {appearance: 'error'});
            return{
                ...state,
                error: action.payload.error,
                loading:false
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