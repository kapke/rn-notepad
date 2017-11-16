import { createStore, applyMiddleware } from 'redux'
import * as R from 'ramda'
import { createEpicMiddleware } from 'redux-observable'

export { Reducer } from './Reducer'
export { Action } from './Action'

export const Store = (reducer, epic) =>
    createStore(reducer, R.pipe(createEpicMiddleware, applyMiddleware)(epic))
