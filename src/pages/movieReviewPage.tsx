import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMediaPage";
import MovieReview from "../components/movieReview";
import { useQuery } from "react-query";
import {Review} from "../types/interfaces";

const MovieReviewPage: React.FC = () => {

  const { state : {media, review } } = useLocation(); //new, fix later

  return (
    <PageTemplate media={media} type={type}> { /* fix later */ }
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;