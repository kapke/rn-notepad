import { sha256 } from 'hash.js'
import * as R from 'ramda'

const emptyNote = { id: '', title: '' }
export function Note(data) {
    return Object.assign({}, emptyNote, data)
}

export const newId = note =>
    sha256()
        .update(note.title)
        .digest('hex')

export const title = R.lens(R.prop('title'), R.assoc('title'))

export const id = R.lens(R.prop('id'), R.assoc('id'))

export const withNewId = note => R.set(id, newId(note), note)
