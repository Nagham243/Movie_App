import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../apis/config"
import { MediaCard } from "../../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "../../context/PaginationContext";
import { useLanguage } from "../../context/LanguageContext";
import ReactPaginate from 'react-paginate';
import Search from "../Search";

export default function Home() {
  const { language } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { 
    page, 
    totalPages, 
    setTotalPages, 
    searchQuery, 
    setSearchQuery,
    debouncedQuery,
    resetSearch,
    onPageChange 
  } = usePagination();

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
  }, [debouncedQuery, page, setTotalPages]);

  const fetchMovies = (page) => {
    setLoading(true);
    axiosInstance
      .get("/movie/now_playing", { params: { ...(language && { language }),
      page, 
    },})
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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <Search 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetSearch={resetSearch}
      />

      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <MediaCard
                item={movie}
                isInWishlist={wishlist.some((m) => m.id === movie.id)}
                toggleWishlist={() => toggleWishlist(movie)}
                type="movie"
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
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"previous"}
            nextClassName={"next"}
            disabledClassName={"disabled"}
            forcePage={page - 1}
          />
        </div>
      )}
    </div>
  );
}
