import { Record } from 'immutable'
import { sha256 } from 'hash.js'
import * as R from 'ramda'

export const Note = Record({
    id: '',
    title: '',
})

export const newId = note =>
    sha256()
        .update(note.title)
        .digest('hex')

export const title = R.lens(R.prop('title'), (newTitle, note) =>
    note.set('title', newTitle),
)

export const id = R.lens(R.prop('id'), (newId, note) => note.set('id', newId))

export const withNewId = note => R.set(id, newId(note), note)
