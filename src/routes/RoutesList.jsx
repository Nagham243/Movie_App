import { lazy } from "react";
import { Routes, Route } from "react-router";
import Loader from "../component/Common/Loader";
import { Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const MovieList = lazy(() => import("../pages/Movies/MovieList"));
const MovieDetails = lazy(() => import("../pages/Movies/MovieDetails"));
const TVShowList = lazy(() => import("../pages/TVShows/TVShowList"));
const TVShowDetails = lazy(() => import("../pages/TVShows/TVShowDetails"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Search = lazy(() => import("../pages/Search"));
const NotFound = lazy(() => import("../pages/NotFound"));

const RoutesList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/:id" element={<MovieDetails />} />
        <Route path="/tvshowlist" element={<TVShowList />} />
        <Route path="/tvshowlist/:id" element={<TVShowDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default RoutesList;
