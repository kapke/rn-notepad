import { ofType } from 'redux-observable'
import { mergeMap, map, mapTo } from 'rxjs/operators'
import gql from 'graphql-tag'
import * as R from 'ramda'

import { saveCurrentNoteChanges, fetchNotes } from '../notesActions'
import { currentNoteState } from '../notesSelectors'
import { serializeNote } from '../serialization'

const updateNote = gql`
    mutation UpdateNote($input: UpdateNoteInput!) {
        updateNote(input: $input) {
            changedEdge {
                node {
                    id
                }
            }
        }
    }
`

export const saveCurrentNoteEpic = (action$, store, { apolloClient }) =>
    action$.pipe(
        ofType(saveCurrentNoteChanges.type),
        map(() => currentNoteState(store.getState())),
        mergeMap(({ note }) => {
            return apolloClient.mutate({
                mutation: updateNote,
                variables: {
                    input: R.pick(
                        ['id', 'title', 'location'],
                        serializeNote(note),
                    ),
                },
            })
        }),
        mapTo(fetchNotes()),
    )
