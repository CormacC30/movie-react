import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMediaPage";
import MovieReview from "../components/movieReview";

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
