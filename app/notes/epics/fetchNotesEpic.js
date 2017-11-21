import { ofType } from 'redux-observable'
import { concatMap, switchMap, map } from 'rxjs/operators'
import * as R from 'ramda'
import gql from 'graphql-tag'

import { fetchNotes, setNotes } from '../notesActions'
import { tapLog } from '../../util'

const NotesQuery = gql`
    query NotesQuery {
        viewer {
            allNotes {
                edges {
                    cursor
                    node {
                        id
                        title
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
        map(data => R.view(noteEdgesLens, data).map(R.view(noteFromEdgeLens))),
        map(notes => setNotes({ notes })),
    )
