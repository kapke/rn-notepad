import { combineEpics } from 'redux-observable'

import { saveCurrentNoteEpic } from './saveCurrentNoteEpic'
import { addCurrentNoteEpic } from './addCurrentNoteEpic'
import { fetchNotesEpic } from './fetchNotesEpic'
import { removeCurrentNoteEpic } from './removeCurrentNoteEpic'
import { initNotesEpic } from './initNotesEpic'

export const notesEpic = combineEpics(
    saveCurrentNoteEpic,
    addCurrentNoteEpic,
    fetchNotesEpic,
    removeCurrentNoteEpic,
    initNotesEpic,
)
