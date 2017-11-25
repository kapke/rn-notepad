/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { bindActionCreators } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { combineEpics } from 'redux-observable'

import { notesReducer } from '/notes/notesReducer'
import { Notes } from '/notes/screens/Notes'
import { Note } from '/notes/screens/Note'

import { CurrentNoteEditBtn } from '/notes/containers/CurrentNoteEditBtn'
import { Store } from './app/store'
import { uiReducer, uiEpic } from '/ui'
import { NewNoteSaveBtn } from '/notes/containers/NewNoteSaveBtn'
import {
    cleanCurrentNote,
    startEditingCurrentNote,
    fetchNotes,
} from '/notes/notesActions'
import { notesEpic } from './app/notes/epics/notesEpic'

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: 'https://us-west-2.api.scaphold.io/graphql/rn-notepad',
    }),
    cache: new InMemoryCache(),
})

const services = {
    apolloClient,
}

const store = Store(
    {
        notes: notesReducer,
        ui: uiReducer,
    },
    combineEpics(uiEpic, notesEpic),
    services,
)

const storePersistor = persistStore(store)

const boundActions = bindActionCreators(
    { cleanCurrentNote, startEditingCurrentNote, fetchNotes },
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
            } else if (to.scene.route.routeName === 'Notes') {
                return boundActions.fetchNotes()
            }

            return true
        },
        onTransitionEnd(to) {
            return to.scene.route.routeName === 'NewNote'
                ? Promise.resolve().then(boundActions.startEditingCurrentNote)
                : true
        },
    },
)

export default function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <PersistGate persistor={storePersistor}>
                    <View style={styles.container}>
                        <AppNavigator />
                    </View>
                </PersistGate>
            </ApolloProvider>
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
