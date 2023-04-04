import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Spacer, Button, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../Redux/LoginReducer/actionTypes";

function Navbar() {
  const isAuth = useSelector((store) => store.LoginReducer.isAuth);
  const isAdmin = useSelector((store) => store.LoginReducer.isAdmin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: types.LOGOUT_ACTION });
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to="/">
          <Button colorScheme="blue" variant="ghost">
            My Logo
          </Button>
        </Link>
        <Box>
          <Link to="/register">
            <Button colorScheme="blue" mr={2}>
              Register
            </Button>
          </Link>
          {isAuth ? (
            <Button onClick={handleLogout} colorScheme="red" mr={2}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button colorScheme="blue" mr={2}>
                Login
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link to="/dashboard">
              <Button colorScheme="blue" mr={2}>
                Dashboard
              </Button>
            </Link>
          )}

          <Link to="/portfolio">
            <Button colorScheme="blue" mr={2}>
              Portfolio
            </Button>
          </Link>
          <Link to="/stocks">
            <Button colorScheme="blue">Stocks</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
