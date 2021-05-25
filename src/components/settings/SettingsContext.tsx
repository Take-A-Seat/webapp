import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";
import {
    ADD_FILE,
    CHECK_MANAGER_RESTAURANT,
    CHECK_MANAGER_RESTAURANT_FAIL,
    CHECK_MANAGER_RESTAURANT_FAIL_SHOULD_CREATE_RESTAURANT,
    CHECK_MANAGER_RESTAURANT_SUCCESS,
    CREATE_TABLE,
    CREATE_TABLE_FAIL,
    GET_AREA_BY_ID,
    GET_AREA_BY_ID_FAIL,
    GET_AREA_BY_ID_SUCCESS,
    GET_AREAS_BY_RESTAURANT_ID,
    GET_AREAS_BY_RESTAURANT_ID_FAIL,
    GET_AREAS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_BY_RESTAURANT_ID,
    GET_MENU_BY_RESTAURANT_ID_FAIL,
    GET_MENU_BY_RESTAURANT_ID_SUCCESS,
    GET_TABLES_BY_AREA_ID,
    GET_TABLES_BY_AREA_ID_FAIL,
    GET_TABLES_BY_AREA_ID_SUCCESS,
    REMOVE_FILE, SET_MARK
} from "./SettingsActions";

type State = {
    loading: boolean,
    error: any,
    restaurant: any,
    listAreas: any,
    listTables: any,
    file: any,
    selectedArea: any,
    menu: any,
    shouldCreateRestaurant: boolean,
    mark:any,
}

const SettingsStateContext = createContext<State | undefined>(undefined)
const SettingsDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    loading: false,
    error: {},
    restaurant: {},
    listAreas: [],
    listTables: [],
    selectedArea: {},
    file: "",
    menu: {},
    shouldCreateRestaurant: false,
    mark:{}
}

const restaurantReducer = (state: State, action: Action) => {
    switch (action.type) {
        case SET_MARK:{
            return {
                ...state,
                mark:action.payload
            }
        }
        case GET_MENU_BY_RESTAURANT_ID: {
            return {
                ...state,
                menu: {},
                loading: true,
                error: ""
            }
        }
        case GET_MENU_BY_RESTAURANT_ID_SUCCESS: {
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: ""
            }
        }
        case GET_MENU_BY_RESTAURANT_ID_FAIL: {
            return {
                ...state,
                loading: false,
                menu:[],
                error: action.payload.error
            }
        }
        case GET_AREA_BY_ID: {
            return {
                ...state,
                selectedArea: {},
                loading: true,
                error: ""
            }
        }
        case GET_AREA_BY_ID_SUCCESS: {
            return {
                ...state,
                selectedArea: action.payload,
                loading: false,
                error: ""
            }
        }
        case GET_AREA_BY_ID_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                selectedArea: {}
            }
        }
        case CREATE_TABLE: {
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case CREATE_TABLE_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case GET_TABLES_BY_AREA_ID: {
            return {
                ...state,
                loading: true,
                error: "",
                listTables: []
            }
        }
        case GET_TABLES_BY_AREA_ID_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: "",
                listTables: action.payload
            }
        }
        case GET_TABLES_BY_AREA_ID_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }
        case GET_AREAS_BY_RESTAURANT_ID: {
            return {
                ...state,
                loading: true,
                error: ""
            }
        }
        case GET_AREAS_BY_RESTAURANT_ID_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: "",
                listAreas: action.payload
            }
        }
        case GET_AREAS_BY_RESTAURANT_ID_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case ADD_FILE: {
            return {
                ...state,
                file: action.payload
            }
        }
        case REMOVE_FILE: {
            return {
                ...state,
                file: {}
            }
        }
        case CHECK_MANAGER_RESTAURANT: {
            return {
                ...state,
                loading: true,
                shouldCreateRestaurant: false,
                restaurant: {}
            }
        }
        case CHECK_MANAGER_RESTAURANT_SUCCESS: {
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                shouldCreateRestaurant: false,
                restaurant: action.payload,
                mark: {lat:action.payload.lat,lng:action.payload.lng}
            }
        }
        case CHECK_MANAGER_RESTAURANT_FAIL: {
            return {
                ...state,
                loading: false,
                shouldCreateRestaurant: false,
                error: action.payload,
                restaurant: {}
            }
        }
        case CHECK_MANAGER_RESTAURANT_FAIL_SHOULD_CREATE_RESTAURANT: {
            return {
                ...state,
                loading: false,
                shouldCreateRestaurant: true,
                restaurant: {}
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

const SettingsProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(restaurantReducer, initialState)
    return (
        <SettingsStateContext.Provider value={state}>
            <SettingsDispatchContext.Provider value={dispatch}>
                {children}
            </SettingsDispatchContext.Provider>
        </SettingsStateContext.Provider>
    )
}

const useSettingsState = () => {
    const context = useContext(SettingsStateContext);
    if (context === undefined) {
        throw new Error("useSettingsState must be used within a SettingsProvider")
    }
    return context;
}

const useSettingsDispatch = () => {
    const context = useContext(SettingsDispatchContext);

    if (context === undefined) {
        throw new Error("useSettingsState must be used within a SettingsProvider")
    }
    return context;
}

export {SettingsProvider, useSettingsDispatch, useSettingsState}