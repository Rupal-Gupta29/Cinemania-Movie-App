import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenres, fetchAllMovies } from "../../redux/moviesSlice";
import styles from "./moviesNshows.module.css";
import MovieCard from "../../components/card/MovieCard";

const Movies = () => {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState("28");
  const [page, setPage] = useState(1);
  const { genres, movieList, genresLoaded } = useSelector((state) => {
    return state.movies;
  });

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, []);

  useEffect(() => {
    dispatch(fetchAllMovies({ selectedGenre, page }));
  }, [selectedGenre, page]);

  const handleNextPage = (e) => {
    setPage(page + 1);
    dispatch(fetchAllMovies({ selectedGenre, page }));
  };

  const handlePrevPage = (e) => {
    setPage(page - 1);
    dispatch(fetchAllMovies({ selectedGenre, page }));
  };

  return (
    <>
      {genres && movieList ? (
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Movies</h2>
            <div>
              {genresLoaded && (
                <select
                  className={styles.genresDropdown}
                  onChange={(e) => {
                    setSelectedGenre(e.target.value);
                  }}
                >
                  {genres.genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className={styles.listWrapper}>
            {movieList.results &&
              movieList.results.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
          </div>
          <div className={styles.paginationWrapper}>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Prev
            </button>
            <div>
              {page} of {movieList.total_pages}
            </div>
            <button
              onClick={handleNextPage}
              disabled={page === movieList.total_pages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="loadingContainer">
          <img src="/src/assets/loading.gif" alt="loading-gif" width="150px" />
        </div>
      )}
    </>
  );
};

export default Movies;
