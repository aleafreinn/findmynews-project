import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { useMainCrud } from "../context/MainCrudContext";
import PropTypes from "prop-types";

const ResultComponent = ({ result }) => {
  const [favArticle, setFavArticle] = useState(false);
  const { favList, insertFavArticle, searchList } = useMainCrud();

  const displayDate = (article) => {
    const articleDate = new Date(article.publishedAt);
    return `${articleDate.getFullYear()}-${
      articleDate.getMonth() + 1
    }-${articleDate.getDate()}`;
  };

  useEffect(() => {
    const defineFav = favList.filter((fav) => {
      if (fav.description === result.description) {
        return fav;
      }
    });

    defineFav[0] ? setFavArticle(true) : setFavArticle(false);
    console.log(favArticle);
    console.log(defineFav);
  }, [favList, searchList]);

  return (
    <Grid item>
      <Card
        sx={{
          width: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea href={result.url} target="blank">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }}>
                {result.source.name[0]}
              </Avatar>
            }
            title={result.source.name}
            subheader={displayDate(result)}
          />
          <CardMedia component="img" height="194" image={result.urlToImage} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {result.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => insertFavArticle(result)}
          >
            <FavoriteIcon color={favArticle ? `secondary` : `disabled`} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

ResultComponent.propTypes = {
  result: PropTypes.object,
};

export default ResultComponent;
