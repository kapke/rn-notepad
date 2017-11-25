import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import storage from 'redux-persist/es/storage'
import { persistCombineReducers, createTransform } from 'redux-persist'
import { createFilter } from 'redux-persist-transform-filter'
import * as R from 'ramda'

export { Reducer } from './Reducer'
export { Action } from './Action'
import { serializeNote, deserializeNote } from '../notes/serialization'

const noteTransform = createTransform(
    (state, key) =>
        key !== 'notes'
            ? state
            : {
                  notes: R.fromPairs(
                      R.toPairs(state.notes).map(([id, note]) => [
                          id,
                          serializeNote(note),
                      ]),
                  ),
              },
    (state, key) =>
        key !== 'notes'
            ? state
            : {
                  notes: R.fromPairs(
                      R.toPairs(state.notes).map(([id, note]) => [
                          id,
                          deserializeNote(note),
                      ]),
                  ),
              },
)

export const Store = (reducers, epic, services) => {
    const middleware = applyMiddleware(
        createEpicMiddleware(epic, { dependencies: services }),
    )

    const persistenceConfig = {
        key: 'notepad_data',
        storage,
        transforms: [createFilter('ui', []), noteTransform],
    }

    return createStore(
        persistCombineReducers(persistenceConfig, reducers),
        middleware,
    )
}
