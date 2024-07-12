import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let initialState = {
  genres: {},
  movieList: {},
  genresLoaded: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.movieList = action.payload;
    }),
      builder.addCase(fetchAllMovies.rejected, (state, action) => {
        console.log("Error");
      });
    builder.addCase(fetchAllGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    }),
      builder.addCase(fetchAllGenres.rejected, (state, action) => {
        console.log("Error");
      });
  },
});

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async ({ selectedGenre, page }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_APP_API_TOKEN,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&with_genres=${selectedGenre}&page=${page}`,
      options
    );
    const data = await res.json();
    return data;
  }
);

export const fetchAllGenres = createAsyncThunk(
  "genres/fetchAllGenres",
  async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_APP_API_TOKEN,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      options
    );
    const genres = await res.json();
    return genres;
  }
);

export default movieSlice.reducer;
