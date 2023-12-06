import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        noteAdd: {
            reducer: (state, action) => {
                state.notes = [...state.notes, action.payload];
            },
            prepare: (note) => {
                const id = nanoid();
                return { payload: { ...note, id } };
            },
        },
        noteRemove: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
        noteEdit: (state, action) => {
            const editedNote = action.payload;
            const indexOfEditedNote = state.notes.findIndex((note) => note.id === editedNote.id);
            if (indexOfEditedNote < 0) state.notes = [...state.notes, editedNote];
            state.notes[indexOfEditedNote] = { ...state.notes[indexOfEditedNote], ...editedNote };
        },
        notePin: (state, action) => {
            const pinnedNoteIndex = state.notes.findIndex((note) => note.id === action.payload);
            if (pinnedNoteIndex > -1) {
                state.notes[pinnedNoteIndex].pinned = !state.notes[pinnedNoteIndex].pinned;
            }
            state.notes.sort((a, b) => {
                if (a.pinned !== b.pinned) {
                    if (a.pinned === true) return -1;
                    return 1;
                }
                return 0;
            });
        },
    },
});

export const { notesReset, noteAdd, noteRemove, noteEdit, notePin } = notesSlice.actions;
export default notesSlice.reducer;
