import { Reducer } from '/store'

import { setStatusBarHeight } from './uiActions'

export const uiReducer = Reducer(
    {
        [setStatusBarHeight.type]: (state, action) => ({
            ...state,
            statusBarHeight: action.payload,
        }),
    },
    { statusBarHeight: 0 },
)
