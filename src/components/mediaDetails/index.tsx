import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import {
  MovieDetailsProps,
  TVSeriesDetailsProps,
  BaseMediaProps
} from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import SimilarMovies from "../similarMovies";
import MediaCredits from "../mediaCredits";
import Grid from "@mui/material/Grid";
import { useAuth0 } from "@auth0/auth0-react";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
};

interface MediaDetailsProps {
  media: MovieDetailsProps | TVSeriesDetailsProps;
  id: string;
  type: "movie" | "tv";
  action: (m: BaseMediaProps) => React.ReactNode;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({ media, id, type, action }) => {
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {isAuthenticated} = useAuth0();

  return (
    <>
    <Grid container spacing="5px">
      <Grid item xs={9} maxWidth="flex" >
      <Typography variant="h4" component="h3" textAlign="center">
        Overview
      </Typography>
      </Grid>
      <Grid item xs={3} maxWidth="flex">
      { isAuthenticated ? action(media) : null} 
      
      </Grid>
    </Grid>


      <Typography variant="h6" component="p">
        {media.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {media.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${media.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${media.revenue?.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${media.vote_average} (${media.vote_count}`}
        />
        <Chip
          label={`Released: ${media.release_date || media.first_air_date}`}
        />
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews media={media} id={id} type={type} />
      </Drawer>

      <Typography
        variant="h3"
        component="h4"
        align="center"
        style={{ marginTop: "20px" }}
      >
        Credits
      </Typography>
      <div>
        {/* @ts-expect-error it's grand */}
        <MediaCredits id={id} type={type} />
      </div>

      <Typography
        variant="h3"
        component="h4"
        align="center"
        style={{ marginTop: "20px" }}
      >
        Similar {type === "movie" ? "Movies" : "TV Shows"}
      </Typography>

      <div>
        <SimilarMovies id={id} type={type} />
      </div>
    </>
  );
};
export default MediaDetails;
