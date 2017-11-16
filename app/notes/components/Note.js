import * as React from 'react'
import { View, StyleSheet, TouchableHighlight, TextInput } from 'react-native'

import { Text } from '/ui/Text'

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

export const Note = ({
    note,
    onPress,
    onChange,
    style = {},
    editing = false,
}) => (
    <TouchableHighlight onPress={onPress} style={[styles.container, style]}>
        <View>
            {editing ? (
                <TextInput
                    value={note.title}
                    onChangeText={onChange}
                    autoFocus={true}
                    multiline={true}
                />
            ) : (
                <Text>{note.title}</Text>
            )}
        </View>
    </TouchableHighlight>
)
