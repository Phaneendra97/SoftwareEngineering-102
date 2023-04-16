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
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

function AddReview() {
  let [deptCode, setDeptCode] = useState("");
  let [courseCode, setCourseCode] = useState("");
  let [userId, setUserID] = useState("");
  let array: any[] = [];
  let [reviewArray, setReviewArray] = useState(array);
  const { state } = useLocation();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  useEffect(() => {
 
  }, []);


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
     
    </Box>
  );
}

export default AddReview;
