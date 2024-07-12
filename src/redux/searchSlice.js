import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_APP_API_TOKEN,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedMovieOrShow.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const fetchSearchedMovieOrShow = createAsyncThunk(
  "home/fetchSearchedMovieOrShow",
  async ({ keyword, page }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=${page}&query=${keyword}`,
      options
    );
    const data = await res.json();
    return data;
  }
);

export default searchSlice.reducer;
