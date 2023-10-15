import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ResultComponent from "./ResultComponent";
import { useMainCrud } from "../context/MainCrudContext";
import { Typography } from "@mui/material";

const ThisSection = styled.section`
  box-sizing: border-box
  width: 100%;
  height: 100%;
  border: 2px solid white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const DisplayResults = () => {
  const { searchList, keyWord, searchResults } = useMainCrud();

  const resultList = searchList.map((result) => {
    if (result.title !== "[Removed]") {
      return (
        <>
          <ResultComponent key={result.id} result={result} />
        </>
      );
    }
  });

  return (
    <>
      <ThisSection>
        {searchList[0] ? (
          ""
        ) : (
          <Typography variant="h6">The results will be shown here!</Typography>
        )}
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {resultList}
        </Grid>
        {searchList[0] ? (
          searchList.length % 30 === 0 ? (
            <Button
              variant="contained"
              onClick={() => searchResults(keyWord, true)}
            >
              Show more
            </Button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </ThisSection>
    </>
  );
};

export default DisplayResults;
