// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { useMainCrud } from "../context/MainCrudContext";

const FavouriteComponent = ({ favItem }) => {
  const { removeFavHandler } = useMainCrud();
  return (
    <>
      <ListItem component="div" disablePadding>
        <ListItemButton
          alignItems="flex-start"
          href={favItem.url}
          target="blank"
        >
          <ListItemAvatar>
            <Avatar src={favItem.urlToImage} />
          </ListItemAvatar>
          <ListItemText
            primary={favItem.author ?? favItem.source.name}
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
                variant="caption"
                component="p"
              >
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="subtitle2"
                >
                  {`${favItem.title.split(" ")[0]} `}
                </Typography>
                {favItem.title.split(" ").slice(1).join(" ")}
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ justifyContent: "center" }}
          onClick={() => removeFavHandler(favItem)}
        >
          <DeleteForever />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

FavouriteComponent.propTypes = {
  favItem: PropTypes.object,
};

export default FavouriteComponent;
