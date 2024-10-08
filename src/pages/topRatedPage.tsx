import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { DiscoverMedia, BaseMediaProps } from "../types/interfaces";
import { getTopRatedMovies, getTopRatedTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MediaContext } from "../contexts/mediaContext";
import MultiSearch from "../components/searchMoviesTV";

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

const TopRatedPage: React.FC = () => {
  const { tabIndex, setTabIndex } = useContext(MediaContext);
  // const [tabIndex, setTabIndex] = useState(0);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  const { data: movieData, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery<DiscoverMedia, Error>("topRatedMovies", getTopRatedMovies);
  const { data: tvData, error: tvError, isLoading: tvLoading, isError: tvIsError } = useQuery<DiscoverMedia, Error>("topRatedTVSeries", getTopRatedTVSeries);

  const isLoading = tabIndex === 0 ? movieLoading : tvLoading;
  const isError = tabIndex === 0 ? movieIsError : tvIsError;
  const error = tabIndex === 0 ? movieError : tvError;
  const media = tabIndex === 0 ? movieData?.results : tvData?.results;

  console.log(media);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = type === "title"
      ? [changedFilter, filterValues[1]]
      : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = movieData ? movieData.results : [];
  const tvSeries = tvData ? tvData.results : [];
  const displayedMedia = tabIndex === 0 ? filterFunction(movies) : filterFunction(tvSeries);

  return (
    <>
      <Tabs value={tabIndex} onChange={(_event, newValue) => setTabIndex(newValue)}>
        <Tab label="Top Rated Movies" />
        <Tab label="Top Rated TV Series" />
      </Tabs>
      <MultiSearch />
      <PageTemplate
        title={tabIndex === 0 ? "Top Rated Movies" : "Top Rated TV Series"}
        media={displayedMedia}
        action={(media: BaseMediaProps) => <AddToFavouritesIcon {...media} />}
      />
      <MovieFilterUI
        type={tabIndex ===0 ? "movie" : "tv"}
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TopRatedPage;
