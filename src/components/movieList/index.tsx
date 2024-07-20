import React from "react";
import Movie from "../mediaCard";
import Grid from "@mui/material/Grid";
import { BaseMediaListProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMediaListProps> = ({media, action}) => {
  const mediaCards = media.map((m) => ( // should const be let??
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} media={m} action={action}/>
    </Grid>
  ));
  return mediaCards;
}

  export default MovieList;