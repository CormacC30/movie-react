import React from "react";
import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";
import { FantasyMovie } from "../../types/interfaces";

interface FantasyMovieCardProps {
    movie: FantasyMovie;
  }

  const FantasyMovieCard: React.FC<FantasyMovieCardProps> = ({ movie }) => {
    return (
      <Card sx={{ maxWidth: 345, margin: "10px" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {movie.tagline}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            {movie.overview}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export default FantasyMovieCard;