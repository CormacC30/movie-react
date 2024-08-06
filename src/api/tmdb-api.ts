export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};
  
export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
}
  
  export const getMovieGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getTVGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getTVSeriesImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getTVReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch upcoming movies. Response status: ${response.status}`);
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  };

  export const getTopRatedMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    //`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
      if(!response.ok)
        throw new Error(`Unable to fetch Top Rated. Response status: ${response.status}`);
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  };

  export const getTopRatedTVSeries = () => {
    return fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if(!response.ok)
        throw new Error(`Unable to fetch Top Rated. Response status: ${response.status}`);
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  };

  export const getTVSeries = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch TV series. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  export const getTVShow = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get tv series data. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  }

  // similar movies
  export const getSimilarMovies = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch similar movies. Response status: ${response.status}`);
      return response.json();
    })
    .then((data) => data.results)
    .catch((error) => {
      throw error
    });
  }
// similar tv shows
  export const getSimilarTVShows = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch similar movies. Response status: ${response.status}`);
      return response.json();
    })
    .then((data) => data.results)
    .catch((error) => {
      throw error
    });
  }

  // on the air
  export const getOnTheAirTV = () => {
    return fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch on the air TV shows. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  // movie credits
  export const getMovieCredits = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to retrieve the movie credits. Response status:  ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  // TV credits
  export const getTVCredits = (id: string) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
      if (!response.ok)
        throw new Error(`Unable to retrieve the movie credits. Response status:  ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }