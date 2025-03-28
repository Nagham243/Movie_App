import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchList } from "../../store/slice/WatchList";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import { movieService } from "../../apis/config.js";
import { MediaCard } from "../../component/Card";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendar,
  faFilm,
  faLanguage,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const watchList = useSelector((state) => state.WatchList.myList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await movieService.getMovieDetails(id);
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const truncateReview = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark-bg">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark-bg text-primary">
        Movie not found
      </div>
    );
  }

  const { details, recommendations, reviews } = movieDetails;
  const InWishlist = watchList.some((movie) => movie.id === details.id);

  return (
    <Container fluid className="bg-dark-bg text-primary py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="mb-4">
          <Col md={4} className="text-center position-relative">
            <div className="movie-poster-container position-relative">
              <img
                src={details.poster_full_path}
                alt={details.title}
                className="img-fluid rounded shadow-lg"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <FontAwesomeIcon
                icon={faHeart}
                className="position-absolute top-0 end-0 m-2 z-1"
                size="lg"
                style={{
                  color: InWishlist ? "#FFC107" : "#666",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onClick={() => dispatch(toggleWatchList(details))}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="movie-info-container bg-dark p-4 rounded">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="text-white mb-0">{details.title}</h1>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="star-rating me-3">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        color={
                          ratingValue <= Math.round(details.vote_average / 2)
                            ? "#FFC107"
                            : "#e4e5e9"
                        }
                        className="me-1"
                      />
                    );
                  })}
                </div>
                <span className="text-white">({details.vote_average}/10)</span>
              </div>

              <p className="text-secondary mb-4">{details.overview}</p>

              <div className="movie-meta d-flex justify-content-between">
                <div>
                  <div className="mb-2">
                    <strong className="text-warning me-2">Release Date:</strong>
                    <span className="text-white">{details.release_date}</span>
                  </div>
                  <div>
                    <strong className="text-warning me-2">Genres:</strong>
                    <span className="text-white">
                      {details.genres.map((g) => g.name).join(", ")}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <strong className="text-warning me-2">Runtime:</strong>
                    <span className="text-white">{details.runtime} mins</span>
                  </div>
                  <div>
                    <strong className="text-warning me-2">Language:</strong>
                    <span className="text-white">
                      {details.original_language.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Tabs defaultActiveKey="details" className="mb-3 custom-tabs">
          <Tab
            eventKey="details"
            title="Details"
            className="bg-card p-3 rounded"
          >
            <h3 className="text-secondary mb-3">Additional Information</h3>
            <Row>
              <Col>
                <p>
                  <strong className="text-warning">Runtime:</strong>{" "}
                  {details.runtime} minutes
                </p>
                <p>
                  <strong className="text-warning">Status:</strong>{" "}
                  {details.status}
                </p>
              </Col>
              <Col>
                <p>
                  <strong className="text-warning">Budget:</strong> $
                  {details.budget.toLocaleString()}
                </p>
                <p>
                  <strong className="text-warning">Revenue:</strong> $
                  {details.revenue.toLocaleString()}
                </p>
              </Col>
            </Row>
          </Tab>

          <Tab
            eventKey="reviews"
            title="Reviews"
            className="bg-card p-3 rounded"
          >
            {reviews.length > 0 ? (
              <div className="row g-3">
                {reviews.map((review) => (
                  <div key={review.id} className="col-12">
                    <Card className="mb-3 bg-secondary text-primary h-100">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-secondary mb-2">
                          {review.author}
                        </Card.Title>
                        <Card.Text className="flex-grow-1">
                          {expandedReviewId === review.id
                            ? review.content
                            : truncateReview(review.content)}
                        </Card.Text>
                        {review.content.length > 200 && (
                          <div className="mt-2">
                            <button
                              className="btn btn-link p-0 text-primary"
                              onClick={() => toggleReviewExpansion(review.id)}
                            >
                              {expandedReviewId === review.id
                                ? "See Less"
                                : "See More"}
                            </button>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-secondary">No reviews available</p>
            )}
          </Tab>
        </Tabs>

        <h2 className="text-primary mb-4 mt-3">Recommended Movies</h2>
        <Row xs={1} md={4} className="g-4">
          {recommendations.length > 0 ? (
            recommendations.slice(0, 4).map((movie) => (
              <Col key={movie.id}>
                <MediaCard
                  item={movie}
                  isInWishlist={watchList.some((m) => m.id === movie.id)}
                  toggleWishlist={() => dispatch(toggleWatchList(movie))}
                  type="movie"
                />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-secondary">No recommendations available</p>
            </Col>
          )}
        </Row>
      </motion.div>
    </Container>
  );
};

export default MovieDetailsPage;
