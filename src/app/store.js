import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import userDetailReducer from "../features/userDetails/userDetailSlice";

// import { cyberNewsApi } from "../services/cyberNewsApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
        userDetails: userDetailReducer,
        // [cyberNewsApi.reducerPath]: cyberNewsApi.reducer,
    },
});
