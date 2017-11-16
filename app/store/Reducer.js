export const Reducer = (reducerObj, defaultState) => (
    state = defaultState,
    action,
) => (reducerObj[action.type] ? reducerObj[action.type](state, action) : state)
