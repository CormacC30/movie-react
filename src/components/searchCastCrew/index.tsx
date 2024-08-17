import React, {useState} from "react";
import { TextField, Button, Typography, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MovieFormProps } from "../../types/interfaces";

const SearchCastCrew: React.FC<MovieFormProps> = ({ fantasyMovie, setFantasyMovie }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [selectedMember, setSelectedMember] = useState<any[]>([]);
    const [characterOrRole, setCharacterRole] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const searchCastCrew = () => {
        // For now, mock search results (replace this with an API call to fetch real data)
    const mockResults = [
        { id: 1, name: "John Doe", job: "Actor" },
        { id: 2, name: "Jane Smith", job: "Director" },
      ];
      setResults(mockResults);
    };

    const handleAddMember = () => {
        if (selectedMember.job === "Actor") {
            setFantasyMovie((prev: any) => ({
                ...prev,
                cast: [...prev.cast, { ...selectedMember, character: characterOrRole}],
            }));
        } else {
            setFantasyMovie((prev: any) => ({
                ...prev,
                crew: [...prev.crew, { ...selectedMember, role: characterOrRole}],
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
      <List>
        {results.map((result) => (
          <ListItem key={result.id} button onClick={() => handleMemberSelection(result)}>
            <ListItemText primary={result.name} secondary={result.job} />
          </ListItem>
        ))}
      </List>

      {/* Dialog for char or role */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {selectedMember?.job === "Actor" ? "Enter Character Name" : "Enter Role"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={selectedMember?.job === "Actor" ? "Character" : "Role"}
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
