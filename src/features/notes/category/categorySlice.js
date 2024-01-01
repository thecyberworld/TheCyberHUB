import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
    categories: [],
    isCategoryError: false,
    isCategorySuccess: false,
    isCategoryLoading: false,
    categoryMessage: "",
};

// Create new category
export const createCategory = createAsyncThunk("category/create", async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.createCategory(categoryData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update existing category
export const updateCategory = createAsyncThunk("category/update", async ({ id, categoryData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.updateCategory(id, categoryData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user categories
export const getCategories = createAsyncThunk("category/getCategories", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.getCategories(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete user category
export const deleteCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.deleteCategory(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoryReset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isCategoryLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isCategorySuccess = true;
                state.isCategoryLoading = false;
                state.isCategoryError = false;
                state.categories = [...state.categories, action.payload];
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isCategorySuccess = false;
                state.isCategoryLoading = false;
                state.isCategoryError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isCategoryLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isCategorySuccess = true;
                state.isCategoryLoading = false;
                state.isCategoryError = false;
                state.categories = state.categories.map((category) =>
                    category._id === action.payload._id
                        ? {
                              ...category,
                              ...action.payload,
                          }
                        : category,
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isCategorySuccess = false;
                state.isCategoryLoading = false;
                state.isCategoryError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(getCategories.pending, (state) => {
                state.isCategoryLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isCategorySuccess = true;
                state.isCategoryLoading = false;
                state.isCategoryError = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isCategorySuccess = false;
                state.isCategoryLoading = false;
                state.isCategoryError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isCategoryLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isCategorySuccess = true;
                state.isCategoryLoading = false;
                state.isCategoryError = false;
                state.categories = state.categories.filter((category) => category._id !== action.payload.id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isCategorySuccess = false;
                state.isCategoryLoading = false;
                state.isCategoryError = true;
                state.categoryMessage = action.payload;
            });
    },
});

export const { categoryReset } = categorySlice.actions;
export default categorySlice.reducer;
