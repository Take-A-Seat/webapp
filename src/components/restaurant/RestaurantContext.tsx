import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";
import {
    ADD_FILE,
    CHECK_MANAGER_RESTAURANT,
    CHECK_MANAGER_RESTAURANT_FAIL,
    CHECK_MANAGER_RESTAURANT_FAIL_SHOULD_CREATE_RESTAURANT,
    CHECK_MANAGER_RESTAURANT_SUCCESS,
    REMOVE_FILE
} from "./RestaurantActions";

type State = {
    loading: boolean,
    error: any,
    restaurant: any,
    file: any,
    shouldCreateRestaurant: boolean,
}

const RestaurantStateContext = createContext<State | undefined>(undefined)
const RestaurantDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    loading: false,
    error: {},
    restaurant: {},
    file: "",
    shouldCreateRestaurant: false,
}

const restaurantReducer = (state: State, action: Action) => {
    switch (action.type) {
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
                restaurant: action.payload
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

const RestaurantProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(restaurantReducer, initialState)
    return (
        <RestaurantStateContext.Provider value={state}>
            <RestaurantDispatchContext.Provider value={dispatch}>
                {children}
            </RestaurantDispatchContext.Provider>
        </RestaurantStateContext.Provider>
    )
}

const useRestaurantState = () => {
    const context = useContext(RestaurantStateContext);
    if (context === undefined) {
        throw new Error("useRestaurantState must be used within a RestaurantProvider")
    }
    return context;
}

const useRestaurantDispatch = () => {
    const context = useContext(RestaurantDispatchContext);

    if (context === undefined) {
        throw new Error("useRestaurantState must be used within a RestaurantProvider")
    }
    return context;
}

export {RestaurantProvider, useRestaurantDispatch, useRestaurantState}