import { SetStateAction, useEffect, useState } from "react";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";

function Home() {
  const navigate = useNavigate();
  let loading = true;
  const [availableDept, setAvailableDept] = useState([]);
  const [availableCourse, setAvailableCourse] = useState([]);
  let selectedDept = "";
  let selectedCourse = "";
  const [selectedDeptForForm, setSelectedDeptForForm] = useState("");
  const [selectedCourseForForm, setselectedCourseForForm] = useState("");

  // const [deptSelected, setDeptSelected] = useState(false);
  useEffect(() => {
    let authorization = localStorage.getItem("Authorization");
    if (!authorization) {
      loading = false;
      navigate("/sign-in");
    } else {
      fetch("http://localhost:3000/dept_list", {
        method: "GET",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          loading = false;
          // do something with the data
          if (data.status == "success") {
            setAvailableDept(data.deptList);
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
  }, []);

  // useEffect(() => {
  //   console.log("@here");
  //   setSelectedDeptForForm(selectedDept);
  //   console.log(selectedDeptForForm);
  // }, [selectedDept]);

  const handleDeptChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const dept = event.target.value;
    selectedDept = dept + "";
    setSelectedDeptForForm(selectedDept);
    setselectedCourseForForm("");
    let authorization = localStorage.getItem("Authorization");
    if (!authorization) {
      navigate("/sign-in");
    } else {
      fetch("http://localhost:3000/course_list_by_dept/?dept=" + selectedDept, {
        method: "GET",

        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // do something with the data
          if (data.status == "success") {
            // setDeptSelected(true);
            setAvailableCourse(data.courseList);
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
  };

  const handleCourseChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    selectedCourse = event.target.value + "";
    setselectedCourseForForm(selectedCourse);
  };

  const searchReview = () => {
    navigate("/course", {
      state: { dept: selectedDeptForForm, coursecode: selectedCourseForForm },
    });
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate("/sign-in");
    setselectedCourseForForm(selectedCourse);
  };

  return (
    <Box
      id="container"
      sx={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        id="nav"
        sx={{
          display: "flex",
          paddingLeft: "50px",
          paddingRight: "20px",
          justifyContent: "space-around",
          width: "100vw",
        }}
      >
        <Typography variant="h4" color="initial">
          Rate My Course @SCU
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          logout
        </Button>
      </Box>
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "50px",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" color="initial">
            Select a Department
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="Select a Department">Department</InputLabel>
            <Select
              labelId="department"
              id="department"
              value={selectedDeptForForm}
              label="Department"
              onChange={handleDeptChange}
            >
              {availableDept.map((dept, index) => (
                <MenuItem key={index} value={dept["dept_code"]}>
                  {dept["dept_code"]}: {dept["dept_name"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" color="initial">
            Select a Course
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="Select a Course">Course</InputLabel>
            <Select
              labelId="course"
              id="course"
              value={selectedCourseForForm}
              label="Course"
              onChange={handleCourseChange}
            >
              {availableCourse.map((course, index) => (
                <MenuItem key={index} value={course["course_code"]}>
                  {course["course_code"]}: {course["course_name"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
        {selectedCourseForForm != "" && (
          <Fab onClick={searchReview} color="primary" aria-label="add">
            <NavigateNextTwoToneIcon />
          </Fab>
        )}
      </Container>
    </Box>
  );
}

export default Home;
