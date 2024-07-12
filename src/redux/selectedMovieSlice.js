import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_APP_API_TOKEN,
  },
};

const selectedMovieOrShow = createSlice({
  name: "selectedMovieOrShow",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieOrShowDetails.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const fetchMovieOrShowDetails = createAsyncThunk(
  "selectedMovieOrShow/fetchMovieOrShowDetails",
  async ({ type, id }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US&append_to_response=videos,credits`,
      options
    );
    const data = await res.json();
    return data;
  }
);

export default selectedMovieOrShow.reducer;
export const { removeSelectedMovieOrShow } = selectedMovieOrShow.actions;
