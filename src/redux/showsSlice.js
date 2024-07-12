import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let initialState = {
  genres: {},
  showList: {},
  genresLoaded: false,
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_APP_API_TOKEN,
  },
};

const showsSlice = createSlice({
  name: "shows",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllShows.fulfilled, (state, action) => {
      state.showList = action.payload;
      state.genresLoaded = true;
    }),
      builder.addCase(fetchAllShows.rejected, (state, action) => {
        console.log("Error");
      });
    builder.addCase(fetchAllGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    }),
      builder.addCase(fetchAllGenres.rejected, (state, action) => {
        console.log("Error");
      });
  },
});

export const fetchAllShows = createAsyncThunk(
  "shows/fetchAllShows",
  async ({ selectedGenre, page }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
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
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?language=en`,
      options
    );
    const genres = await res.json();
    return genres;
  }
);

export default showsSlice.reducer;
