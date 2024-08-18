import React from "react";
import { useQuery } from "react-query";
import { BaseMediaProps } from "../../types/interfaces";
import { Typography } from "@mui/material";
import { getSimilarMovies, getSimilarTVShows } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MediaCard from "../mediaCard";
import Grid from "@mui/material/Grid";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";

interface SimilarMediaProps {
  type: 'movie' | 'tv';
  id: number | string;
}

const SimilarMovies: React.FC<SimilarMediaProps> = ({id, type}) => {

const {data, error, isLoading, isError} =useQuery<BaseMediaProps[], Error>(
    [type, id, 'similar'], // query key
    () => (type === 'movie' ? getSimilarMovies(id) : getSimilarTVShows(id))
    
);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  return (
    <div style={{ marginTop: "40px" }}>

    <Grid container spacing={2}>
    {data?.map((media) => (
        <Grid item xs={12} sm={4} md={4} lg={4} key={media.id}>
          <MediaCard media={media} action={(media: BaseMediaProps) => {
          return <AddToFavouritesIcon {...media} />
        }} />
        </Grid>
      ))}     
    
        
    </Grid>
    </div>
  );
};
export default SimilarMovies;
