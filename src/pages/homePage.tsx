import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getTVSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMedia, BaseMediaProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,  // Provide an initial value to the titleFilter
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,  // Assuming genreFilter can handle undefined genres
};

const HomePage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tvSeriesData, setTVSeriesData] = useState<DiscoverMedia | null>(null);
  const { data: movieData, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery<DiscoverMedia, Error>("discoverMovies", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

useEffect(() => {
  if (tabIndex === 1 && !tvSeriesData) {
    getTVSeries().then(data => setTVSeriesData(data));
  }
}, [tabIndex, tvSeriesData]);

if (movieLoading || (tabIndex === 1 && !tvSeriesData)) {
  return <Spinner />;
}

if (movieIsError) {
  return <h1>{movieError.message}</h1>;
}

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = movieData ? movieData.results : [];
  const tvSeries = tvSeriesData ? tvSeriesData.results : [];
  const displayedMedia = tabIndex === 0 ? filterFunction(movies) : filterFunction(tvSeries);

  console.log("Movies:", movies);
  console.log("TV Series:", tvSeries);
  movies.forEach(movie => console.log("Movie genres:", movie.genre_ids));
  tvSeries.forEach(tv => console.log("TV genres:", tv.genre_ids));

  return (
    <>
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
        <Tab label="Movies" />
        <Tab label="TV Series" />
      </Tabs>
      <PageTemplate
        title={tabIndex === 0 ? "Discover Movies" : "Discover TV Series"}
        media={displayedMedia}
        action={(media: BaseMediaProps) => {
          return <AddToFavouritesIcon {...media} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default HomePage;