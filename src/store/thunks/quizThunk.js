import { createAsyncThunk } from "@reduxjs/toolkit";

export const getQuestions = createAsyncThunk(
    "quiz/getQuestions",
    async (params, { rejectWithValue }) => {
        try {
            let url = `https://opentdb.com/api.php?amount=${params.numberOfQuestions}`;

            if (params.category) {
                url += `&category=${params.category}`;
            }
            if (params.difficulty) {
                url += `&difficulty=${params.difficulty}`;
            }
            if (params.typeOfQuestion) {
                url += `&type=${params.typeOfQuestion}`;
            }

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch questions");
            }

            const data = await res.json();
            return data.results;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
