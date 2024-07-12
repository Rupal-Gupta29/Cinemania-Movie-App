import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home/Home";
import Shows from "./pages/moviesNshows/Shows";
import Movies from "./pages/moviesNshows/Movies";
import Navbar from "../src/components/navbar/Navbar";
import MovieDetails from "./pages/detailed page/MovieDetails";
import ShowDetails from "./pages/detailed page/ShowDetails";
import Favourites from "./pages/favourites/Favourites";
import Search from "./pages/search/Search";
import Error from "./pages/Error/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/shows" element={<Shows />}></Route>
        <Route path="/explore/movie/:id" element={<MovieDetails />}></Route>
        <Route path="/explore/show/:id" element={<ShowDetails />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
