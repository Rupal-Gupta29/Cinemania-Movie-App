import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchedMovieOrShow } from "../../redux/searchSlice";
import styles from "./search.module.css";
import { Link } from "react-router-dom";
import paginationStyles from "../moviesNshows/moviesNshows.module.css";

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const searchedData = useSelector((state) => state.search);
  let keyword = location.state.keyword;

  useEffect(() => {
    dispatch(fetchSearchedMovieOrShow({ keyword, page }));
  }, [keyword]);

  const handleNextPage = (e) => {
    setPage(page + 1);
    dispatch(fetchSearchedMovieOrShow({ keyword, page }));
  };

  const handlePrevPage = (e) => {
    setPage(page - 1);
    dispatch(fetchSearchedMovieOrShow({ keyword, page }));
  };

  return (
    <>
      {searchedData.results ? (
        <div className={styles.searchSection}>
          <h1 className={styles.searchHeading}>Search "{keyword}"</h1>
          <div className={styles.cardsWrapper}>
            {searchedData.results.map((item) => {
              let media = item.media_type;
              if (media === "movie" || media === "tv") {
                media = media === "movie" ? "movie" : "show";
                return (
                  <Link
                    to={`/explore/${media}/${item.id}`}
                    className={styles.searchCard}
                    key={item.id}
                  >
                    <div>
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                          alt=""
                          className={styles.posterImg}
                        />
                      ) : (
                        <img
                          src="/src/assets/no-poster.png"
                          alt=""
                          className={styles.noPosterImg}
                        />
                      )}
                    </div>
                    <div>
                      <h3>{item.name || item.title}</h3>
                      <p>{item.first_air_date || item.release_date}</p>
                    </div>
                  </Link>
                );
              }
            })}
            <div className={paginationStyles.paginationWrapper}>
              <button disabled={page === 1} onClick={handlePrevPage}>
                Prev
              </button>
              <div>
                {page} of {searchedData.total_pages}
              </div>
              <button
                disabled={page === searchedData.total_pages}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
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

export default Search;
