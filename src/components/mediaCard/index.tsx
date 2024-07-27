import React, { useContext } from "react"; //  MouseEvent,
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
import img from '../../images/film-poster-placeholder.png';
import { BaseMediaProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MediaContext } from "../../contexts/mediaContext"; // Adjust the context if needed

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface MediaCardProps {
  media: BaseMediaProps;
  action: (m: BaseMediaProps) => React.ReactNode;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, action }) => {
  const { favouriteMovies, favouriteTVSeries } = useContext(MediaContext);

    const isFavourite = media.title
    ? favouriteMovies.includes(media.id)
    : favouriteTVSeries.includes(media.id);

  if (favouriteMovies.find((id) => id === media.id)) 
    media.favourite = true;

  if (favouriteTVSeries.find((id) => id === media.id)) 
    media.favourite = true;

  const title = media.title || media.name; // Handle both movie and TV series titles
  const releaseDate = media.release_date || media.first_air_date; // Handle both movie and TV series release dates

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          media.poster_path
            ? `https://image.tmdb.org/t/p/w500/${media.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {releaseDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {media.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(media)}
        <Link to={`/${media.title ? "movie" : "tv"}/${media.id}`}> {/* Adjust the link path if necessary */}
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
