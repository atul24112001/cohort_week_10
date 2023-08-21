import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import authenticationState from "../recoil/atoms/authentication-atom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  .card {
    background-color: white;
    color: black;
    width: 40vw;
    padding: 12px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);

    .action_container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
  }
`;

const API_URL = import.meta.env.VITE_API_URL;

const AuthPage: React.FC = () => {
  const setAuthState = useSetRecoilState(authenticationState);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [haveAnAccount, setHaveAnAccount] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${API_URL}/api/todo_app/authentication/verify-token`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setAuthState({
        isAuthenticated: true,
        user: data.data,
      });
    })();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function authenticateHandler() {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/todo_app/authentication/${
          haveAnAccount ? "login" : "sign-up"
        }`,
        details
      );
      setAuthState({
        isAuthenticated: true,
        user: data.data,
      });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Container>
      <div className="card">
        <Typography variant="h4" textAlign="center" fontWeight={600}>
          Authentication
        </Typography>
        <TextField
          type="email"
          label="Email"
          placeholder="Enter email"
          name="email"
          onChange={changeHandler}
          value={details.email}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            label="Password"
            placeholder="Enter password"
            name="password"
            onChange={changeHandler}
            type={showPassword ? "text" : "password"}
            value={details.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  //   aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="action_container">
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setHaveAnAccount((prev) => !prev);
            }}
            underline="none"
          >
            {haveAnAccount ? "Sing-Up?" : " Login?"}
          </Link>
          {/* <Button>Cancel</Button> */}
          <Button onClick={authenticateHandler} variant="contained">
            {" "}
            {!haveAnAccount ? "Sing-Up" : " Login"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AuthPage;
