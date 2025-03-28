import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../../apis/config";
import Loader from "../../component/Common/Loader"; 
import { Link } from "react-router";



const TVShowDetails = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      axiosInstance
            .get(`/tv/${id}`)
      .then((resp) => {
        setTVShow(resp.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 bg-dark text-light rounded-5 fs-5">

        {tvShow.backdrop_path && (
          <div
            className="tv-show-backdrop text-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${tvShow.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              height: "350px",
            }}
          ></div>
        )}

        <div className="row mt-4">

          <div className="col-md-4 text-center">
            {tvShow.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                className="img-fluid rounded"
                alt={tvShow.name}
              />
            ) : (
              <p className="text-muted">No image available</p>
            )}
          </div>


          <div className="col-md-8">
          <h2 className="mb-3">
            <i className="fas fa-tv me-2"></i> {tvShow.name}
          </h2>
            <p className="text-muted">{tvShow.tagline}</p>
            <p>
              <i className="fas fa-align-left me-2 text-secondary"></i>
              <strong>Overview:</strong> {tvShow.overview || "No description available"}
            </p>

            <p>
                <i className="fas fa-calendar-alt me-2 text-primary"></i>
                <strong>First Air Date:</strong> {tvShow.first_air_date || "N/A"}
              </p>
              <p>
                <i className="fas fa-clock me-2 text-danger"></i>
                <strong>Last Air Date:</strong> {tvShow.last_air_date || "N/A"}
              </p>
              <p>
                <i className="fas fa-info-circle me-2 text-warning"></i>
                <strong>Status:</strong> {tvShow.status || "N/A"}
              </p>


            {tvShow.genres?.length > 0 && (
              <p>
               <i className="fas fa-tags me-2 text-info"></i>
                <strong>Genres:</strong>{" "}
                {tvShow.genres.map((genre) => (
                  <span key={genre.id} className="badge bg-info me-2">
                    {genre.name}
                  </span>
                ))}
              </p>
            )}


            {tvShow.networks?.length > 0 && (
              <p>
               <i className="fas fa-broadcast-tower me-2 text-danger"></i>
                <strong>Networks:</strong>{" "}
                {tvShow.networks.map((network) => (
                  <span key={network.id} className="badge bg-warning me-2">
                    {network.name}
                  </span>
                ))}
              </p>
            )}


              <p>
                <i className="fas fa-layer-group me-2 text-info"></i>
                <strong>Seasons:</strong> {tvShow.number_of_seasons || "N/A"} |{" "}
                <strong>Episodes:</strong> {tvShow.number_of_episodes || "N/A"}
              </p>


              <p>
                <i className="fas fa-star text-warning me-2"></i>
                <strong>Rating:</strong> {tvShow.vote_average || "N/A"} / 10 
                <span className="text-muted"> ({tvShow.vote_count || 0} votes)</span>
              </p>


            {tvShow.production_companies?.length > 0 && (
              <p>
                <strong>Production Companies:</strong>{" "}
                {tvShow.production_companies.map((company) => (
                  <span key={company.id} className="badge bg-secondary me-2">
                    {company.name}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">

        <Link to="/tvshowlist" className="btn btn-secondary">
              <i className="fas fa-arrow-left me-2"></i> Back to TV Shows List
            </Link>

          <button className="btn btn-primary">
            <i className="far fa-heart me-2"></i> Add to Watchlist
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default TVShowDetails;
