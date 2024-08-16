import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Paper } from "@mui/material";

const ActorBiographyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", id],
    () => getActorDetails(id || "")
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Typography variant="h6">{error.message}</Typography>;

  return (
    <Paper elevation={3} sx={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" component="h2">
        {actor.name}
      </Typography>
      <Typography variant="subtitle1" component="p">
        {actor.biography}
      </Typography>
      <Typography variant="body1" component="p">
        <strong>Birthday:</strong> {actor.birthday}
      </Typography>
      <Typography variant="body1" component="p">
        <strong>Place of Birth:</strong> {actor.place_of_birth}
      </Typography>
      
    </Paper>
  );
};

export default ActorBiographyPage;