import { Action } from '/store'

export const fetchNotes = Action('Notes/Fetch')
export const setNotes = Action('Notes/Set')
export const setNote = Action('Notes/SetSingle')

export const setCurrentNote = Action('Notes/CurrentNote/Set')
export const changeCurrentNoteMode = Action('Notes/CurrentNote/ChangeMode')
export const changeCurrentNoteText = Action('Notes/CurrentNote/ChangeText')
export const changeCurrentNoteLocation = Action(
    'Notes/CurrentNote/ChangeLocation',
)
export const saveCurrentNoteChanges = Action('Notes/CurrentNote/Save')
export const dismissCurrentNoteChanges = Action('Notes/CurrentNote/Dismiss')
export const removeCurrentNote = Action('Notes/CurrentNote/Remove')
export const addCurrentNote = Action('Notes/CurrentNote/Add')
export const cleanCurrentNote = Action('Notes/CurrentNote/Clean')
export const startEditingCurrentNote = Action('Notes/CurrentNote/StartEditing')
