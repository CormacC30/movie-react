import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MediaPage from "./pages/mediaDetailsPage";
import FavouriteMediaPage from "./pages/favouriteMediaPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MediaContextProvider from "./contexts/mediaContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TopRatedMoviesPage from "./pages/topRatedPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MediaContextProvider>
          <Routes>
            <Route path="/toprated" element={<TopRatedMoviesPage />} />
            <Route path="/review/:type/:id" element={<AddMovieReviewPage />} /> { /* adding the type as a parameter in the url, type prop needed to discern movie vs tv  */}
            <Route path="/reviews/:id" element={<MovieReviewPage />} /> { /* adding the type as a parameter in the url, type prop needed to discern movie vs tv  */}
            <Route
              path="/favourites"
              element={<FavouriteMediaPage />}
            />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/details/:type/:id" element={<MediaPage />} /> {/* Parameterised the movie and the id */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MediaContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
