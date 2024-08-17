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
    type: "movie";
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
    type: "tv";
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
    type: "movie" | "tv";
  }

  export interface DiscoverMedia {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseMediaProps[];
  }

  export interface Review {
    author: string;
    content: string;
    agree: boolean;
    rating: number;
    movieId: number;
    type: string;
    id: string;
  }

  export interface CastProps{
    adult: boolean;
    gender: number;
    id: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    character: string;
    cast_id: string;
    credit_id: string;
    order: number;
    known_for?: BaseMediaProps[];
    job?: string;
  }

  export interface CrewProps{
    adult: boolean;
    gender: number;
    id: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
  }

  export interface CreditsProps {
    cast: CastProps[];
    crew: CrewProps[];
    id: string;
    type: "movie" | "tv";
  }

  export interface ActorCreditProps {
    id: string;
    title?: string;
    name?: string;
    original_name?: string;
    character: string;
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "tv";
    poster_path?: string;
  }

  export interface FantasyMovie {
    title: string;
    tagline: string;
    overview: string;
    genres: { id: number; name: string; }[];
    cast: { id: number; name: string; character: string }[];
    crew: { id: number; name: string; job: string }[];
  }

  export interface MovieFormProps {
    fantasyMovie: any;
    setFantasyMovie: React.Dispatch<React.SetStateAction<any>>;
  }
  
  export interface SearchResult {
    id: number;
    media_type: "movie" | "tv" | "person";
    title?: string; // For movies
    name?: string; // For TV shows and people
    [key: string]: any;
  }