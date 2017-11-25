import * as React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

export const LocationSelector = ({ onLocationChange, style }) => (
    <View style={[{ flex: 1 }, style]}>
        <MapView
            style={{ flex: 1 }}
            showsUserLocation={true}
            showsBuildings={true}
            onLongPress={onLocationChange}
        />
    </View>
)
