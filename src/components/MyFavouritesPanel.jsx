import FavouriteComponent from "./FavouriteComponent";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useMainCrud } from "../context/MainCrudContext";
import List from "@mui/material/List";

const ThisSection = styled.section`
  min-height: 100vh;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  box-sizing: border-box;
  padding: 0.5rem;
`;

const MyFavouritesPanel = () => {
  const { favList, setFavList } = useMainCrud();
  const favComponentList = favList.map((favItem) => {
    return (
      <>
        <FavouriteComponent favItem={favItem} />
      </>
    );
  });

  return (
    <>
      <ThisSection>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div style={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <p>My Favourites: {favList.length}</p>
              <Button variant="contained" onClick={() => setFavList([])}>
                Clear
              </Button>
            </Grid>
          </div>

          <div>
            <List sx={{ width: "100%" }}>{favComponentList}</List>
          </div>
        </Grid>
      </ThisSection>
    </>
  );
};

export default MyFavouritesPanel;
