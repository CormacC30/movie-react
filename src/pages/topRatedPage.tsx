import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { getTopRated } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
// import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const TopRatedMoviesPage: React.FC= () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("top rated", getTopRated);

    // const { filterValues, setFilterValues, filterFunction } = useFiltering(
    //     [],
    //    );

if (isLoading) {
    return <Spinner />
}

if (isError) {
    return <h1>{error.message}</h1>
}

const movies = data ? data.results : [];
// const displayedMovies = filterFunction(movies);
return ( 
    <>
        <PageTemplate
            title="Top Rated"
            movies={movies}
            action={(movie: BaseMovieProps) => {
                return <AddToFavouritesIcon {...movie} />
            }}
        />
        
    </>
);

};



export default TopRatedMoviesPage;

