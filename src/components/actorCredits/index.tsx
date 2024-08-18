import React from "react";
import { BaseMediaProps, ActorCreditProps } from "../../types/interfaces";
import { getActorMovieCreds, getActorTVCreds } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MediaCard from "../mediaCard";
import Grid from "@mui/material/Grid";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import { useQuery } from "react-query";
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const ActorCredits: React.FC<ActorCreditProps> = ({id}) => {

    // movies
    const {
        data: movieCredits,
        error: movieError,
        isLoading: isMovieLoading,
        isError: isMovieError,
      } = useQuery<{cast: ActorCreditProps[]}, Error>([id, "movieCredits"], () =>
        getActorMovieCreds(id)
      );

      // tv
      const {
        data: tvCredits,
        error: tvError,
        isLoading: isTVLoading,
        isError: isTVError,
      } = useQuery<{cast: ActorCreditProps[]}, Error>([id, "tvCredits"], () =>
        getActorTVCreds(id)
      );

      if (isMovieLoading || isTVLoading) {
        return <Spinner />;
      }
    
      if (isMovieError || isTVError) {
        return (
          <Typography variant="h6" color="error">
            {movieError?.message || tvError?.message}
          </Typography>
        );
      }

  return (
    <div style={{ marginTop: "40px" }}>
      {/* Accordion for Movie Credits */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="movie-credits-content"
          id="movie-credits-header"
        >
          <Typography variant="h5">Movie Credits</Typography>
        </AccordionSummary>
        <AccordionDetails
                  sx={{
                    maxHeight: "400px", // Set the max height
                    overflowY: "auto", // Enable vertical scrolling
                    overflowX: "hidden", // Hide horizontal scrolling
                  }}>
          <Grid container spacing={2}>
            {movieCredits?.cast.map((media) => (
              <Grid item xs={12} sm={4} md={4} lg={4} key={media.id}>
                <MediaCard
                  media={media}
                  action={(media: BaseMediaProps) => {
                    return <AddToFavouritesIcon {...media} />;
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Accordion for TV Show Credits */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="tv-credits-content"
          id="tv-credits-header"
        >
          <Typography variant="h5">TV Show Credits</Typography>
        </AccordionSummary>
        <AccordionDetails
                  sx={{
                    maxHeight: "400px", // Set the max height
                    overflowY: "auto", // Enable vertical scrolling
                    overflowX: "hidden", // Hide horizontal scrolling
                  }}>
          <Grid container spacing={2}>
            {tvCredits?.cast.map((media) => (
              <Grid item xs={12} sm={4} md={4} lg={4} key={media.id}>
                <MediaCard
                  media={media}
                  action={(media: BaseMediaProps) => {
                    return <AddToFavouritesIcon {...media} />;
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );

}
export default ActorCredits;