import { SetStateAction, useEffect, useState } from "react";
import "./AddReview.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Card from "@mui/material/Card";
import { CardHeader, Chip, CircularProgress, TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CardContent from "@mui/material/CardContent";
import { saveAs } from "file-saver";
import Slider from "@mui/material/Slider";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function AddReview() {
  let [reviewText, setReviewText] = useState("");
  let [difficulty, setDifficulty] = useState("");
  let [grade, setGrade] = useState("");

  let [reviewObject, setReviewObject]: any = useState();
  let [rating, setRating] = useState(5);
  const { state } = useLocation();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    if (state == null) {
      navigate("/");
    } else {
      const { dept, course, instructor } = state;
      let authorization = localStorage.getItem("Authorization");
      if (!authorization) {
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
            if (!authorization) {
              navigate("/sign-in");
            } else {
              const payload = {
                dept: dept,
                course: course,
                instructor: instructor,
              };
              fetch("http://localhost:3000/check_review_exists/", {
                method: "POST",
                headers: {
                  Authorization: authorization,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status == "success") {
                    setReviewObject(data.review);
                    setLoading(false);
                    loadPreviousValues();
                    // setMessageType("success");
                  } else if (data.status == "error") {
                    // setMessageType("error");
                  }
                  // setMessage(data.message);
                })
                .catch((error) => {
                  // handle the error
                  console.error(error);
                  // setMessageType("error");
                  // setMessage(error);
                });
            }
          })
          .catch((error) => {
            // handle the error
            console.error(error);
          });
      }
    }
  }, []);

  const loadPreviousValues = () => {};
  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate("/sign-in");
  };
  const submitReview = () => {
    let authorization = localStorage.getItem("Authorization");
    let payload = {
      instructor: reviewObject["instructor"],
      dept: reviewObject["dept"],
      code: reviewObject["code"],
      review: reviewText,
      rating: rating,
      difficulty: difficulty,
      grade: grade,
    };
    if (!authorization) {
      navigate("/sign-in");
    } else {
      fetch("http://localhost:3000/add_review", {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          // do something with the data
          if (data.status == "success") {
            navigate("/course", {
              state: { dept: payload.dept, coursecode: payload.code },
            });
          } else if (data.status == "error") {
            // setMessageType("error");
          }
          // setMessage(data.message);
        })
        .catch((error) => {
          // handle the error
          console.error(error);
          // setMessageType("error");
          // setMessage(error);
        });
    }

    console.log("@here", payload);
  };
  return (
    <Box
      id="container"
      sx={{
        paddingTop: "2%",
        height: "90vh",

        display: "flex",
        flexDirection: "column",
      }}
    >
      {loading && (
        <Container maxWidth="xl">
          {" "}
          <CircularProgress />
        </Container>
      )}
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              paddingRight: "50px",
              justifyContent: "space-around",
            }}
          >
            <Container maxWidth="xl">
              <Typography variant="h4" color="initial">
                Rate My Course @SCU
              </Typography>
            </Container>

            <Container
              maxWidth="xs"
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button
                onClick={() => {
                  navigate("/course", {
                    state: {
                      dept: reviewObject["dept"],
                      coursecode: reviewObject["code"],
                    },
                  });
                }}
                variant="contained"
                startIcon={<ArrowBackIcon />}
              >
                Go Back
              </Button>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="contained"
                startIcon={<HomeOutlinedIcon />}
              >
                Go Home
              </Button>
              <Button variant="contained" color="primary" onClick={logout}>
                logout
              </Button>
            </Container>
          </Box>
          <Box
            sx={{
              paddingTop: "50px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: "60%",
                  padding: "50px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Card sx={{ padding: "20px" }} variant="outlined">
                  <Typography
                    sx={{ padding: "20px" }}
                    variant="h6"
                    color="initial"
                  >
                    General Details
                  </Typography>

                  <Container
                    maxWidth="xl"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Container maxWidth="xl" sx={{ display: "flex" }}>
                      {" "}
                      <Typography variant="body1" color="initial">
                        Course Code: {reviewObject["code"]}
                      </Typography>
                    </Container>
                    <Container maxWidth="xl" sx={{ display: "flex" }}>
                      <Typography variant="body1" color="initial">
                        Department: {reviewObject["dept"]}
                      </Typography>
                    </Container>
                  </Container>
                  <Container
                    maxWidth="xl"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Container maxWidth="xl" sx={{ display: "flex" }}>
                      {" "}
                      <Typography variant="body1" color="initial">
                        Course: {reviewObject["courseName"]}
                      </Typography>
                    </Container>
                    <Container maxWidth="xl" sx={{ display: "flex" }}>
                      <Typography variant="body1" color="initial">
                        Instructor: {reviewObject["instructor"]}
                      </Typography>
                    </Container>
                  </Container>
                </Card>
                <Card
                  sx={{ padding: "20px", marginTop: "20px" }}
                  variant="outlined"
                >
                  <Typography
                    sx={{ padding: "20px" }}
                    variant="h6"
                    color="initial"
                  >
                    Write a review
                  </Typography>

                  <Container
                    maxWidth="xl"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <TextField
                      sx={{ width: "100%" }}
                      multiline
                      value={reviewText}
                      onChange={(event) => {
                        setReviewText(event.target.value);
                      }}
                      id="review"
                      label="Review"
                      variant="outlined"
                    />
                  </Container>
                  <Container
                    maxWidth="xl"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Container maxWidth="xl">
                      <Slider
                        value={rating}
                        aria-label="Rating"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        onChange={(
                          event: Event,
                          newValue: number | number[]
                        ) => {
                          if (typeof newValue === "number") {
                            setRating(newValue);
                          }
                        }}
                        max={10}
                      />
                    </Container>
                    <Container sx={{ width: "15%" }}>
                      <Typography id="non-linear-slider">
                        Rating: {rating}
                      </Typography>
                    </Container>
                  </Container>
                  <Container
                    maxWidth="xl"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Container maxWidth="xl" sx={{ display: "flex" }}>
                      {" "}
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Difficulty
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={difficulty}
                          label="Difficulty"
                          onChange={(event) => {
                            setDifficulty(event.target.value);
                          }}
                        >
                          <MenuItem value={"easy"}>easy</MenuItem>
                          <MenuItem value={"medium"}>medium</MenuItem>
                          <MenuItem value={"hard"}>hard</MenuItem>
                        </Select>
                      </FormControl>
                    </Container>
                    <Container maxWidth="xl" sx={{ display: "flex" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Grade
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={grade}
                          label="Grade"
                          onChange={(event) => {
                            setGrade(event.target.value);
                          }}
                        >
                          <MenuItem value={"A"}>A</MenuItem>
                          <MenuItem value={"A-"}>A-</MenuItem>
                          <MenuItem value={"B+"}>B+</MenuItem>
                          <MenuItem value={"B"}>B</MenuItem>
                          <MenuItem value={"B-"}>B-</MenuItem>
                          <MenuItem value={"C or Belolw"}>C or Below</MenuItem>
                        </Select>
                      </FormControl>
                    </Container>
                  </Container>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "20px",
                    }}
                  >
                    <Button
                      sx={{ width: "50%" }}
                      onClick={submitReview}
                      variant="contained"
                      color="primary"
                    >
                      Submit Review
                    </Button>
                  </Box>
                </Card>
              </Card>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AddReview;
