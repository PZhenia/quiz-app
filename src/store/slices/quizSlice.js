import { createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "../thunks/quizThunk.js";

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        questions: [],
        loading: false,
        error: "",
        userAnswers: [],
    },
    reducers: {
        setUserAnswers(state, action) {
            state.userAnswers = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getQuestions.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.loading = false;
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { setUserAnswers } = quizSlice.actions;

export default quizSlice.reducer;