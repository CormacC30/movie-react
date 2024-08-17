import React from "react";
import { Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

interface ReviewMovieProps {
    fantasyMovie: any;
  }

  const ReviewMovie: React.FC<ReviewMovieProps> = ({ fantasyMovie }) => {
    return (
<>
      <Typography variant="h5" component="h2" gutterBottom>
        Review Your Fantasy Movie
      </Typography>
      <Typography variant="h6">Title: {fantasyMovie.title}</Typography>
      <Typography variant="h6">Tagline: {fantasyMovie.tagline}</Typography>
      <Typography variant="h6">Overview:</Typography>
      <Typography>{fantasyMovie.overview}</Typography>
      <Typography variant="h6">Genres: {fantasyMovie.genres.map((g: any) => g.name).join(", ")}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Cast:</Typography>
      <List>
        {fantasyMovie.cast.map((member: any) => (
          <ListItem key={member.id}>
            <ListItemText primary={`${member.name} as ${member.character}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Crew:</Typography>
      <List>
        {fantasyMovie.crew.map((member: any) => (
          <ListItem key={member.id}>
            <ListItemText primary={`${member.name} - ${member.role}`} /> {/* Correctly reference the role */}
          </ListItem>
        ))}
      </List>
    </>
    );
  };
  
  export default ReviewMovie;