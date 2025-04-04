import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchList } from "../../store/slice/WatchList";
import { axiosInstance } from "../../apis/config";
import { MediaCard } from "../../component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {
  faTimesCircle,
  faChevronLeft,
  faChevronRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "../../context/PaginationContext";
import ReactPaginate from "react-paginate";
import Search from "../Search";
import Loader from "../../component/Common/Loader";

export default function TVShows() {
  const [featuredShows, setFeaturedShows] = useState([]);
  const [regularShows, setRegularShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const featuredScrollRef = useRef(null);
  const { language } = useLanguage();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const {
    page,
    totalPages,
    setTotalPages,
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    setDebouncedQuery,
    resetSearch,
    onPageChange,
  } = usePagination();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  //scroll items
  useEffect(() => {
    const fetchFeaturedShows = async () => {
      try {
        const response = await axiosInstance.get("/tv/popular", {
          params: { ...(language && { language }), page: 1 },
        }); 
        setFeaturedShows(response.data.results.slice(0, 30));
      } catch (error) {
        console.error("Error fetching featured shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedShows();
  }, [language]);

  //end of scroll item
  // Fetch regular shows (main list)
  useEffect(() => {
    // if theire is search
    if (debouncedQuery) {
      setLoading(true);
      axiosInstance
        .get("/search/tv", { params: { query: debouncedQuery, page } })
        .then((response) => {
          setRegularShows(response.data.results);
          setTotalPages(Math.min(response.data.total_pages, 1000));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      fetchRegularShows(page);
    }
  }, [debouncedQuery, page, setTotalPages]);


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

  const fetchRegularShows = (page) => {
    setLoading(true);
    axiosInstance
      .get("/tv/popular", { params: { page } })
      .then((response) => {
        setRegularShows(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setError("Invalid page number requested");
          onPageChange(1);
          fetchRegularShows(1);
        } else {
          setError(error.message);
        }
        setLoading(false);
      });
  };

  const scrollFeatured = (direction) => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  const watchList = useSelector((state) => state.WatchList.myList);
  const dispatch = useDispatch();

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetSearch={resetSearch}
      />

      {/* Featured Shows Horizontal Scroll */}
      {!debouncedQuery && (
        <section className="mb-5 position-relative">
          <h2 className="mb-3"> Top Tv Shows</h2>

          {!loading.featured && (
            <>
              <button
                onClick={() => scrollFeatured("left")}
                className="position-absolute start-0 top-50 translate-middle-y btn btn-dark rounded-circle z-1"
                style={{ width: "40px", height: "40px" }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <div
                ref={featuredScrollRef}
                className="d-flex overflow-auto scrollbar-hidden py-3"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {featuredShows.map((show) => (
                  <div
                    key={show.id}
                    className="flex-shrink-0 me-3"
                    style={{ width: "250px", scrollSnapAlign: "start" }}
                  >
                    <MediaCard
                      item={show}
                      isInWishlist={watchList.some((m) => m.id === show.id)}
                      toggleWishlist={() => dispatch(toggleWatchList(show))}
                      type="tv"
                    />{" "}
                    {/* import main card and give it item show */}
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollFeatured("right")}
                className="position-absolute end-0 top-50 translate-middle-y btn btn-dark rounded-circle z-1"
                style={{ width: "40px", height: "40px" }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}
        </section>
      )}

      {/* Main TV Shows List */}
      <h2 className="mb-3">
        {debouncedQuery ? "Search Results" : "All TV Shows"}
      </h2>

      {loading && <Loader />}

      <>
        <div className="row">
          {regularShows.length > 0 ? (
            regularShows.map((show) => (
              <div key={show.id} className="col-md-3 mb-4">
                <MediaCard
                  item={show}
                  isInWishlist={watchList.some((m) => m.id === show.id)}
                  toggleWishlist={() => dispatch(toggleWatchList(show))}
                  type="tv" // used in routing
                />
              </div>
            ))
          ) : (
            <div className="text-center text-muted py-5">
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="3x"
                className="mb-3 text-danger"
              />
              <h4 className="text-danger">No TV shows found</h4>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!debouncedQuery && totalPages > 1 && (
          <div className="pagination-container mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={onPageChange}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              activeClassName={"active"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
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
      </>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
