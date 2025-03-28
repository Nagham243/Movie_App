import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchList } from "../../store/slice/WatchList";
import { axiosInstance } from "../../apis/config";
import { MediaCard } from "../../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle , faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "../../context/PaginationContext";
import { useLanguage } from "../../context/LanguageContext";
import ReactPaginate from "react-paginate";
import Search from "../Search";

export default function Home() {
  const { language } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const {
    page,
    totalPages,
    setTotalPages,
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    resetSearch,
    onPageChange,
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
      .get("/movie/now_playing", {
        params: { ...(language && { language }), page },
      })
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleWishlist = (movie) => {
    setWishlist((prevWishlist) =>
      prevWishlist.some((m) => m.id === movie.id)
        ? prevWishlist.filter((m) => m.id !== movie.id)
        : [...prevWishlist, movie]
    );
  };

  const watchList = useSelector((state) => state.WatchList.myList);
  const dispatch = useDispatch();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-danger">Error: {error}</div>;

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
                isInWishlist={watchList.some((m) => m.id === movie.id)}
                toggleWishlist={() => dispatch(toggleWatchList(movie))}
                type="movie"
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

        {showScrollButton && (
                <button 
                  onClick={scrollToTop}
                  style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#ffc107',
                    color: '#000000',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                  }}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
              )}

    </div>
  );
}

// <div className="row">
//   {movies.length > 0 ? (
//     movies.map((movie) => (
//       <div key={movie.id} className="col-md-3 mb-4">
//         <MovieCard
//           movie={movie}
//           isInWishlist={watchList.some((m) => m.id === movie.id)}
//           toggleWishlist={() => dispatch(toggleWatchList(movie))}
//         />
//       </div>
//     ))
//   ) : (
//     <div className="text-center text-muted">
//       <FontAwesomeIcon
//         icon={faTimesCircle}
//         size="3x"
//         className="mb-2 text-danger"
//       />
//       <p className="text-danger fw-bolder">No movies found.</p>
//     </div>
//   )}
// </div>;
