import React, {useState} from "react";
import { searchMulti } from "../../api/tmdb-api";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import { SearchResult } from "../../types/interfaces";

const MultiSearch: React.FC = () => {

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
        console.log(`Fetching results for: ${searchTerm}`);
        const response = await searchMulti(searchTerm);
        console.log('API Response:', response);
    
        if (response.results) {
          setResults(response.results);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err) {
        console.error(err.message);
        setError("Failed to fetch search results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
  };

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, value: SearchResult | null) => {
    if (value) {
      const { media_type, id } = value;
      if (media_type === "movie" || media_type === "tv") {
        navigate(`/details/${media_type}/${id}`);
      } else {
        navigate(`/actor/${id}`);
      }
    }
  };
  

  return (
    <div style={{
        marginTop: "1%",
        marginLeft: "30%",
        marginBottom: "2%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
<Container>
<Stack spacing={2} sx={{ width: 600 }}>
      <Autocomplete
        freeSolo
        options={results}
        getOptionLabel={(option) => option.title || option.name || ""}
        loading={isLoading}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Movies, TV Shows, and People"
            variant="outlined"
            error={Boolean(error)}
            helperText={error}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.title || option.name} ({option.media_type})
          </li>
        )}
      />
    </Stack>
    </Container>
    </div>
  );

};

export default MultiSearch;