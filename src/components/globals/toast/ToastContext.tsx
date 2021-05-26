import React, {createContext, useContext, useReducer} from 'react';
import {Action, Dispatch, ReactChildrenType} from "../../../constants/globalTypes";


type State = {
    toastText: string,
    type: string;
    error: any,
}

const ToastStateContext = createContext<State | undefined>(undefined)
const ToastDispatchContext = createContext<Dispatch | undefined>(undefined)

const initialState: State = {
    error: {},
    type: "",
    toastText: "",

}

const toastReducer = (state: State, action: Action) => {
    switch (action.type) {

        default: {
            return {
                ...state
            }
        }
    }
}

const ToastProvider = ({children}: ReactChildrenType) => {
    const [state, dispatch] = useReducer(toastReducer, initialState)
    return (
        <ToastStateContext.Provider value={state}>
            <ToastDispatchContext.Provider value={dispatch}>
                {children}
            </ToastDispatchContext.Provider>
        </ToastStateContext.Provider>
    )
}

const useToastState = () => {
    const context = useContext(ToastStateContext);
    if (context === undefined) {
        throw new Error("useToastState must be used within ToastProvider")
    }
    return context;
}

const useToastDispatch = () => {
    const context = useContext(ToastDispatchContext);

    if (context === undefined) {
        throw new Error("useToastState must be used within ToastProvider")
    }
    return context;
}

export {ToastProvider, useToastDispatch, useToastState}