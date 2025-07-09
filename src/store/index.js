import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "./slices/quizSlice.js"

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
    }
})

