import { SetStateAction, useEffect, useState } from "react";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function Home() {
  const navigate = useNavigate();
  const [availableDept, setAvailableDept] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  useEffect(() => {
    let authorization = localStorage.getItem("Authorization");
    if (!authorization) {
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

  const handleDeptChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedDept(event.target.value);
  };

  return (
    <Box
      id="container"
      sx={{
        width: "100vw",
        height: "100vh",
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
        <Button variant="contained" color="primary">
          logout
        </Button>
      </Box>
      <Container
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "50px",
          justifyContent: "center",
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
            value={selectedDept}
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
    </Box>
  );
}

export default Home;
