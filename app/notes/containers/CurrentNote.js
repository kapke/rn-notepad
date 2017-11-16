import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Note as NoteComponent } from '../components/Note'

import { currentNote } from '../notesSelectors'
import { changeCurrentNote } from '../notesActions'

export const CurrentNote = connect(
    state => currentNote(state).toObject(),
    dispatch =>
        bindActionCreators(
            {
                onChange: content => changeCurrentNote({ content }),
            },
            dispatch,
        ),
)(NoteComponent)
