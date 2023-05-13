import { useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import CircularProgress from "@mui/material/CircularProgress";
import SignIn from "./components/signin/SignIn";
import Review from "./components/review/Review";
import AddReview from "./components/add-review/AddReview";

function App() {
  const navigate = useNavigate();
  let loading = true;
  let needsSignIn = true;
  useEffect(() => {
    let authorization = localStorage.getItem("Authorization");
    if (!authorization) {
      loading = false;
      navigate("/sign-in");
    } else {
      fetch("http://localhost:3000/profile", {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // do something with the data
          if (data["_id"] == undefined) {
            navigate("/sign-in");
          } else {
            loading = false;
            needsSignIn = false;
          }
        })
        .catch((error) => {
          // handle the error
          console.error(error);
        });
    }
  }, [0]);

  return (
    <div className="App">
      <Box
        sx={{ display: "flex", flexGrow: 1 }}
        justifyContent={"center"}
        alignContent={"center"}
      >
        {!loading && <CircularProgress color="secondary" />}
        {loading && (
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ width: "100vw" }}>
                  <Home></Home>
                </Box>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Box sx={{ flexGrow: 1 }}>
                  <SignIn></SignIn>
                </Box>
              }
            />
            <Route
              path="/course"
              element={
                <Box sx={{ flexGrow: 1 }}>
                  <Review></Review>
                </Box>
              }
            />
            <Route
              path="/write-review"
              element={
                <Box sx={{ flexGrow: 1 }}>
                  <AddReview></AddReview>
                </Box>
              }
            />
          </Routes>
        )}
      </Box>
    </div>
  );
}

export default App;
