import { Map, Record } from 'immutable'
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
} from './notesActions'

const NotesState = Record({
    notes: [],
    currentNote: new Note(),
    editingCurrentNote: false,
})

const setNote = note => notes => notes.set(R.view(id, note), note)

const currentNote = R.lensPath(['currentNote'])
const currentNoteId = R.compose(currentNote, id)

export const notesReducer = Reducer(
    {
        [setCurrentNote.type]: (state, action) =>
            state
                .set('editingCurrentNote', false)
                .set('currentNote', action.payload),
        [changeCurrentNoteMode.type]: state =>
            state.update('editingCurrentNote', editing => !editing),
        [changeCurrentNote.type]: (state, { payload: { content } }) =>
            state.update('currentNote', R.set(title, content)),
        [saveCurrentNoteChanges.type]: state =>
            state
                .set('editingCurrentNote', false)
                .update('notes', setNote(R.view(currentNote, state))),
        [dismissCurrentNoteChanges.type]: state =>
            state
                .set('editingCurrentNote', false)
                .update('currentNote', currentNote =>
                    state.notes.get(R.view(id, currentNote)),
                ),
        [removeCurrentNote.type]: state =>
            state.update('notes', notes =>
                notes.delete(R.view(currentNoteId, state)),
            ),
        [cleanCurrentNote.type]: state => state.set('currentNote', new Note()),
        [addCurrentNote.type]: state =>
            state.update(
                'notes',
                setNote(withNewId(R.view(currentNote, state))),
            ),
    },
    new NotesState({
        notes: [
            new Note({ id: 'foo', title: 'foo' }),
            new Note({ id: 'bar', title: 'bar' }),
            new Note({ id: 'baz', title: 'baz' }),
            new Note({ id: 'foo2', title: 'foo2' }),
        ].reduce((acc, note) => acc.set(note.id, note), Map()),
    }),
)
