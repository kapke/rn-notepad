import { ofType } from 'redux-observable'
import { mergeMap, map, mapTo } from 'rxjs/operators'
import gql from 'graphql-tag'
import * as R from 'ramda'

import { currentNoteState } from '../notesSelectors'
import { addCurrentNote, fetchNotes } from '../notesActions'
import { serializeNote } from '../serialization'

const createNote = gql`
    mutation CreateNote($input: CreateNoteInput!) {
        createNote(input: $input) {
            changedEdge {
                node {
                    id
                }
            }
        }
    }
`

export const addCurrentNoteEpic = (action$, store, { apolloClient }) =>
    action$.pipe(
        ofType(addCurrentNote.type),
        map(() => currentNoteState(store.getState())),
        mergeMap(({ note }) =>
            apolloClient.mutate({
                mutation: createNote,
                variables: {
                    input: R.pick(['title', 'location'], serializeNote(note)),
                },
            }),
        ),
        mapTo(fetchNotes()),
    )
