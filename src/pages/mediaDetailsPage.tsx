import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/mediaDetails";
import PageTemplate from "../components/templateMediaPage";
import { getMovie, getTVShow } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { BaseMediaProps, MovieDetailsProps, TVSeriesDetailsProps } from "../types/interfaces";
import MultiSearch from "../components/searchMoviesTV";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const MediaDetailsPage: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const {
    data: media,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps | TVSeriesDetailsProps, Error>(
    [type, id], // query key
    () => (type === "movie" ? getMovie(id || "") : getTVShow(id || ""))
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {media ? (
        <>
        <MultiSearch />
          <PageTemplate media={media} type={type} >
            <MovieDetails media={media} id={id} type={type} action={(media: BaseMediaProps) => (<AddToFavouritesIcon {...media}/>)}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for details</p>
      )}
    </>
  );
};

export default MediaDetailsPage;
