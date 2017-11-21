import { ofType } from 'redux-observable'
import { mergeMap, map, mapTo, delay } from 'rxjs/operators'
import gql from 'graphql-tag'

import { currentNoteState } from '../notesSelectors'
import { addCurrentNote, fetchNotes } from '../notesActions'
import {tapLog} from "../../util";

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
                variables: { input: { title: note.title } },
            }),
        ),
        mapTo(fetchNotes()),
    )
