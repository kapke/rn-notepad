import * as R from 'ramda'

import { Reducer } from '/store'

import { id, Note, title, withNewId } from './Note'
import {
    changeCurrentNoteMode,
    setCurrentNote,
    changeCurrentNote,
    saveCurrentNoteChanges,
    dismissCurrentNoteChanges,
    removeCurrentNote,
    cleanCurrentNote,
    addCurrentNote,
    startEditingCurrentNote,
} from './notesActions'

const setNote = note => notes => R.assoc(R.view(id, note), note, notes)

const currentNote = R.lensPath(['currentNote'])
const currentNoteId = R.compose(currentNote, id)

export const notesReducer = Reducer(
    {
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
        [removeCurrentNote.type]: state => ({
            ...state,
            notes: R.dissoc(R.view(currentNoteId, state), state.notes),
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
        notes: [
            new Note({ id: 'foo', title: 'foo' }),
            new Note({ id: 'bar', title: 'bar' }),
            new Note({ id: 'baz', title: 'baz' }),
            new Note({ id: 'foo2', title: 'foo2' }),
        ].reduce((acc, note) => ({ ...acc, [note.id]: note }), {}),
        editingNote: false,
        currentNote: new Note(),
    },
)
