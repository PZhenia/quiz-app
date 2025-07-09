import { createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "../thunks/quizThunk.js";

const loadFromLocalStorage = (key, defaultValue = []) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        questions: loadFromLocalStorage('quizQuestions'),
        loading: false,
        error: "",
        userAnswers: loadFromLocalStorage('userAnswers'),
        currentQuestionIndex: loadFromLocalStorage('currentQuestionIndex', 0)
    },
    reducers: {
        setUserAnswers(state, action) {
            state.userAnswers = action.payload;
            localStorage.setItem('userAnswers', JSON.stringify(action.payload));
        },
        setCurrentQuestionIndex(state, action) {
            state.currentQuestionIndex = action.payload;
            localStorage.setItem('currentQuestionIndex', JSON.stringify(action.payload));
        },
        resetQuiz(state) {
            state.questions = [];
            state.userAnswers = [];
            state.currentQuestionIndex = 0;
            localStorage.removeItem('quizQuestions');
            localStorage.removeItem('userAnswers');
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
                state.userAnswers = [];
                state.currentQuestionIndex = 0;
                state.loading = false;
                localStorage.setItem('quizQuestions', JSON.stringify(action.payload));
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { setUserAnswers, setCurrentQuestionIndex, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;