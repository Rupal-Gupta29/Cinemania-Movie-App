import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./castCarousel.module.css";

const CastCarousel = ({ castList }) => {
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
        {castList &&
          castList.map((cast) => {
            let profile;
            if (!cast.profile_path) {
              profile = "/src/assets/avatar.png";
            } else {
              profile = `https://image.tmdb.org/t/p/w200/${cast.profile_path}`;
            }
            return (
              <div key={cast.id}>
                <img src={profile} alt="" className={styles.card} />
                <p>{cast.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CastCarousel;
