import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getTVSeriesImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, TVSeriesDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTitle: {
        width: 450,
        height: '100vh'
    },
};

interface TemplateMediaPageProps {
    media: MovieDetailsProps | TVSeriesDetailsProps;
    type: "movie" | "tv"
    children: React.ReactElement;
}

const TemplateMediaPage: React.FC<TemplateMediaPageProps> = ({media, type, children}) => {
    const queryKey = type === "movie" ? ["images", media.id] : ["tvImages", media.id];
    const fetchImages = type === "movie" ? getMovieImages : getTVSeriesImages;
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        queryKey,
        () => fetchImages(media.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as MovieImage[];

    return (
        <>
        <MovieHeader {...media} />

        <Grid container spacing={5} style={{ padding: "15px" }}>

            <Grid item xs={9}>
                    {children}
                </Grid>
                            <Grid item xs={3}>
                <div>
                    <ImageList cols={1}>
                        {images.map((image: MovieImage) => (
                            <ImageListItem
                                key={image.file_path}
                                sx={styles.gridListTitle}
                                cols={0}
                                rows={1}
                                >
                                    <img 
                                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                      alt={'Image Alternative'}
                                      />
                                </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </Grid>
        </Grid>
       
        </>
    );
};

export default TemplateMediaPage;