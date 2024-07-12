import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  addMovieToFavourites,
  removeMovieFromFavourites,
} from "../../redux/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

const MovieCard = ({ movie }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useDispatch();
  const favouriteMoviesList = useSelector((state) => state.favourites.movies);

  const handleFavourite = () => {
    if (!isFavourite) {
      setIsFavourite(true);
      dispatch(addMovieToFavourites(movie));
    } else {
      dispatch(removeMovieFromFavourites(movie.id));
      setIsFavourite(false);
    }
  };

  useEffect(() => {
    if (favouriteMoviesList && favouriteMoviesList.length > 0) {
      const fav = favouriteMoviesList.filter((item) => item.id === movie.id);
      if (fav.length > 0) {
        setIsFavourite(true);
      }
    }
  }, [favouriteMoviesList]);

  return (
    <div className={styles.card}>
      <Link to={`/explore/movie/${movie.id}`}>
        <div>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt=""
              className={styles.cardImg}
            />
          ) : (
            <img
              src="/src/assets/no-poster.png"
              alt="no-poster available"
              width={100}
              style={{ marginTop: "50%" }}
            />
          )}
        </div>
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.movieTitle}>{movie.title}</div>
      </div>
      <div className={styles.cardFooter + " " + styles.cardBody}>
        <div>
          {movie.vote_average.toFixed(1)}{" "}
          <FontAwesomeIcon icon={faStar} className={styles.ratingIcon} />
        </div>
        <div>
          {movie.release_date.slice(0, 4)}{" "}
          <FontAwesomeIcon
            icon={faHeart}
            className={isFavourite ? styles.favIcon : styles.heartIcon}
            onClick={handleFavourite}
            title="Add to Favourites"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
