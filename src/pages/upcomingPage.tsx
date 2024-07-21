import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMediaProps, DiscoverMedia } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api"; // need new import for upcoming movies from API
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton } from "@mui/material";
import { useMedia } from "../contexts/mediaContext";

const UpcomingMoviesPage: React.FC = () => {
  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
    isError: movieIsError,
  } = useQuery<DiscoverMedia, Error>("upcoming movies", getUpcomingMovies);

  const isLoading = movieLoading;
  const isError = movieIsError;
  const error = movieError;
  const media = movieData?.results;

  // const [movies, setMovies] = useState<BaseMediaProps[]>([]);

  const { addToMustWatch } = useMedia();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        media={media}
        action={(media: BaseMediaProps) => (
          <>
            <AddToFavouritesIcon {...media} />
            <IconButton onClick={() => addToMustWatch(media.id)}>
              <PlaylistAddIcon />
            </IconButton>
          </>
        )}
        // selectFavourite={addToFavourites}
      />
    </>
  );
};
export default UpcomingMoviesPage;
