import * as React from 'react'
import { Text as OriginalText, StyleSheet } from 'react-native'

export const defaultTextStyles = StyleSheet.create({
    text: {
        color: '#333333',
        fontSize: 15,
    },
})

export const Text = passedProps => {
    const props = {
        ...passedProps,
        style: StyleSheet.flatten([defaultTextStyles.text, passedProps.style]),
    }
    return <OriginalText {...props}>{props.children}</OriginalText>
}
