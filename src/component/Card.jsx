import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

export const MovieCard = ({ movie, isInWishlist, toggleWishlist }) => {
  return (
    <div className="card position-relative" style={{ width: "100%", height: "100%" }}>
      {/* Wishlist Heart Icon */}
      <FontAwesomeIcon
        icon={faHeart}
        className="position-absolute top-0 end-0 m-2"
        size="lg"
        style={{
          color: isInWishlist ? "yellow" : "gray",
          cursor: "pointer",
        }}
        onClick={toggleWishlist}
      />

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="card-img-top"
        alt={movie.title}
        style={{ height: "500px", objectFit: "cover" }}
      />

      <div className="card-body text-center" style={{ backgroundColor: "#eee" }}>
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text"><FontAwesomeIcon icon={faStar} color="yellow" /> {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};
