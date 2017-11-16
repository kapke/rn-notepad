import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Note as NoteComponent } from '../components/Note'

import { currentNoteState } from '../notesSelectors'
import { changeCurrentNote } from '../notesActions'

export const CurrentNote = connect(currentNoteState, dispatch =>
    bindActionCreators(
        {
            onChange: content => changeCurrentNote({ content }),
        },
        dispatch,
    ),
)(NoteComponent)
