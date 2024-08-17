import React, { useState } from "react";
import { Typography, Button, Container } from "@mui/material";
import MovieForm from "../components/movieForm";
import SearchCastCrew from "../components/searchCastCrew/index.tsx";
import ReviewMovie from "../components/reviewFantasyMovie/index.tsx";
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
  };

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
    </Container>
  );
};
export default FantasyMoviePage;
