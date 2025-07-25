import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        feed: [], // ✅ Correct initialState
    },
    reducers: {
        addFeed: (state, action) => {
            return { ...state, feed: action.payload }; // ✅ Correct way to update state
        },
        removeFeed: (state, action) => {
            return { 
                ...state, 
                feed: state.feed.filter((item) => item._id !== action.payload) 
            };
        },
    },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
