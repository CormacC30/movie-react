export interface BaseMediaProps {
    title?: string;
    name?: string,
    budget?: number;
    homepage?: string | undefined;
    origin_country?: string;
    id: number;
    imdb_id?: string;
    original_language: string;
    original_name?: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline?: string;
    runtime?: number;
    revenue?: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
    backdrop_path?: string;
  }

  export interface BaseMediaListProps {
    media: BaseMediaProps[];
    action: (m: BaseMediaProps) => React.ReactNode;
  }

  export interface MovieDetailsProps extends BaseMediaProps {
    genres: {
        id: number;
        name: string;
    }[];
    production_countries: {
        iso_3166_1?: string;
        name: string;
    };
    selectFavourite: (movieId: number) => void;  //added this for movie details page header fav icon
  }

  export interface TVSeriesDetailsProps extends BaseMediaProps {
    genres: {
        id: number;
        name: string;
    }[];
    production_countries: {
        iso_3166_1?: string;
        name: string;
    };
    selectFavourite: (tvSeriesId: number) => void;  //added this for tv details page header fav icon
  }

  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }

  export type FilterOption = "title" | "genre";

  export interface MediaListPageTemplateProps extends BaseMediaListProps {
    title: string;
  }

  export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }

  export interface DiscoverMedia {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseMediaProps[];
  }

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }