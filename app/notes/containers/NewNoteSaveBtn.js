import * as R from 'ramda'
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TouchableOpacity, Platform } from 'react-native'
import { Icon } from 'native-base'

import { addCurrentNote } from '../notesActions'

export const NewNoteSaveBtn = connect(R.always({}), dispatch =>
    bindActionCreators({ addCurrentNote }, dispatch),
)(({ onSave, addCurrentNote }) => (
    <TouchableOpacity
        onPress={() => addCurrentNote() && onSave()}
        style={{
            marginRight: 12,
            marginTop: Platform.select({ ios: 10, android: 0 }),
        }}
    >
        <Icon
            ios="ios-checkmark"
            android="md-checkmark"
            style={Platform.select({
                ios: { fontSize: 56 },
                android: { fontSize: 24 },
            })}
        />
    </TouchableOpacity>
))
