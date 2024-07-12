import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./moviesSlice";
import showReducer from "./showsSlice";
import selectedMovieOrShowReducer from "./selectedMovieSlice";
import homeReducer from "./homeSlice";
import favouritesReducer from "./favouritesSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    shows: showReducer,
    selectedMovieOrshow: selectedMovieOrShowReducer,
    home: homeReducer,
    favourites: favouritesReducer,
    search: searchReducer,
  },
});
