import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userDetailReducer from "../features/userDetail/userDetailSlice";
import goalReducer from "../features/goals/goalSlice";
import blogReducer from "../features/blogs/blogSlice";
import notesReducer from "../features/notes/notesSlice";
import notesCategoriesReducer from "../features/notes/notesCategory/notesCategorySlice";
import forumReducer from "../features/forum/forumSlice";
import viewReducer from "../features/feeds/views/viewSlice";
import feedReducer from "../features/feeds/feedsSlice";
import feedLikeReduces from "../features/feeds/feedLikes/feedLikesSlice";
import blogLikeReduces from "../features/blogs/blogLikes/blogLikesSlice";

import blogCommentsReducer from "../features/blogs/blogComments/blogCommentSlice";
import feedCommentsReducer from "../features/feeds/feedComments/feedCommentsSlice";

import ctfReducer from "../features/ctf/ctfSlice";
import bookmarkReduces from "../features/bookmarks/bookmarkSlice";
import resetPasswordReducer from "../features/resetPassword/resetPasswordSlice";
import followReducer from "../features/follow/followSlice";
import connectionReducer from "../features/connections/connectionSlice";

import eventsReducer from "../features/events/eventsSlice";

// import { cyberNewsApi } from "../services/cyberNewsApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,

        blogs: blogReducer,
        blogComments: blogCommentsReducer,

        notes: notesReducer,
        notesCategories: notesCategoriesReducer,

        forums: forumReducer,

        feeds: feedReducer,
        feedComments: feedCommentsReducer,

        views: viewReducer,
        bookmarks: bookmarkReduces,
        feedLikes: feedLikeReduces,
        blogLikes: blogLikeReduces,

        userDetail: userDetailReducer,
        ctf: ctfReducer,
        resetPassword: resetPasswordReducer,
        followData: followReducer,
        connectionData: connectionReducer,

        events: eventsReducer,

        // [cyberNewsApi.reducerPath]: cyberNewsApi.reducer,
    },
});
