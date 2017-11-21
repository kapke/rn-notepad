import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { Fab, Icon } from 'native-base'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import * as R from 'ramda'

import { NotesList } from '../components/NotesList'
import { notes } from '../notesSelectors'
import { setCurrentNote } from '../notesActions'

export const Notes = R.compose(
    connect(
        state => ({ notes: notes(state) }),
        dispatch => bindActionCreators({ setCurrentNote }, dispatch),
    ),
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
