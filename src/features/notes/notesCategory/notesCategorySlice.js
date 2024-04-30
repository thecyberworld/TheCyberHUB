import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notesCategoryService from "./notesCategoryService";

const initialState = {
    selectedCategories: [],
    notesCategories: [],
    isNotesCategoryError: false,
    isNotesCategorySuccess: false,
    isNotesCategoryLoading: false,
    notesCategoryMessage: "",
};

// Create new notesCategory
export const createNotesCategory = createAsyncThunk("notesCategory/create", async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesCategoryService.createNotesCategory(categoryData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing notesCategory
export const updateNotesCategory = createAsyncThunk("notesCategory/update", async ({ id, categoryData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesCategoryService.updateNotesCategory(id, categoryData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user categories
export const getNotesCategories = createAsyncThunk("notesCategory/getNotesCategories", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesCategoryService.getNotesCategories(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user category
export const deleteNotesCategory = createAsyncThunk("notesCategory/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesCategoryService.deleteNotesCategory(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
// IsSelected user category: note
export const AddSelectedCategory = createAsyncThunk("notesCategory/selected", async (id, thunkAPI) => {
    try {
        const isExist = initialState.selectedCategories.findIndex((c) => c.id === id);
        console.log(isExist);
        if (isExist === -1) {
            return id;
        } else {
            return thunkAPI.rejectWithValue("message");
        }
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});
// RemoveSelected note
export const RemoveSelectedCategory = createAsyncThunk("notesCategory/remove", async (id, thunkAPI) => {
    try {
        const isExist = initialState.selectedCategories.findIndex((c) => c === id);
        console.log(initialState.selectedCategories);
        console.log(isExist);
        if (isExist !== -1) {
            return id;
        } else {
            return thunkAPI.rejectWithValue("message");
        }
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

/* export const deleteAllSelectedCategory = createAsyncThunk("notesCategory/delete",(id,thunkApi)=>{

    try {
        
    } catch (error) {
        
    }
}) */
export const notesCategorySlice = createSlice({
    name: "notesCategories",
    initialState,
    reducers: {
        notesCategoryReset: () => initialState,
        notesCategoryReorder: (state, action) => {
            state.notesCategories = [...action.payload];
        },
        notesRemoveCategory: (state, action) => {
            const isExist = state.selectedCategories.findIndex((c) => c === action.payload);

            if (isExist !== -1) {
                state.selectedCategories = state.selectedCategories.filter((e) => e !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNotesCategory.pending, (state) => {
                state.isNotesCategoryLoading = true;
            })
            .addCase(createNotesCategory.fulfilled, (state, action) => {
                state.isNotesCategorySuccess = true;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = false;
                state.notesCategories = [...state.notesCategories, action.payload];
            })
            .addCase(createNotesCategory.rejected, (state, action) => {
                state.isNotesCategorySuccess = false;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = true;
                state.notesCategoryMessage = action.payload;
            })
            .addCase(updateNotesCategory.pending, (state) => {
                state.isNotesCategoryLoading = true;
            })
            .addCase(updateNotesCategory.fulfilled, (state, action) => {
                state.isNotesCategorySuccess = true;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = false;
                state.notesCategories = state.notesCategories.map((category) =>
                    category._id === action.payload._id
                        ? {
                              ...category,
                              ...action.payload,
                          }
                        : category,
                );
            })
            .addCase(updateNotesCategory.rejected, (state, action) => {
                state.isNotesCategorySuccess = false;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = true;
                state.notesCategoryMessage = action.payload;
            })
            .addCase(getNotesCategories.pending, (state) => {
                state.isNotesCategoryLoading = true;
            })
            .addCase(getNotesCategories.fulfilled, (state, action) => {
                state.isNotesCategorySuccess = true;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = false;
                state.notesCategories = action.payload;
            })
            .addCase(getNotesCategories.rejected, (state, action) => {
                state.isNotesCategorySuccess = false;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = true;
                state.notesCategoryMessage = action.payload;
            })
            .addCase(deleteNotesCategory.pending, (state) => {
                state.isNotesCategoryLoading = true;
            })
            .addCase(deleteNotesCategory.fulfilled, (state, action) => {
                state.isNotesCategorySuccess = true;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = false;
                state.notesCategories = state.notesCategories.filter((category) => category._id !== action.payload.id);
            })
            .addCase(deleteNotesCategory.rejected, (state, action) => {
                state.isNotesCategorySuccess = false;
                state.isNotesCategoryLoading = false;
                state.isNotesCategoryError = true;
                state.notesCategoryMessage = action.payload;
            })
            .addCase(AddSelectedCategory.fulfilled, (state, action) => {
                state.selectedCategories.push(action.payload);
            })
            .addCase(RemoveSelectedCategory.fulfilled, (state, action) => {
                /*  state.selectedCategories = state.selectedCategories.filter((category) => category !== action.payload) */
            });
    },
});

export const { notesCategoryReset, notesCategoryReorder, notesRemoveCategory } = notesCategorySlice.actions;
export default notesCategorySlice.reducer;
