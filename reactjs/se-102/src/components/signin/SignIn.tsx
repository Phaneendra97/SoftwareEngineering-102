import { SetStateAction, useEffect, useState } from "react";
import "./SignIn.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleChange = (event: {
    target: { value: SetStateAction<string>; id: SetStateAction<string> };
  }) => {
    let id = event.target.id;
    if (id == "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const signin = () => {
    let payload = {
      email: email,
      password: password,
    };

    if(!validatePassword(password)){
      setMessageType("error");
      setMessage("Password should be atleast 8 characters long");
    }
    else if (validateEmail(email)) {
      fetch("http://localhost:3000/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          // do something with the data
          if (data.status == "success") {
            setMessageType("success");
            const authToken = 'JWT '+ data.token;
            localStorage.setItem('Authorization', authToken);
            navigate("/");
          } else if (data.status == "error") {
            setMessageType("error");
          }
          setMessage(data.message);
        })
        .catch((error) => {
          // handle the error
          console.error(error);
          setMessageType("error");
          setMessage(error);
        });
    } else {
      setMessageType("error");
      setMessage("Invalid email, use your SCU email");
    }
  };

  const signup = () => {
    let payload = {
      email: email,
      password: password,
    };
    if(!validatePassword(password)){
      setMessageType("error");
      setMessage("Password should be atleast 8 characters long");
    }
    else if (validateEmail(email)) {
      fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          // do something with the data
          if (data.status == "success") {
            setMessageType("success");
          } else if (data.status == "error") {
            setMessageType("error");
          }
          setMessage(data.message);
        })
        .catch((error) => {
          // handle the error
          console.error(error);
          setMessageType("error");
          setMessage(error);
        });
    } else {
      setMessageType("error");
      setMessage("Invalid email, use your SCU email");
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@scu.edu/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    if(password.length < 8){
      return false;
    }else{
      return true;
    }
  };

  return (
    <Container sx={{ height: "100vh", marginTop: "5%" }}>
      <Card
        sx={{
          // width: "100%",
          display: "flex",
          height: "60%",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
        variant="outlined"
      >
        <Stack spacing={2}>
          <Typography variant="h2" color="initial">
            Rate My Course
          </Typography>
          {message !== "" && messageType == "error" && (
            <Alert severity="error">
              <AlertTitle>{message}</AlertTitle>
            </Alert>
          )}
          {message !== "" && messageType == "success" && (
            <Alert severity="success">
              <AlertTitle>{message}</AlertTitle>
            </Alert>
          )}
          <TextField
            id="email"
            label="SCU email"
            variant="outlined"
            type="text"
            value={email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Stack direction={"row"} spacing={4}>
            <Container maxWidth="md">
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={signin}
              >
                Sign In
              </Button>
            </Container>
            <Container maxWidth="md">
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={signup}
              >
                Sign UP
              </Button>
            </Container>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}

export default SignIn;
