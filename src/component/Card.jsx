import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const MediaCard = ({ item, isInWishlist, toggleWishlist, type }) => {
  if (!item) {
    return (
      <div className="card bg-card position-relative h-100 border border-custom d-flex flex-column justify-content-center align-items-center">
        <p className="text-muted">No item data available</p>
      </div>
    );
  }

  // const title = type === "movie" ? item.title || item.name : "Untitled Show";

  const title =
    type === "movie"
      ? item.title || "Untitled Movie"
      : item.name || "Untitled Show";

  const linkPath = `/${type}/${item.id || ""}`;

  // const linkPath = item

  return (
    <div className="card bg-card position-relative h-100 border border-custom d-flex flex-column">
      <FontAwesomeIcon
        icon={faHeart}
        className="position-absolute top-0 end-0 m-2 z-1"
        size="lg"
        style={{
          color: isInWishlist ? "#FFC107" : "#666",
          cursor: "pointer",
          transition: "color 0.3s ease",
        }}
        onClick={toggleWishlist}
      />
      <Link to={linkPath} className="text-decoration-none flex-grow-1">
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "/placeholder-image.jpg"
          }
          className="card-img-top text-primary"
          alt={title}
          style={{
            height: "300px",
            objectFit: "contain",
          }}
        />
      </Link>
      <div className="card-body text-center d-flex flex-column">
        <Link to={linkPath} className="text-decoration-none">
          <h5 className="card-title text-primary mb-2">{title}</h5>
        </Link>
        <p className="card-text movie-overview text-light">{item.overview}</p>
      </div>
      <div className="card-footer bg-dark p-2 mt-auto">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-warning">
            <FontAwesomeIcon icon={faStar} className="me-1" />
            {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
          </span>
          <Link
            to={linkPath}
            className="btn btn-warning btn-sm"
            style={{ minWidth: "100px" }}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
