import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { DiscoverMedia, BaseMediaProps } from "../types/interfaces";
import { getTopRatedMovies, getTopRatedTVSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
// import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TopRatedMoviesPage: React.FC= () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { data: movieData, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery<DiscoverMedia, Error>("top rated Movies", getTopRatedMovies);
    const { data: tvData, error: tvError, isLoading: tvLoading, isError: tvIsError } = useQuery<DiscoverMedia, Error>("Top Rated TV Series", getTopRatedTVSeries);

    const isLoading = tabIndex === 0 ? movieLoading : tvLoading;
    const isError = tabIndex === 0 ? movieIsError : tvIsError;
    const error = tabIndex === 0 ? movieError : tvError;
    const media = tabIndex === 0 ? movieData?.results : tvData?.results;

    // const { filterValues, setFilterValues, filterFunction } = useFiltering(
    //     [],
    //    );

if (isLoading) {
    return <Spinner />
}

if (isError) {
    return <h1>{error?.message}</h1>
}

// const movies = data ? data.results : [];
// const displayedMovies = filterFunction(movies);
return ( 
    <>
        <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
            <Tab label="Top Rated Movies" />
            <Tab label="Top Rated TV Series"/>
        </Tabs>
        <PageTemplate
            title="Top Rated"
            media={media}
            action={(media: BaseMediaProps) => {
                return <AddToFavouritesIcon {...media} />
            }}
        />
        
    </>
);

};



export default TopRatedMoviesPage;

