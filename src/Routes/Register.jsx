import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password, stocks_owned: [] };

    try {
      const response = await axios.post(
        "https://stock-json-server.onrender.com/users",
        userData
      );

      alert("User registered successfully!", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user.", error);
    }
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p="6" m="40px auto">
      <Heading as="h2" size="lg" mb="6">
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
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
        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
