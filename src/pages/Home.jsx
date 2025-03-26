import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { MovieCard } from "../component/Card";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  // Fetch movies from API
  const fetchMovies = (page) => {
    setLoading(true);
    axiosInstance
      .get("/movie/now_playing", { params: { page } })
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
  }, [page]);

  // Toggle wishlist function
  const toggleWishlist = (movie) => {
    setWishlist((prevWishlist) =>
      prevWishlist.some((m) => m.id === movie.id)
        ? prevWishlist.filter((m) => m.id !== movie.id)
        : [...prevWishlist, movie]
    );
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <MovieCard
              movie={movie}
              isInWishlist={wishlist.some((m) => m.id === movie.id)}
              toggleWishlist={() => toggleWishlist(movie)}
            />
          </div>
        ))}
      </div>

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
    </div>
  );
}
