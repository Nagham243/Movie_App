import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { MovieCard } from "../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      axiosInstance
        .get("/search/movie", { params: { query: debouncedQuery } })
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      fetchMovies(page);
    }
  }, [debouncedQuery, page]);

  const fetchMovies = (page) => {
    setLoading(true);
    axiosInstance
      .get("/movie/now_playing", { params: {  ...(language && { language }),  
      page, } })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page, language]);

  const toggleWishlist = (movie) => {
    setWishlist((prevWishlist) =>
      prevWishlist.some((m) => m.id === movie.id)
        ? prevWishlist.filter((m) => m.id !== movie.id)
        : [...prevWishlist, movie]
    );
  };

  const resetSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    fetchMovies(page);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="btn btn-danger" onClick={resetSearch}>
              <FontAwesomeIcon icon={faUndo} /> Reset
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <MovieCard
                movie={movie}
                isInWishlist={wishlist.some((m) => m.id === movie.id)}
                toggleWishlist={() => toggleWishlist(movie)}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <FontAwesomeIcon icon={faTimesCircle} size="3x" className="mb-2 text-danger" />
            <p className="text-danger fw-bolder">No movies found.</p>
          </div>
        )}
      </div>

      {!searchQuery && (
        <div className="d-flex justify-content-center my-4">
          <button
            className="btn btn-primary mx-2"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="align-self-center"> Page {page} of {totalPages} </span>
          <button
            className="btn btn-primary mx-2"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
