import { Link } from "react-router-dom"; // Correct import
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../context/LanguageContext";

export const Header = () => {
  const counter = useSelector((state) => state.counter);
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#FFD700" }}> 
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          🎬 Movie App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold btn btn-outline-warning me-4" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold btn btn-outline-warning me-4" to="/movielist">
                Movie List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold btn btn-outline-warning me-4" to="/tvshowlist">
                TV Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold btn btn-outline-warning me-4" to="/about">
                About Us
              </Link>
            </li>

            <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                🌍 Language
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => handleLanguageChange("en")} disabled={language === "en"}>
                    English
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleLanguageChange("ar")} disabled={language === "ar"}>
                    Arabic
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleLanguageChange("fr")} disabled={language === "fr"}>
                  Français
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleLanguageChange("zh")} disabled={language === "zh"}>
                    Chinese
                  </button>
                </li>
              </ul>
            </li>

            <li className="nav-item ms-3 position-relative">
              <Link className="nav-link text-dark" to="/cart">
              <FontAwesomeIcon icon={faHeart} size="lg" color="yellow" />
                {counter.value > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {counter.value}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
