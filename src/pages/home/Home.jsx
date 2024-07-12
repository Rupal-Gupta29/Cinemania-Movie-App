import React, { useState, useEffect } from "react";
import {
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchOnTheAirShows,
  fetchTopRatedShows,
} from "../../redux/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.css";
import Carousel from "../../components/carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);
  const [heroBanner, setHeroBanner] = useState({});

  const getRandomNo = () => {
    return Math.floor(Math.random() * 20);
  };

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchOnTheAirShows());
    dispatch(fetchTopRatedShows());
  }, []);

  useEffect(() => {
    if (data.topRatedMovies.results && data.topRatedMovies.results.length > 0) {
      setHeroBanner(data.topRatedMovies.results[getRandomNo()]);
    }
  }, [data.topRatedMovies.results]);

  return (
    <>
      {Object.keys(data).length ? (
        <>
          <div className={styles.heroContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${heroBanner.backdrop_path}`}
              alt=""
              className={styles.heroImage}
            />
            <div className={styles.heroText}>
              <div className={styles.detailsWrapper}>
                <h3 className={styles.heroHeading}>{heroBanner.title}</h3>
                <p>{heroBanner.overview}</p>
              </div>
            </div>
          </div>
          <div className={styles.detailsWrapperMobile}>
            <h3 className={styles.heroHeading}>{heroBanner.title}</h3>
            <p>{heroBanner.overview}</p>
          </div>
          <div className={styles.containment}>
            <h2 className={styles.heading}>
              Movies <FontAwesomeIcon icon={faChevronRight} />
            </h2>
            <h4 className={styles.subHeading}>Top Rated</h4>
            <Carousel items={data.topRatedMovies.results} type="movie" />
            <h4 className={styles.subHeading}>Upcoming</h4>
            <Carousel items={data.upcomingMovies.results} type="movie" />
            <h2 className={styles.heading}>
              Shows <FontAwesomeIcon icon={faChevronRight} />
            </h2>
            <h4 className={styles.subHeading}>Top Rated</h4>
            <Carousel items={data.topRatedShows.results} type="show" />
            <h4 className={styles.subHeading}>On The Air</h4>
            <Carousel items={data.onTheAirShows.results} type="show" />
          </div>
        </>
      ) : (
        <div className="loadingContainer">
          <img src="/src/assets/loading.gif" alt="loading-gif" width="150px" />
        </div>
      )}
    </>
  );
};

export default Home;
