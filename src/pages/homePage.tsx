import React, { useState, useEffect, useContext } from "react";
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
import { MediaContext } from "../contexts/mediaContext";

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
  
  const {tabIndex, setTabIndex} = useContext(MediaContext); // update the media context with tab index
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
        type={tabIndex === 0 ? "movie" : "tv"}
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}        
      />
    </>
  );
};
export default HomePage;