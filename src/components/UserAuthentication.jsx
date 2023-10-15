import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMainCrud } from "../context/MainCrudContext";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import styledEmo from "@emotion/styled";

const PageLayout = styledEmo.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const UserAuthentication = () => {
  const { authenticationHandler, loggedInUser } = useMainCrud();
  const [loading, setLoading] = useState(false);
  const credentialFormInit = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState(credentialFormInit);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const isLoggedIn = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          authenticationHandler(
            userCredentials.username,
            userCredentials.password
          )
        );
      }, 1000);
    });
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/home");
    } else {
      alert("wrong credentials!");
      setUserCredentials(credentialFormInit);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(loggedInUser);
    if (loggedInUser?.id) {
      navigate("/home");
    }
  }, [loggedInUser]);
  return (
    <PageLayout>
      <Typography variant="h2" sx={{ fontWeight: "500", marginBottom: "3rem" }}>
        <span style={{ color: "orange" }}>findmy</span>.
        <span
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            color: "#0400ff88",
            padding: "0rem 0.5rem",
          }}
        >
          news
        </span>
      </Typography>
      <Item>
        <form onSubmit={submitHandler}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            {/* <label style={{ color: "white" }}>Username : </label> */}
            <TextField
              type="text"
              label="Username"
              variant="standard"
              sx={{
                input: { color: "white" },
                label: { color: "#FFFFFF44" },
                textAlign: "center",
              }}
              value={userCredentials.username}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  username: e.target.value,
                })
              }
            />
            {/* <label style={{ color: "white" }}>Password : </label> */}
            <TextField
              type="password"
              label="Password"
              variant="standard"
              sx={{
                input: { color: "white" },
                label: { color: "#FFFFFF44" },
              }}
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
            />
            <Button
              variant="contained"
              type="submit"
              endIcon={<AutoAwesomeIcon />}
            >
              Start Finding!
            </Button>
            {/* <button type="submit">Enter</button> */}
          </Grid>
        </form>
      </Item>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={loading}
        message={
          <Grid
            container
            direction="column"
            sx={{ minWidth: "300px" }}
            justifyContent="center"
            alignItems="stretch"
          >
            <p style={{ textAlign: "center" }}>Loading....</p>

            <LinearProgress color="primary" sx={{ width: "100%" }} />
          </Grid>
        }
      />
    </PageLayout>
  );
};

export default UserAuthentication;
