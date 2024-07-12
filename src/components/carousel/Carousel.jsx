import React, { useRef } from "react";
import styles from "./carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Carousel = ({ items, type }) => {
  const cardsWrapperRef = useRef();

  const handlePrevClick = () => {
    let width = cardsWrapperRef.current.clientWidth;
    cardsWrapperRef.current.scrollLeft =
      cardsWrapperRef.current.scrollLeft - width;
  };

  const handleNextClick = () => {
    let width = cardsWrapperRef.current.clientWidth;
    cardsWrapperRef.current.scrollLeft =
      cardsWrapperRef.current.scrollLeft + width;
  };

  return (
    <div className={styles.carousel}>
      <FontAwesomeIcon
        icon={faCircleChevronLeft}
        className={styles.carouselPrevBtn}
        onClick={handlePrevClick}
      />
      <FontAwesomeIcon
        icon={faCircleChevronRight}
        className={styles.carouselNextBtn}
        onClick={handleNextClick}
      />

      <div className={styles.cardsWrapper} ref={cardsWrapperRef}>
        {items &&
          items.map((item) => (
            <div key={item.id}>
              <Link to={`/explore/${type}/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                  alt=""
                  className={styles.card}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
