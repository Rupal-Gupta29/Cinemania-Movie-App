import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  topRatedMovies: {},
  upcomingMovies: {},
  onTheAirShows: {},
  topRatedShows: {},
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_APP_API_TOKEN,
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.topRatedMovies = action.payload;
    }),
      builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload;
      }),
      builder.addCase(fetchOnTheAirShows.fulfilled, (state, action) => {
        state.onTheAirShows = action.payload;
      }),
      builder.addCase(fetchTopRatedShows.fulfilled, (state, action) => {
        state.topRatedShows = action.payload;
      });
  },
});

export const fetchTopRatedMovies = createAsyncThunk(
  "home/fetchTopRatedMovies",
  async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "home/fetchUpcomingMovies",
  async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data;
  }
);

export const fetchOnTheAirShows = createAsyncThunk(
  "home/fetchOnTheAirShows",
  async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data;
  }
);

export const fetchTopRatedShows = createAsyncThunk(
  "home/fetchTopRatedShows",
  async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      options
    );
    const data = await res.json();
    return data;
  }
);

export default homeSlice.reducer;
