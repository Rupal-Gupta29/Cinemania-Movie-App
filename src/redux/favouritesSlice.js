import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  shows: [],
};

const favouritesSlice = createSlice({
  name: "favouritesSlice",
  initialState,
  reducers: {
    addMovieToFavourites: (state, action) => {
      state.movies.push(action.payload);
    },
    addShowsToFavourites: (state, action) => {
      state.shows.push(action.payload);
    },
    removeMovieFromFavourites: (state, action) => {
      let newList = state.movies.filter((movie) => movie.id !== action.payload);
      state.movies = newList;
    },
    removeShowFromFavourites: (state, action) => {
      let newList = state.shows.filter((show) => show.id !== action.payload);
      state.shows = newList;
    },
  },
});

export default favouritesSlice.reducer;
export const {
  addMovieToFavourites,
  addShowsToFavourites,
  removeMovieFromFavourites,
  removeShowFromFavourites,
} = favouritesSlice.actions;
