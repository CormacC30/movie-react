import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/mediaDetails";
import { Typography } from "@mui/material";
import PageTemplate from "../components/templateMediaPage";
import { getMovie, getTVShow } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps, TVSeriesDetailsProps } from "../types/interfaces";

const MediaDetailsPage: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const {
    data: media,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps | TVSeriesDetailsProps, Error>(
    [type, id],
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
          <PageTemplate media={media} type={type}>
            <MovieDetails media={media} id={id} type={type} />
          </PageTemplate>
          <Typography variant="h5" component="h3" style={{ marginTop: "20px" }}>
            Similar {type === "movie" ? "Movies" : "TV Shows"}
          </Typography>
        </>
      ) : (
        <p>Waiting for details</p>
      )}
    </>
  );
};

export default MediaDetailsPage;
