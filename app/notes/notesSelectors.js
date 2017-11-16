import { List } from 'immutable'
import * as R from 'ramda'

export const notesState = R.prop('notes')

export const notes = state => List(notesState(state).notes.values())

export const note = (id, state) => notesState(state).notes.get(id)

export const currentNote = R.pipe(notesState, R.prop('currentNote'))

export const editingCurrentNote = R.pipe(currentNote, R.prop('editing'))
