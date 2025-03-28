import React, { useEffect, useState } from "react";
import { MediaCard } from "../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchList } from "../store/slice/WatchList";
import {
  faSearch,
  faTimesCircle,
  faUndo,
  faFilm,
  faTv
} from "@fortawesome/free-solid-svg-icons";

export default function WatchList() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); 
  const watchList = useSelector((state) => state.WatchList.myList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (watchList.length > 0) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [watchList]);

  const filteredWatchList = watchList.filter((item) => {
    const isMovie = !(item.last_air_date || item.first_air_date);
    const typeMatch = 
      filter === "all" || 
      (filter === "movies" && isMovie) || 
      (filter === "tv" && !isMovie);
    
    const searchMatch = 
      searchTerm === "" || 
      (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilter("all");
  };

  const getMediaTypeLabel = (item) => {
    return item.last_air_date || item.first_air_date ? "TV Show" : "Movie";
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Watchlist</h2>
      
      {/* <div className="d-flex justify-content-center mb-4">
        <div className="input-group w-75">
          <span className="input-group-text bg-dark text-white">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search your watchlist..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button 
            className="btn btn-danger"
            onClick={resetFilters}
          >
            <FontAwesomeIcon icon={faUndo} /> Reset
          </button>
        </div>
      </div> */}

      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <button
            className={`btn ${filter === "all" ? "btn-warning" : "btn-dark"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "movies" ? "btn-warning" : "btn-dark"}`}
            onClick={() => setFilter("movies")}
          >
            <FontAwesomeIcon icon={faFilm} className="me-1" /> Movies
          </button>
          <button
            className={`btn ${filter === "tv" ? "btn-warning" : "btn-dark"}`}
            onClick={() => setFilter("tv")}
          >
            <FontAwesomeIcon icon={faTv} className="me-1" /> TV Shows
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredWatchList.length > 0 ? (
            filteredWatchList.map((item) => (
              <div key={item.id} className="col-md-3 mb-4">
                <div className="position-relative">
                  <MediaCard
                    item={item}
                    isInWishlist={true}
                    toggleWishlist={() => {
                      if (confirm("Are you sure you want to remove this from your watchlist?")) {
                        dispatch(toggleWatchList(item));
                      }
                    }}
                    type={item.last_air_date || item.first_air_date ? "tv" : "movie"}
                  />
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className={`badge ${item.last_air_date || item.first_air_date ? "bg-info" : "bg-warning"}`}>
                      {item.last_air_date || item.first_air_date ? (
                        <><FontAwesomeIcon icon={faTv} className="me-1" /> TV-Show</>
                      ) : (
                        <><FontAwesomeIcon icon={faFilm} className="me-1" /> Movie</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 text-muted">
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="3x"
                className="mb-3 text-danger"
              />
              {watchList.length > 0 ? (
                <p className="fw-bold">No matches found. Try adjusting your filters.</p>
              ) : (
                <div>
                  <p className="text-danger fw-bold fs-4">Your Watchlist Is Empty</p>
                  <p>Add movies and TV shows to your watchlist to see them here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {filteredWatchList.length > 0 && (
        <div className="mt-3 mb-5 text-center">
          <p className="text-muted">
            Showing {filteredWatchList.length} of {watchList.length} items in your watchlist
          </p>
        </div>
      )}
    </div>
  );
}
