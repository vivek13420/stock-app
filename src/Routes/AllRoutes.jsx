import React from "react";
import { Route, Routes } from "react-router-dom";
import ReqAdminAuth from "../components/ReqAdminAuth";
import ReqAuth from "../components/ReqAuth";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Portfolio from "./Portfolio";
import Register from "./Register";
import Stocks from "./Stocks";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ReqAdminAuth>
              <Dashboard />
            </ReqAdminAuth>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ReqAuth>
              <Portfolio />
            </ReqAuth>
          }
        />
        <Route
          path="/stocks"
          element={
            <ReqAuth>
              <Stocks />
            </ReqAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
