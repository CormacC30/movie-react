/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import { MovieFormProps } from "../../types/interfaces";
import { getMovieGenres } from "../../api/tmdb-api";
import Spinner from "../../components/spinner";

const MovieForm: React.FC<MovieFormProps> = ({ fantasyMovie, setFantasyMovie }) => {

    const [genres, setGenres] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const genreData = await getMovieGenres();
          setGenres([{ id: "0", name: "All" }, ...genreData.genres]); // Add "All" option
          setIsLoading(false);
        } catch (err) {
          setError("Failed to load genres");
          setIsLoading(false);
        }
      };
  
      fetchGenres();
    }, []); // Empty dependency array ensures this runs once on mount
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (error) {
      return <h1>{error}</h1>;
    }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFantasyMovie((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (event: any) => {
    const selectedGenres = event.target.value;
    setFantasyMovie((prev: any) => ({ ...prev, genres: selectedGenres }));
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Movie Details
      </Typography>
      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="normal"
        value={fantasyMovie.title}
        onChange={handleInputChange}
      />
      <TextField
        label="Tagline"
        name="tagline"
        fullWidth
        margin="normal"
        value={fantasyMovie.tagline}
        onChange={handleInputChange}
      />
      <TextField
        label="Overview"
        name="overview"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={fantasyMovie.overview}
        onChange={handleInputChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Genres</InputLabel>
        <Select
          multiple
          value={fantasyMovie.genres}
          onChange={handleGenreChange}
          renderValue={(selected: any) =>
            selected.map((genre: any) => genre.name).join(", ")
          }
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MovieForm;