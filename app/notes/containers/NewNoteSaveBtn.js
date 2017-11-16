import * as R from 'ramda'
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addCurrentNote } from '../notesActions'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

export const NewNoteSaveBtn = connect(R.always({}), dispatch =>
    bindActionCreators({ addCurrentNote }, dispatch),
)(({ onSave, addCurrentNote }) => (
    <TouchableOpacity
        onPress={() => addCurrentNote() && onSave()}
        style={{ marginRight: 12 }}
    >
        <Icon
            ios="ios-checkmark"
            android="md-checkmark"
            style={{
                fontSize: 40,
            }}
        />
    </TouchableOpacity>
))
