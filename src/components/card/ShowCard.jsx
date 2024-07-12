import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  addShowsToFavourites,
  removeShowFromFavourites,
} from "../../redux/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

const ShowCard = ({ show }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useDispatch();
  const favouriteShowsList = useSelector((state) => state.favourites.shows);

  const handleFavourite = () => {
    if (!isFavourite) {
      setIsFavourite(true);
      dispatch(addShowsToFavourites(show));
    } else {
      dispatch(removeShowFromFavourites(show.id));
      setIsFavourite(false);
    }
  };

  useEffect(() => {
    if (favouriteShowsList && favouriteShowsList.length > 0) {
      const fav = favouriteShowsList.filter((item) => item.id === show.id);
      if (fav.length > 0) {
        setIsFavourite(true);
      }
    }
  }, [favouriteShowsList]);

  return (
    <div className={styles.card}>
      <Link to={`/explore/show/${show.id}`}>
        <div>
          {show.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`}
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
        <div className={styles.movieTitle}>{show.name}</div>
      </div>
      <div className={styles.cardFooter + " " + styles.cardBody}>
        <div>
          {show.vote_average.toFixed(1)}{" "}
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
        </div>
        <div>
          {show.first_air_date.slice(0, 4)}{" "}
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

export default ShowCard;
