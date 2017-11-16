import * as React from 'react'
import { Icon } from 'native-base'
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { currentNoteState } from '../notesSelectors'
import {
    changeCurrentNoteMode,
    dismissCurrentNoteChanges,
    removeCurrentNote,
    saveCurrentNoteChanges,
} from '../notesActions'

const styles = StyleSheet.create({
    smallIcon: Platform.select({
        ios: { fontSize: 40 },
        android: { fontSize: 20 },
    }),
    bigIcon: Platform.select({
        ios: { fontSize: 27 },
        android: { fontSize: 20 },
    }),
    iconWrapper: {
        marginHorizontal: 4,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
})

export const CurrentNoteEditBtn = connect(currentNoteState, dispatch =>
    bindActionCreators(
        {
            changeCurrentNoteMode,
            saveCurrentNoteChanges,
            dismissCurrentNoteChanges,
            removeCurrentNote,
        },
        dispatch,
    ),
)(
    ({
        editing,
        changeCurrentNoteMode,
        saveCurrentNoteChanges,
        dismissCurrentNoteChanges,
        removeCurrentNote,
        onRemove,
    }) => (
        <View style={styles.container}>
            {editing && (
                <TouchableOpacity
                    onPress={saveCurrentNoteChanges}
                    style={styles.iconWrapper}
                >
                    <Icon
                        ios="ios-checkmark"
                        android="md-checkmark"
                        style={styles.smallIcon}
                    />
                </TouchableOpacity>
            )}
            {editing && (
                <TouchableOpacity
                    onPress={dismissCurrentNoteChanges}
                    style={styles.iconWrapper}
                >
                    <Icon
                        ios="ios-close"
                        android="md-close"
                        style={styles.smallIcon}
                    />
                </TouchableOpacity>
            )}
            {!editing && (
                <TouchableOpacity
                    onPress={changeCurrentNoteMode}
                    style={styles.iconWrapper}
                >
                    <Icon
                        ios="ios-create-outline"
                        android="md-create"
                        style={styles.bigIcon}
                    />
                </TouchableOpacity>
            )}
            <TouchableOpacity
                onPress={() => removeCurrentNote() && onRemove()}
                style={styles.iconWrapper}
            >
                <Icon
                    ios="ios-trash-outline"
                    android="md-trash"
                    style={styles.bigIcon}
                />
            </TouchableOpacity>
        </View>
    ),
)
