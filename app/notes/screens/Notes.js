import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { Fab, Icon } from 'native-base'

import { NotesList } from '../components/NotesList'
import { notes } from '../notesSelectors'
import { setCurrentNote } from '../notesActions'

export const Notes = connect(
    state => ({ notes: notes(state) }),
    dispatch => bindActionCreators({ setCurrentNote }, dispatch),
)(({ navigation, notes, setCurrentNote }) => {
    const goToNote = note =>
        setCurrentNote(note) && navigation.navigate('Note', { noteId: note.id })
    const startAddingNote = () => navigation.navigate('NewNote')

    return (
        <View style={{ flex: 1 }}>
            <NotesList notes={notes} onNotePress={goToNote} />
            <Fab onPress={startAddingNote}>
                <Icon ios="ios-add" android="md-add" />
            </Fab>
        </View>
    )
})
