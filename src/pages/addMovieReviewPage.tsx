import React from "react";
import PageTemplate from "../components/templateMediaPage";
import ReviewForm from "../components/reviewForm";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie, getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseMediaProps, MovieDetailsProps } from "../types/interfaces";

interface RouteParams {
    type: string;
    id: string;
  }

const WriteReviewPage: React.FC = () => {
    //const location = useLocation();
    const {type, id}= useParams<RouteParams>();
 
   // const { id } = location.state;

  // Debug log to inspect parameters
  console.log("Type:", type);
  console.log("ID:", id);

    const { data: media, error, isLoading, isError } = useQuery<BaseMediaProps, Error>(
        [type, id],
        () => (type === "movie" ? getMovie(id || "") : getTVShow(id || ""))
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {media ? (
                    <PageTemplate media={media} type={type}>
                        <ReviewForm {...media} />
                    </PageTemplate>
            ) : (
                <p>Waiting for {type} review details</p>
            )}
        </>
    );
};

export default WriteReviewPage;