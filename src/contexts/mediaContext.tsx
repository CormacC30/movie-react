import React, { useState, useCallback, useContext } from "react";
import { BaseMediaProps, Review } from "../types/interfaces";

interface MediaContextInterface {
  favouriteMovies: number[];
  favouriteTVSeries: number[];
  addToFavourites: (media: BaseMediaProps) => void;
  removeFromFavourites: (media: BaseMediaProps) => void;
  addReview: (media: BaseMediaProps, review: Review) => void;
  mustWatch: number[];
  addToMustWatch: (mediaId: number) => void;
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const initialContextState: MediaContextInterface = {
  favouriteMovies: [],
  favouriteTVSeries: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
  mustWatch: [],
  addToMustWatch: () => {},
  tabIndex: 0,
  setTabIndex: () => {}
};

export const MediaContext = React.createContext<MediaContextInterface>(initialContextState);

const MediaContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favouriteMovies, setFavouriteMovies] = useState<number[]>([]);
  const [favouriteTVSeries, setFavouriteTVSeries] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

console.log("fav movies", favouriteMovies);
console.log("fav tv", favouriteTVSeries);

  const addReview = (media: BaseMediaProps, review: Review) => {
    setMyReviews((prevReviews) => [...prevReviews, { ...review, mediaId: media.id }]);
  };

  const addToFavourites = useCallback((media: BaseMediaProps) => {
    if (media.title) {
      setFavouriteMovies((prevFavourites) => {
        if (!prevFavourites.includes(media.id)) {
          return [...prevFavourites, media.id];
        }
        return prevFavourites;
      });
    } else {
      setFavouriteTVSeries((prevFavourites) => {
        if (!prevFavourites.includes(media.id)) {
          return [...prevFavourites, media.id];
        }
        return prevFavourites;
      });
    }
  }, []);

  const removeFromFavourites = useCallback((media: BaseMediaProps) => {
    if (media.title) {
      setFavouriteMovies((prevFavourites) => prevFavourites.filter((mId) => mId !== media.id));
    } else {
      setFavouriteTVSeries((prevFavourites) => prevFavourites.filter((tvId) => tvId !== media.id));
    }
  }, []);

  const addToMustWatch = useCallback((mediaId: number) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(mediaId)) {
        return [...prevMustWatch, mediaId];
      }
      return prevMustWatch;
    });
    console.log('Must Watch List:', mustWatch);
  }, [mustWatch]);

  return (
    <MediaContext.Provider
      value={{
        favouriteMovies,
        favouriteTVSeries,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatch,
        addToMustWatch,
        tabIndex,
        setTabIndex // added tab index to the context so nav bar can be conditionally rendered
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
export default MediaContextProvider;
