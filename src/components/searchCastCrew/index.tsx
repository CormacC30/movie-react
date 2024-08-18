/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
} from "@mui/material";
import { MovieFormProps } from "../../types/interfaces";
import { getPerson } from "../../api/tmdb-api";

const SearchCastCrew: React.FC<MovieFormProps> = ({

  setFantasyMovie,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any[]>([]);
  const [characterOrRole, setCharacterRole] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCastCrew = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      const data = await getPerson(query); // make  API request

      // Ensure we are accessing the correct data structure and results array
      if (data && Array.isArray(data.results)) {
        setResults(data.results);
        setLoading(false);
      } else {
        setResults([]); // empty array if results are not found
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleAddMember = () => {
    //@ts-expect-error It's grand
    if (selectedMember?.known_for_department === "Acting") {
      setFantasyMovie((prev: any) => ({
        ...prev,
        cast: [...prev.cast, { ...selectedMember, character: characterOrRole }],
      }));
    } else {
      setFantasyMovie((prev: any) => ({
        ...prev,
        crew: [...prev.crew, { ...selectedMember, role: characterOrRole }],
      }));
    }
    setDialogOpen(false);
    setCharacterRole("");
  };

  const handleMemberSelection = (member: any) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Search Cast & Crew
      </Typography>
      <TextField
        label="Search by name"
        fullWidth
        margin="normal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={searchCastCrew}>
        Search
      </Button>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      <List>
        {results.map((result) => (
          <ListItem
            key={result.id}
            onClick={() => handleMemberSelection(result)}
          >
            <ListItemText
              primary={result.name}
              secondary={result.known_for_department} // Displays if they are an actor, director, etc.
            />
          </ListItem>
        ))}
      </List>

      {/* Dialog for entering character (for cast) or role (for crew) */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
        {/* @ts-expect-error It's grand */}
          {selectedMember?.known_for_department === "Acting"
            ? "Enter Character Name"
            : "Enter Role"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={
              /* @ts-expect-error It's grand */
              selectedMember?.known_for_department === "Acting"
                ? "Character"
                : "Role"
            }
            fullWidth
            value={characterOrRole}
            onChange={(e) => setCharacterRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMember} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchCastCrew;
