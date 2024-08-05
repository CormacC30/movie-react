import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews, getTVReviews } from "../../api/tmdb-api"; // need to do the same for TV
import { excerpt } from "../../util";
import Spinner from "../spinner"
import { MovieDetailsProps, TVSeriesDetailsProps, Review } from "../../types/interfaces";

const styles = {
    table: {
        minWidth: 550,
    },
};

interface MovieReviewsProps {
    media: MovieDetailsProps | TVSeriesDetailsProps;
    type: "movie" | "tv";
    id: string;
  }

const MovieReviews: React.FC<MovieReviewsProps> = ({media, id, type}) => { 
    const getReviews = type === "movie" ? getMovieReviews : getTVReviews
   //  const [reviews, setReviews] = useState([]);
   
    const { data: reviews, error, isLoading, isError } = useQuery<Review[], Error>(
        [type, id, "reviews"],
        () => getReviews(id)
    )
    console.log("reviews: ", reviews);
    console.log("MEDIA: ", {media});
    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell >Author</TableCell>
                        <TableCell align="center">Excerpt</TableCell>
                        <TableCell align="right">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((r: Review) => (
                        <TableRow key={r.id}>
                            <TableCell component="th" scope="row">
                                {r.author}
                            </TableCell>
                            <TableCell >{excerpt(r.content)}</TableCell>
                            <TableCell >
                                <Link
                                    to={`/reviews/${r.id}`}
                                    state={{
                                        review: r,
                                        media: media,
                                    }}
                                >
                                    Full Review
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MovieReviews;