import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search", { state: { keyword } });
    setKeyword("");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <NavLink to={"/"} className={styles.logo + " " + styles.navItem}>
            Cinemania
          </NavLink>
        </div>
        <div className={styles.navItemsWrapper}>
          <div className={styles.navLinksWrapper}>
            <div className={styles.inpWrapper}>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                className={styles.searchInp}
              />
              <button onClick={handleSearch} className={styles.searchBtn}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <NavLink
              to={"/movies"}
              className={(status) => {
                if (status.isActive) {
                  return styles.navItem + " " + styles.activeItem;
                }
                return styles.navItem;
              }}
            >
              Movies
            </NavLink>
            <NavLink
              to={"/shows"}
              className={(status) => {
                if (status.isActive) {
                  return styles.navItem + " " + styles.activeItem;
                }
                return styles.navItem;
              }}
            >
              Shows
            </NavLink>
            <NavLink
              to={"/favourites"}
              className={(status) => {
                if (status.isActive) {
                  return styles.navItem + " " + styles.activeItem;
                }
                return styles.navItem;
              }}
            >
              <FontAwesomeIcon icon={faHeart} title="See Favourites" />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
