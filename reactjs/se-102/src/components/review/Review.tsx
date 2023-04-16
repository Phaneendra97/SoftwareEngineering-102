import { SetStateAction, useEffect, useState } from "react";
import "./Review.css";
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
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';

function Review() {
  let [deptCode, setDeptCode] = useState("");
  let [courseCode, setCourseCode] = useState("");
  let array: any[] = [];
  let [reviewArray, setReviewArray] = useState(array);
  const { state } = useLocation();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    if (state == null) {
      navigate("/");
    } else {
      const { dept, coursecode } = state;
      setDeptCode(dept);
      setCourseCode(coursecode);
      let authorization = localStorage.getItem("Authorization");
      if (!authorization) {
        navigate("/sign-in");
      } else {
        fetch(
          "http://localhost:3000/review/?dept=" +
            dept +
            "&" +
            "coursecode=" +
            coursecode,
          {
            method: "GET",
            headers: {
              Authorization: authorization,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status == "success") {
              setReviewArray(data.reviews);
              setLoading(false);
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
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate("/sign-in");
  };

  const downloadSyllabus = (syllabus: any) => {
    console.log("@here", syllabus);
    const binaryString = atob(syllabus.data);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: syllabus.fileType });
    saveAs(blob, syllabus.fileName);
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
              navigate("/");
            }}
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={logout}>
            logout
          </Button>
        </Container>
      </Box>
      <Box sx={{ paddingTop: "2%" }}>
        {!loading && (
          <Container maxWidth="xl">
            <Card>
              <CardContent>
                <Typography variant="h5" color="initial">
                  Result for course: {deptCode}
                  {courseCode}
                </Typography>
                <Container maxWidth="xl">
                  {reviewArray.map((review, index) => (
                    <Card
                      sx={{ marginTop: "10px" }}
                      key={"course_" + index}
                      variant="outlined"
                    >
                      <CardContent>
                        <Container
                          maxWidth="xl"
                          sx={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                          }}
                        >
                          <Container
                            maxWidth="xl"
                            sx={{ display: "flex", gap: "10px" }}
                          >
                            <Chip label={index + 1} />
                            <Typography variant="h6" color="initial">
                              {review["courseName"] + " | "}
                            </Typography>
                            <Typography variant="h6" color="initial">
                              {"Instructor: " + review["instructor"] + " | "}
                            </Typography>
                            <Chip
                              color="primary"
                              label={review["credits"] + " credits"}
                            />
                            <Chip
                              color="primary"
                              label={
                                "Avg Rating " + review["ratingAvg"] + "/10"
                              }
                            />
                          </Container>
                          <Container
                            maxWidth="xl"
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            {review["reviews"].map(
                              (userReview: any, reviewIndex: any) => (
                                <Card
                                  sx={{ marginTop: "10px" }}
                                  key={"review_" + index + "_" + reviewIndex}
                                  variant="outlined"
                                >
                                  <CardContent>
                                    <Chip label={reviewIndex + 1} />
                                    <Container
                                      maxWidth="xl"
                                      sx={{
                                        display: "flex",
                                        gap: "10px",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <Container
                                        maxWidth="xl"
                                        sx={{ display: "flex", gap: "10px" }}
                                      >
                                        <TextField
                                          sx={{ width: "100%" }}
                                          id={
                                            "user-review-" +
                                            index +
                                            "-" +
                                            reviewIndex
                                          }
                                          label="Review"
                                          multiline
                                          value={userReview["review"]}
                                          variant="outlined"
                                        />
                                      </Container>
                                      <Container
                                        maxWidth="xl"
                                        sx={{ display: "flex", gap: "10px" }}
                                      >
                                        <Chip
                                          color="primary"
                                          label={
                                            "Rating " +
                                            userReview["rating"] +
                                            "/10"
                                          }
                                        />
                                        <Chip
                                          color="primary"
                                          label={
                                            "Difficulty: " +
                                            userReview["difficulty"]
                                          }
                                        />
                                        <Chip
                                          color="primary"
                                          label={
                                            "Grade: " + userReview["grade"]
                                          }
                                        />
                                      </Container>
                                    </Container>
                                  </CardContent>
                                </Card>
                              )
                            )}
                            <Box sx={{ display: "flex", gap:"20px" }}>
                              <Box
                                sx={{
                                  paddingTop: "20px",
                                  display: "flex",
                                  gap: "20px",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    downloadSyllabus(review.syllabus);
                                  }}
                                  endIcon={<ReviewsOutlinedIcon />}
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                >
                                  Write a Review
                                </Button>
                              </Box>
                              {review.syllabus !== null && (
                                <Box
                                  sx={{
                                    paddingTop: "20px",
                                    display: "flex",
                                    gap: "20px",
                                  }}
                                >
                                  <Button
                                    onClick={() => {
                                      downloadSyllabus(review.syllabus);
                                    }}
                                    endIcon={<DownloadIcon />}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                  >
                                    Download Syllabus
                                  </Button>
                                </Box>
                              )}
                              {review.syllabus === null && (
                                <Box sx={{ paddingTop: "20px" }}>
                                  <Card
                                    sx={{
                                      padding: "5px",
                                      border: "2px solid #1976D2",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      color="initial"
                                    >
                                      Have a copy of this syllabus? help us add
                                      it here! email us at{" "}
                                      <a
                                        style={{ color: "#000000" }}
                                        href="mailto:pamruthurravi@scu.edu"
                                      >
                                        pamruthurravi@scu.edu
                                      </a>
                                      &nbsp;
                                    </Typography>
                                  </Card>
                                </Box>
                              )}
                            </Box>
                          </Container>
                        </Container>
                      </CardContent>
                    </Card>
                  ))}
                </Container>
              </CardContent>
            </Card>
          </Container>
        )}
        {loading && (
          <Container maxWidth="xl">
            {" "}
            <CircularProgress />
          </Container>
        )}
      </Box>
    </Box>
  );
}

export default Review;
