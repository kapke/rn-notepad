import { interval } from 'rxjs/observable/interval'
import { mapTo, take } from 'rxjs/operators'

import { fetchNotes } from '../notesActions'

export const initNotesEpic = () =>
    interval(1).pipe(mapTo(fetchNotes()), take(1))
