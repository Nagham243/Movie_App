import React from "react";
import { Link } from "react-router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Userlanguage from "../../context/language";
export const Header = () => {
  const counter = useSelector((state) => state.counter);
  const { language, setLanguage } = useContext(Userlanguage);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <>
      <nav
        className="navbar navbar-dark fixed-top"
        style={{
          backgroundColor: "rgb(125, 28, 74)",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Movie App
          </a>
          <span className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </span>
          <span className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/movielist"
            >
              Movie List
            </Link>
          </span>
          <span className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/tvshowlist"
            >
              TVshow List
            </Link>
          </span>
          <span className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/about">
              About Us
            </Link>
          </span>
          <Link
            className="nav-link active"
            to="/Cart"
            style={{
              border: "none",
              backgroundColor: "transparent",
              position: "relative", // Position relative for absolute positioning of the counter
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: "white" }} />
            <span
              style={{
                color: "white",
                fontSize: "0.8rem", // Make the number smaller
                position: "absolute", // Position absolute to move it
                top: "-10px", // Move it to the upper top
                right: "-10px", // Adjust position to the right
                backgroundColor: " rgb(86, 2, 31)", // Add background for better visibility
                borderRadius: "70%", // Make it circular
                padding: "2px 5px", // Add padding for better appearance
              }}
            >
              {counter.value}
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end "
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
            style={{ backgroundColor: "rgb(125, 28, 74)" }}
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title"
                id="offcanvasDarkNavbarLabel"
                style={{
                  color: "white",
                }}
              >
                Movie App
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item dropdown">
                  <div className="nav-link">
                    <label
                      htmlFor="language-select"
                      style={{ marginRight: "10px", color: "white" }}
                    >
                      Language:
                    </label>
                    <select
                      id="language-select"
                      value={language}
                      onChange={handleLanguageChange}
                      className="form-select form-select-sm bg-light   "
                      style={{
                        display: "inline-block",
                        width: "auto",
                        color: "black",
                      }}
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
