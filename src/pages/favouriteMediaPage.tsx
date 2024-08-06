import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MediaContext } from "../contexts/mediaContext";
import { useQueries, useQuery } from "react-query";
import { getMovie, getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BaseMediaProps } from "../types/interfaces";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

// need this function - could get genres raw from the returned data
const transformData = (media: any): BaseMediaProps => {
  return {
    ...media,
    genre_ids: media.genres
      ? media.genres.map((genre: any) => genre.id)
      : media.genre_ids,
  };
};

const FavouriteMoviesPage: React.FC = () => {
  const { tabIndex, setTabIndex } = useContext(MediaContext);
  const { favouriteMovies, favouriteTVSeries } = useContext(MediaContext);
  // const [tabIndex, setTabIndex] = useState(0);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  // use the api query for movies
  const favouriteMovieQueries = useQueries(
    favouriteMovies.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: async () => transformData(await getMovie(movieId.toString())),
    }))
  );

  // use the api query for tv
  const favouriteTVSeriesQueries = useQueries(
    favouriteTVSeries.map((tvId) => ({
      queryKey: ["tv", tvId],
      queryFn: async () => transformData(await getTVShow(tvId.toString())),
    }))
  );

  const isLoading =
    tabIndex === 0
      ? favouriteMovieQueries.find((m) => m.isLoading === true)
      : favouriteTVSeriesQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavouriteMovies = favouriteMovieQueries
    .map((q) => q.data)
    .filter(Boolean); // Filter out undefined values
  const allFavouriteTVSeries = favouriteTVSeriesQueries
    .map((q) => q.data)
    .filter(Boolean); // Filter out undefined values

  const displayedMedia =
    tabIndex === 0
      ? filterFunction(allFavouriteMovies)
      : filterFunction(allFavouriteTVSeries);
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => setTabIndex(newValue)}
      >
        <Tab label="Favourite Movies" />
        <Tab label="Favourite TV Series" />
      </Tabs>
      <PageTemplate
        title={tabIndex === 0 ? "Favourite Movies" : "Favourite TV Series"}
        media={displayedMedia}
        action={(media) => (
          <>
            <RemoveFromFavourites {...media} />
            <WriteReview 
            {...media} 
            />
          </>
        )}
      />
      <MovieFilterUI
        type={tabIndex === 0 ? "movie" : "tv"}
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
