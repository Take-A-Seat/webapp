import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../constants/globalTypes";
import {
    GET_LOGGED_USER, GET_LOGGED_USER_FAIL, GET_LOGGED_USER_SUCCESS,
    LOG_IN,
    LOG_IN_FAIL,
    LOG_IN_SUCCESS,
} from "./AuthActions";

type State = {
    loading: boolean,
    error: {
        message: string
    },
    isAuthenticated: boolean,
    loggedUser:{
        Email:string,
        UserId:string,
        firstName:string,
        lastName:string,
        role:string
    }
}

const LoginStateContext = createContext<State | undefined>(undefined);
const LoginDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = {
    loading: false,
    error: {
        message: ""
    },
    isAuthenticated: false,
    loggedUser:{
        Email:"",
        UserId:"",
        firstName:"",
        lastName:"",
        role:""
    }

};

const loginReducer = (state: State, action: Action) => {
    switch (action.type) {
        case GET_LOGGED_USER:{
            return {
                ...state,
                loading: true,
                loggedUser:action.payload
            }
        }
        case GET_LOGGED_USER_SUCCESS:{
            return {
                ...state,
                loading: false,
                loggedUser: action.payload
            }
        }
        case GET_LOGGED_USER_FAIL:{
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        }
        case LOG_IN: {
            return {
                ...state,
                loading: true
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                error: {message: ""}
            }
        }
        case LOG_IN_FAIL: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
};

const LoginProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    return (
        <LoginStateContext.Provider value={state}>
            <LoginDispatchContext.Provider value={dispatch}>
                {children}
            </LoginDispatchContext.Provider>
        </LoginStateContext.Provider>
    )
}

const useLoginState = () => {
    const context = useContext(LoginStateContext);
    if (context === undefined) {
        throw new Error('useLoginState must be used within a LoginProvider')
    }
    return context
};

const useLoginDispatch = () => {
    const context = useContext(LoginDispatchContext);
    if (context === undefined) {
        throw new Error('useLoginState must be used within a LoginProvider')
    }
    return context
};

export {LoginProvider, useLoginState, useLoginDispatch}
