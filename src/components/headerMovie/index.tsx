import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps, TVSeriesDetailsProps } from "../../types/interfaces";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MediaContext } from "../../contexts/mediaContext";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader: React.FC<MovieDetailsProps | TVSeriesDetailsProps> = (media) => {
  const { favouriteMovies, favouriteTVSeries } = useContext(MediaContext);
  // console.log("Type ", type);

  const isFavourite = favouriteMovies.includes(media.id) || favouriteTVSeries.includes(media.id);
  console.log("is fav:" ,isFavourite);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h5" component="p">
        {isFavourite === true && (
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        )}
      </Typography>

      <Typography variant="h4" component="h3">
        {media.title || media.name}
        {"   "}
        <a href={media.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a>
        <br />
        <span>{`${media.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
