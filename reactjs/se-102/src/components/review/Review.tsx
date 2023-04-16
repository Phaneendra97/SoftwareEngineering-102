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
import CardContent from "@mui/material/CardContent";

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

  return (
    <Box
      id="container"
      sx={{
        paddingTop: "2%",
        width: "100vw",
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
          width: "100vw",
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
                            <Chip label={review["credits"] + " credits"} />
                            <Chip
                              color="primary"
                              label={"Avg Rating "+review["ratingAvg"] + "/10"}
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
                                      <Container maxWidth="xl" sx={{display:"flex", gap:"10px"}}>
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
                                        <Chip color="primary" label={"Rating "+userReview["rating"]+"/10"} />
                                        <Chip color="secondary" label={"Difficulty: "+userReview["difficulty"]} />
                                        <Chip color="success" label={"Grade: "+userReview["grade"]} />
                                      </Container>
                                    </Container>
                                  </CardContent>
                                </Card>
                              )
                            )}
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
