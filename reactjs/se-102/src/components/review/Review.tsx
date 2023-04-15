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
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";

function Review() {
  const { state } = useLocation();
  console.log("@here", state);
  const navigate = useNavigate();

  useEffect(() => {
    if (state == null) {
      navigate("/");
    } else {
      const { dept, coursecode } = state;
      console.log(dept);
      console.log(coursecode);

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
              console.log(data.reviews);
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
    ></Box>
  );
}

export default Review;
