import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getTVSeriesImages } from "../../api/tmdb-api";
import {
  MovieImage,
  MovieDetailsProps,
  TVSeriesDetailsProps,
} from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { useParams } from "react-router-dom";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTitle: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateMediaPageProps {
  media: MovieDetailsProps | TVSeriesDetailsProps;
  type: "movie" | "tv" | undefined;
  children: React.ReactElement;
}

const TemplateMediaPage: React.FC<TemplateMediaPageProps> = ({
  media,
  type,
  children,
}) => {
  const queryKey =
    type === "movie" ? ["images", media.id] : ["tvImages", media.id]; // pagination
//  const type = useParams()
  const fetchImages = type === "movie" ? getMovieImages : getTVSeriesImages;
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    queryKey,
    () => fetchImages(media.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data as MovieImage[];

  return (
    <>
      <MovieHeader {...media}/>

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={8} maxWidth= "flex">
          {children}
        </Grid>
        <Grid item xs={4}>

            <ImageList
              sx={{ width: "flex", height: 750 }}
              variant="masonry"
              cols={1}
              gap={2}
            >
              {images.map((image: MovieImage) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTitle}
                  cols={0}
                  rows={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}?w=248&fit=crop&auto=format`}
                    alt={"Image Alternative"}
                  />
                </ImageListItem>
              ))}
            </ImageList>

        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMediaPage;
