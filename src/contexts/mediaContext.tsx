import React, { useState, useCallback, useContext } from "react";
import { BaseMediaProps, Review } from "../types/interfaces";


interface MediaContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMediaProps) => void);
    removeFromFavourites: ((movie: BaseMediaProps) => void);
    addReview: ((movie: BaseMediaProps, review: Review) => void);
    mustWatch: number[];
    addToMustWatch: (movieId: number) => void;
}
const initialContextState: MediaContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (media, review) => { media.id, review },
    mustWatch: [],
    addToMustWatch: () => {},
};

export const MediaContext = React.createContext<MediaContextInterface>(initialContextState);

const MediaContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    
    const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]); // New state for 'must watch' movies

    const addReview = (movie:BaseMediaProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

    const addToFavourites = useCallback((media: BaseMediaProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(media.id)) {
                return [...prevFavourites, media.id];
            }
            return prevFavourites;
        });
    }, []);

    const addToMustWatch = useCallback((mediaId: number) => {
        setMustWatch((prevMustWatch) => {
          if (!prevMustWatch.includes(mediaId)) {
            return [...prevMustWatch, mediaId];
          }
          return prevMustWatch;
        });
        console.log('Must Watch List:', mustWatch); // Confirm the feature is working
      }, [mustWatch]);
    const removeFromFavourites = useCallback((media: BaseMediaProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== media.id));
    }, []);

    return (
        <MediaContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch,
                addToMustWatch,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};
export const useMovies = () => useContext(MediaContext);
export default MediaContextProvider;