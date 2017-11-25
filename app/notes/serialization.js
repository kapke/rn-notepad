import { hasLocation, Note } from './Note'

export const serializeNote = note => ({
    ...note,
    location: hasLocation(note) ? note.location.some() : null, //eslint-disable-line fp/no-nil
})
export const deserializeNote = Note
