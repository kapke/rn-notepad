/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    StatusBarIOS,
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator, StackRouter } from 'react-navigation'
import { bindActionCreators, combineReducers } from 'redux'

import { notesReducer } from '/notes/notesReducer'
import { Notes } from '/notes/screens/Notes'
import { Note } from '/notes/screens/Note'
import { CurrentNoteEditBtn } from '/notes/containers/CurrentNoteEditBtn'
import { Store } from '/store'
import { StatusBarPlaceholderContainer, uiReducer, uiEpic } from '/ui'
import { NewNoteSaveBtn } from '/notes/containers/NewNoteSaveBtn'
import { cleanCurrentNote } from '/notes/notesActions'

const store = Store(
    combineReducers({
        notes: notesReducer,
        ui: uiReducer,
    }),
    uiEpic,
)

const boundActions = bindActionCreators({ cleanCurrentNote }, store.dispatch)

const AppNavigator = StackNavigator(
    {
        Notes: {
            screen: Notes,
            navigationOptions: () => ({
                title: 'Notes',
            }),
        },
        Note: {
            screen: Note,
            navigationOptions: ({ navigation }) => ({
                headerRight: (
                    <CurrentNoteEditBtn onRemove={navigation.goBack} />
                ),
            }),
        },
        NewNote: {
            screen: Note,
            navigationOptions: ({ navigation }) => ({
                title: 'New note',
                headerRight: boundActions.cleanCurrentNote() && (
                    <NewNoteSaveBtn onSave={navigation.goBack} />
                ),
            }),
        },
    },
    {
        initialRouteName: 'Notes',
    },
)

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <AppNavigator />
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
