import React, { useEffect, useState } from "react";
import { MediaCard } from "../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchList } from "../store/slice/WatchList";
import {
  faSearch,
  faTimesCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

export default function watchList() {
  const [loading, setLoading] = useState(true);
  const watchList = useSelector((state) => state.WatchList.myList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (watchList.length > 0) {
      setLoading(true);
      return () => {
        setLoading(false);
      };
    }
  }, [watchList]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <div className="input-group w-50">
          <span className="input-group-text bg-dark text-white">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
          />
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faUndo} /> Reset
          </button>
        </div>
      </div>

      <div className="row">
        {watchList.length > 0 ? (
          watchList.map((movie) => (
            // conditions to check for whether iths a movie or a tv show
            <div key={movie.id} className="col-md-3 mb-4">
              <MediaCard
                item={movie}
                isInWishlist={watchList.some((m) => m.id === movie.id)}
                toggleWishlist={() => {
                  if (watchList.some((m) => m.id === movie.id)) {
                    if (
                      confirm(
                        "Are you sure you want to remove this movie from watch list?"
                      )
                    ) {
                      dispatch(toggleWatchList(movie));
                    }
                  }
                }}
                type={
                  movie.last_air_date || movie.first_air_date ? "tv" : "movie"
                } // used in routing
              />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <FontAwesomeIcon
              icon={faTimesCircle}
              size="3x"
              className="mb-2 text-danger"
            />
            <p className="text-danger fw-bolder">Your Watch List Is Empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
