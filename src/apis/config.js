import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/w500';
export { apiUrl, apiKey };

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.params = config.params || {};
    config.params["api_key"] = import.meta.env.VITE_API_KEY;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    alert(error.message);
    console.log(error);
    return Promise.reject(error);
  }
);

export const movieService = {
  getNowPlaying: async (page = 1) => {
    try {
      const response = await axios.get(`${apiUrl}/movie/popular`, {
        params: {
          api_key: apiKey,
          page: page,
          language: 'en-US'
        }
      });
      return {
        ...response.data,
        results: response.data.results.map(movie => ({
          ...movie,
          poster_full_path: `${IMAGE_BASE_PATH}${movie.poster_path}`
        }))
      };
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const [details, recommendations, reviews] = await Promise.all([
        axios.get(`${apiUrl}/movie/${movieId}`, {
          params: { api_key: apiKey, language: 'en-US' }
        }),
        axios.get(`${apiUrl}/movie/${movieId}/recommendations`, {
          params: { api_key: apiKey }
        }),
        axios.get(`${apiUrl}/movie/${movieId}/reviews`, {
          params: { api_key: apiKey }
        })
      ]);

      return {
        details: {
          ...details.data,
          poster_full_path: `${IMAGE_BASE_PATH}${details.data.poster_path}`
        },
        recommendations: recommendations.data.results.map(movie => ({
          ...movie,
          poster_full_path: `${IMAGE_BASE_PATH}${movie.poster_path}`
        })),
        reviews: reviews.data.results
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
};
