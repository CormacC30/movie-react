import React from "react";
import Actor from "../actorCard";
import Grid from "@mui/material/Grid";
import { CastProps, CreditsProps } from "../../types/interfaces";
import Box from "@mui/material/Box";

interface CastListProps {
    cast: CastProps[];
  }

  const styles = {
    scrollableBox: {
      width: '800px',
      maxHeight: '600px', // Adjust height as needed
      overflowY: 'auto',
      padding: '10px',
    },
  };

  const CastList: React.FC<CastListProps> = ({ cast }) => {
    return (
      <Box sx={styles.scrollableBox}>
        <Grid container spacing={2} justifyContent="center">
          {cast.map((c) => (
            <Grid key={c.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Actor cast={c} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
export default CastList;