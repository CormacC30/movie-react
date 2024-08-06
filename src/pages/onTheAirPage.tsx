import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMediaProps, DiscoverMedia } from "../types/interfaces";
import { getOnTheAirTV } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton } from "@mui/material";
import { useMedia } from "../contexts/mediaContext";

const OnTheAirTVPage: React.FC = () => {
  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
    isError: tvIsError,
  } = useQuery<DiscoverMedia, Error>("On The Air", getOnTheAirTV);

  const isLoading = tvLoading;
  const isError = tvIsError;
  const error = tvError;
  const media = tvData?.results;

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
      title="On the Air"
      media={media}
      action ={(media: BaseMediaProps) => (
        <>
        <AddToFavouritesIcon {...media} />
        <IconButton onClick={() => addToMustWatch(media.id)}>
              <PlaylistAddIcon />
            </IconButton>
        </>
      )}
      />
    </>
  )
};
export default OnTheAirTVPage;