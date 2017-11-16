import * as React from 'react'
import { FlatList } from 'react-native'
import * as R from 'ramda'

import { Note } from './Note'

const renderNote = onNotePress => ({ item: note }) => (
    <Note key={note.title} note={note} onPress={() => onNotePress(note)} />
)

export const NotesList = ({ notes, onNotePress }) => (
    <FlatList
        data={notes.toArray()}
        renderItem={renderNote(onNotePress)}
        keyExtractor={R.prop('id')}
    />
)
