import { ofType } from 'redux-observable'
import { map, mergeMap, mapTo } from 'rxjs/operators'
import * as R from 'ramda'
import gql from 'graphql-tag'

import { fetchNotes, removeCurrentNote } from '../notesActions'
import { currentNote } from '../notesSelectors'
import { id } from '../Note'

const removeNote = gql`
    mutation RemoveNote($input: DeleteNoteInput!) {
        deleteNote(input: $input) {
            changedNote {
                id
            }
        }
    }
`

export const removeCurrentNoteEpic = (action$, store, { apolloClient }) =>
    action$.pipe(
        ofType(removeCurrentNote.type),
        map(() => currentNote(store.getState())),
        map(R.view(id)),
        mergeMap(noteId =>
            apolloClient.mutate({
                mutation: removeNote,
                variables: { input: { id: noteId } },
            }),
        ),
        mapTo(fetchNotes()),
    )
