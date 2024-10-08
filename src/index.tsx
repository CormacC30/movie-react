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
import OnTheAirTVPage from "./pages/onTheAirPage";
import ActorBiographyPage from "./pages/actorBioPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import LoginPage from "./pages/loginPage"; 
import SignupPage from "./pages/signUpPage"; 
import PrivateRoute from "./routes/privateRoute";
import { Auth0Provider } from "@auth0/auth0-react";

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
      <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            // @ts-expect-error it's absolutely grand
            redirectUri={window.location.origin}>
      <BrowserRouter>

        <MediaContextProvider>
          {/* @ts-expect-error it's absolutely grand */}
        <SiteHeader />
          <Routes>
            <Route path="/toprated" element={<PrivateRoute component={TopRatedMoviesPage} />} />
            <Route path="/review/:type/:id" element={<PrivateRoute component={AddMovieReviewPage} />} /> { /* adding the type as a parameter in the url, type prop needed to discern movie vs tv  */}
            <Route path="/reviews/:id" element={<PrivateRoute component={MovieReviewPage}/>} /> { /* adding the type as a parameter in the url, type prop needed to discern movie vs tv  */}
            <Route
              path="/favourites"
              element={<PrivateRoute component={FavouriteMediaPage} />}
            />
            <Route path="/movies/upcoming" element={<PrivateRoute component={UpcomingMoviesPage} />} />
            <Route path="/details/:type/:id" element={<MediaPage />} /> {/* Parameterised the movie and the id */}
            <Route path="/" element={<PrivateRoute component={HomePage} />} />
            <Route path="/tv/on-the-air" element={<PrivateRoute component={OnTheAirTVPage} />} />
            <Route path="/actor/:id" element={<ActorBiographyPage/>} />
            <Route path="/fantasy-movie" element ={<PrivateRoute component={FantasyMoviePage} />}/>
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignupPage />} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MediaContextProvider>

      </BrowserRouter>
      </Auth0Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
