import * as React from 'react'
import { View, StyleSheet, TouchableHighlight, TextInput } from 'react-native'
import MapView from 'react-native-maps'

import { Text } from '/ui'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 0.25,
        marginVertical: 3,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        elevation: 1,
        overflow: 'visible',
    },
})

const EditingNote = ({
    note,
    onChange,
}) => [
    <TextInput
        key="input"
        value={note.title}
        onChangeText={onChange}
        autoFocus={true}
        multiline={true}
    />,
    <MapView key="map" />,
]

export const Note = props => {
    const { note, onPress, style = {}, editing = false } = props
    console.log(<EditingNote {...props} />)

    return (
        <TouchableHighlight onPress={onPress} style={[styles.container, style]}>
            <View>
                {editing ? (
                    <EditingNote {...props} />
                ) : (
                    <Text>{note.title}</Text>
                )}
            </View>
        </TouchableHighlight>
    )
}
