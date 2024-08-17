import React from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import { MovieFormProps } from "../../types/interfaces";

// Mock list of genres
const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 878, name: "Science Fiction" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    // Add more genres as needed
  ];

const MovieForm: React.FC<MovieFormProps> = ({ fantasyMovie, setFantasyMovie }) => {
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