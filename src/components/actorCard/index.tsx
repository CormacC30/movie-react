import React from "react"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { CastProps } from "../../types/interfaces";
import { Link } from "react-router-dom";

const styles = {
  card: { maxWidth: "auto", margin: "auto" },
  cast: { height: 300 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  cursor: "pointer",
  media: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  }
};

  interface ActorCardProps {
    cast: CastProps;
    action: (c: CastProps) => React.ReactNode;
  }

  const ActorCard: React.FC<ActorCardProps> = ({cast}) => { // action (add in here for link ot artist bio)
    

  const role = cast.known_for_department === "Acting" ? cast.character : cast.job;

  const name= cast.name;

  return (
    <Card sx={styles.card} >
        <CardHeader
          title={
            <Typography variant="h6">
              {name}{" "}
            </Typography>
          }       
        
        />
        <div>
        <CardMedia 
          sx={styles.cast}
          image={
            cast.profile_path
            ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
            : img
          }
          title={name}
        />
        </div>
        <Grid container justifyContent="center" padding={2}>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            {role}
          </Typography>
        </Grid>
      </Grid>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {cast.popularity}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
        {/* action(cast) */}
        <Link to={`/actor/${cast.id}`}> 
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  )

  }
  export default ActorCard;