import * as R from 'ramda'

export const notesState = R.prop('notes')

export const notes = state => Object.values(notesState(state).notes)

export const note = (id, state) => notesState(state).notes[id]

export const currentNote = R.pipe(notesState, R.prop('currentNote'))

export const editingCurrentNote = R.pipe(
    notesState,
    R.prop('editingCurrentNote'),
)

export const currentNoteState = state =>
    R.zipObj(
        ['note', 'editing'],
        [currentNote, editingCurrentNote].map(fn => fn(state)),
    )
