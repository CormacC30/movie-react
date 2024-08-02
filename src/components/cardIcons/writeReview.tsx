import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseMediaProps} from "../../types/interfaces"
import { Link } from "react-router-dom";

const WriteReviewIcon:React.FC<BaseMediaProps> = (media) => {

  const type = media.title ? "movie" : "tv"
  return (
    <Link
    to={`/review/${type}/${media.id}`}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteReviewIcon;