/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { bindActionCreators, combineReducers } from 'redux'

import { notesReducer } from '/notes/notesReducer'
import { Notes } from '/notes/screens/Notes'
import { Note } from '/notes/screens/Note'
import { CurrentNoteEditBtn } from '/notes/containers/CurrentNoteEditBtn'
import { Store } from '/store'
import { uiReducer, uiEpic } from '/ui'
import { NewNoteSaveBtn } from '/notes/containers/NewNoteSaveBtn'
import { cleanCurrentNote, startEditingCurrentNote } from '/notes/notesActions'

const store = Store(
    combineReducers({
        notes: notesReducer,
        ui: uiReducer,
    }),
    uiEpic,
)

const boundActions = bindActionCreators(
    { cleanCurrentNote, startEditingCurrentNote },
    store.dispatch,
)

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
                headerRight: <NewNoteSaveBtn onSave={navigation.goBack} />,
            }),
        },
    },
    {
        initialRouteName: 'Notes',
        onTransitionStart(to) {
            if (to.scene.route.routeName === 'NewNote') {
                return boundActions.cleanCurrentNote()
            } else {
                return true
            }
        },
        onTransitionEnd(to, from) {
            if (to.scene.route.routeName === 'NewNote') {
                return Promise.resolve().then(
                    boundActions.startEditingCurrentNote,
                )
            } else {
                return true
            }
        },
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
