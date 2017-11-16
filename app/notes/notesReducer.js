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

const CurrentNote = Record({
    note: new Note(),
    editing: false,
})

const toggledEditing = currentNote =>
    currentNote.update('editing', editing => !editing)

const disableEditing = currentNote => currentNote.set('editing', false)

const dismissChanges = originalNoteGetter => currentNote =>
    currentNote
        .set('editing', false)
        .set('note', originalNoteGetter(R.view(id, currentNote.note)))

const cleanNote = new CurrentNote({ editing: true, note: new Note() })

const NotesState = Record({
    notes: [],
    currentNote: CurrentNote(),
})

const setNote = note => notes => notes.set(R.view(id, note), note)

const currentNote = R.lensPath(['currentNote', 'note'])
const currentNoteId = R.compose(currentNote, id)

export const notesReducer = Reducer(
    {
        [setCurrentNote.type]: (state, action) =>
            state.set(
                'currentNote',
                CurrentNote({ note: action.payload, editing: false }),
            ),
        [changeCurrentNoteMode.type]: state =>
            state.update('currentNote', toggledEditing),
        [changeCurrentNote.type]: (state, { payload: { content } }) =>
            state.update('currentNote', currentNote =>
                currentNote.update('note', R.set(title, content)),
            ),
        [saveCurrentNoteChanges.type]: state =>
            state
                .update('currentNote', disableEditing)
                .update('notes', setNote(R.view(currentNote, state))),
        [dismissCurrentNoteChanges.type]: state =>
            state.set('currentNote', dismissChanges(state.notes.get)),
        [removeCurrentNote.type]: state =>
            state.update('notes', notes =>
                notes.delete(R.view(currentNoteId, state)),
            ),
        [cleanCurrentNote.type]: state => state.set('currentNote', cleanNote),
        [addCurrentNote.type]: state =>
            state.update(
                'notes',
                setNote(withNewId(R.view(currentNote, state))),
            ),
    },
    NotesState({
        notes: [
            new Note({ id: 'foo', title: 'foo' }),
            new Note({ id: 'bar', title: 'bar' }),
            new Note({ id: 'baz', title: 'baz' }),
            new Note({ id: 'foo2', title: 'foo2' }),
        ].reduce((acc, note) => acc.set(note.id, note), Map()),
        currentNote: CurrentNote(),
    }),
)
