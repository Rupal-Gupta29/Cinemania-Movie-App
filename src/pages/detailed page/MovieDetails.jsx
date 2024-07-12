import React, { useEffect, useState } from "react";
import {
  fetchMovieOrShowDetails,
  removeSelectedMovieOrShow,
} from "../../redux/selectedMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import CastCarousel from "../../components/castCarousel/CastCarousel";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.selectedMovieOrshow);
  const duration = (Number(data.runtime) / 60).toFixed(1).split(".");
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    dispatch(fetchMovieOrShowDetails({ type: "movie", id: id }));

    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, []);

  useEffect(() => {
    if (data.videos) {
      let videosData = data.videos.results;
      let trailerData = videosData.filter((video) =>
        video.name.toLocaleLowerCase().includes("Trailer".toLocaleLowerCase())
      );
      if (trailerData.length > 0) {
        setTrailerKey(trailerData[0].key);
      } else {
        setTrailerKey("");
      }
    }
  }, [data]);

  return (
    <>
      {Object.keys(data).length > 1 ? (
        <div className={styles.detailsPageContainer}>
          <div className={styles.containerHeader}>
            <div className={styles.posterWrapper}>
              {data.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                  alt={data.name}
                />
              ) : (
                <img
                  src="/src/assets/no-poster.png"
                  alt="no-poster available"
                />
              )}
            </div>
            <div>
              <div className={styles.detailsHeader}>
                <div className={styles.movieTitle}>{data.title}</div>
                <div className={styles.genresWrapper}>
                  {data.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
              </div>
              <p className={styles.tagLine}>{data.tagline}</p>
              <div className={styles.infoWrapper}>
                <span className={styles.divider}>
                  Rating: {data.vote_average.toFixed(1)}+{" "}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                </span>
                <span className={styles.divider}>
                  Vote Count: {data.vote_count}
                </span>
                <span>
                  Duration : {duration[0]}h {duration[1]}m
                </span>
              </div>
              <p>Overview: {data.overview}</p>
              <div className={styles.statusInfo}>
                <p>Status: {data.status}</p>
                <p>Release Date: {data.release_date}</p>
              </div>
            </div>
          </div>
          <h2>Watch Trailer</h2>
          {trailerKey ? (
            <div className={styles.trailerWrapper}>
              <YouTube videoId={trailerKey} />
            </div>
          ) : (
            <div className={styles.unavailableContainer}>
              <FontAwesomeIcon
                icon={faVideoSlash}
                className={styles.noVideoIcon}
              />
              <p>Trailer Unavailable!</p>
            </div>
          )}
          <h3>Top Cast</h3>
          <CastCarousel castList={data.credits.cast} />
        </div>
      ) : (
        <div className="loadingContainer">
          <img src="/src/assets/loading.gif" alt="loading-gif" width="150px" />
        </div>
      )}
    </>
  );
};

export default MovieDetails;
