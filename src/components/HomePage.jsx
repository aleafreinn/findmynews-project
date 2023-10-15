import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MyFavouritesPanel from "./MyFavouritesPanel";
import DisplayResults from "./DisplayResults";
import Header from "./Header";
import { useMainCrud } from "../context/MainCrudContext";

const HomePage = () => {
  const { loggedInUser } = useMainCrud();
  const [greetUser, setGreetUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser?.id) {
      navigate("/");
    }
    setGreetUser(true);
  }, [loggedInUser]);
  return (
    <>
      <Snackbar
        open={greetUser}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={
          <p style={{ textAlign: "center", minWidth: "300px" }}>
            Welcome, {loggedInUser?.name?.split(" ")[0] ?? ""}!
          </p>
        }
        onClose={() => setGreetUser(false)}
      />
      <Grid container className="main-container" direction={"column"}>
        <Grid
          item
          className="header-container"
          lg={1}
          style={{ maxHeight: "10vh" }}
        >
          <Header />
        </Grid>

        <Grid item className="content-container" lg={11}>
          <Grid container direction={"row"}>
            <Grid item className="favourites-section" lg="2.5">
              <MyFavouritesPanel style={{ overflowY: "scroll" }} />
            </Grid>

            <Grid item className="results-section" lg="9.5">
              <DisplayResults />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
