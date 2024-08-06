import React from "react";
import { CastProps, CrewProps, CreditsProps } from "../../types/interfaces";
import { getMovieCredits, getTVCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import CastList from "../castList";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const MediaCredits: React.FC<CreditsProps | CastProps> = ({ id, type }) => {
  const { data, error, isLoading, isError } = useQuery<
    { cast: CastProps[]; crew: CrewProps[] },
    Error
  >([type, id, "credits"], () =>
    type === "movie" ? getMovieCredits(id) : getTVCredits(id)
  );

  console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error">
        {error.message}
      </Typography>
    );
  }

  const { cast, crew } = data;
  console.log("cast: ", cast);

  return (
    <>
      <Typography variant="h5" component="h3">
        Cast
      </Typography>
      <Grid container >
        <Box
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.default',
          display: 'grid',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2,
        }}>
          <Paper elevation={1}>
            <CastList cast={cast} />
          </Paper>
        </Box>
      </Grid>

      <Typography variant="h5" component="h3">
        Crew
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {crew.map((credit) => (
          <Grid item xs={12} sm={4} md={4} lg={4} key={credit.id}>
            <Typography variant="body1">{credit.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default MediaCredits;
