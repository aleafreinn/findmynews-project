import { useMainCrud } from "../context/MainCrudContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import { Typography } from "@mui/material";

const Header = () => {
  const {
    keyWord,
    handleSetKeyWord,
    searchResults,
    loggedInUser,
    logOutHandler,
  } = useMainCrud();

  return (
    <Grid
      sx={{ padding: "0.5rem 1rem" }}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h4">
        <span style={{ color: "orange" }}>findmy</span>.
        <span
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            color: "#0400ffcc",
            padding: "0rem 0.5rem",
          }}
        >
          news
        </span>
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(keyWord);
          searchResults(keyWord, false);
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnGap={2}
        >
          <TextField
            type="text"
            id="filled-basic"
            label="what's on your mind?"
            variant="filled"
            value={keyWord}
            sx={{
              input: { color: "white" },
              label: { color: "#FFFFFF88" },
            }}
            color="secondary"
            onChange={(e) => handleSetKeyWord(e.target.value)}
          />
          <Button variant="contained" type="submit">
            search for news
          </Button>
        </Grid>
      </form>
      <div>
        <Grid container direction="row" alignItems="center" columnGap={2}>
          <Chip
            icon={<FaceIcon />}
            label={loggedInUser.name}
            variant="filled"
            color="primary"
          />
          <Button variant="contained" onClick={logOutHandler}>
            logout
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default Header;
