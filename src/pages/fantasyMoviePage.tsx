import React, { useState } from "react";
import { Typography, Button, Container, Grid } from "@mui/material";
import MovieForm from "../components/movieForm";
import SearchCastCrew from "../components/searchCastCrew/index.tsx";
import ReviewMovie from "../components/reviewFantasyMovie/index.tsx";
import FantasyMovieCard from "../components/fantasyMovieCard";
import { FantasyMovie } from "../types/interfaces";

// data store for fantasy movies (in-memory)
const fantasyMovies: FantasyMovie[] = [];

const FantasyMoviePage: React.FC = () => {
  const [fantasyMovie, setFantasyMovie] = useState<FantasyMovie>({
    title: "",
    tagline: "",
    overview: "",
    genres: [],
    cast: [],
    crew: [],
  });

  const saveFantasyMovie = () => {
    fantasyMovies.push(fantasyMovie);
    console.log("saved fantasy movie:", fantasyMovie);
    alert("Fantasy Movie Saved");
    // Clear the form after saving
    setFantasyMovie({
      title: "",
      tagline: "",
      overview: "",
      genres: [],
      cast: [],
      crew: [],
    });
  };

  console.log("All Fantasy Movies: ", fantasyMovies);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Your Fantasy Movie
      </Typography>
      <MovieForm
        fantasyMovie={fantasyMovie}
        setFantasyMovie={setFantasyMovie}
      />
      <SearchCastCrew
        fantasyMovie={fantasyMovie}
        setFantasyMovie={setFantasyMovie}
      />
      <ReviewMovie fantasyMovie={fantasyMovie} />
      <Button
        variant="contained"
        color="primary"
        onClick={saveFantasyMovie}
        sx={{ mt: 3 }}
      >
        Save Fantasy Movie
      </Button>

      <Typography variant="h5" component="h2" sx={{ marginTop: "30px" }}>
        Your Fantasy Movies
      </Typography>
      <Grid container spacing={2}>
        {fantasyMovies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <FantasyMovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default FantasyMoviePage;
