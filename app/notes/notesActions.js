import { Action } from '/store'

export const setCurrentNote = Action('Notes/CurrentNote/Set')

export const changeCurrentNoteMode = Action('Notes/CurrentNote/ChangeMode')

export const changeCurrentNote = Action('Notes/CurrentNote/Change')

export const saveCurrentNoteChanges = Action('Notes/CurrentNote/Save')
export const dismissCurrentNoteChanges = Action('Notes/CurrentNote/Dismiss')

export const removeCurrentNote = Action('Notes/CurrentNote/Remove')
export const addCurrentNote = Action('Notes/CurrentNote/Add')
export const cleanCurrentNote = Action('Notes/CurrentNote/Clean')
export const startEditingCurrentNote = Action('Notes/CurrentNote/StartEditing');