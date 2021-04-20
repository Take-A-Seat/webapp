import React from 'react'

type Action = {
    type: string,
    payload: any,
}
type Dispatch = (action: Action) => void
type ReactChildrenType = { children: React.ReactNode }

export type {Action, Dispatch, ReactChildrenType}
