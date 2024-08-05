import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMediaPage";
import MovieReview from "../components/movieReview";
import MovieHeader from "../components/headerMovie";
import Grid from "@mui/material/Grid";
import {getMovieImages, getTVSeriesImages} from "../api/tmdb-api"
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieImage } from "../types/interfaces";
import { useQuery } from "react-query";
import { Review } from "../types/interfaces";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTitle: {
    width: 450,
    height: "100vh",
  },
}

const MovieReviewPage: React.FC = () => {
  const location = useLocation();
  const {state} = location;
  const {media, review} = state || {}
 console.log("media ", media)

 const type = media.title ? "movie" : "tv";

  return (
    <div>
        <PageTemplate media={media} type={type}>
          <MovieReview {...review} />
        </PageTemplate>
    </div>
  );
};

export default MovieReviewPage;
