import { ofType } from 'redux-observable'
import { switchMap, map } from 'rxjs/operators'
import * as R from 'ramda'
import gql from 'graphql-tag'

import { fetchNotes, setNotes } from '../notesActions'
import { tapLog } from '../../util'
import { deserializeNote } from '../serialization'

const NotesQuery = gql`
    query NotesQuery {
        viewer {
            allNotes {
                edges {
                    cursor
                    node {
                        id
                        title
                        location
                    }
                }
            }
        }
    }
`

const noteEdgesLens = R.lensPath(['data', 'viewer', 'allNotes', 'edges'])
const noteFromEdgeLens = R.lensPath(['node'])

export const fetchNotesEpic = (action$, store, { apolloClient }) =>
    action$.pipe(
        ofType(fetchNotes.type),
        switchMap(() =>
            apolloClient.query({
                query: NotesQuery,
                fetchPolicy: 'network-only',
            }),
        ),
        tapLog('fetchedNotes'),
        map(data => R.view(noteEdgesLens, data).map(R.view(noteFromEdgeLens))),
        map(notes => notes.map(deserializeNote)),
        map(notes => setNotes({ notes })),
    )
