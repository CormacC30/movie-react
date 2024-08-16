import React from "react";
import { CastProps, CrewProps, CreditsProps } from "../../types/interfaces";
import { getMovieCredits, getTVCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import CastList from "../castList";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const styles = {
    boxParams: {
      maxWidth: "100%",
      display: "grid",
      gap: 2,
    }
}

const MediaCredits: React.FC<CreditsProps | CastProps> = ({ id, type }) => {
  const { data, error, isLoading, isError } = useQuery<
    { cast: CastProps[]; crew: CrewProps[] },
    Error
  >([type, id, "credits"], () =>
    type === "movie" ? getMovieCredits(id) : getTVCredits(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error">
        {error.message}
      </Typography>
    );
  }

  const { cast, crew } = data;
 
  return (
    <>
        <Box
          sx={
            styles.boxParams
          }
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h5" component="h3">
                Cast
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper elevation={1}>
                <CastList cast={cast} />
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Box>
      <Box
          sx={styles.boxParams}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h5" component="h3">
                Crew
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper elevation={1}>
                <CastList cast={crew} />
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Box>
    </>
  );
};
export default MediaCredits;
