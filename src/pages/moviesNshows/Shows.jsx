import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenres, fetchAllShows } from "../../redux/showsSlice";
import styles from "./moviesNshows.module.css";
import ShowCard from "../../components/card/ShowCard";

const Movies = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("10759");
  const { genres, showList } = useSelector((state) => {
    return state.shows;
  });

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, []);

  useEffect(() => {
    dispatch(fetchAllShows({ selectedGenre, page }));
  }, [selectedGenre, page]);

  const handleNextPage = (e) => {
    setPage(page + 1);
    dispatch(fetchAllShows({ selectedGenre, page }));
  };

  const handlePrevPage = (e) => {
    setPage(page - 1);
    dispatch(fetchAllShows({ selectedGenre, page }));
  };

  return (
    <>
      {genres && showList ? (
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Shows</h2>
            <div>
              {genres.genres && (
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
            {showList.results &&
              showList.results.map((show) => (
                <ShowCard show={show} key={show.id} />
              ))}
          </div>
          <div className={styles.paginationWrapper}>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Prev
            </button>
            <div>
              {page} of {showList.total_pages}
            </div>
            <button
              onClick={handleNextPage}
              disabled={page === showList.total_pages}
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
