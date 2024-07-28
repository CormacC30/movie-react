import React from "react";
import { useQuery } from "react-query";
import { BaseMediaListProps, BaseMediaProps } from "../../types/interfaces";
import { Typography } from "@mui/material";
import { getSimilarMovies, getSimilarTVShows } from "../../api/tmdb-api";
import { PageTemplate } from "../templateMovieListPage";
import Spinner from "../spinner";
import MediaCard from "../mediaCard";
import Grid from "@mui/material/Grid";

interface SimilarMediaProps {
  type: 'movie' | 'tv';
  id: number;
}

const SimilarMovies: React.FC<SimilarMediaProps> = ({id, type}) => {

const {data, error, isLoading, isError} =useQuery<BaseMediaProps[], Error>(
    [type, id, 'similar'],
    () => (type === 'movie' ? getSimilarMovies(id) : getSimilarTVShows(id))
    
);
console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  return (
    <div style={{ marginTop: "40px" }}>

    <Grid container spacing={2}>
    {data.map((media) => (
        <Grid item xs={12} sm={4} md={4} lg={4} key={media.id}>
          <MediaCard media={media} action={() => {}} />
        </Grid>
      ))}     
    
        
    </Grid>
    </div>
  );
};
export default SimilarMovies;