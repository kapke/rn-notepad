import * as React from 'react'
import { View, StyleSheet, TouchableHighlight, TextInput } from 'react-native'
import MapView from 'react-native-maps'

import { Text } from '../../ui'
import { hasLocation } from '../Note'

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
        borderRadius: 5,
        elevation: 1,
        overflow: 'visible',
    },
    text: {
        padding: 10,
        flex: 1,
        borderRadius: 5,
    },
})

const NoteEditor = ({ note, onChange: onTextChange, onLocationChange }) => (
    <View style={{ flexDirection: 'column', flex: 1 }}>
        <TextInput
            style={[styles.text, { flex: 1 }]}
            value={note.title}
            onChangeText={onTextChange}
            autoFocus={true}
            multiline={true}
        />
        <MapView
            style={{ flex: 1 }}
            showsBuildings={true}
            showsUserLocation={true}
            onLongPress={e =>
                onLocationChange({ coordinate: e.nativeEvent.coordinate })
            }
        >
            {hasLocation(note) && (
                <MapView.Marker coordinate={note.location.some().coordinate} />
            )}
        </MapView>
    </View>
)

export const Note = props => {
    const { note, onPress, style = {}, editing = false } = props

    return (
        <TouchableHighlight onPress={onPress} style={[styles.container, style]}>
            <View style={{ flex: 1, borderRadius: 5 }}>
                {editing ? (
                    <NoteEditor {...props} />
                ) : (
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={[styles.text, { flex: 1 }]}>
                            {note.title}
                        </Text>
                        {hasLocation(note) && (
                            <MapView
                                style={{ flex: 1 }}
                                showsBuildings={true}
                                showsUserLocation={true}
                            >
                                <MapView.Marker
                                    coordinate={note.location.some().coordinate}
                                />
                            </MapView>
                        )}
                    </View>
                )}
            </View>
        </TouchableHighlight>
    )
}
