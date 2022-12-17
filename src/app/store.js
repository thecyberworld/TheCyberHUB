import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// import { cyberNewsApi } from "../services/cyberNewsApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        // [cyberNewsApi.reducerPath]: cyberNewsApi.reducer,
    },
});
