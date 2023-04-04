import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/LoginReducer/action";

const Login = () => {
  const isLoading = useSelector((store) => store.LoginReducer.isLoading); 
  const isAuth = useSelector((store) => store.LoginReducer.isAuth);
  const isError = useSelector((store) => store.LoginReducer.isError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      let res = await dispatch(login({ email, password }));
      if (res) {
        if (
          res.email == "admin@stockbroker.com" &&
          res.password == "admin123"
        ) {
          alert("Login successful");
          navigate("/dashboard");
        } else {
          alert("Login successful");
          navigate("/stocks");
        }
      } else {
        alert("wrong credentials");
      }
      // if (isAuth)
      // else
    }
  };
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p="6" m="40px auto">
      <Heading as="h2" size="lg" mb="6">
        Login
      </Heading>

      <form onSubmit={handleLogin}>
        <FormControl id="email" mb="4">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button
          isLoading={isLoading ? "true" : ""}
          loadingText="Logging In"
          type="submit"
          colorScheme="blue"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
