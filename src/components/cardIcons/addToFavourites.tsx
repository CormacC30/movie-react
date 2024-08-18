import React, {MouseEvent, useContext} from "react";
import { MediaContext } from "../../contexts/mediaContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseMediaProps} from "../../types/interfaces"

const AddToFavouritesIcon: React.FC<BaseMediaProps> = (movie) => {
  const context = useContext(MediaContext);
  const { favouriteMovies, favouriteTVSeries } = useContext(MediaContext);

    const isFavourite = movie.title
    ? favouriteMovies.includes(movie.id)
    : favouriteTVSeries.includes(movie.id);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {

    if (!isFavourite){
      e.preventDefault();
      context.addToFavourites(movie);
    } else {
      e.preventDefault();
      context.removeFromFavourites(movie);
    }

  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;