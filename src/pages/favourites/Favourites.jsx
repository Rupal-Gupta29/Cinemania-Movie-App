import React from "react";
import { useSelector } from "react-redux";
import styles from "./favourites.module.css";
import MovieCard from "../../components/card/MovieCard";
import ShowCard from "../../components/card/ShowCard";
import style from "../moviesNshows/moviesNshows.module.css";

const Favourites = () => {
  const data = useSelector((state) => state.favourites);

  return (
    <>
      {data.movies.length > 0 || data.shows.length > 0 ? (
        <div>
          <div className={styles.hearderWrapper}>
            <h2 className={styles.heading}>Your Favourite Picks</h2>
            <h3 className={styles.subHeading}>Movies</h3>
          </div>
          <div className={style.listWrapper}>
            {data &&
              data.movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
          </div>
          <div className={styles.hearderWrapper}>
            <h3 className={styles.subHeading}>Shows</h3>
          </div>
          <div className={style.listWrapper}>
            {data &&
              data.shows.map((show) => <ShowCard show={show} key={show.id} />)}
          </div>
        </div>
      ) : (
        <div className={styles.noFavourites}>
          <h2>No Favourite Picks!</h2>
        </div>
      )}
    </>
  );
};

export default Favourites;
