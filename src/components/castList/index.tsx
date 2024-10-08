/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Actor from "../actorCard";
import Grid from "@mui/material/Grid";
import { CastProps } from "../../types/interfaces";
import Box from "@mui/material/Box";

interface CastListProps {
    cast: CastProps[];
  }

  const styles = {
    scrollableBox: {
      width: "100%",
      maxHeight: '600px', // Adjust height as needed
      overflowY: 'auto',
      padding: '20px',
    },
  };

  const CastList: React.FC<CastListProps> = ({ cast }) => {
    return (
      <Box sx={styles.scrollableBox}>
        <Grid container spacing={2} justifyContent="center">
          {cast.map((c) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Actor cast={c} action={function (_c: CastProps): React.ReactNode {
                throw new Error("Function not implemented.");
              } } />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
export default CastList;