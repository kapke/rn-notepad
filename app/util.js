import * as R from 'ramda'
import { tap } from 'rxjs/operators'

export const arrToObj = (key, arr) =>
    arr.reduce((acc, item) => R.assoc(key(item), item, acc), {})

export const log = (...args) => console.log(...args) //eslint-disable-line

export const taggedLog = tag => (...args) => log(tag, ...args) //eslint-disable-line fp/no-rest-parameters

export const tapLog = (tag = '') => data$ =>
    data$.pipe(
        tap(
            a => log(tag, 'next', a),
            a => log(tag, 'error', a),
            a => log(tag, 'complete', a),
        ),
    )
