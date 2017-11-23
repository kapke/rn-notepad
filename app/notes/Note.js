import { sha256 } from 'hash.js'
import * as R from 'ramda'
import { Maybe } from 'monet'

const emptyNote = { id: '', title: '', location: Maybe.None() }
export function Note(data) {
    return Object.assign({}, emptyNote, data)
}

export const id = R.lensPath(['id'])
export const location = R.lensPath(['location'])
export const title = R.lensPath(['title'])

export const newId = note =>
    sha256()
        .update(R.view(title, note) + JSON.stringify(R.view(location, note)))
        .digest('hex')

export const withNewId = note => R.set(id, newId(note), note)

export const hasLocation = note => R.view(location, note).isJust()
