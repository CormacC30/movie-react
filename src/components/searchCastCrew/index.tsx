import React, {useState} from "react";
import { TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { MovieFormProps } from "../../types/interfaces";

const SearchCastCrew: React.FC<MovieFormProps> = ({ fantasyMovie, setFantasyMovie }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const searchCastCrew = () => {
        // For now, mock search results (replace this with an API call to fetch real data)
    const mockResults = [
        { id: 1, name: "John Doe", job: "Actor" },
        { id: 2, name: "Jane Smith", job: "Director" },
      ];
      setResults(mockResults);
    };

    const addMember = (member: any) => {
        if (member.job === "Actor") {
          setFantasyMovie((prev: any) => ({
            ...prev,
            cast: [...prev.cast, member],
          }));
        } else {
          setFantasyMovie((prev: any) => ({
            ...prev,
            crew: [...prev.crew, member],
          }));
        }
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
              <ListItem key={result.id} onClick={() => addMember(result)}>
                <ListItemText primary={result.name} secondary={result.job} />
              </ListItem>
            ))}
          </List>
        </>
      );
    };
    
    export default SearchCastCrew;
