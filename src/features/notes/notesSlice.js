import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
    notes: [],
    isNoteError: false,
    isNoteSuccess: false,
    isNoteLoading: false,
    noteMessage: "",
};

// Create new note
export const createNote = createAsyncThunk("notes/create", async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.createNote(noteData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing note
export const updateNote = createAsyncThunk("notes/update", async ({ id, noteData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.updateNote(id, noteData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update note pinned status
export const pinNote = createAsyncThunk("notes/pin", async ({ id, noteData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.updateNote(id, noteData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user notes
export const getNotes = createAsyncThunk("notes/getNotes", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.getNotes(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user note
export const deleteNote = createAsyncThunk("notes/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.deleteNote(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        noteReset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isNoteLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isNoteSuccess = true;
                state.isNoteLoading = false;
                state.isNoteError = false;
                state.notes.push(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteError = true;
                state.isNoteSuccess = false;
                state.noteMessage = action.payload;
            })
            .addCase(updateNote.pending, (state) => {
                state.isNoteLoading = true;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteSuccess = true;
                state.notes = state.notes.map((note) =>
                    note._id === action.payload._id ? { ...note, ...action.payload } : note,
                );
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteError = true;
                state.noteMessage = action.payload;
            })
            .addCase(pinNote.pending, (state) => {
                state.isNoteLoading = true;
            })
            .addCase(pinNote.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteSuccess = true;
                state.notes = state.notes
                    .map((note) => (note._id === action.payload._id ? { ...note, ...action.payload } : note))
                    .toSorted((a, b) => {
                        if (a.pinned !== b.pinned) {
                            if (a.pinned === true) return -1;
                            return 1;
                        }
                        return 0;
                    });
            })
            .addCase(pinNote.rejected, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteError = true;
                state.noteMessage = action.payload;
            })
            .addCase(getNotes.pending, (state) => {
                state.isNoteLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteError = true;
                state.noteMessage = action.payload;
            })
            .addCase(deleteNote.pending, (state) => {
                state.isNoteLoading = true;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteSuccess = true;
                state.notes = state.notes.filter((note) => note._id !== action.payload.id);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isNoteLoading = false;
                state.isNoteError = true;
                state.noteMessage = action.payload;
            });
    },
});

export const { noteReset } = noteSlice.actions;
export default noteSlice.reducer;
