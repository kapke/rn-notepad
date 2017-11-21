import * as R from 'ramda'

import { Reducer } from '/store'

import { id, Note, title, withNewId } from './Note'
import {
    changeCurrentNoteMode,
    setCurrentNote,
    changeCurrentNote,
    saveCurrentNoteChanges,
    dismissCurrentNoteChanges,
    cleanCurrentNote,
    addCurrentNote,
    startEditingCurrentNote,
    setNotes,
    setNote as setNoteAction,
} from './notesActions'
import { arrToObj } from '../util'

const setNote = note => notes => R.assoc(R.view(id, note), note, notes)

const currentNote = R.lensPath(['currentNote'])

export const notesReducer = Reducer(
    {
        [setNotes.type]: (state, action) => ({
            ...state,
            notes: arrToObj(R.view(id), action.payload.notes),
        }),
        [setNoteAction.type]: (state, action) => ({
            ...state,
            notes: setNote(action.payload.note)(state.notes),
        }),
        [setCurrentNote.type]: (state, action) => ({
            ...state,
            editingCurrentNote: false,
            currentNote: action.payload,
        }),
        [changeCurrentNoteMode.type]: state => ({
            ...state,
            editingCurrentNote: !state.editingCurrentNote,
        }),
        [startEditingCurrentNote.type]: R.assoc('editingCurrentNote', true),
        [changeCurrentNote.type]: (state, { payload: { content } }) => ({
            ...state,
            currentNote: R.set(title, content, state.currentNote),
        }),
        [saveCurrentNoteChanges.type]: state => ({
            ...state,
            editingCurrentNote: false,
            notes: setNote(R.view(currentNote, state))(state.notes),
        }),
        [dismissCurrentNoteChanges.type]: state => ({
            ...state,
            editingCurrentNote: false,
            currentNote: state.notes[R.view(id, state.currentNote)],
        }),
        [cleanCurrentNote.type]: state => ({
            ...state,
            currentNote: new Note(),
        }),
        [addCurrentNote.type]: state => ({
            ...state,
            notes: setNote(withNewId(R.view(currentNote, state)))(state.notes),
        }),
    },
    {
        notes: {},
        editingNote: false,
        currentNote: new Note(),
    },
)
