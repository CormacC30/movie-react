import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Paper } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import Grid from "@mui/material/Grid";
import ActorCredits from "../components/actorCredits";
import MultiSearch from "../components/searchMoviesTV";

const ActorBiographyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: actor,
    error,
    isLoading,
    isError,
  } = useQuery(["actor", id], () => getActorDetails(id || ""));

  if (isLoading) return <Spinner />;
  //@ts-ignore
  if (isError) return <Typography variant="h6">{error.message}</Typography>;

  const image_path = actor.profile_path;

  return (
    <Paper elevation={3} sx={{ padding: "20px", margin: "20px" }}>
      <MultiSearch />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={8}>
          <Typography variant="h4" component="h2">
            {actor.name}
            <hr />
          </Typography>
          <Typography variant="body1" component="p">
            <CakeIcon />
            <strong>Date Of Birth:</strong> {actor.birthday}
            <hr />
          </Typography>
          <Typography variant="body1" component="p">
            <PlaceIcon />
            <strong>Place of Birth:</strong> {actor.place_of_birth}
            <hr />
          </Typography>
          <Typography variant="subtitle1" component="p">
            <strong>Biography:</strong>
            <br />
            {actor.biography}
          </Typography>
         { /* @ts-ignore */ }
          <ActorCredits id={actor.id}/>
        </Grid>
        <Grid item xs={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${image_path}?w=248&fit=crop&auto=format`}
            alt="image alternative"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActorBiographyPage;
