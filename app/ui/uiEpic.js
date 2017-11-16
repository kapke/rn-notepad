import { map } from 'rxjs/operators'

import { statusBarHeight$ } from './StatusBar'
import { setStatusBarHeight } from './uiActions'

export const uiEpic = () => statusBarHeight$().pipe(map(setStatusBarHeight))
