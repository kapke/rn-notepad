import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import storage from 'redux-persist/es/storage'
import { persistCombineReducers } from 'redux-persist'
import { createFilter } from 'redux-persist-transform-filter'

export { Reducer } from './Reducer'
export { Action } from './Action'

export const Store = (reducers, epic, services) => {
    const middleware = applyMiddleware(
        createEpicMiddleware(epic, { dependencies: services }),
    )

    const persistenceConfig = {
        key: 'notepad_data',
        storage,
        transforms: [
            createFilter('ui', []), //eslint-disable-line fp/no-nil
        ],
    }

    return createStore(
        persistCombineReducers(persistenceConfig, reducers),
        middleware,
    )
}
